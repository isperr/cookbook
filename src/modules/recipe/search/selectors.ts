import {RootState} from '../../../utils/store'

export const selectResult = (state: RootState) => state.recipeSearch.result
export const selectIsLoaded = (state: RootState) => state.recipeSearch.isLoaded
export const selectIsLoading = (state: RootState) =>
  state.recipeSearch.isLoading
export const selectError = (state: RootState) => state.recipeSearch.error
