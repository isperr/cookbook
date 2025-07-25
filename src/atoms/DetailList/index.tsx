import {memo, useMemo} from 'react'

import DetailText from '../DetailText'
import Text from '../Text'
import List, {ListProps} from './components/List'

export type DetailListProps = Pick<
  ListProps,
  'isOrderedList' | 'sections' | 'type'
> & {
  heading: string
  noDataText: string
}

const DetailList = ({
  heading,
  isOrderedList,
  noDataText,
  sections,
  type
}: DetailListProps) => {
  const hasData = useMemo(() => {
    if (sections.length > 1) {
      return true
    }
    return Boolean(sections[0].data.length)
  }, [sections])

  return (
    <DetailText heading={heading}>
      {hasData && (
        <List
          sections={sections}
          isEditMode={false}
          isOrderedList={isOrderedList}
          type={type}
        />
      )}
      {!hasData && <Text>{noDataText}</Text>}
    </DetailText>
  )
}

export default memo(DetailList)
