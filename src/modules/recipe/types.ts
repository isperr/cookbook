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

export type RecipeDocumentData = DocumentData & {
  duration: RecipeDuration
  id: string
  ingredients: Array<{amount: string; text: string}>
  instructions: Array<{amount: null; text: string}>
}
export type RecipeReturnType = (state: RootState) => RecipeDocumentData
