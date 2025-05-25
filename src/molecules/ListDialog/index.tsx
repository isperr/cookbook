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
import EditIcon from '@mui/icons-material/Edit'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'

import Button from '../../atoms/Button'
import DetailText from '../../atoms/DetailText'
import Text from '../../atoms/Text'
import {RecipeFormFields} from '../../pages/RecipePage/components/EditView'

import Field from './components/Field'

export type ListDialogProps = {
  type: 'ingredients' | 'instructions'
  title: string
}

const ListDialog = ({type, title}: ListDialogProps) => {
  const {control} = useFormContext<RecipeFormFields>()
  const {fields, append, remove} = useFieldArray({
    control,
    name: type
  })
  const value = useWatch({
    name: type,
    control
  })
  const isInvalid = useMemo(
    () =>
      value.some(
        it =>
          (type === 'ingredients' && (!it.amount || !it.text)) ||
          (type === 'instructions' && !it.text)
      ),
    [value]
  )

  const isRemoving = false
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const openDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    if (!isInvalid) {
      setIsDialogOpen(false)
    }
  }

  return (
    <>
      <DetailText heading={title} isEditMode>
        <Button
          className="w-fit"
          onClick={openDialog}
          startIcon={<EditIcon />}
          size="small"
        >
          Bearbeiten
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
            <IconButton
              color="inherit"
              disabled={isInvalid}
              onClick={closeDialog}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box className="flex">
            {type === 'ingredients' && (
              <Text className="flex-[0.5]" type="label">
                Anzahl
              </Text>
            )}
            <Text
              className={twMerge(type === 'ingredients' && 'flex-[2.15]')}
              type="label"
            >
              {type === 'ingredients' ? 'Zutat' : 'Schritt'}
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
                color="warning"
                onClick={() => remove(index)}
                size="medium"
              >
                <RemoveCircleIcon fontSize="inherit" />
              </IconButton>
            </Box>
          ))}
          <IconButton
            className="w-fit mx-auto"
            color="primary"
            onClick={() =>
              append({amount: type === 'instructions' ? null : '', text: ''})
            }
            size="large"
          >
            <AddCircleIcon fontSize="inherit" />
          </IconButton>

          <FormHelperText className={twMerge(isInvalid && 'text-red')}>
            Alle Felder müssen ausgefüllt sein, damit die entsprechende Zeile
            korrekt gespeichert wird
          </FormHelperText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default memo(ListDialog)
