import {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'
import {Box} from '@mui/material'

export type PageTemplateProps = {
  children: ReactNode
  className?: string
  isEmptyPage?: boolean
}

const Template = ({children, className, isEmptyPage}: PageTemplateProps) => (
  <Box
    className={twMerge(
      'flex flex-col my-6 justify-center gap-4',
      'absolute sm:top-[64px] top-[56px] w-full',
      isEmptyPage && 'md:h-[calc(100vh_-_64px)] h-[calc(100vh_-56px)] my-0',
      className
    )}
  >
    {children}
  </Box>
)

export default Template
