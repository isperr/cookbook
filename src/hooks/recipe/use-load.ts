import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query
} from 'firebase/firestore'

import {RecipeDocumentData} from '../../modules/recipe/results/slice'

export const loadRecipes = async () => {
  const db = getFirestore()

  const data: RecipeDocumentData[] = []

  const collectionRef = collection(db, 'recipes')
  const recipeQuery = await query(
    collectionRef,
    //where('isActivated', '==', isActivated),
    orderBy('title', 'asc')
  )
  const snapshot = await getDocs(recipeQuery).catch(error => {
    // error is handled within ListPage
    throw error
  })
  snapshot.forEach(doc => {
    data.push({...doc.data(), id: doc.id})
  })

  return data
}
