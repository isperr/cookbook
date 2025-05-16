import {useEffect, useState} from 'react'
import {Paper, Typography} from '@mui/material'

import Button from '../../atoms/Button'
import {useAuth} from '../../hooks/auth/use-auth'

import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import {twMerge} from 'tailwind-merge'
import Background from '../../atoms/Background'

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
    <Background>
      <Paper
        className={twMerge(
          'flex flex-col justify-center h-fit lg:w-1/2 sm:w-2/3 w-full',
          'sm:py-8 py-4 sm:mx-auto mx-4 gap-2 bg-none relative'
        )}
      >
        <Typography className="text-center" variant="h5">
          Sperr's Rezeptbuch
        </Typography>

        {!isRegistration && <LoginForm />}
        {isRegistration && <RegistrationForm />}

        <Button className="w-fit mx-auto" onClick={handleClick} variant="text">
          {isRegistration ? 'Zurück zum Login' : 'Noch kein Account?'}
        </Button>
      </Paper>
    </Background>
  )
}

export default LoginPage
