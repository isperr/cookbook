import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {useNotifications} from '@toolpad/core/useNotifications'

import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess
} from '../../modules/auth/slice'
import {useAppDispatch} from '../../utils/store-hooks'
import {getToastConfig} from '../../utils/get-toast-config'

export const useLogin = () => {
  const notifications = useNotifications()
  const auth = getAuth()

  const dispatch = useAppDispatch()

  const onLogin = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    try {
      dispatch(login())
      await signInWithEmailAndPassword(auth, email, password)
      dispatch(loginSuccess())
      notifications.show(
        'Du hast dich erfolgreich eingeloggt.',
        getToastConfig({severity: 'success'})
      )
    } catch (error) {
      dispatch(loginFailure())
      notifications.show(
        'Email und Passwort stimmen leider nicht überein.',
        getToastConfig({})
      )
    }
  }

  const onLogout = async () => {
    try {
      dispatch(logout())
      await signOut(auth)
      dispatch(logoutSuccess())
      notifications.show(
        'Du hast dich erfolgreich ausgeloggt.',
        getToastConfig({severity: 'success'})
      )
    } catch (error) {
      dispatch(logoutFailure())
      notifications.show(
        'Beim Logout ist leider etwas schiefgelaufen.',
        getToastConfig({})
      )
    }
  }

  return {onLogin, onLogout}
}
