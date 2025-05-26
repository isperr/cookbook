import {useCallback} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {doc, getDoc, getFirestore} from 'firebase/firestore'
import {useNotifications} from '@toolpad/core'

import {setValidUser} from '../../modules/auth/slice'
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectName,
  selectHasLoggedIn,
  selectCanEdit
} from '../../modules/auth/selectors'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import {getToastConfig} from '../../utils/get-toast-config'

export const useAuth = () => {
  const auth = getAuth()
  const db = getFirestore()
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

  const hasLoggedIn = useAppSelector(selectHasLoggedIn)
  const isLoading = useAppSelector(selectIsLoading)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const name = useAppSelector(selectName)
  const canEdit = useAppSelector(selectCanEdit)

  const onCheckUser = useCallback(async () => {
    await onAuthStateChanged(auth, async user => {
      if (!user?.email) {
        // show error toast if auth check does not work directly after login
        if (hasLoggedIn) {
          notifications.show(
            'Beim Einloggen ist leider ein Fehler aufgetreten.',
            getToastConfig({})
          )
        }
        return
      }
      console.log('only here once')

      const docRef = doc(db, 'users', user.email)
      const docSnap = await getDoc(docRef)
      const userDoc = docSnap.data()
      console.log('loginUser', userDoc)

      if (userDoc) {
        dispatch(
          setValidUser({
            ...userDoc,
            canEdit: userDoc.canEdit,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            username: userDoc.username
          })
        )

        if (hasLoggedIn) {
          // show success toast if auth check worked directly after login
          notifications.show(
            'Du hast dich erfolgreich eingeloggt.',
            getToastConfig({severity: 'success'})
          )
        }
      }
    })
  }, [hasLoggedIn])

  return {
    canEdit,
    isLoading,
    isLoggedIn,
    onCheckUser,
    name
  }
}
