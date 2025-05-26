import {RootState} from '../../utils/store'

export type RecipeCategory = {
  id: string
  name: string
  parentCategory: string | null
}
export type RecipeCategoryReturnType = (state: RootState) => Omit<
  RecipeCategory,
  'parentCategory'
> & {
  parentCategory: RecipeCategory | null
}

export type RecipeCategoryOptionType = {
  isSubheading: boolean
  name: string
  value: string
}
