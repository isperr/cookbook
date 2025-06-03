import {memo} from 'react'
import {twMerge} from 'tailwind-merge'
import {
  List as ListComponent,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'

import Text from '../../Text'

export type ListProps = {
  data: Array<{text: string; amount: string | null}>
  isOrderedList: boolean
  isEditMode: boolean
}

const List = ({data, isEditMode, isOrderedList}: ListProps) => (
  <ListComponent className={twMerge(!isEditMode && 'pb-0')}>
    {data.map((item, idx) => (
      <ListItem key={item.text} className="gap-2 py-0" dense>
        <ListItemIcon
          className={twMerge(
            'justify-center min-w-fit',
            !isOrderedList && 'text-[8px]'
          )}
        >
          {isOrderedList ? (
            <Text type="body">{idx + 1}.</Text>
          ) : (
            <CircleIcon fontSize="inherit" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={[item.amount, item.text].filter(Boolean).join(' ')}
        />
      </ListItem>
    ))}
  </ListComponent>
)

export default memo(List)
