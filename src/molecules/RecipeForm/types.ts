export type RecipeFormFields = {
  category: string
  details: string
  duration: string
  ingredients: {amount: string; text: string}[]
  instructions: {amount: null; text: string}[]
  isFavorite: boolean
  isLowCarb: boolean
  rating: number | null
  title: string
}
