import {memo} from 'react'
import {List} from '@mui/material'

import Loading from '../../atoms/Loading'
import Text from '../../atoms/Text'
import ListItem from './components/ListItem'

export type RecipeListProps = {
  hasError: boolean
  isLoaded: boolean
  isLoading: boolean
  result: string[]
}

const RecipeList = ({
  hasError,
  isLoaded,
  isLoading,
  result
}: RecipeListProps) => {
  if (hasError) {
    return (
      <Text className="md:px-6 px-4">
        Beim Laden der Daten ist leider ein Fehler aufgetreten. Versuche die
        Seite neu zu laden oder probiere es später erneut.
      </Text>
    )
  }

  if (isLoading) {
    return <Loading type="list" />
  }

  if (isLoaded && !result.length) {
    return (
      <Text className="md:px-6 px-4">
        Es gibt leider noch keine Rezepte im Kochbuch.
      </Text>
    )
  }

  if (isLoaded && result.length) {
    return (
      <List className="pt-0">
        {result.map(id => (
          <ListItem key={id} id={id} />
        ))}
      </List>
    )
  }

  return null
}

export default memo(RecipeList)
