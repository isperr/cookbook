import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {RecipeDocumentData} from '../types'

type RecipeAddState = {
  error: null | Error
  isAdded: boolean
  isAdding: boolean
}

// Define the initial state using that type
const initialState: RecipeAddState = {
  error: null,
  isAdded: false,
  isAdding: false
}

export const recipeAddState = createSlice({
  name: 'recipeAdd',
  initialState,
  reducers: {
    add: state => {
      state.isAdded = false
      state.isAdding = true
      state.error = null
    },
    added: (
      state,
      // @ts-ignore
      action: PayloadAction<{data: RecipeDocumentData | undefined; id: string}>
    ) => {
      state.isAdded = true
      state.isAdding = false
    },
    addingError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
      state.isAdded = false
      state.isAdding = false
    },
    reset: state => {
      state.error = null
      state.isAdded = false
      state.isAdding = false
    }
  }
})

export const {add, added, addingError, reset} = recipeAddState.actions

export default recipeAddState.reducer
