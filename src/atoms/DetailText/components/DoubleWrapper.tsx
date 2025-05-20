import {ReactNode} from 'react'
import {Box} from '@mui/material'

const DoubleWrapper = ({children}: {children: ReactNode}) => (
  <Box className="grid xs:grid-cols-2 grid-cols-1 gap-y-2">{children}</Box>
)

export default DoubleWrapper
