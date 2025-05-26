import {useNavigate} from 'react-router'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import {Typography} from '@mui/material'

import Button from '../../atoms/Button'
import {useAddRecipe} from '../../hooks/recipe/use-add'
import {RecipeFormFields} from '../../molecules/RecipeForm/types'
import RecipeForm from '../../molecules/RecipeForm'
import PageTemplate from '../../templates/Page'

const AddPage = () => {
  const navigate = useNavigate()
  const navigateHome = () => {
    navigate('/')
  }

  const {isAdded, isAdding, handleAdd} = useAddRecipe()
  const isDisabled = isAdded || isAdding

  const methods = useForm<RecipeFormFields>({
    defaultValues: {
      category: '',
      details: '',
      duration: 'unknown',
      ingredients: [],
      instructions: [],
      isFavorite: false,
      isLowCarb: false,
      rating: null,
      title: ''
    },
    disabled: isDisabled,
    mode: 'onChange'
  })
  const {
    formState: {isDirty}
  } = methods

  const onSubmit: SubmitHandler<RecipeFormFields> = async data => {
    if (!isDirty) {
      navigateHome()
      return
    }
    await handleAdd(data)
  }
  const onError: SubmitErrorHandler<RecipeFormFields> = errors =>
    console.log(errors)

  return (
    <PageTemplate className="sm:px-6 px-4">
      <Typography variant="h5">Neues Rezept hinzufügen</Typography>
      <FormProvider {...methods}>
        <RecipeForm
          isAddMode
          onSubmit={methods.handleSubmit(onSubmit, onError)}
        >
          <Button
            fullWidth
            isDisabled={isDisabled}
            onClick={navigateHome}
            variant="outlined"
          >
            Abbrechen
          </Button>
          <Button fullWidth isLoading={isDisabled} type="submit">
            Hinzufügen
          </Button>
        </RecipeForm>
      </FormProvider>
    </PageTemplate>
  )
}

export default AddPage
