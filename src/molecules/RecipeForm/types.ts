export type IngredientsType = {amount: string; text: string}[]
export type InstructionsType = {amount: null; text: string}[]

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
}
