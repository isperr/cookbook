import {memo} from 'react'
import {Grid, Skeleton, Typography} from '@mui/material'

import DoubleWrapper from '../../DetailText/components/DoubleWrapper'
import DetailTextLoading from '../../DetailText/components/DetailTextLoading'

const DetailLoading = () => (
  <Grid className="pb-6" container direction="column" spacing={1}>
    <Typography variant="h4">
      <Skeleton />
    </Typography>
    <DetailTextLoading type="ul-list" />
    <DetailTextLoading type="ol-list" />
    <DoubleWrapper>
      <DetailTextLoading type="rating" />
      <DetailTextLoading type="small" />
      <DetailTextLoading type="small" />
      <DetailTextLoading type="small" />
    </DoubleWrapper>
    <DetailTextLoading type="text" />
  </Grid>
)

export default memo(DetailLoading)
