import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {RecipeDocumentData} from '../types'

type RecipeEditState = {
  error: null | Error
  isEdited: boolean
  isEditing: boolean
}

// Define the initial state using that type
const initialState: RecipeEditState = {
  error: null,
  isEdited: false,
  isEditing: false
}

export const recipeEditState = createSlice({
  name: 'recipeEdit',
  initialState,
  reducers: {
    edit: state => {
      state.isEdited = false
      state.isEditing = true
      state.error = null
    },
    edited: (
      state,
      // @ts-ignore
      action: PayloadAction<{data: Partial<RecipeDocumentData>; id: string}>
    ) => {
      state.isEdited = true
      state.isEditing = false
    },
    editingError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
      state.isEdited = false
      state.isEditing = false
    },
    reset: state => {
      state.error = null
      state.isEdited = false
      state.isEditing = false
    }
  }
})

export const {edit, edited, editingError, reset} = recipeEditState.actions

export default recipeEditState.reducer
