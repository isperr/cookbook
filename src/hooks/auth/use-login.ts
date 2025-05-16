import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {useNotifications} from '@toolpad/core/useNotifications'

import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  selectIsLoading
} from '../../modules/auth/slice'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import {getToastConfig} from '../../utils/get-toast-config'
import {FirebaseError} from 'firebase/app'
import {AUTH_ERROR_CODES} from './error-codes'

export const useLogin = () => {
  const notifications = useNotifications()
  const auth = getAuth()

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)

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
      let errorMsg = 'Beim Einloggen ist leider ein Fehler aufgetreten.'
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        console.log(errorCode)
        const msg = AUTH_ERROR_CODES[errorCode as keyof typeof AUTH_ERROR_CODES]
        if (msg) {
          errorMsg = msg
        }
      }

      dispatch(loginFailure())
      notifications.show(errorMsg, getToastConfig({}))
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

  return {isLoading, onLogin, onLogout}
}
