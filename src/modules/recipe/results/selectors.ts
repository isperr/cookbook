import {createSelector} from '@reduxjs/toolkit'

import {RootState} from '../../../utils/store'

import {RecipeReturnType} from '../types'

export const selectResult = (state: RootState) => state.recipeResults.result
export const selectEntities = (state: RootState) => state.recipeResults.entities
export const selectIsLoaded = (state: RootState) => state.recipeResults.isLoaded
export const selectIsLoading = (state: RootState) =>
  state.recipeResults.isLoading
export const selectError = (state: RootState) => state.recipeResults.error

export const selectRecipeData = (id: string): RecipeReturnType =>
  createSelector(
    [(state: RootState) => selectEntities(state)],
    entities => entities[id]
  )
