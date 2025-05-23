import {configureStore} from '@reduxjs/toolkit'

import authReducer from '../modules/auth/slice'
import registrationReducer from '../modules/registration/slice'
import recipeResultsReducer from '../modules/recipe/results/slice'
import recipeResolveReducer from '../modules/recipe/resolve/slice'
import recipeRandomReducer from '../modules/recipe/random/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    recipeResults: recipeResultsReducer,
    recipeResolve: recipeResolveReducer,
    recipeRandom: recipeRandomReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredActionPaths: ['payload']
      }
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
