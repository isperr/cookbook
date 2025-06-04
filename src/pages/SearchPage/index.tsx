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
    console.log(data)
    //await handleAdd(data)
    setExpanded(defaultSearchAccordionFields)
  }
  const onError: SubmitErrorHandler<SearchFormFields> = errors =>
    console.log(errors)

  return (
    <PageTemplate className="sm:px-6 px-4">
      <Typography className="text-center" variant="h5">
        Rezeptbuch durchsuchen
      </Typography>

      <FormProvider {...formMethods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit, onError)}>
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

          <Button
            className="mt-4"
            color="error"
            fullWidth
            isDisabled={!isDirty}
            onClick={onResetFilter}
            startIcon={<FilterAltOffIcon />}
          >
            Alle Filter zurücksetzen
          </Button>
          <Button
            className="mt-4"
            fullWidth
            isDisabled={!isDirty}
            type="submit"
          >
            Suchen
          </Button>
        </Box>
      </FormProvider>
    </PageTemplate>
  )
}

export default SearchPage
