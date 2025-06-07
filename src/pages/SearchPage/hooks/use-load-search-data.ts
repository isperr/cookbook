import {useCallback, useEffect} from 'react'
import {useNotifications} from '@toolpad/core'

import {loadRecipes} from '../../../hooks/recipe/use-load'
import {
  selectResult,
  selectError,
  selectIsLoaded,
  selectIsLoading
} from '../../../modules/recipe/search/selectors'
import {
  load,
  loaded,
  loadingError,
  reset
} from '../../../modules/recipe/search/slice'
import {getToastConfig} from '../../../utils/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {QueryFieldFilterConstraint} from 'firebase/firestore'

export const useLoadSearchData = () => {
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

  const result = useAppSelector(selectResult)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const handleLoadData = useCallback(
    async (filter: QueryFieldFilterConstraint[], resetExpanded: () => void) => {
      try {
        dispatch(load())
        resetExpanded()
        const data = await loadRecipes(filter)
        dispatch(loaded(data))
      } catch (error) {
        dispatch(loadingError(error as Error))
        notifications.show(
          'Beim Suchen ist leider ein Fehler aufgetreten.',
          getToastConfig({})
        )
      }
    },
    [dispatch]
  )

  const handleReset = useCallback(() => {
    if (isLoaded || error) {
      dispatch(reset())
    }
  }, [error, isLoaded, dispatch])

  useEffect(() => {
    return () => {
      handleReset()
    }
  }, [])

  return {
    hasError: Boolean(error),
    isLoaded,
    isLoading,
    handleLoadData,
    handleReset,
    result
  }
}
