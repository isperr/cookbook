import {memo, useMemo} from 'react'
import {useController, useFormContext} from 'react-hook-form'
import {isNull, isUndefined} from 'lodash'

import StarRating from '../../../atoms/StarRating'
import {themeColors} from '../../../../theme'

import {SearchFormFields} from '../types'
import SearchAccordion from './SearchAccordion'

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
    // show active filter if rating=null but hide if rating=undefined
    if (value || isNull(value)) {
      return (
        <StarRating
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
      // disable filter-reset if rating=undefined (but allow rating=null or rating=(0-5))
      isResetDisabled={isUndefined(value)}
    >
      <StarRating
        isDisabled={Boolean(disabled)}
        isReadOnly={false}
        onChange={onChange}
        name="rating"
        value={value}
      />
    </SearchAccordion>
  )
}

export default memo(RatingAccordion)
