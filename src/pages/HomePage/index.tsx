import {useEffect, useRef} from 'react'
import {Typography} from '@mui/material'

import {useAuth} from '../../hooks/auth/use-auth'
import PageTemplate from '../../templates/Page'
import AppSpeedDial from '../../molecules/AppSpeedDial'
import {useLoadData} from './hooks/use-load-data'
import RecipeList from '../../molecules/RecipeList'

const HomePage = () => {
  const {username} = useAuth()

  const effectRan = useRef<boolean>(false)

  const {data, error, isLoaded, isLoading, handleLoadData} = useLoadData()

  useEffect(() => {
    if (!effectRan.current && !isLoaded) {
      handleLoadData()
    }

    return () => {
      effectRan.current = true
    }
  }, [isLoaded])

  return (
    <PageTemplate className="justify-start">
      <Typography className="text-center" variant="h5">
        Willkommen{username ? `, ${username}` : ''}
      </Typography>
      <AppSpeedDial />

      <RecipeList
        data={data}
        hasError={Boolean(error)}
        isLoaded={isLoaded}
        isLoading={isLoading}
      />
    </PageTemplate>
  )
}

export default HomePage
