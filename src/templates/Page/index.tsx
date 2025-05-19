import {Box} from '@mui/material'
import {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

type PageTemplateProps = {
  children: ReactNode
  className?: string
}

const PageTemplate = ({children, className}: PageTemplateProps) => {
  return (
    <>
      <Box
        className={twMerge(
          'flex flex-col my-6 justify-center gap-4',
          'absolute sm:top-[64px] top-[56px] w-full',
          className
        )}
      >
        {children}
      </Box>
    </>
  )
}

export default PageTemplate
