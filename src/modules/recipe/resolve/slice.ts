import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RecipeDocumentData} from '../types'
import {loaded} from '../results/slice'
import {uniq} from 'lodash'

type RecipeResolveState = {
  resolvedIds: Array<string>
  resolvingIds: Array<string>
  resolvingError: {
    [k: string]: Error | null
  }
}

// Define the initial state using that type
const initialState: RecipeResolveState = {
  resolvedIds: [],
  resolvingIds: [],
  resolvingError: {}
}

export const recipeResolveState = createSlice({
  name: 'recipeResolve',
  initialState,
  reducers: {
    resolve: (state, action: PayloadAction<string>) => {
      const id = action.payload

      // remove id from resolved array in case it gets loaded again
      const resolvedIdx = state.resolvedIds.indexOf(id)
      if (resolvedIdx !== -1) {
        state.resolvedIds.splice(resolvedIdx, 1)
      }
      // add id to resolving array if it is not included yet
      if (!state.resolvingIds.includes(id)) {
        state.resolvingIds.push(id)
      }
    },
    resolved: (
      state,
      action: PayloadAction<{
        data: RecipeDocumentData | undefined
        id: string
      }>
    ) => {
      const {id} = action.payload

      // add id to resolved array
      if (!state.resolvedIds.includes(id)) {
        state.resolvedIds.push(id)
      }
      // remove id from resolving array
      const resolvingIdx = state.resolvingIds.indexOf(id)
      if (state.resolvingIds.includes(id)) {
        state.resolvingIds.splice(resolvingIdx, 1)
      }
    },
    resolvingError: (
      state,
      action: PayloadAction<{error: Error; id: string}>
    ) => {
      const {error, id} = action.payload

      // remove id from resolving array
      const resolvingIdx = state.resolvingIds.indexOf(id)
      if (state.resolvingIds.includes(id)) {
        state.resolvingIds.splice(resolvingIdx, 1)
      }

      state.resolvingError[id] = error
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loaded, (state, action: PayloadAction<RecipeDocumentData[]>) => {
        const ids: string[] = []
        action.payload.forEach(item => {
          ids.push(item.id)
        })
        state.resolvedIds = uniq([...state.resolvedIds, ...ids])
      })
      // and provide a default case if no other handlers matched
      .addDefaultCase(() => {})
  }
})

export const {resolve, resolved, resolvingError} = recipeResolveState.actions

export default recipeResolveState.reducer
