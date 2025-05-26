import {RootState} from '../../../utils/store'

export const selectIsRemoved = (state: RootState) =>
  state.recipeRemove.isRemoved
export const selectIsRemoving = (state: RootState) =>
  state.recipeRemove.isRemoving
export const selectError = (state: RootState) => state.recipeRemove.error
