import {useCallback, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import {isBoolean} from 'lodash'
import {useNotifications} from '@toolpad/core'

import {
  selectIsAdded,
  selectIsAdding,
  selectError
} from '../../modules/recipe/add/selectors'
import {add, added, addingError, reset} from '../../modules/recipe/add/slice'
import {RecipeFormFields} from '../../molecules/RecipeForm/types'
import {getToastConfig} from '../../utils/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'

import {resolveRecipe} from './use-resolve'

export const useAddRecipe = () => {
  const navigate = useNavigate()
  const notifications = useNotifications()
  const dispatch = useAppDispatch()
  const db = getFirestore()

  const isAdded = useAppSelector(selectIsAdded)
  const isAdding = useAppSelector(selectIsAdding)
  const error = useAppSelector(selectError)

  const onAdd = async (draft: RecipeFormFields) => {
    const formattedDraft = Object.keys(draft).reduce((acc, key) => {
      const field = draft[key as keyof RecipeFormFields]

      if (isBoolean(field)) {
        return {...acc, [key]: field}
      }

      return {...acc, [key]: field || null}
    }, {})

    const docRef = await addDoc(collection(db, 'recipes'), formattedDraft)
    const id = docRef.id

    const data = await resolveRecipe(id)
    return {data, id}
  }

  const handleAdd = useCallback(
    async (draft: RecipeFormFields) => {
      try {
        dispatch(add())
        const {data, id} = await onAdd(draft)
        dispatch(added({data, id}))
        notifications.show(
          `Das Rezept wurde erfolgreich hinzugefügt. Du wirst gleich auf die Rezept-Seite weitergeleitet.`,
          getToastConfig({autoHideDuration: 3000, severity: 'success'})
        )
        setTimeout(() => {
          // navigate to recipe-page after toast was shown
          navigate(`/recipes/${id}`)
        }, 3100)
      } catch (error) {
        dispatch(addingError(error as Error))
        notifications.show(
          `Beim Hinzufügen des Rezepts ist leider ein Fehler aufgetreten.`,
          getToastConfig({})
        )
      }
    },
    [db, dispatch]
  )

  useEffect(() => {
    return () => {
      if (isAdded) {
        dispatch(reset())
      }
    }
  }, [isAdded])

  return {
    handleAdd,
    hasAddingError: Boolean(error),
    isAdded,
    isAdding
  }
}
