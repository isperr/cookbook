import {memo} from 'react'
import {random} from 'lodash'
import {twMerge} from 'tailwind-merge'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton
} from '@mui/material'

import Text from '../../Text'

export type DetailTextLoadingProps = {
  type: 'small' | 'rating' | 'ul-list' | 'ol-list' | 'text'
}

const DetailTextLoading = ({type}: DetailTextLoadingProps) => {
  const amount = random(3, 7)
  const isList = type === 'ol-list' || type === 'ul-list'

  return (
    <Box className="flex flex-col">
      <Text type="subheading">
        <Skeleton
          className={twMerge(
            (type === 'small' || type === 'rating') && 'w-2/3',
            (isList || type === 'text') && 'w-2/5'
          )}
        />
      </Text>
      {!isList && (
        <Text>
          <Skeleton
            className={twMerge(
              type === 'small' && 'w-1/2',
              type === 'rating' && 'w-3/4'
            )}
          />
          {type === 'text' && (
            <>
              <Skeleton />
              <Skeleton className="w-1/2" />
            </>
          )}
        </Text>
      )}
      {isList && (
        <List className="pb-0">
          {Array(amount)
            .fill(null)
            .map((__, idx) => {
              const id = idx + 1
              return (
                <ListItem key={`${type}-${id}`} className="gap-2 py-0" dense>
                  <ListItemIcon className={twMerge('justify-center min-w-fit')}>
                    <Skeleton
                      className={twMerge(
                        type === 'ul-list' && 'size-2',
                        type === 'ol-list' && 'size-3.5'
                      )}
                      variant={type === 'ul-list' ? 'circular' : 'rounded'}
                    />
                  </ListItemIcon>
                  <ListItemText className="w-1/2" primary={<Skeleton />} />
                </ListItem>
              )
            })}
        </List>
      )}
    </Box>
  )
}

export default memo(DetailTextLoading)
