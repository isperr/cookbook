import {useNavigate} from 'react-router'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import {Typography} from '@mui/material'

import SaveButtons from '../../atoms/SaveButtons'
import {useAddRecipe} from '../../hooks/recipe/use-add'
import {useScrollToTop} from '../../hooks/use-scroll-to-top'
import RecipeForm from '../../molecules/RecipeForm'
import {RecipeFormFields} from '../../molecules/RecipeForm/types'
import PageTemplate from '../../templates/Page'

const AddPage = () => {
  useScrollToTop()
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
      ingredientsAlt: [
        {
          data: [],
          name: null
        }
      ],
      instructionsAlt: [
        {
          data: [],
          name: null
        }
      ],
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
        <RecipeForm onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <SaveButtons
            isLoading={isDisabled}
            onCancel={navigateHome}
            type="add"
          />
        </RecipeForm>
      </FormProvider>
    </PageTemplate>
  )
}

export default AddPage
