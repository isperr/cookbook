import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DocumentData} from 'firebase/firestore'

export type RecipeDocumentData = DocumentData & {
  id: string
}

type RecipeResultsState = {
  data: RecipeDocumentData[]
  entities: {
    [k: string]: RecipeDocumentData
  }
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
}

// Define the initial state using that type
const initialState: RecipeResultsState = {
  data: [],
  entities: {},
  error: null,
  isLoaded: false,
  isLoading: false
}

export const recipeResultsState = createSlice({
  name: 'recipeResults',
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true
      state.isLoaded = false
      state.data = []
      state.error = null
    },
    loaded: (state, action: PayloadAction<RecipeDocumentData[]>) => {
      state.data = action.payload

      state.entities = action.payload.reduce((acc, item) => {
        return {...acc, [item.id]: item}
      }, {})

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
        const tempData = [...state.data, action.payload]
        // update data in state as sorted array by title
        state.data = tempData.sort((itemA, itemB) => itemA.title - itemB.title)
        state.entities[action.payload.title] = action.payload
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const id = action.payload

      const updatedData: RecipeDocumentData[] = []

      state.entities = state.data.reduce((acc, item) => {
        if (id === item.id) {
          return acc
        }
        updatedData.push(item)
        return {...acc, [item.id]: item}
      }, {})
      state.data = updatedData
    }
  }
})

export const {load, loaded, loadingError, insert, remove} =
  recipeResultsState.actions

export default recipeResultsState.reducer
