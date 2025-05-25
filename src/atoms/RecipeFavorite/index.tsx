import {memo} from 'react'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export type FavoriteRatingProps = {
  value: boolean
}

const RecipeFavorite = ({value: initialValue}: FavoriteRatingProps) => (
  <Rating
    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
    icon={<FavoriteIcon className="text-red" fontSize="inherit" />}
    id="favorite"
    max={1}
    name="favorite"
    precision={1}
    readOnly
    size="medium"
    value={initialValue ? 1 : null}
  />
)

export default memo(RecipeFavorite)
