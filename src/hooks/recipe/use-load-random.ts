import {useCallback} from 'react'
import {collection, getDocs, getFirestore, query} from 'firebase/firestore'
import {random} from 'lodash'

import {
  selectHasError,
  selectIsLoaded,
  selectIsLoading,
  selectResult
} from '../../modules/recipe/random/selectors'
import {load, loaded, loadingError} from '../../modules/recipe/random/slice'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'

const handleLoadData = async () => {
  const db = getFirestore()

  const recipesCollectionRef = collection(db, 'recipes')
  const recipeQuery = await query(recipesCollectionRef)
  const snapshot = await getDocs(recipeQuery).catch(error => {
    // error must be handled within component where this util is used
    throw error
  })

  const ids: Array<string> = []
  snapshot.forEach(doc => {
    ids.push(doc.id)
  })

  return ids
}

export const useLoadRandom = () => {
  const dispatch = useAppDispatch()

  const result = useAppSelector(selectResult)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)
  const hasError = useAppSelector(selectHasError)

  const onLoad = useCallback(async () => {
    try {
      dispatch(load())
      const ids = await handleLoadData()
      dispatch(loaded(ids))
    } catch (error) {
      dispatch(loadingError(error as Error))
    }
  }, [dispatch])

  const getRandomRecipeId = useCallback(
    (excludeId: string | null) => {
      if (excludeId) {
        const filteredResult = result.filter(id => id !== excludeId)
        const randomIdx = random(0, filteredResult.length - 1)
        return filteredResult[randomIdx]
      }
      const randomIdx = random(0, result.length - 1)
      return result[randomIdx]
    },
    [result]
  )

  return {
    hasError,
    getRandomRecipeId,
    isLoaded,
    isLoading,
    onLoad
  }
}
