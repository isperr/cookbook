import {memo} from 'react'
import {List} from '@mui/material'

import Loading from '../../atoms/Loading'
import Text from '../../atoms/Text'
import ListItem from './components/ListItem'
import {twMerge} from 'tailwind-merge'

export type RecipeListProps = {
  hasError: boolean
  isLoaded: boolean
  isLoading: boolean
  result: string[]
  showSecondary: boolean
}

const RecipeList = ({
  hasError,
  isLoaded,
  isLoading,
  result,
  showSecondary
}: RecipeListProps) => {
  if (hasError) {
    return (
      <Text className={twMerge(showSecondary && 'md:px-6 px-4')}>
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
      <Text className={twMerge(showSecondary && 'md:px-6 px-4')}>
        Es gibt leider noch keine Rezepte im Kochbuch.
      </Text>
    )
  }

  if (isLoaded && result.length) {
    return (
      <>
        {!showSecondary && (
          <Text className="pt-2" type="subheading">
            Suchergebnisse:
          </Text>
        )}
        <List
          className={twMerge(
            showSecondary && 'pt-0',
            !showSecondary && 'sm:-mx-6 -mx-4'
          )}
          disablePadding={!showSecondary}
        >
          {result.map(id => (
            <ListItem key={id} id={id} showSecondary={showSecondary} />
          ))}
        </List>
      </>
    )
  }

  return null
}

export default memo(RecipeList)
