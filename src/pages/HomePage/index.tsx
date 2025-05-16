import {Typography} from '@mui/material'

import {useAuth} from '../../hooks/auth/use-auth'
import PageTemplate from '../../templates/Page'

const HomePage = () => {
  const {username} = useAuth()

  return (
    <PageTemplate className="justify-start h-[200vh]">
      <Typography>Willkommen{username ? `, ${username}` : ''}</Typography>

      <div className="h-1/2 bg-primary-dark">test</div>
    </PageTemplate>
  )
}

export default HomePage
