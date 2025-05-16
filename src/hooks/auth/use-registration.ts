import {FirebaseError} from 'firebase/app'
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import {useNotifications} from '@toolpad/core/useNotifications'

import {
  register,
  registerFailure,
  registerSuccess,
  selectIsLoading
} from '../../modules/registration/slice'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import {getToastConfig} from '../../utils/get-toast-config'

import {AUTH_ERROR_CODES} from './error-codes'

export const useRegistration = () => {
  const notifications = useNotifications()
  const auth = getAuth()
  const db = getFirestore()

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)

  const createAccount = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    await createUserWithEmailAndPassword(auth, email, password).catch(error => {
      throw error
    })
  }

  const createUser = async ({
    email,
    firstName,
    lastName,
    username
  }: {
    email: string
    firstName?: string
    lastName?: string
    username: string
  }) => {
    await setDoc(doc(db, 'users', email), {
      canEdit: false,
      email,
      firstName,
      lastName,
      username
    }).catch(error => {
      throw error
    })
  }

  const onRegister = async ({
    email,
    firstName,
    lastName,
    password,
    username
  }: {
    email: string
    firstName?: string
    lastName?: string
    password: string
    username: string
  }) => {
    try {
      dispatch(register())

      await createAccount({email, password})
      await createUser({email, firstName, lastName, username})

      dispatch(registerSuccess())
      notifications.show(
        'Du hast dich erfolgreich registriert.',
        getToastConfig({severity: 'success'})
      )
    } catch (error) {
      let errorMsg =
        'Beim Erstellen des Kontos ist leider ein Fehler aufgetreten.'
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const msg = AUTH_ERROR_CODES[errorCode as keyof typeof AUTH_ERROR_CODES]
        if (msg) {
          errorMsg = msg
        }
      }

      dispatch(registerFailure())
      notifications.show(errorMsg, getToastConfig({}))
    }
  }

  return {isLoading, onRegister}
}
