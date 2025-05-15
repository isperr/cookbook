import {useCallback} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {doc, DocumentData, getDoc, getFirestore} from 'firebase/firestore'

import {
  selectIsLoading,
  selectIsLoggedIn,
  selectUsername,
  setValidUser
} from '../../modules/auth/slice'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'

const getUserName = (user?: DocumentData) => {
  if (!user) {
    return null
  }

  const {firstName, lastName, username} = user
  if (firstName || lastName) {
    return [firstName, lastName].filter(Boolean).join(' ')
  }

  return username ?? null
}

export const useAuth = () => {
  const auth = getAuth()
  const db = getFirestore()

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const username = useAppSelector(selectUsername)

  const onCheckUser = useCallback(async () => {
    await onAuthStateChanged(auth, async user => {
      if (user?.email) {
        const docRef = doc(db, 'users', user.email)
        const docSnap = await getDoc(docRef)
        const userDoc = docSnap.data()

        dispatch(setValidUser(getUserName(userDoc)))
      }
    })
  }, [dispatch])

  return {
    isLoading,
    isLoggedIn,
    onCheckUser,
    username
  }
}
