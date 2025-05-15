import {Box, useScrollTrigger} from '@mui/material'
import {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'
import AppBar from '../../components/AppBar'

type PageTemplateProps = {
  children: ReactNode
  className?: string
}

const PageTemplate = ({children, className}: PageTemplateProps) => {
  const trigger = useScrollTrigger({
    threshold: 200
  })
  return (
    <>
      <AppBar />

      <Box
        className={twMerge(
          'flex flex-col my-4 justify-center h-screen gap-8',
          className,
          !trigger && 'mt-[56px]'
        )}
      >
        {children}
      </Box>
    </>
  )
}

export default PageTemplate
