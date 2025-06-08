import {memo, useMemo} from 'react'
import {useController, useFormContext} from 'react-hook-form'

import {SearchFormFields} from '../types'
import SearchAccordion from './SearchAccordion'
import StarRating from '../../../atoms/StarRating'
import {themeColors} from '../../../../theme'

const RatingAccordion = () => {
  const {control} = useFormContext<SearchFormFields>()
  const {
    field: {onChange, disabled, value}
  } = useController({
    name: 'rating',
    control,
    rules: {required: false}
  })
  const activeFilter = useMemo(() => {
    if (value) {
      return (
        <StarRating
          defaultValue={undefined}
          isDisabled={false}
          isReadOnly
          name="rating"
          value={value}
          ratingColor={themeColors.green.DEFAULT}
          ratingColorHover={themeColors.green.light}
        />
      )
    }
  }, [value])

  return (
    <SearchAccordion
      activeFilter={activeFilter}
      field="rating"
      heading="Bewertung"
      isResetDisabled={!value}
    >
      <StarRating
        defaultValue={undefined}
        isDisabled={Boolean(disabled)}
        isReadOnly={false}
        onChange={onChange}
        name="rating"
        value={value ?? null}
      />
    </SearchAccordion>
  )
}

export default memo(RatingAccordion)
