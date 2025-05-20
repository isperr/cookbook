import {memo} from 'react'
import {Link} from 'react-router'

import Text from '../../../atoms/Text'
import Loading from '../../../atoms/Loading'
import {useResolveRecipe} from '../hooks/use-resolve-recipe'

import NonEditView from './NonEditView'

const Content = ({id}: {id?: string}) => {
  const {hasResolveError, isResolved, isResolving, recipe} =
    useResolveRecipe(id)

  if (hasResolveError) {
    return (
      <Text>
        Das Rezept mit der "{id}" konnte nicht geladen werden. Versuche die
        Seite neu zu Laden oder gehe{' '}
        <Link className="text-secondary underline" to="/">
          zurück zur Homepage
        </Link>
        .
      </Text>
    )
  }

  if (isResolving) {
    return <Loading type="detail" />
  }

  if (isResolved && !recipe) {
    return (
      <Text>
        Ein Rezept mit der ID "{id}" konnte leider nicht gefunden worden.
      </Text>
    )
  }

  if (isResolved && recipe) {
    return <NonEditView id={recipe.id} />
  }

  return null
}

export default memo(Content)
