import {memo, useMemo} from 'react'
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form'
import {twMerge} from 'tailwind-merge'
import {
  Box,
  DialogActions,
  DialogContent,
  FormHelperText,
  IconButton
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import {useNotifications} from '@toolpad/core'

import Button from '../../../atoms/Button'
import {getToastConfig} from '../../../utils/get-toast-config'
import {
  IngredientsType,
  InstructionsType,
  ListDialogFields
} from '../../RecipeForm/types'

import Field from './Field'
import {ListDialogProps} from '../index'

export type ListDialogFormProps = Pick<ListDialogProps, 'type'> & {
  handleCancel: () => void
  handleConfirm: (newValue: IngredientsType | InstructionsType) => void
}

const ListDialogForm = ({
  handleCancel,
  handleConfirm,
  type
}: ListDialogFormProps) => {
  const notifications = useNotifications()
  const {control} = useFormContext<ListDialogFields>()

  const {fields, append, remove} = useFieldArray({
    control,
    name: `${type}Draft`
  })
  const watchValue = useWatch({
    name: `${type}Draft`,
    control
  })

  const isInvalid = useMemo(() => watchValue.some(it => !it.text), [watchValue])

  const onConfirm = () => {
    if (isInvalid) {
      notifications.show(
        'Fülle alle Felder aus oder entferne die Zeile mit dem Fehler.',
        getToastConfig({})
      )
    } else {
      handleConfirm(watchValue)
    }
  }

  return (
    <>
      <DialogContent className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <Box
            className="flex items-center gap-2 -mr-3"
            id={field.id}
            key={field.id}
          >
            {type === 'ingredients' && (
              <Field fieldType="amount" index={index} type={type} />
            )}
            <Field fieldType="text" index={index} type={type} />
            <IconButton
              color="secondary"
              onClick={() => remove(index)}
              size="medium"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ))}
        <IconButton
          className="w-fit mx-auto"
          color="secondary"
          onClick={() =>
            append({amount: type === 'instructions' ? null : '', text: ''})
          }
          size="large"
        >
          <AddCircleIcon fontSize="inherit" />
        </IconButton>

        <FormHelperText className={twMerge('mt-0', isInvalid && 'text-red')}>
          Alle Pflichtfelder müssen ausgefüllt sein, damit die entsprechende
          Zeile korrekt gespeichert wird
        </FormHelperText>
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
