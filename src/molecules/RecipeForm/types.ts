import {IngredientsType, InstructionsType} from '../../modules/recipe/types'

export type RecipeFormFields = {
  category: string
  details: string
  duration: string
  ingredients: IngredientsType
  instructions: InstructionsType
  isFavorite: boolean
  isLowCarb: boolean
  rating: number | null
  title: string
}

export type ListDialogFields = {
  ingredientsDraft: IngredientsType
  instructionsDraft: InstructionsType
  sectionTitle: string | null
}
