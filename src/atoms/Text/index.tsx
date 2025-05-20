import {ReactNode, useMemo} from 'react'
import {Typography} from '@mui/material'

export type TextProps = {
  children: ReactNode
  className?: string
  type?: 'text' | 'subheading' | 'body'
}

const Text = ({children, className, type = 'text'}: TextProps) => {
  const color = useMemo(() => {
    if (type === 'subheading') {
      return 'primary'
    }
  }, [type])

  const fontWeight = useMemo(() => {
    if (type === 'subheading') {
      return 'bold'
    }
  }, [type])

  const variant = useMemo(() => {
    if (type === 'subheading') {
      return 'subtitle1'
    } else if (type === 'body') {
      return 'body2'
    }
  }, [type])

  return (
    <Typography
      className={className}
      color={color}
      fontWeight={fontWeight}
      variant={variant}
    >
      {children}
    </Typography>
  )
}

export default Text
