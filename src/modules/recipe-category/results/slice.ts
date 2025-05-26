import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {RecipeCategory} from '../types'

type RecipeCategoryResultsState = {
  entities: {
    [k: string]: RecipeCategory
  }
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
  result: Array<string>
}

// Define the initial state using that type
const initialState: RecipeCategoryResultsState = {
  entities: {},
  error: null,
  isLoaded: false,
  isLoading: false,
  result: []
}

export const recipeCategoryResultsState = createSlice({
  name: 'recipeCategoryResults',
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true
      state.isLoaded = false
      state.result = []
      state.error = null
    },
    loaded: (state, action: PayloadAction<RecipeCategory[]>) => {
      const result: string[] = []

      state.entities = action.payload.reduce((acc, item) => {
        result.push(item.id)
        return {...acc, [item.id]: item}
      }, {})

      state.result = result
      state.isLoaded = true
      state.isLoading = false
    },
    loadingError: (state, action: PayloadAction<Error>) => {
      state.isLoaded = false
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const {load, loaded, loadingError} = recipeCategoryResultsState.actions

export default recipeCategoryResultsState.reducer
