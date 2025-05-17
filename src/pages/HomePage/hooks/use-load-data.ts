import {useCallback} from 'react'
import {useNotifications} from '@toolpad/core'

import {loadRecipes} from '../../../hooks/recipe/use-load'
import {
  selectData,
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

  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const handleLoadData = useCallback(async () => {
    try {
      dispatch(load())
      setTimeout(async () => {
        const data = await loadRecipes()
        dispatch(loaded(data))
      }, 1500)
    } catch (error) {
      dispatch(loadingError(error as Error))
      notifications.show(
        'Beim Laden der Liste ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }, [dispatch])

  return {
    data,
    error,
    isLoaded,
    isLoading,
    handleLoadData
  }
}
