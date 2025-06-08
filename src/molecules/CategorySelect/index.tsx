import React, {ChangeEvent, forwardRef, memo, ReactNode} from 'react'
import {FormControl, MenuItem, Select} from '@mui/material'

import {selectRecipeCategoryOptions} from '../../modules/recipe-category/results/selectors'
import {useAppSelector} from '../../utils/store-hooks'

export type CategorySelectProps = {
  className?: string
  isDisabled?: boolean
  isRequired: boolean
  name: string
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onChange?: (
    event:
      | ChangeEvent<Omit<HTMLInputElement, 'value'> & {value: string}>
      | (Event & {target: {value: string; name: string}}),
    child: ReactNode
  ) => void
  value: string
}

const CategorySelect = forwardRef<
  React.Ref<HTMLInputElement | HTMLTextAreaElement>,
  CategorySelectProps
>(({className, isDisabled, isRequired, name, onBlur, onChange, value}, ref) => {
  const options = useAppSelector(selectRecipeCategoryOptions)

  return (
    <FormControl className={className} id="category-form" required={isRequired}>
      <Select
        disabled={isDisabled}
        displayEmpty
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        size="small"
        renderValue={(selected?: string) => {
          if (!selected) {
            return <em>Kategorie auswählen</em>
          }

          return (
            <>{options.find(opt => opt.value === selected.toString())?.name}</>
          )
        }}
        value={value}
      >
        {options.map(opt => (
          <MenuItem value={opt.value}>{opt.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
})

export default memo(CategorySelect)
