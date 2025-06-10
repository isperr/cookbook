import {DocumentData} from 'firebase/firestore'

import {RootState} from '../../utils/store'

export const recipeDurations = {
  short: 'Kurz',
  medium: 'Mittel',
  long: 'Lang',
  unknown: '--'
}
export type RecipeDurationType = typeof recipeDurations
export type RecipeDuration = keyof RecipeDurationType

export type IngredientsDataType = Array<{amount: string; text: string}>
export type IngredientsType = Array<{
  name: string | null
  data: IngredientsDataType
}>
export type InstructionsDataType = Array<{amount: null; text: string}>
export type InstructionsType = Array<{
  name: string | null
  data: InstructionsDataType
}>

export type RecipeDocumentData = DocumentData & {
  duration: RecipeDuration
  id: string
  ingredients: IngredientsType
  instructions: InstructionsType
}
export type RecipeReturnType = (state: RootState) => RecipeDocumentData
export type ResolveStateReturnType = (state: RootState) => boolean
