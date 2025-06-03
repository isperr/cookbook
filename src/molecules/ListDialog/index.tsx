import {memo, useMemo, useState} from 'react'
import {
  FormProvider,
  useController,
  useForm,
  useFormContext
} from 'react-hook-form'
import {Dialog, DialogTitle} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

import Button from '../../atoms/Button'
import DetailText from '../../atoms/DetailText'
import List from '../../atoms/DetailList/components/List'
import {
  IngredientsType,
  InstructionsType,
  ListDialogFields,
  RecipeFormFields
} from '../../molecules/RecipeForm/types'

import Form from './components/Form'

export type ListDialogProps = {
  type: 'ingredients' | 'instructions'
  title: string
}

const ListDialog = ({type, title}: ListDialogProps) => {
  const {control, formState} = useFormContext<RecipeFormFields>()

  // RECIPE-FORM
  const {
    field: {onChange, value}
  } = useController({
    name: type,
    control
  })
  const hasValue = useMemo(() => Boolean(value.length), [value.length])

  // LIST-DIALOG-FORM
  const methods = useForm<ListDialogFields>({
    defaultValues: {
      ingredientsDraft: (type === 'ingredients'
        ? value
        : []) as IngredientsType,
      instructionsDraft: (type === 'instructions'
        ? value
        : []) as InstructionsType
    }
  })

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const openDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    closeDialog()
    setTimeout(() => {
      methods.setValue(`${type}Draft`, value)
    }, 150)
  }

  const handleConfirm = (newValue: IngredientsType | InstructionsType) => {
    onChange(newValue)
    closeDialog()
  }

  return (
    <>
      <DetailText heading={title} isEditMode>
        {value.length > 0 && (
          <List
            data={value}
            isEditMode
            isOrderedList={type === 'instructions'}
          />
        )}
        <Button
          color="secondary"
          className="w-fit"
          isDisabled={formState.disabled}
          onClick={openDialog}
          startIcon={hasValue ? <EditIcon /> : <AddIcon />}
          size="small"
        >
          {hasValue ? 'Bearbeiten' : 'Hinzufügen'}
        </Button>
      </DetailText>

      <Dialog
        fullScreen
        open={isDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '.MuiPaper-root': {
            width: '600px'
          }
        }}
      >
        <DialogTitle>{title} angeben</DialogTitle>
        <FormProvider {...methods}>
          <Form
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            type={type}
          />
        </FormProvider>
      </Dialog>
    </>
  )
}

export default memo(ListDialog)
