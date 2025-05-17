import {RootState} from '../../../utils/store'

export const selectData = (state: RootState) => state.recipeResults.data
export const selectEntities = (state: RootState) => state.recipeResults.entities
export const selectIsLoaded = (state: RootState) => state.recipeResults.isLoaded
export const selectIsLoading = (state: RootState) =>
  state.recipeResults.isLoading
export const selectError = (state: RootState) => state.recipeResults.error
