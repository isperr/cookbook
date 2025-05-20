import {doc, getDoc, getFirestore} from 'firebase/firestore'

import {RecipeDocumentData} from '../../modules/recipe/types'

export const resolveRecipe = async (id: string) => {
  const db = getFirestore()

  const collectionRef = doc(db, 'recipes', id)
  const snapshot = await getDoc(collectionRef).catch(error => {
    // error is handled within RecipePage
    throw error
  })
  const data = snapshot.data()

  if (!data) {
    return undefined
  }

  return {...data, id} as RecipeDocumentData
}
