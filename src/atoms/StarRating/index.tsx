import Rating from '@mui/material/Rating'
import {memo} from 'react'

export type StarRatingNumbers = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
export type StarRatingDefaultValue = StarRatingNumbers | undefined
export type StarRatingValue = StarRatingNumbers | null

export type StarRatingProps = {
  defaultValue?: StarRatingDefaultValue
  isDisabled: boolean
  isReadOnly: boolean
  onChange?: (newValue: StarRatingValue) => void
  name: string
  ratingColor?: string
  ratingColorHover?: string
  value?: StarRatingValue
}

const StarRating = ({
  defaultValue,
  isDisabled,
  isReadOnly,
  name,
  onChange,
  ratingColor,
  ratingColorHover,
  value
}: StarRatingProps) => (
  <Rating
    defaultValue={defaultValue}
    disabled={isDisabled}
    id={name}
    name={name}
    onChange={(__, newValue) => {
      onChange?.(newValue as StarRatingValue)
    }}
    precision={0.5}
    readOnly={isReadOnly}
    value={value || null}
    size={isReadOnly ? 'medium' : 'large'}
    sx={{
      ...(ratingColor && {
        '& .MuiRating-iconFilled': {
          color: ratingColor
        }
      }),
      ...(ratingColorHover && {
        '& .MuiRating-iconHover': {
          color: ratingColorHover
        }
      })
    }}
  />
)

export default memo(StarRating)
