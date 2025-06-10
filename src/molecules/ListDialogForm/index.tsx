import {memo, useMemo, useState} from 'react'
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form'
import {twMerge} from 'tailwind-merge'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Paper,
  Switch,
  Typography
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {useNotifications} from '@toolpad/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import Button from '../../atoms/Button'
import {
  IngredientsDataType,
  IngredientsType,
  InstructionsDataType,
  InstructionsType
} from '../../modules/recipe/types'
import {getToastConfig} from '../../utils/get-toast-config'

import {ListDialogFields} from '../RecipeForm/types'
import {ListDialogProps} from '../ListDialog/index'

import FieldHeaders from './components/FieldHeaders'
import FieldRow from './components/FieldRow'
import SectionManagement from './components/SectionManagement'

export type ListDialogFormProps = Pick<ListDialogProps, 'type'> & {
  handleCancel: () => void
  handleConfirm: (newValue: IngredientsType | InstructionsType) => void
  hasSections: boolean
}
const EMPTY = '---REMOVED---'

const ListDialogForm = ({
  handleCancel,
  handleConfirm,
  hasSections: defaultHasSections,
  type
}: ListDialogFormProps) => {
  const notifications = useNotifications()
  const {control, setValue} = useFormContext<ListDialogFields>()

  const {fields, append, remove, update} = useFieldArray({
    control,
    name: `${type}Draft`
  })
  const watchValue = useWatch({
    name: `${type}Draft`,
    control
  })

  const isInvalid = useMemo(
    () =>
      watchValue.some(({data}) => data?.some(it => !it.text)) ||
      (watchValue.length > 1 && watchValue.some(({name}) => !name)),
    [watchValue]
  )

  const onConfirm = () => {
    if (isInvalid) {
      notifications.show(
        'Fülle alle Felder erforderlichen Felder aus oder entferne die Zeile/den Abschnitt mit dem Fehler.',
        getToastConfig({})
      )
    } else {
      // filter out rows with EMPTY filler
      const filtered = watchValue.map(({data, name}) => {
        return {
          data: data.filter(it => it.text !== EMPTY),
          name: name
        }
      })
      handleConfirm(
        type === 'ingredients'
          ? (filtered as IngredientsType)
          : (filtered as InstructionsType)
      )
    }
  }

  const handleSectionManagement = (sectionName: string | null) => {
    append({data: [], name: sectionName})
  }

  const handleRemoveSection = (sectionIndex: number) => {
    remove(sectionIndex)
  }

  const handleRemoveRow = (sectionIndex: number, index: number) => {
    const currentValue = watchValue[sectionIndex]
    const updated = currentValue.data.map((val, idx) => {
      if (idx === index) {
        return {amount: null, text: EMPTY}
      }
      return val
    })

    if (type === 'ingredients') {
      update(sectionIndex, {
        name: currentValue.name,
        data: updated as IngredientsDataType
      })

      console.log(watchValue)
    } else {
      update(sectionIndex, {
        name: currentValue.name,
        data: updated as InstructionsDataType
      })
    }
  }

  const handleAddRow = (sectionIndex: number) => {
    const currentValue = watchValue[sectionIndex]
    const updated = [
      ...currentValue.data,
      {
        amount: type === 'instructions' ? null : '',
        text: ''
      }
    ]
    if (type === 'ingredients') {
      update(sectionIndex, {
        name: currentValue.name,
        data: updated as IngredientsDataType
      })
    } else {
      update(sectionIndex, {
        name: currentValue.name,
        data: updated as InstructionsDataType
      })
    }
  }

  const [hasSections, setHasSections] = useState<boolean>(defaultHasSections)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHasTitle = event.target.checked
    if (!newHasTitle && watchValue.length > 1) {
      // remove all extra sections
      watchValue.forEach((__, index) => {
        if (index > 0) {
          remove(index)
        }
      })
      // reset title for only section left
      if (watchValue[0].name) {
        setValue(`${type}Draft.0.name`, null)
      }
    }
    setHasSections(newHasTitle)
  }

  return (
    <>
      <DialogContent className="flex flex-col gap-2 p-3">
        <FormControlLabel
          className="px-2"
          control={
            <Switch
              checked={hasSections}
              onChange={handleChange}
              size="small"
              slotProps={{input: {'aria-label': 'controlled'}}}
            />
          }
          label={hasSections ? 'Mit Abschnitte' : 'Ohne Abschnitte'}
        />
        {fields.map((field, sectionIndex) => (
          <div
            className={twMerge(
              'flex flex-col gap-2',
              hasSections && watchValue.length > 1 && 'border-b-2 pb-2'
            )}
            key={`section-${sectionIndex}`}
          >
            {hasSections && (
              <Paper className="p-2 flex flex-col gap-2">
                <SectionManagement
                  handleRemove={handleRemoveSection}
                  sectionIndex={sectionIndex}
                  type={type}
                />
              </Paper>
            )}
            <FieldHeaders type={type} />
            {field.data.map((innerField, index) => {
              if (innerField.text === EMPTY) {
                return null
              }
              return (
                <FieldRow
                  key={`fields-${sectionIndex}-${index}`}
                  handleRemoveRow={handleRemoveRow}
                  index={index}
                  sectionIndex={sectionIndex}
                  type={type}
                />
              )
            })}
            <IconButton
              className="w-fit mx-auto"
              color="secondary"
              onClick={() => handleAddRow(sectionIndex)}
              size="large"
            >
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </div>
        ))}

        <FormHelperText className={twMerge('mt-0', isInvalid && 'text-red')}>
          Alle Pflichtfelder müssen ausgefüllt sein, damit die entsprechende
          Zeile korrekt gespeichert wird
        </FormHelperText>

        {hasSections && (
          <div>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span">Abschnitt hinzufügen</Typography>
              </AccordionSummary>
              <AccordionDetails className="flex flex-col gap-2">
                <SectionManagement
                  handleAdd={handleSectionManagement}
                  type={type}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </DialogContent>

      <DialogActions className="pb-5 px-6 flex justify-evenly items-center">
        <Button fullWidth onClick={handleCancel} variant="outlined">
          Abbrechen
        </Button>
        <Button autoFocus fullWidth onClick={onConfirm}>
          Speichern
        </Button>
      </DialogActions>
    </>
  )
}

export default memo(ListDialogForm)
