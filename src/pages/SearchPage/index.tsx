import {useRef, useState} from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import {QueryFieldFilterConstraint, where} from 'firebase/firestore'
import {isBoolean} from 'lodash'
import {Box, Typography} from '@mui/material'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

import Button from '../../atoms/Button'
import RecipeList from '../../molecules/RecipeList'
import PageTemplate from '../../templates/Page'

import BooleanToggleAccordion from './components/BooleanToggleAccordion'
import CategoryAccordion from './components/CategoryAccordion'
import DurationAccordion from './components/DurationAccordion'
import RatingAccordion from './components/RatingAccordion'
import TitleField from './components/TitleField'
import {useLoadSearchData} from './hooks/use-load-search-data'
import {
  defaultSearchAccordionFields,
  defaultSearchFormFieldsValues,
  SearchAccordionFields,
  SearchFormFields
} from './types'
import {SearchPageContext} from './context'

const SearchPage = () => {
  const {hasError, isLoaded, isLoading, result, handleLoadData} =
    useLoadSearchData()
  const listWrapperRef = useRef<HTMLDivElement>(null)

  const [expanded, setExpanded] = useState<SearchAccordionFields>(
    defaultSearchAccordionFields
  )
  const resetExpanded = () => {
    setExpanded(defaultSearchAccordionFields)
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
    resetExpanded()
  }

  const onSubmit: SubmitHandler<SearchFormFields> = async data => {
    if (!isDirty) {
      // do nothing
      return
    }

    const filter: QueryFieldFilterConstraint[] = []
    Object.entries(data).forEach(([key, value]) => {
      if (value || isBoolean(value)) {
        filter.push(where(key, '==', value))
      }
    })

    listWrapperRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
    await handleLoadData(filter, resetExpanded)
  }
  const onError: SubmitErrorHandler<SearchFormFields> = errors =>
    console.log(errors)

  return (
    <SearchPageContext.Provider value={{expanded, setExpanded}}>
      <PageTemplate className="sm:px-6 px-4 pb-6">
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
              <BooleanToggleAccordion field="isFavorite" />
              <CategoryAccordion />
              <DurationAccordion />
              <RatingAccordion />
              <BooleanToggleAccordion field="isLowCarb" />
            </div>

            <Button
              color="error"
              fullWidth
              isDisabled={!isDirty}
              onClick={onResetFilter}
              startIcon={<FilterAltOffIcon />}
              variant="outlined"
            >
              Alle Filter zurücksetzen
            </Button>
            <Button fullWidth isDisabled={!isDirty} type="submit">
              Suchen
            </Button>
          </Box>
        </FormProvider>

        <div ref={listWrapperRef}>
          <RecipeList
            hasError={hasError}
            isLoaded={isLoaded}
            isLoading={isLoading}
            result={result}
            showSecondary={false}
          />
        </div>
      </PageTemplate>
    </SearchPageContext.Provider>
  )
}

export default SearchPage
