import Button from '../../../atoms/Button'
import {useLoginSubmit} from '../hooks/use-login-submit'

import Form from './Form'

const LoginForm = () => {
  const {isLoading, handleSubmit} = useLoginSubmit()

  return (
    <form
      className="flex flex-col items-center px-6 py-2 gap-6"
      onSubmit={handleSubmit}
    >
      <Form />

      <Button ariaLabel="login" isLoading={isLoading} type="submit">
        Einloggen
      </Button>
    </form>
  )
}

export default LoginForm
