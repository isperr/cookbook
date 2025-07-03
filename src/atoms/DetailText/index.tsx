import {ReactNode, useMemo} from 'react'
import {Box} from '@mui/material'

import Text from '../Text'
import {twMerge} from 'tailwind-merge'

export type DetailTextProps = {
  children?: ReactNode
  className?: string
  heading?: string
  isEditMode?: boolean
  text?: string
}

const DetailText = ({
  children,
  className,
  heading,
  isEditMode = false,
  text
}: DetailTextProps) => {
  const textContent = useMemo(() => {
    if (text) {
      return <Text className="whitespace-pre">{text}</Text>
    } else if (children) {
      return children
    }
  }, [children, text])

  return (
    <Box className={twMerge('flex flex-col', className)}>
      <Text type={isEditMode ? 'label' : 'subheading'}>{heading}</Text>
      {textContent}
    </Box>
  )
}

export default DetailText
