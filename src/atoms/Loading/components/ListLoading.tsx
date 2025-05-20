import {memo} from 'react'
import {random} from 'lodash'
import {Box, Grid, Skeleton} from '@mui/material'

const ListLoading = () => {
  const amount = random(1, 10)

  return (
    <Box className="flex flex-col md:px-6 px-4 gap-2">
      {Array(amount)
        .fill(null)
        .map((_, oldIdx) => {
          const idx = oldIdx + 1

          return (
            <Grid
              container
              direction="row"
              spacing={2}
              alignItems="center"
              key={`list-loading-${idx}`}
            >
              <Grid container direction="column" size="grow" spacing={0.5}>
                <Box className="flex justify-start items-center gap-4">
                  {idx % 3 !== 0 && idx % 5 !== 0 && (
                    <Skeleton
                      className="w-4/5"
                      variant="text"
                      sx={{fontSize: '18px'}}
                    />
                  )}
                  {idx % 3 === 0 && (
                    <Skeleton
                      className="w-full"
                      variant="text"
                      sx={{fontSize: '18px'}}
                    />
                  )}
                  {idx % 5 === 0 && (
                    <>
                      <Skeleton
                        className="w-2/3"
                        variant="text"
                        sx={{fontSize: '18px'}}
                      />
                      <Skeleton className="size-5" variant="circular" />
                    </>
                  )}
                </Box>
                {idx % 3 === 0 && (
                  <Skeleton
                    className="w-1/2"
                    variant="text"
                    sx={{fontSize: '16px'}}
                  />
                )}
                {idx % 2 === 0 && (
                  <Skeleton
                    className="w-3/4"
                    variant="text"
                    sx={{fontSize: '16px'}}
                  />
                )}
                {idx % 2 !== 0 && idx % 3 !== 0 && (
                  <Skeleton variant="text" sx={{fontSize: '16px'}} />
                )}
              </Grid>
              <Grid size="auto">
                <Skeleton className="size-9" variant="circular" />
              </Grid>
            </Grid>
          )
        })}
    </Box>
  )
}

export default memo(ListLoading)
