import {ReactNode, useMemo} from 'react'
import {Box} from '@mui/material'

import Text from '../Text'

export type DetailTextProps = {
  children?: ReactNode
  heading?: string
  text?: string
}

const DetailText = ({children, heading, text}: DetailTextProps) => {
  const textContent = useMemo(() => {
    if (text) {
      return <Text>{text}</Text>
    } else if (children) {
      return children
    }
  }, [children, text])

  return (
    <Box className="flex flex-col">
      <Text type="subheading">{heading}</Text>
      {textContent}
    </Box>
  )
}

export default DetailText
