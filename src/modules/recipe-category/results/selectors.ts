import {createSelector} from '@reduxjs/toolkit'

import {RootState} from '../../../utils/store'

import {
  RecipeCategory,
  RecipeCategoryOptionType,
  RecipeCategoryReturnType,
  RecipeCategoryNameReturnType
} from '../types'
import {groupBy} from 'lodash'

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

const getOption = (category: RecipeCategory) => {
  return {
    name: category.name,
    value: category.id,
    isSubheading: !category.parentCategory
  }
}

export const selectRecipeCategoryOptions = createSelector(
  selectIsLoaded,
  selectResult,
  selectEntities,
  (isLoaded, result, entities) => {
    if (!isLoaded) {
      return []
    }
    const recipeCategories = result.map(id => entities[id])
    const recipeCategoryOptions: Array<RecipeCategoryOptionType> = []
    const grouped = groupBy(
      recipeCategories,
      category => category.parentCategory
    )
    grouped['null'].forEach(parentCategory => {
      const children = grouped[parentCategory.id]?.map(getOption) ?? []
      if (children.length) {
        recipeCategoryOptions.push(getOption(parentCategory))
        recipeCategoryOptions.push(...children)
      } else {
        recipeCategoryOptions.push({
          name: parentCategory.name,
          value: parentCategory.id,
          isSubheading: false
        })
      }
    })

    return recipeCategoryOptions
  }
)

export const selectCatgeoryByOptionValue = (
  value?: string
): RecipeCategoryNameReturnType =>
  createSelector(
    selectRecipeCategoryOptions,
    options => options.find(opt => opt.value === value)?.name
  )
