import {createSelector} from '@reduxjs/toolkit'

import {RootState} from '../../../utils/store'

import {RecipeCategoryReturnType} from '../types'

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
  createSelector([(state: RootState) => selectEntities(state)], entities => {
    const {parentCategory, ...entity} = entities[id]

    return {
      ...entity,
      parentCategory: parentCategory ? entities[parentCategory] : null
    }
  })
