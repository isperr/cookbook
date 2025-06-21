import {Fragment, memo} from 'react'
import {twMerge} from 'tailwind-merge'
import {
  List as ListComponent,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'

import Text from '../../Text'

export type ListProps = {
  sections: Array<{
    name: string | null
    data: Array<{text: string; amount: string | null}>
  }>
  isOrderedList: boolean
  isEditMode: boolean
  type: 'instructions' | 'ingredients'
}

const List = ({sections, isEditMode, isOrderedList, type}: ListProps) => (
  <>
    {sections.map(({data, name}) => (
      <Fragment key={`${type}-list-${name ?? 'default'}`}>
        {name && <Typography>{name}</Typography>}
        <ListComponent className={twMerge(!isEditMode && 'pb-0')}>
          {data.map((item, idx) => (
            <ListItem key={item.text} className="gap-2 py-0 items-start" dense>
              <ListItemIcon
                className={twMerge(
                  'justify-center min-w-fit my-1',
                  !isOrderedList && 'text-[8px]'
                )}
              >
                {isOrderedList ? (
                  <Text type="body">{idx + 1}.</Text>
                ) : (
                  <CircleIcon className="my-1.5" fontSize="inherit" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={[item.amount, item.text].filter(Boolean).join(' ')}
              />
            </ListItem>
          ))}
        </ListComponent>
      </Fragment>
    ))}
  </>
)

export default memo(List)
