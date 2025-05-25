import {memo} from 'react'
import {
  useForm,
  SubmitHandler,
  FormProvider,
  SubmitErrorHandler
} from 'react-hook-form'
import {omit} from 'lodash'
import {Typography} from '@mui/material'

import Button from '../../../atoms/Button'
import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import {selectRecipeData} from '../../../modules/recipe/results/selectors'
import RecipeForm from '../../../molecules/RecipeForm'
import {useAppSelector} from '../../../utils/store-hooks'
import {getUpdatedData} from '../utils/get-updated-data'
import {useEditRecipe} from '../../../hooks/recipe/use-edit'

export type RecipeFormFields = {
  category: string
  details: string
  duration: string
  ingredients: {amount: string; text: string}[]
  instructions: {amount: null; text: string}[]
  isFavorite: boolean
  isLowCarb: boolean
  rating: number | null
  title: string
}

const EditView = ({id}: {id: string}) => {
  const {leaveEditMode} = useToggleEditMode()
  const recipe = useAppSelector(selectRecipeData(id))
  const {isEdited, isEditing, handleEdit} = useEditRecipe()

  const isDisabled = isEdited || isEditing

  const methods = useForm<RecipeFormFields>({
    defaultValues: omit({...recipe, details: recipe.details ?? undefined}, [
      'id'
    ]),
    disabled: isDisabled
  })
  const {
    formState: {isDirty, dirtyFields}
  } = methods
  const onSubmit: SubmitHandler<RecipeFormFields> = data => {
    if (!isDirty) {
      leaveEditMode()
      return
    }
    console.log(data)
    console.log('dirtyFields', dirtyFields)
    const updated = getUpdatedData(data, recipe)
    console.log('updated', updated)
    handleEdit({data: updated, id, leaveEditMode})
  }
  const onError: SubmitErrorHandler<RecipeFormFields> = errors =>
    console.log(errors)

  return (
    <>
      <Typography variant="h5">Rezept bearbeiten</Typography>
      <FormProvider {...methods}>
        <RecipeForm onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <Button
            fullWidth
            isDisabled={isDisabled}
            onClick={leaveEditMode}
            variant="outlined"
          >
            Abbrechen
          </Button>
          <Button fullWidth isLoading={isDisabled} type="submit">
            Speichern
          </Button>
        </RecipeForm>
      </FormProvider>
    </>
  )
}

export default memo(EditView)
