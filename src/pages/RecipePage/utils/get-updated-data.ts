import {isArray, isBoolean, isEqual} from 'lodash'

import {RecipeDocumentData} from '../../../modules/recipe/types'
import {RecipeFormFields} from '../../../molecules/RecipeForm/types'

export const getUpdatedData = (
  data: RecipeFormFields,
  recipeData: RecipeDocumentData
) => {
  return Object.keys(data).reduce((acc, key) => {
    const field = data[key as keyof RecipeFormFields]
    const recipe = recipeData[key as keyof RecipeFormFields]
    // needs undefined fallback for "details" field
    if (isEqual(field, recipe ?? undefined)) {
      return acc
    }
    if (isArray(field)) {
    } else if (isBoolean(field)) {
      return {...acc, [key]: field}
    }
    return {...acc, [key]: field ?? null}
  }, {})
}
