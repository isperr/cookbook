import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RecipeDocumentData} from '../types'
import {resolved} from '../resolve/slice'
import {removed, reset as resetRemove} from '../remove/slice'
import {edited} from '../edit/slice'
import {added} from '../add/slice'
import {orderBy} from 'lodash'

type RecipeResultsState = {
  entities: {
    [k: string]: RecipeDocumentData
  }
  error: Error | null
  isEditMode: boolean
  isLoaded: boolean
  isLoading: boolean
  result: Array<string>
}

// Define the initial state using that type
const initialState: RecipeResultsState = {
  entities: {},
  error: null,
  isEditMode: false,
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
      // extra case insensitive sorting
      const recipes = orderBy(action.payload, recipe =>
        recipe.title.toLowerCase()
      )
      const result: string[] = []

      state.entities = recipes.reduce((acc, item) => {
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
    toggleEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload
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
      .addCase(
        added,
        (
          state,
          action: PayloadAction<{
            data: RecipeDocumentData | undefined
            id: string
          }>
        ) => {
          const {data, id} = action.payload
          // add new recipe to entities if data is provided (so it can be correclty selected on RecipePage)
          if (data) {
            state.entities[id] = data

            // only update result if data isLoaded
            if (state.isLoaded) {
              const recipeEntities = [...state.result, id].map(recipeId => {
                if (recipeId === id) {
                  return data
                }
                return state.entities[recipeId]
              })

              state.result = orderBy(recipeEntities, recipe =>
                recipe.title.toLowerCase()
              ).map(recipe => recipe.id)
            }
          }
        }
      )
      .addCase(removed, (state, action: PayloadAction<string>) => {
        const removeId = action.payload

        state.result = state.result.filter(id => id !== removeId)
      })
      .addCase(resetRemove, (state, action: PayloadAction<string>) => {
        const removeId = action.payload

        state.entities = state.result.reduce((acc, itemId) => {
          const item = state.entities[itemId]
          if (removeId === item.id) {
            return acc
          }
          return {...acc, [item.id]: item}
        }, {})
      })
      .addCase(
        edited,
        (
          state,
          action: PayloadAction<{
            data: Partial<RecipeDocumentData>
            id: string
          }>
        ) => {
          const {data, id} = action.payload
          // add new recipe to entities if data is provided
          if (data) {
            const oldData = state.entities[id]
            state.entities[id] = {...oldData, ...data}
          }
        }
      )
      // and provide a default case if no other handlers matched
      .addDefaultCase(() => {})
  }
})

export const {load, loaded, loadingError, toggleEditMode} =
  recipeResultsState.actions

export default recipeResultsState.reducer
