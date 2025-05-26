import {useCallback} from 'react'
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import {useNotifications} from '@toolpad/core'

import {
  selectIsEdited,
  selectIsEditing,
  selectError
} from '../../modules/recipe/edit/selectors'
import {
  edit,
  edited,
  editingError,
  reset
} from '../../modules/recipe/edit/slice'
import {RecipeDocumentData} from '../../modules/recipe/types'
import {getToastConfig} from '../../utils/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import {useToggleEditMode} from '../../pages/RecipePage/hooks/use-toggle-edit-mode'

import {scrollToTop} from '../use-scroll-to-top'

export const useEditRecipe = () => {
  const notifications = useNotifications()
  const dispatch = useAppDispatch()
  const db = getFirestore()

  const isEdited = useAppSelector(selectIsEdited)
  const isEditing = useAppSelector(selectIsEditing)
  const error = useAppSelector(selectError)

  const {leaveEditMode} = useToggleEditMode()

  const handleEdit = useCallback(
    async ({data, id}: {data: Partial<RecipeDocumentData>; id: string}) => {
      try {
        const ref = doc(db, 'recipes', id)

        dispatch(edit())
        await setDoc(ref, data, {merge: true})
        dispatch(edited({data, id}))
        notifications.show(
          `Das Rezept wurde erfolgreich bearbeitet.`,
          getToastConfig({autoHideDuration: 3000, severity: 'success'})
        )
        leaveEditMode()
        scrollToTop()
        dispatch(reset())
      } catch (error) {
        dispatch(editingError(error as Error))
        notifications.show(
          `Beim Bearbeiten des Rezepts ist leider ein Fehler aufgetreten.`,
          getToastConfig({})
        )
      }
    },
    [db, dispatch, leaveEditMode]
  )

  return {
    handleEdit,
    hasEditingError: Boolean(error),
    isEdited,
    isEditing
  }
}
