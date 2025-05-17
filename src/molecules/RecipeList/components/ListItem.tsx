import {memo} from 'react'
import {
  IconButton,
  ListItem as MuiListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

export type ListItemProps = {
  category: string
  id: string
  isFavorite: boolean
  title: string
}

const ListItem = ({category, isFavorite, title}: ListItemProps) => {
  return (
    <MuiListItem
      className="py-0 px-0"
      secondaryAction={
        <IconButton
          className="sm:-mr-0.5"
          color="primary"
          edge="end"
          aria-label="more"
        >
          <ArrowCircleRightIcon fontSize="large" />
        </IconButton>
      }
    >
      <ListItemButton className="sm:pl-6 pl-4 py-0 sm:pr-12 pr-0">
        <ListItemText
          primary={
            <span className="inline-flex items-center gap-1">
              {title}
              {isFavorite && <FavoriteIcon fontSize="small" color="error" />}
            </span>
          }
          secondary={category}
        />
      </ListItemButton>
    </MuiListItem>
  )
}

export default memo(ListItem)
