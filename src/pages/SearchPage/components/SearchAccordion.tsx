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

import {useThemeModeContext} from '../../../context'
import {
  defaultSearchFormFieldsValues,
  SearchAccordionFields,
  SearchFormFields
} from '../types'
import {useSearchPageContext} from '../context'

export type SearchAccordionProps = {
  activeFilter?: string | ReactNode
  children: ReactNode
  field: keyof SearchAccordionFields
  heading: string
  isResetDisabled: boolean
}

const SearchAccordion = ({
  activeFilter,
  children,
  field,
  heading,
  isResetDisabled
}: SearchAccordionProps) => {
  const {expanded, setExpanded} = useSearchPageContext()
  const isExpanded = useMemo(() => expanded[field], [expanded, field])

  const isFilterApplied = useMemo(() => Boolean(activeFilter), [activeFilter])

  const {themeMode} = useThemeModeContext()
  const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode])

  const {resetField} = useFormContext<SearchFormFields>()
  const onResetFilter = () => {
    resetField(field, {defaultValue: defaultSearchFormFieldsValues[field]})
  }

  const onChange = (__: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(prevState => ({
      ...prevState,
      [field]: isExpanded
    }))
  }

  return (
    <Accordion
      expanded={isExpanded}
      disableGutters
      onChange={onChange}
      sx={{
        borderTop: '1px solid',
        '&:first-of-type': {
          borderTop: 0
        },
        '&::before': {
          display: 'none'
        }
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="span" sx={{width: '33%', flexShrink: 0}}>
          {heading}
        </Typography>
        <Typography
          className={twMerge(
            'flex',
            isFilterApplied && 'text-green',
            !isFilterApplied && isDarkMode && 'text-text-dark-secondary',
            !isFilterApplied && !isDarkMode && 'text-text-light-secondary'
          )}
          component="span"
        >
          {isFilterApplied ? activeFilter : 'Inaktiv'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="flex justify-between">
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
