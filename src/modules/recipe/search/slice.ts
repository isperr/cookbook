import {orderBy} from 'lodash'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {RecipeDocumentData} from '../types'

type RecipeSearchState = {
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
  result: Array<string>
}

// Define the initial state using that type
const initialState: RecipeSearchState = {
  error: null,
  isLoaded: false,
  isLoading: false,
  result: []
}

export const recipeSearchState = createSlice({
  name: 'recipeSearch',
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true
      state.isLoaded = false
      state.result = []
      state.error = null
    },
    loaded: (state, action: PayloadAction<RecipeDocumentData[]>) => {
      // extra case insensitive sorting
      const result = orderBy(action.payload, recipe =>
        recipe.title.toLowerCase()
      ).map(recipe => recipe.id)

      state.result = result
      state.isLoaded = true
      state.isLoading = false
    },
    loadingError: (state, action: PayloadAction<Error>) => {
      state.isLoaded = false
      state.isLoading = false
      state.error = action.payload
    },
    reset: state => {
      state.error = null
      state.isLoaded = false
      state.isLoading = false
      state.result = []
    }
  }
})

export const {load, loaded, loadingError, reset} = recipeSearchState.actions

export default recipeSearchState.reducer
