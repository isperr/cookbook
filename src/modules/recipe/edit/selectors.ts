import {RootState} from '../../../utils/store'

export const selectIsEdited = (state: RootState) => state.recipeEdit.isEdited
export const selectIsEditing = (state: RootState) => state.recipeEdit.isEditing
export const selectError = (state: RootState) => state.recipeEdit.error
