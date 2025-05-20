import {DocumentData} from 'firebase/firestore'

import {RootState} from '../../utils/store'

export const recipeDurations = {
  short: 'Kurz',
  medium: 'Mittel',
  long: 'Lang'
}
export type RecipeDurationType = typeof recipeDurations
export type RecipeDuration = keyof RecipeDurationType

export type RecipeDocumentData = DocumentData & {
  duration: RecipeDuration
  id: string
  instructions: Array<string>
  ingredients: Array<string>
}
export type RecipeReturnType = (state: RootState) => RecipeDocumentData
export type ResolveStateReturnType = (state: RootState) => boolean
