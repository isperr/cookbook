import {memo} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {Box} from '@mui/material'

import DetailText from '../../../atoms/DetailText'
import StarRating, {StarRatingValue} from '../../../atoms/StarRating'
import {RecipeFormFields} from '../../../molecules/RecipeForm/types'

const RatingDetail = () => {
  const {control} = useFormContext<RecipeFormFields>()

  return (
    <DetailText heading="Bewertung" isEditMode>
      <Box className="h-[43.28px] flex items-center">
        <Controller
          control={control}
          name="rating"
          render={({field: {onChange, value, name, disabled}}) => (
            <StarRating
              defaultValue={undefined}
              isDisabled={Boolean(disabled)}
              isReadOnly={false}
              onChange={onChange}
              name={name}
              value={value as StarRatingValue}
            />
          )}
        />
      </Box>
    </DetailText>
  )
}

export default memo(RatingDetail)
