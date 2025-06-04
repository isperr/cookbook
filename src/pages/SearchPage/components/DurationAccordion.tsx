import {memo} from 'react'
import {useController, useFormContext} from 'react-hook-form'

import Component from '../../../atoms/DurationToggle/components/Component'
import {recipeDurations} from '../../../modules/recipe/types'

import {SearchFormFields} from '../types'
import SearchAccordion, {SearchAccordionProps} from './SearchAccordion'

export type DurationAccordionProps = Pick<
  SearchAccordionProps,
  'isExpanded' | 'onAccordionToggle'
> & {}

const DurationAccordion = ({
  isExpanded,
  onAccordionToggle
}: DurationAccordionProps) => {
  const {control} = useFormContext<SearchFormFields>()
  const {
    field: {onBlur, onChange, disabled, ref, value}
  } = useController({
    name: 'duration',
    control,
    rules: {required: false}
  })

  return (
    <SearchAccordion
      activeFilter={value ? recipeDurations[value] : undefined}
      field="duration"
      heading="Dauer"
      isExpanded={isExpanded}
      isResetDisabled={!value}
      onAccordionToggle={onAccordionToggle}
    >
      <Component
        ref={ref}
        disabled={disabled}
        isSearch
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
    </SearchAccordion>
  )
}

export default memo(DurationAccordion)
