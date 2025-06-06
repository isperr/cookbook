import {selectRecipeCategory} from '../../modules/recipe-category/results/selectors'
import {selectRecipeData} from '../../modules/recipe/results/selectors'
import {RecipeDocumentData} from '../../modules/recipe/types'
import {useAppSelector} from '../../utils/store-hooks'

export const useRecipeWithCategoryName = (id: string) => {
  const recipe = useAppSelector(selectRecipeData(id))
  const category = useAppSelector(selectRecipeCategory(recipe.category))

  return {
    ...recipe,
    categoryName: category.name
  } as RecipeDocumentData & {categoryName: string}
}
