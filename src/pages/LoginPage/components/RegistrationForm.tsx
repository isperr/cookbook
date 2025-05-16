import {TextField} from '@mui/material'

import Button from '../../../atoms/Button'
import {useRegistrationSubmit} from '../hooks/use-registration-submit'

import Form from './Form'

const RegistrationForm = () => {
  const {handleSubmit, isLoading} = useRegistrationSubmit()

  return (
    <form
      className="flex flex-col items-center px-6 py-2 gap-6"
      onSubmit={handleSubmit}
    >
      <TextField
        className="w-full"
        id="firstName"
        label="Vorname"
        type="text"
        variant="outlined"
      />
      <TextField
        className="w-full"
        id="lastName"
        label="Nachname"
        type="text"
        variant="outlined"
      />
      <TextField
        className="w-full"
        id="username"
        label="Username"
        type="text"
        variant="outlined"
        required
      />
      <Form />

      <Button ariaLabel="registration" isLoading={isLoading} type="submit">
        Registrieren
      </Button>
    </form>
  )
}

export default RegistrationForm
