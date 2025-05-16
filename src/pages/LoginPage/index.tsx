import {useEffect, useState} from 'react'
import {Box, Typography} from '@mui/material'

import Button from '../../atoms/Button'
import {useAuth} from '../../hooks/auth/use-auth'

import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

const LoginPage = () => {
  const {onCheckUser} = useAuth()

  const [isRegistration, setIsRegistration] = useState<boolean>(false)

  const handleClick = () => {
    setIsRegistration(prevState => !prevState)
  }

  useEffect(() => {
    onCheckUser()
  }, [])

  return (
    <Box className="flex flex-col justify-center h-screen gap-2">
      <Typography className="text-center" variant="h5">
        Sperr's Rezeptbuch
      </Typography>

      {!isRegistration && <LoginForm />}
      {isRegistration && <RegistrationForm />}

      <Button className="w-fit mx-auto" onClick={handleClick} variant="text">
        {isRegistration ? 'Zurück zum Login' : 'Noch kein Account?'}
      </Button>
    </Box>
  )
}

export default LoginPage
