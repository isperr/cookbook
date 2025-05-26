import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type RecipeRemoveState = {
  error: null | Error
  isRemoved: boolean
  isRemoving: boolean
}

// Define the initial state using that type
const initialState: RecipeRemoveState = {
  error: null,
  isRemoved: false,
  isRemoving: false
}

export const recipeRemoveState = createSlice({
  name: 'recipeRemove',
  initialState,
  reducers: {
    remove: state => {
      state.isRemoved = false
      state.isRemoving = true
      state.error = null
    },
    // @ts-ignore
    removed: (state, action: PayloadAction<string>) => {
      state.isRemoved = true
      state.isRemoving = false
    },
    removingError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
      state.isRemoved = false
      state.isRemoving = false
    },
    // @ts-ignore
    reset: (state, action: PayloadAction<string>) => {
      state.error = null
      state.isRemoved = false
      state.isRemoving = false
    }
  }
})

export const {remove, removed, removingError, reset} = recipeRemoveState.actions

export default recipeRemoveState.reducer
