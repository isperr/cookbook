import {memo, useMemo} from 'react'
import {useController, useFormContext} from 'react-hook-form'
import {isBoolean, isUndefined} from 'lodash'
import {twMerge} from 'tailwind-merge'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import SearchAccordion from './SearchAccordion'
import {SearchFormFields} from '../types'

export type BooleanToggleAccordionProps = {
  field: keyof Pick<SearchFormFields, 'isFavorite' | 'isLowCarb'>
}

const BooleanToggleAccordion = ({field}: BooleanToggleAccordionProps) => {
  const isFavorite = useMemo(() => field === 'isFavorite', [field])
  const heading = useMemo(
    () => (isFavorite ? 'Favorit' : 'Low Carb'),
    [isFavorite]
  )

  const {control} = useFormContext<SearchFormFields>()
  const {
    field: {onBlur, onChange, disabled, ref, value: isChecked}
  } = useController({
    name: field,
    control,
    rules: {required: false}
  })
  const activeFilter = useMemo(() => {
    if (isBoolean(isChecked)) {
      return isChecked ? 'Ja' : 'Nein'
    }
  }, [isChecked])

  return (
    <SearchAccordion
      activeFilter={activeFilter}
      field={field}
      heading={heading}
      isResetDisabled={isUndefined(isChecked)}
    >
      <ToggleButtonGroup
        className="w-full"
        color="secondary"
        disabled={disabled}
        value={isChecked}
        exclusive
        onBlur={onBlur}
        onChange={(__, newValue) => {
          if (newValue !== null) {
            onChange(newValue === 'true')
          }
        }}
        aria-label={field}
        size="small"
        ref={ref}
      >
        <ToggleButton
          className={twMerge(
            isChecked && 'border-secondary-light text-secondary'
          )}
          fullWidth
          value="true"
          aria-label="true"
        >
          {!isFavorite && <CheckIcon fontSize="small" />}
          {isFavorite && isChecked && <FavoriteIcon fontSize="small" />}
          {isFavorite && !isChecked && <FavoriteBorderIcon fontSize="small" />}
        </ToggleButton>
        <ToggleButton
          className={twMerge(
            isChecked === false && 'border-secondary-light text-secondary'
          )}
          fullWidth
          value="false"
          aria-label="false"
        >
          <CloseIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </SearchAccordion>
  )
}

export default memo(BooleanToggleAccordion)
