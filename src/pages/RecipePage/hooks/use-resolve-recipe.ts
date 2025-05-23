import {useCallback} from 'react'
import {useNotifications} from '@toolpad/core'

import {resolveRecipe} from '../../../hooks/recipe/use-resolve'
import {
  selectHasResolveError,
  selectIsResolved,
  selectIsResolving,
  selectRecipe
} from '../../../modules/recipe/resolve/selectors'
import {
  resolve,
  resolved,
  resolvingError
} from '../../../modules/recipe/resolve/slice'
import {getToastConfig} from '../../../utils/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

export const useResolveRecipe = (id?: string) => {
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

  const recipe = useAppSelector(selectRecipe(id))
  const isResolved = useAppSelector(selectIsResolved(id))
  const isResolving = useAppSelector(selectIsResolving(id))
  const hasResolveError = useAppSelector(selectHasResolveError(id))

  const handleResolveRecipe = useCallback(async (recipeId: string) => {
    try {
      dispatch(resolve(recipeId))
      const data = await resolveRecipe(recipeId)
      dispatch(resolved({data, id: recipeId}))
    } catch (error) {
      dispatch(resolvingError({error: error as Error, id: recipeId}))
      notifications.show(
        'Beim Laden des Rezepts ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }, [])

  return {
    hasResolveError,
    isResolved,
    isResolving,
    handleResolveRecipe,
    recipe
  }
}
