import {createSelector} from '@reduxjs/toolkit'
import {RootState} from '../../../utils/store'

export const selectResult = (state: RootState) => state.recipeRandom.result
export const selectIsLoaded = (state: RootState) => state.recipeRandom.isLoaded
export const selectIsLoading = (state: RootState) =>
  state.recipeRandom.isLoading
export const selectError = (state: RootState) => state.recipeRandom.error
export const selectHasError = createSelector(selectError, error =>
  Boolean(error)
)
