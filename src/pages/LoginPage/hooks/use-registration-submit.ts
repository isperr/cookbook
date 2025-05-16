import {useRegistration} from '../../../hooks/auth/use-registration'

export const useRegistrationSubmit = () => {
  const {onRegister} = useRegistration()

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      email: {value: string}
      firstName: {value?: string}
      lastName: {value?: string}
      password: {value: string}
      username: {value: string}
    }

    await onRegister({
      email: formElements.email.value,
      firstName: formElements.firstName.value,
      lastName: formElements.lastName.value,
      password: formElements.password.value,
      username: formElements.username.value
    })
  }

  return {handleSubmit, isLoading: false}
}
