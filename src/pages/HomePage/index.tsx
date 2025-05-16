import {Typography} from '@mui/material'

import {useAuth} from '../../hooks/auth/use-auth'
import PageTemplate from '../../templates/Page'
import AppSpeedDial from '../../molecules/AppSpeedDial'

const HomePage = () => {
  const {username} = useAuth()

  return (
    <PageTemplate className="justify-start">
      <Typography className="text-center" variant="h5">
        Willkommen{username ? `, ${username}` : ''}
      </Typography>
      <AppSpeedDial />
    </PageTemplate>
  )
}

export default HomePage
