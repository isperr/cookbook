import {Box, useScrollTrigger} from '@mui/material'
import {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'
import AppBar from '../../molecules/AppBar'

type PageTemplateProps = {
  children: ReactNode
  className?: string
}

const PageTemplate = ({children, className}: PageTemplateProps) => {
  const trigger = useScrollTrigger({
    threshold: 150
  })

  return (
    <>
      <AppBar />

      <Box
        className={twMerge(
          'flex flex-col my-6 justify-center gap-4',
          className,
          !trigger && 'absolute sm:top-[64px] top-[56px] w-full'
        )}
      >
        {children}
      </Box>
    </>
  )
}

export default PageTemplate
