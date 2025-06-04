import React, {ReactNode, useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import {twMerge} from 'tailwind-merge'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

import {ThemeModeContext} from '../../../context'
import {
  defaultSearchFormFieldsValues,
  SearchAccordionFields,
  SearchFormFields
} from '../types'

export type SearchAccordionProps = {
  activeFilter?: string
  children: ReactNode
  field: keyof SearchAccordionFields
  heading: string
  isExpanded: boolean
  isResetDisabled: boolean
  onAccordionToggle: (
    searchField: keyof SearchAccordionFields,
    isExpanded: boolean
  ) => void
}

const SearchAccordion = ({
  activeFilter,
  children,
  field,
  heading,
  isExpanded,
  isResetDisabled,
  onAccordionToggle
}: SearchAccordionProps) => {
  const isFilterApplied = useMemo(() => Boolean(activeFilter), [activeFilter])

  const themeModeContext = React.useContext(ThemeModeContext)
  const isDarkMode = useMemo(
    () => themeModeContext.themeMode === 'dark',
    [themeModeContext.themeMode]
  )

  const {resetField} = useFormContext<SearchFormFields>()
  const onResetFilter = () => {
    resetField(field, {defaultValue: defaultSearchFormFieldsValues[field]})
  }

  const onChange = (__: React.SyntheticEvent, isExpanded: boolean) => {
    onAccordionToggle(field, isExpanded)
  }

  return (
    <Accordion expanded={isExpanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="span" sx={{width: '33%', flexShrink: 0}}>
          {heading}
        </Typography>
        <Typography
          className={twMerge(
            isFilterApplied && 'text-green',
            !isFilterApplied && isDarkMode && 'text-text-dark-secondary',
            !isFilterApplied && !isDarkMode && 'text-text-light-secondary'
          )}
          component="span"
        >
          {isFilterApplied ? activeFilter : 'Inaktiv'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="flex justify-start">
        {children}
        <IconButton
          aria-label={`reset ${field} filter`}
          color="secondary"
          edge="end"
          disabled={isResetDisabled}
          onClick={onResetFilter}
        >
          <FilterAltOffIcon />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  )
}

export default SearchAccordion
