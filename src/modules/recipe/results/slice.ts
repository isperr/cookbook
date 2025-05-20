import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RecipeDocumentData} from '../types'
import {resolved} from '../resolve/slice'

type RecipeResultsState = {
  entities: {
    [k: string]: RecipeDocumentData
  }
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
  result: Array<string>
}

// Define the initial state using that type
const initialState: RecipeResultsState = {
  entities: {},
  error: null,
  isLoaded: false,
  isLoading: false,
  result: []
}

export const recipeResultsState = createSlice({
  name: 'recipeResults',
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true
      state.isLoaded = false
      state.result = []
      state.error = null
    },
    loaded: (state, action: PayloadAction<RecipeDocumentData[]>) => {
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
    },
    insert: (state, action: PayloadAction<RecipeDocumentData>) => {
      // do not insert item if data is not loaded
      if (state.isLoaded) {
        // update result in state as sorted array by title
        const tempResult = [...state.result, action.payload.id].sort(
          (idA, idB) => {
            const itemA = state.entities[idA]
            const itemB = state.entities[idB]
            return itemA.title - itemB.title
          }
        )
        state.result = tempResult
        state.entities[action.payload.title] = action.payload
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const id = action.payload

      const updatedResult: string[] = []

      state.entities = state.result.reduce((acc, itemId) => {
        const item = state.entities[itemId]
        if (id === item.id) {
          return acc
        }
        updatedResult.push(item.id)
        return {...acc, [item.id]: item}
      }, {})
      state.result = updatedResult
    }
  },
  extraReducers: builder => {
    builder
      .addCase(
        resolved,
        (
          state,
          action: PayloadAction<{
            data: RecipeDocumentData | undefined
            id: string
          }>
        ) => {
          const {data, id} = action.payload
          // add new recipe to entities if data is provided
          if (data) {
            state.entities[id] = data
          }
        }
      )
      // and provide a default case if no other handlers matched
      .addDefaultCase(() => {})
  }
})

export const {load, loaded, loadingError, insert, remove} =
  recipeResultsState.actions

export default recipeResultsState.reducer
