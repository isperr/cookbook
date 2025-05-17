import {memo} from 'react'
import {Box, Skeleton, Stack} from '@mui/material'
import {random} from 'lodash'

export type LoadingProps = {
  type: 'list'
}

const Loading = ({type}: LoadingProps) => {
  if (type === 'list') {
    const amount = random(1, 10)
    return (
      <Box className="flex flex-col md:px-6 px-4 gap-2">
        {Array(amount)
          .fill(null)
          .map((_, oldIdx) => {
            const idx = oldIdx + 1

            return (
              <Stack spacing={0} key={`list-loading-${idx}`}>
                <Box className="flex justify-start items-center gap-2">
                  {idx % 3 !== 0 && idx % 5 !== 0 && (
                    <Skeleton
                      className="w-4/5"
                      variant="text"
                      sx={{fontSize: '1.5rem'}}
                    />
                  )}
                  {idx % 3 === 0 && (
                    <Skeleton
                      className="w-full"
                      variant="text"
                      sx={{fontSize: '1.5rem'}}
                    />
                  )}
                  {idx % 5 === 0 && (
                    <>
                      <Skeleton
                        className="w-2/3"
                        variant="text"
                        sx={{fontSize: '1.5rem'}}
                      />
                      <Skeleton className="size-5" variant="circular" />
                    </>
                  )}
                </Box>
                {idx % 3 === 0 && (
                  <Skeleton
                    className="w-1/2"
                    variant="text"
                    sx={{fontSize: '1.25rem'}}
                  />
                )}
                {idx % 2 === 0 && (
                  <Skeleton
                    className="w-3/4"
                    variant="text"
                    sx={{fontSize: '1.25rem'}}
                  />
                )}
                {idx % 2 !== 0 && idx % 3 !== 0 && (
                  <Skeleton variant="text" sx={{fontSize: '1.25rem'}} />
                )}
              </Stack>
            )
          })}
      </Box>
    )
  }

  return null
}

export default memo(Loading)
