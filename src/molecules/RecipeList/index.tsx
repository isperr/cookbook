import {DocumentData} from 'firebase/firestore'
import {memo} from 'react'
import {List} from '@mui/material'

import Loading from '../../atoms/Loading'
import Text from '../../atoms/Text'
import ListItem from './components/ListItem'

export type RecipeListProps = {
  data: DocumentData[]
  hasError: boolean
  isLoaded: boolean
  isLoading: boolean
}

const RecipeList = ({data, hasError, isLoaded, isLoading}: RecipeListProps) => {
  if (hasError) {
    return (
      <Text>
        Beim Laden der Daten ist leider ein Fehler aufgetreten. Versuche die
        Seite neu zu laden oder probiere es später erneut.
      </Text>
    )
  }

  if (isLoading) {
    return <Loading type="list" />
  }

  if (isLoaded && !data.length) {
    return <Text>Es gibt leider noch keine Rezepte im Kochbuch.</Text>
  }

  if (isLoaded && data.length) {
    return (
      <List className="pt-0">
        {data.map(item => (
          <ListItem
            key={item.id}
            category={item.category}
            id={item.id}
            isFavorite={item.isFavorite}
            title={item.title}
          />
        ))}
      </List>
    )
  }

  return null
}

export default memo(RecipeList)
