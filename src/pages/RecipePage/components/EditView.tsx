import {memo} from 'react'
import {Typography} from '@mui/material'

import Button from '../../../atoms/Button'
import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import {selectRecipeData} from '../../../modules/recipe/results/selectors'
import RecipeForm from '../../../molecules/RecipeForm'
import {useAppSelector} from '../../../utils/store-hooks'

import {
  useForm,
  SubmitHandler,
  FormProvider,
  SubmitErrorHandler
} from 'react-hook-form'
import {RecipeCategory} from '../../../modules/recipe-category/types'
import {omit} from 'lodash'

export type RecipeFormFields = {
  category: RecipeCategory
  details: string
  duration: string
  isFavorite: boolean
  isLowCarb: boolean
  rating: number | null
  title: string
}

const EditView = ({id}: {id: string}) => {
  const {leaveEditMode} = useToggleEditMode()
  const recipe = useAppSelector(selectRecipeData(id))

  const isUpdating = false

  const methods = useForm<RecipeFormFields>({
    defaultValues: omit({...recipe, details: recipe.details ?? undefined}, [
      'id'
    ]),
    disabled: isUpdating
  })
  const onSubmit: SubmitHandler<RecipeFormFields> = data => {
    console.log(data)
    console.log(methods.formState.dirtyFields)
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
            isDisabled={isUpdating}
            onClick={leaveEditMode}
            variant="outlined"
          >
            Abbrechen
          </Button>
          <Button fullWidth isLoading={isUpdating} type="submit">
            Speichern
          </Button>
        </RecipeForm>
      </FormProvider>
    </>
  )
}

export default memo(EditView)
