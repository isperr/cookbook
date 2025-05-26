import {RootState} from '../../../utils/store'

export const selectIsAdded = (state: RootState) => state.recipeAdd.isAdded
export const selectIsAdding = (state: RootState) => state.recipeAdd.isAdding
export const selectError = (state: RootState) => state.recipeAdd.error
