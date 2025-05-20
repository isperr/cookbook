import {useMemo} from 'react'
import {twMerge} from 'tailwind-merge'
import {List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'

import DetailText from '../DetailText'
import Text from '../Text'

export type DetailListProps = {
  data: Array<string>
  heading: string
  isOrderedList: boolean
  noDataText: string
}

const DetailList = ({
  data,
  heading,
  isOrderedList,
  noDataText
}: DetailListProps) => {
  const hasData = useMemo(() => Boolean(data.length), [data.length])

  return (
    <DetailText heading={heading}>
      {hasData && (
        <List className="pb-0">
          {data.map((item, idx) => (
            <ListItem key={item} className="gap-2 py-0" dense>
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
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      )}
      {!hasData && <Text>{noDataText}</Text>}
    </DetailText>
  )
}

export default DetailList
