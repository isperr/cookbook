import Rating from '@mui/material/Rating'

export type StarRatingProps = {
  isReadOnly: boolean
  value: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
}

const StarRating = ({isReadOnly, value}: StarRatingProps) => {
  return (
    <Rating
      name="rating"
      defaultValue={value}
      precision={0.5}
      readOnly={isReadOnly}
    />
  )
}

export default StarRating
