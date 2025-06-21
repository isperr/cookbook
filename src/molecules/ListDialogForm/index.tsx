import {memo} from 'react'
import {twMerge} from 'tailwind-merge'
import {
  Box,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Paper,
  Switch
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import Button from '../../atoms/Button'
import {IngredientsType, InstructionsType} from '../../modules/recipe/types'

import {ListDialogProps} from '../ListDialog/index'

import FieldHeaders from './components/FieldHeaders'
import FieldRow from './components/FieldRow'
import SectionManagement from './components/SectionManagement'
import AddSection from './components/AddSection'
import {EMPTY, useListDialogForm} from './hooks/use-list-dialog-form'

export type ListDialogFormProps = Pick<ListDialogProps, 'type'> & {
  handleCancel: () => void
  handleConfirm: (newValue: IngredientsType | InstructionsType) => void
  hasSections: boolean
}

const ListDialogForm = ({
  handleCancel,
  handleConfirm,
  hasSections: defaultHasSections,
  type
}: ListDialogFormProps) => {
  const {
    fields,
    hasSections,
    handleAddRow,
    handleAddSection,
    handleHasSectionChange,
    handleRemoveRow,
    handleRemoveSection,
    isInvalid,
    onConfirm
  } = useListDialogForm({
    defaultHasSections,
    handleConfirm,
    type
  })

  return (
    <>
      <DialogContent className="flex flex-col gap-2 p-3">
        {/* SWITCH to toggle hasSections */}
        <FormControlLabel
          className="px-2"
          control={
            <Switch
              checked={hasSections}
              onChange={handleHasSectionChange}
              size="small"
              slotProps={{input: {'aria-label': 'controlled'}}}
            />
          }
          label={hasSections ? 'Mit Abschnitte' : 'Ohne Abschnitte'}
        />
        {fields.map((field, sectionIndex) => (
          <Paper
            className="flex flex-col gap-2 px-2 py-1"
            elevation={3}
            key={`section-${sectionIndex}`}
          >
            {/* show SECTIONMANAGEMENT if hasSections=true */}
            {hasSections && (
              <Box className="p-0 flex flex-col gap-2">
                <SectionManagement
                  handleRemove={handleRemoveSection}
                  sectionIndex={sectionIndex}
                  type={type}
                />
              </Box>
            )}

            {/* FIELD-HEADERS of fields */}
            <FieldHeaders type={type} />

            {/* show FIELD-ROW if field.text !== EMPTY */}
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

            {/* show ADD-BUTTON to add row */}
            <IconButton
              className="w-fit mx-auto"
              color="secondary"
              onClick={() => handleAddRow(sectionIndex)}
              size="large"
            >
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </Paper>
        ))}

        <FormHelperText className={twMerge('mt-0', isInvalid && 'text-red')}>
          Alle Pflichtfelder müssen ausgefüllt sein, damit die entsprechende
          Zeile korrekt gespeichert wird
        </FormHelperText>

        {/* show ADD-BUTTON to add sections if hasSections=true */}
        {hasSections && (
          <AddSection handleAddSection={handleAddSection} type={type} />
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
