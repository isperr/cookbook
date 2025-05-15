import {useEffect, useState} from 'react'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import Button from '../../atoms/Button'
import {useAuth} from '../../hooks/auth/use-auth'
import {useLogin} from '../../hooks/auth/use-login'

const LoginPage = () => {
  const {isLoading, onCheckUser} = useAuth()
  const {onLogin} = useLogin()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      email: {value: string}
      password: {value: string}
    }

    onLogin({
      email: formElements.email.value,
      password: formElements.password.value
    })
  }

  useEffect(() => {
    onCheckUser()
  }, [])

  return (
    <Box className="flex flex-col my-4 justify-center h-screen gap-8">
      <Typography variant="h5">Sperr's Rezeptbuch</Typography>

      <form
        className="flex flex-col items-center p-6 gap-6"
        onSubmit={handleSubmit}
      >
        <TextField
          className="w-full"
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          required
        />
        <FormControl className="w-full">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Passwort"
            type={showPassword ? 'text' : 'password'}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button ariaLabel="login" isLoading={isLoading} type="submit">
          Einloggen
        </Button>
      </form>
    </Box>
  )
}

export default LoginPage
