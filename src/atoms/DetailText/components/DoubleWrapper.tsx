import {ReactNode} from 'react'
import {Box} from '@mui/material'
import {twMerge} from 'tailwind-merge'

const DoubleWrapper = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => (
  <Box
    className={twMerge(
      'grid md:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-4',
      className
    )}
  >
    {children}
  </Box>
)

export default DoubleWrapper
