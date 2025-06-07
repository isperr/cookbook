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
import {twMerge} from 'tailwind-merge'

const ListItem = ({
  id,
  showSecondary
}: {
  id: string
  showSecondary: boolean
}) => {
  const {title, categoryName, isFavorite, isLowCarb} =
    useRecipeWithCategoryName(id)
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
      disablePadding
      secondaryAction={
        <IconButton
          className={twMerge(
            showSecondary && 'sm:right-2.5',
            !showSecondary && 'sm:right-2.5 right-0.5'
          )}
          color="primary"
          edge="end"
          aria-label="more"
          onClick={onNavigateToRecipe}
        >
          <ArrowCircleRightIcon fontSize={showSecondary ? 'large' : 'medium'} />
        </IconButton>
      }
    >
      <ListItemButton
        className={twMerge(
          showSecondary && 'sm:pl-6 pl-4 py-0',
          !showSecondary && 'sm:px-6 px-4 py-1',
          'sm:pr-12 pr-0'
        )}
        onClick={onNavigateToRecipe}
      >
        <ListItemText
          primary={
            <span className="inline-flex items-center gap-1">
              {title}
              {isFavorite && <FavoriteIcon fontSize="small" color="error" />}
            </span>
          }
          secondary={showSecondary ? secondary : null}
        />
      </ListItemButton>
    </MuiListItem>
  )
}

export default memo(ListItem)
