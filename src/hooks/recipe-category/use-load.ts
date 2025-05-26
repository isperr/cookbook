import {useCallback, useEffect, useRef} from 'react'
import {collection, getDocs, getFirestore, query} from 'firebase/firestore'

import {
  selectHasError,
  selectIsLoaded,
  selectIsLoading,
  selectResult
} from '../../modules/recipe-category/results/selectors'
import {
  load,
  loaded,
  loadingError
} from '../../modules/recipe-category/results/slice'
import {RecipeCategory} from '../../modules/recipe-category/types'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'

const handleLoadData = async () => {
  const db = getFirestore()

  const recipesCollectionRef = collection(db, 'recipe-categories')
  const recipeQuery = await query(recipesCollectionRef)
  const snapshot = await getDocs(recipeQuery).catch(error => {
    // error must be handled within component where this util is used
    throw error
  })

  const data: Array<RecipeCategory> = []
  snapshot.forEach(doc => {
    const docData = doc.data()
    data.push({
      id: docData.id,
      name: docData.name,
      parentCategory: docData.parentCategory
    })
  })

  return data
}

export const useLoadRecipeCategories = (shouldLoad: boolean) => {
  const dispatch = useAppDispatch()
  const effectRan = useRef<boolean>(false)

  const result = useAppSelector(selectResult)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)
  const hasError = useAppSelector(selectHasError)

  const onLoad = useCallback(async () => {
    try {
      dispatch(load())
      const data = await handleLoadData()
      dispatch(loaded(data))
    } catch (error) {
      dispatch(loadingError(error as Error))
    }
  }, [dispatch])

  useEffect(() => {
    if (shouldLoad && !effectRan.current && !isLoaded) {
      onLoad()
    }

    return () => {
      effectRan.current = true
    }
  }, [isLoaded, shouldLoad])

  return {
    hasError,
    isLoaded,
    isLoading,
    onLoad,
    result
  }
}
