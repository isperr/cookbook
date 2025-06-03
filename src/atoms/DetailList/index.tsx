import {memo, useMemo} from 'react'

import DetailText from '../DetailText'
import Text from '../Text'
import List, {ListProps} from './components/List'

export type DetailListProps = Pick<ListProps, 'data' | 'isOrderedList'> & {
  heading: string
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
        <List data={data} isEditMode={false} isOrderedList={isOrderedList} />
      )}
      {!hasData && <Text>{noDataText}</Text>}
    </DetailText>
  )
}

export default memo(DetailList)
