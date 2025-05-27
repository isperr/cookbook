import {memo, useMemo, useState} from 'react'
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form'
import {twMerge} from 'tailwind-merge'
import {
  Box,
  Dialog,
  DialogContent,
  FormHelperText,
  IconButton,
  Typography
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import Button from '../../atoms/Button'
import DetailText from '../../atoms/DetailText'
import Text from '../../atoms/Text'
import {RecipeFormFields} from '../../molecules/RecipeForm/types'

import Field from './components/Field'
import {useNotifications} from '@toolpad/core'
import {getToastConfig} from '../../utils/get-toast-config'

export type ListDialogProps = {
  isAddMode: boolean
  type: 'ingredients' | 'instructions'
  title: string
}

const ListDialog = ({isAddMode, type, title}: ListDialogProps) => {
  const notifications = useNotifications()
  const {control, formState} = useFormContext<RecipeFormFields>()
  const {fields, append, remove} = useFieldArray({
    control,
    name: type
  })
  const value = useWatch({
    name: type,
    control
  })
  const isInvalid = useMemo(() => value.some(it => !it.text), [value])

  const isRemoving = false
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const openDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    if (isInvalid) {
      notifications.show(
        'Fülle alle Felder aus oder entferne die Zeile mit dem Fehler.',
        getToastConfig({})
      )
    } else {
      setIsDialogOpen(false)
    }
  }

  return (
    <>
      <DetailText heading={title} isEditMode>
        <Button
          color="secondary"
          className="w-fit"
          isDisabled={formState.disabled}
          onClick={openDialog}
          startIcon={isAddMode ? <AddIcon /> : <EditIcon />}
          size="small"
        >
          {isAddMode ? 'Hinzufügen' : 'Bearbeiten'}
        </Button>
      </DetailText>

      <Dialog
        open={isDialogOpen || isRemoving}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '.MuiPaper-root': {
            width: '600px'
          }
        }}
      >
        <DialogContent className="flex flex-col gap-2">
          <Box className="flex justify-between">
            <Typography variant="h6">{title} angeben</Typography>
            <IconButton color="inherit" onClick={closeDialog}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box className="flex">
            {type === 'ingredients' && (
              <Text className="sm:flex-[0.5] flex-1" type="label">
                Menge
              </Text>
            )}
            <Text
              className={twMerge(
                type === 'ingredients' && 'sm:flex-[2.15] flex-[2.4]'
              )}
              type="label"
            >
              {type === 'ingredients' ? 'Zutat' : 'Schritt'} *
            </Text>
          </Box>
          {fields.map((field, index) => (
            <Box
              className="flex items-center gap-2"
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

          <FormHelperText className={twMerge(isInvalid && 'text-red')}>
            Alle Pflichtfelder müssen ausgefüllt sein, damit die entsprechende
            Zeile korrekt gespeichert wird
          </FormHelperText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default memo(ListDialog)
