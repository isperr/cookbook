import {useCallback} from 'react'
import {useNotifications} from '@toolpad/core'

import {loadRecipes} from '../../../hooks/recipe/use-load'
import {
  selectResult,
  selectError,
  selectIsLoaded,
  selectIsLoading
} from '../../../modules/recipe/results/selectors'
import {load, loaded, loadingError} from '../../../modules/recipe/results/slice'
import {getToastConfig} from '../../../utils/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

export const useLoadData = () => {
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

  const result = useAppSelector(selectResult)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const handleLoadData = useCallback(async () => {
    try {
      dispatch(load())
      const data = await loadRecipes([])
      dispatch(loaded(data))
    } catch (error) {
      dispatch(loadingError(error as Error))
      notifications.show(
        'Beim Laden der Liste ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }, [dispatch])

  return {
    error,
    isLoaded,
    isLoading,
    handleLoadData,
    result
  }
}
