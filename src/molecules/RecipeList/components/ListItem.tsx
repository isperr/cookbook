import {memo, useMemo} from 'react'
import {useNavigate} from 'react-router'
import {
  IconButton,
  ListItem as MuiListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

import {useRecipeWithCategoryName} from '../../../hooks/recipe-category/use-recipe-with-category-name'

const ListItem = ({id}: {id: string}) => {
  const {title, categoryName, isFavorite, isLowCarb} =
    useRecipeWithCategoryName(id, false)
  const secondary = useMemo(() => {
    if (isLowCarb) {
      return [categoryName, 'Low Carb'].join('; ')
    }
    return categoryName
  }, [categoryName, isLowCarb])

  const navigate = useNavigate()

  const onNavigateToRecipe = () => {
    navigate(`/recipes/${id}`)
  }

  return (
    <MuiListItem
      className="py-0 px-0"
      secondaryAction={
        <IconButton
          className="sm:-mr-0.5"
          color="primary"
          edge="end"
          aria-label="more"
          onClick={onNavigateToRecipe}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </IconButton>
      }
    >
      <ListItemButton
        className="sm:pl-6 pl-4 py-0 sm:pr-12 pr-0"
        onClick={onNavigateToRecipe}
      >
        <ListItemText
          primary={
            <span className="inline-flex items-center gap-1">
              {title}
              {isFavorite && <FavoriteIcon fontSize="small" color="error" />}
            </span>
          }
          secondary={secondary}
        />
      </ListItemButton>
    </MuiListItem>
  )
}

export default memo(ListItem)
