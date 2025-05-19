import {useEffect, useRef} from 'react'
import {Typography} from '@mui/material'

import {useAuth} from '../../hooks/auth/use-auth'
import PageTemplate from '../../templates/Page'
import {useLoadData} from './hooks/use-load-data'
import RecipeList from '../../molecules/RecipeList'

const HomePage = () => {
  const {username} = useAuth()

  const effectRan = useRef<boolean>(false)

  const {result, error, isLoaded, isLoading, handleLoadData} = useLoadData()

  useEffect(() => {
    if (!effectRan.current && !isLoaded) {
      handleLoadData()
    }

    return () => {
      effectRan.current = true
    }
  }, [isLoaded])

  return (
    <PageTemplate className="justify-start h-[200vh]">
      <Typography className="text-center" variant="h5">
        Willkommen{username ? `, ${username}` : ''}
      </Typography>

      <RecipeList
        hasError={Boolean(error)}
        isLoaded={isLoaded}
        isLoading={isLoading}
        result={result}
      />
    </PageTemplate>
  )
}

export default HomePage
