import {ReactNode} from 'react'
import {Typography} from '@mui/material'
import {twMerge} from 'tailwind-merge'

export type TextProps = {
  children: ReactNode
  className?: string
}

const Text = ({children, className}: TextProps) => (
  <Typography className={twMerge('md:px-6 px-4', className)}>
    {children}
  </Typography>
)

export default Text
