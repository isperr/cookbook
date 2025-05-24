import {useCallback, useEffect} from 'react'
import {deleteDoc, doc, getFirestore} from 'firebase/firestore'
import {useNotifications} from '@toolpad/core'

import {
  selectIsRemoved,
  selectIsRemoving,
  selectError
} from '../../modules/recipe/remove/selectors'
import {
  remove,
  removed,
  removingError,
  reset
} from '../../modules/recipe/remove/slice'
import {getToastConfig} from '../../utils/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import {useNavigate} from 'react-router'

export const useRemoveRecipe = () => {
  const notifications = useNotifications()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const db = getFirestore()

  const isRemoved = useAppSelector(selectIsRemoved)
  const isRemoving = useAppSelector(selectIsRemoving)
  const error = useAppSelector(selectError)

  const handleRemove = useCallback(
    async ({closeDialog, id}: {closeDialog: () => void; id: string}) => {
      try {
        dispatch(remove())
        await deleteDoc(doc(db, 'recipes', id))
        navigate('/')
        dispatch(removed(id))
        notifications.show(
          `Das Rezept wurde erfolgreich gelöscht.`,
          getToastConfig({autoHideDuration: 3000, severity: 'success'})
        )
        closeDialog()
      } catch (error) {
        dispatch(removingError(error as Error))
        notifications.show(
          `Beim Löschen des Rezepts ist leider ein Fehler aufgetreten.`,
          getToastConfig({})
        )
      }
    },
    [db, dispatch]
  )

  useEffect(() => {
    return () => {
      // only reset if data was actually deleted
      if (isRemoved) {
        dispatch(reset())
      }
    }
  }, [isRemoved])

  return {
    handleRemove,
    hasRemovingError: Boolean(error),
    isRemoved,
    isRemoving
  }
}
