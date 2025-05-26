import {memo} from 'react'

import ListLoading from './components/ListLoading'
import DetailLoading from './components/DetailLoading'

export type LoadingProps = {
  type: 'list' | 'detail'
}

const Loading = ({type}: LoadingProps) => {
  if (type === 'list') {
    return <ListLoading />
  }

  if (type === 'detail') {
    return <DetailLoading />
  }

  return null
}

export default memo(Loading)
