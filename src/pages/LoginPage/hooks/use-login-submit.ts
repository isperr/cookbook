import {useLogin} from '../../../hooks/auth/use-login'

export const useLoginSubmit = () => {
  const {isLoading, onLogin} = useLogin()

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      email: {value: string}
      password: {value: string}
    }

    await onLogin({
      email: formElements.email.value,
      password: formElements.password.value
    })
  }

  return {isLoading, handleSubmit}
}
