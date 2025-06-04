import {useState} from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import {Box, Typography} from '@mui/material'

import Button from '../../atoms/Button'
import PageTemplate from '../../templates/Page'

import BooleanToggleAccordion from './components/BooleanToggleAccordion'
import {
  defaultSearchAccordionFields,
  defaultSearchFormFieldsValues,
  SearchAccordionFields,
  SearchFormFields
} from './types'

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
    formState: {isDirty}
  } = formMethods

  const onSubmit: SubmitHandler<SearchFormFields> = async data => {
    if (!isDirty) {
      console.log('no change my dude')
      return
    }
    console.log(data)
    //await handleAdd(data)
  }
  const onError: SubmitErrorHandler<SearchFormFields> = errors =>
    console.log(errors)

  return (
    <PageTemplate className="sm:px-6 px-4">
      <Typography className="text-center" variant="h5">
        Rezeptbuch durchsuchen
      </Typography>

      <FormProvider {...formMethods}>
        <Box
          component="form"
          onSubmit={formMethods.handleSubmit(onSubmit, onError)}
        >
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
