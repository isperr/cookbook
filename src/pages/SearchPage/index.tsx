import {useState} from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import {Box, Typography} from '@mui/material'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

import Button from '../../atoms/Button'
import PageTemplate from '../../templates/Page'

import BooleanToggleAccordion from './components/BooleanToggleAccordion'
import {
  defaultSearchAccordionFields,
  defaultSearchFormFieldsValues,
  SearchAccordionFields,
  SearchFormFields
} from './types'
import DurationAccordion from './components/DurationAccordion'
import TitleField from './components/TitleField'
import RatingAccordion from './components/RatingAccordion'
import CategoryAccordion from './components/CategoryAccordion'
import {QueryFieldFilterConstraint, where} from 'firebase/firestore'
import {loadRecipes} from '../../hooks/recipe/use-load'
import {isBoolean} from 'lodash'

const SearchPage = () => {
  const [expanded, setExpanded] = useState<SearchAccordionFields>(
    defaultSearchAccordionFields
  )

  const onChange = (
    searchField: keyof SearchAccordionFields,
    isExpanded: boolean
  ) => {
    setExpanded(prevState => ({
      ...prevState,
      [searchField]: isExpanded
    }))
  }

  const formMethods = useForm<SearchFormFields>({
    defaultValues: defaultSearchFormFieldsValues,
    mode: 'onChange'
  })
  const {
    formState: {isDirty},
    handleSubmit,
    reset
  } = formMethods
  const onResetFilter = () => {
    reset()
    setExpanded(defaultSearchAccordionFields)
  }

  const onSubmit: SubmitHandler<SearchFormFields> = async data => {
    if (!isDirty) {
      console.log('no change my dude')
      return
    }
    const filter: QueryFieldFilterConstraint[] = []
    Object.entries(data).forEach(([key, value]) => {
      if (value || isBoolean(value)) {
        filter.push(where(key, '==', value))
      }
    })
    console.log({data, filter})
    //await handleAdd(data)
    const recipes = await loadRecipes(filter)
    console.log('RECIPEs', recipes)
    setExpanded(defaultSearchAccordionFields)
  }
  const onError: SubmitErrorHandler<SearchFormFields> = errors =>
    console.log(errors)

  return (
    <PageTemplate className="sm:px-6 px-4">
      <Typography className="text-center" variant="h5">
        Kochbuch durchsuchen
      </Typography>

      <FormProvider {...formMethods}>
        <Box
          className="flex flex-col gap-4"
          component="form"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <TitleField />
          <div>
            <BooleanToggleAccordion
              field="isFavorite"
              isExpanded={expanded.isFavorite}
              onAccordionToggle={onChange}
            />
            <BooleanToggleAccordion
              field="isLowCarb"
              isExpanded={expanded.isLowCarb}
              onAccordionToggle={onChange}
            />
            <DurationAccordion
              isExpanded={expanded.duration}
              onAccordionToggle={onChange}
            />
            <RatingAccordion
              isExpanded={expanded.rating}
              onAccordionToggle={onChange}
            />
            <CategoryAccordion
              isExpanded={expanded.category}
              onAccordionToggle={onChange}
            />
          </div>

          <Button
            color="error"
            fullWidth
            isDisabled={!isDirty}
            onClick={onResetFilter}
            startIcon={<FilterAltOffIcon />}
          >
            Alle Filter zurücksetzen
          </Button>
          <Button fullWidth isDisabled={!isDirty} type="submit">
            Suchen
          </Button>
        </Box>
      </FormProvider>
    </PageTemplate>
  )
}

export default SearchPage
