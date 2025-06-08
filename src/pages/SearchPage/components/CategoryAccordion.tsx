import {memo} from 'react'
import {useController, useFormContext} from 'react-hook-form'

import SearchAccordion from './SearchAccordion'
import {SearchFormFields} from '../types'
import CategorySelect from '../../../molecules/CategorySelect'
import {useAppSelector} from '../../../utils/store-hooks'
import {selectCatgeoryByOptionValue} from '../../../modules/recipe-category/results/selectors'

const CategoryAccordion = () => {
  const {control} = useFormContext<SearchFormFields>()
  const {
    field: {onBlur, onChange, disabled, ref, name, value}
  } = useController({
    name: 'category',
    control,
    rules: {required: false}
  })
  const activeFilter = useAppSelector(selectCatgeoryByOptionValue(value))

  return (
    <SearchAccordion
      activeFilter={activeFilter}
      field="category"
      heading="Kategorie"
      isResetDisabled={!value}
    >
      <CategorySelect
        ref={ref}
        className="sm:w-1/3 w-full"
        isDisabled={disabled}
        isRequired={false}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value ?? ''}
      />
    </SearchAccordion>
  )
}

export default memo(CategoryAccordion)
