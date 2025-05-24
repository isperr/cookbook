import {memo} from 'react'
import {Link} from 'react-router'

import Loading from '../../../atoms/Loading'
import Text from '../../../atoms/Text'

import {useResolveRecipe} from '../hooks/use-resolve-recipe'
import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import NonEditView from './NonEditView'

const Content = ({id}: {id?: string}) => {
  const {hasResolveError, isResolved, isResolving, recipe} =
    useResolveRecipe(id)
  const {isEditMode} = useToggleEditMode()

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

  if (!isEditMode && recipe) {
    return <NonEditView id={recipe.id} />
  }

  if (isEditMode && recipe) {
    return <>edit mode</>
  }

  return null
}

export default memo(Content)
