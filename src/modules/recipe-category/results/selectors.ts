import {createSelector} from '@reduxjs/toolkit'

import {RootState} from '../../../utils/store'

import {RecipeCategory, RecipeCategoryReturnType} from '../types'

export const selectResult = (state: RootState) =>
  state.recipeCategoryResults.result
export const selectEntities = (state: RootState) =>
  state.recipeCategoryResults.entities
export const selectIsLoaded = (state: RootState) =>
  state.recipeCategoryResults.isLoaded
export const selectIsLoading = (state: RootState) =>
  state.recipeCategoryResults.isLoading
export const selectError = (state: RootState) =>
  state.recipeCategoryResults.error

export const selectHasError = createSelector(selectError, error =>
  Boolean(error)
)

export const selectRecipeCategory = (id: string): RecipeCategoryReturnType =>
  createSelector(
    [(state: RootState) => selectEntities(state)],
    entities => entities[id]
  )

const getOption = (category: RecipeCategory) => ({
  name: category.name,
  value: category.id
})

export const selectRecipeCategoryOptions = createSelector(
  selectIsLoaded,
  selectResult,
  selectEntities,
  (isLoaded, result, entities) => {
    if (!isLoaded) {
      return []
    }
    const recipeCategories = result.map(id => entities[id])

    return recipeCategories.map(getOption)
  }
)
