import {RootState} from '../../utils/store'

export type RecipeCategory = {
  id: string
  name: string
}
export type RecipeCategoryReturnType = (state: RootState) => RecipeCategory

export type RecipeCategoryOptionType = {
  name: string
  value: string
}
