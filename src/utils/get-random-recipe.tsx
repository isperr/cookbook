import {
  collection,
  getFirestore,
  query,
  orderBy,
  getDocs
} from 'firebase/firestore'
import {random} from 'lodash'

export const getRandomRecipeId = async () => {
  const db = getFirestore()

  const recipesCollectionRef = collection(db, 'recipes')
  const recipeQuery = await query(recipesCollectionRef, orderBy('title', 'asc'))
  const snapshot = await getDocs(recipeQuery).catch(error => {
    // error must be handled within component where this util is used
    throw error
  })

  const ids: Array<string> = []
  snapshot.forEach(doc => {
    ids.push(doc.id)
  })

  const randomIdx = random(0, ids.length - 1)

  return ids[randomIdx]
}
