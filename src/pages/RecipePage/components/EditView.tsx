import {memo} from 'react'
import {
  useForm,
  SubmitHandler,
  FormProvider,
  SubmitErrorHandler
} from 'react-hook-form'
import {omit} from 'lodash'
import {Typography} from '@mui/material'

import SaveButtons from '../../../atoms/SaveButtons'
import {useEditRecipe} from '../../../hooks/recipe/use-edit'
import {selectRecipeData} from '../../../modules/recipe/results/selectors'
import RecipeForm from '../../../molecules/RecipeForm'
import {RecipeFormFields} from '../../../molecules/RecipeForm/types'
import {useAppSelector} from '../../../utils/store-hooks'

import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import {getUpdatedData} from '../utils/get-updated-data'

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
    formState: {isDirty}
  } = methods

  const onSubmit: SubmitHandler<RecipeFormFields> = async data => {
    if (!isDirty) {
      leaveEditMode()
      return
    }
    const updated = getUpdatedData(data, recipe)
    await handleEdit({data: updated, id})
  }
  const onError: SubmitErrorHandler<RecipeFormFields> = errors =>
    console.log(errors)

  return (
    <>
      <Typography variant="h5">Rezept bearbeiten</Typography>
      <FormProvider {...methods}>
        <RecipeForm
          isAddMode={false}
          onSubmit={methods.handleSubmit(onSubmit, onError)}
        >
          <SaveButtons
            isLoading={isDisabled}
            onCancel={leaveEditMode}
            type="leaveEdit"
          />
        </RecipeForm>
      </FormProvider>
    </>
  )
}

export default memo(EditView)
