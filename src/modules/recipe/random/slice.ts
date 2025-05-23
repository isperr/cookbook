import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {RecipeDocumentData} from '../types'
import {insert, remove} from '../results/slice'

type RecipeRandomState = {
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
  result: Array<string>
}

// Define the initial state using that type
const initialState: RecipeRandomState = {
  error: null,
  isLoaded: false,
  isLoading: false,
  result: []
}

export const recipeRandomState = createSlice({
  name: 'recipeRandom',
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true
      state.isLoaded = false
      state.result = []
      state.error = null
    },
    loaded: (state, action: PayloadAction<string[]>) => {
      state.result = action.payload
      state.isLoaded = true
      state.isLoading = false
    },
    loadingError: (state, action: PayloadAction<Error>) => {
      state.isLoaded = false
      state.isLoading = false
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(insert, (state, action: PayloadAction<RecipeDocumentData>) => {
        const {id} = action.payload
        state.result.push(id)
      })
      .addCase(remove, (state, action: PayloadAction<string>) => {
        const id = action.payload
        state.result.filter(recipeId => recipeId !== id)
      })
      // and provide a default case if no other handlers matched
      .addDefaultCase(() => {})
  }
})

export const {load, loaded, loadingError} = recipeRandomState.actions

export default recipeRandomState.reducer
