import {memo, useMemo, useState} from 'react'
import {
  FormProvider,
  useController,
  useForm,
  useFormContext
} from 'react-hook-form'
import {AppBar, Dialog, Toolbar, Typography} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import {DialogsProvider} from '@toolpad/core'

import Button from '../../atoms/Button'
import DetailText from '../../atoms/DetailText'
import List from '../../atoms/DetailList/components/List'
import {
  ListDialogFields,
  RecipeFormFields
} from '../../molecules/RecipeForm/types'
import {IngredientsType, InstructionsType} from '../../modules/recipe/types'

import ListDialogForm from '../ListDialogForm/index'

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
        : []) as InstructionsType,
      sectionTitle: null
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
    <DialogsProvider>
      <DetailText heading={title} isEditMode>
        {hasValue && (
          <List
            isEditMode
            isOrderedList={type === 'instructions'}
            sections={value}
            type={type}
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
      >
        <AppBar className="relative" color="default">
          <Toolbar className="px-3">
            <Typography variant="h6">{title} angeben</Typography>
          </Toolbar>
        </AppBar>

        <FormProvider {...methods}>
          <ListDialogForm
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            hasSections={
              value.length > 1 || (value.length === 1 && Boolean(value[0].name))
            }
            type={type}
          />
        </FormProvider>
      </Dialog>
    </DialogsProvider>
  )
}

export default memo(ListDialog)
