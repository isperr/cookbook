import {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router'

import {useScrollToTop} from '../../hooks/use-scroll-to-top'
import PageTemplate from '../../templates/Page'

import Content from './components/Content'
import {useResolveRecipe} from './hooks/use-resolve-recipe'
import {useToggleEditMode} from './hooks/use-toggle-edit-mode'

const RecipePage = () => {
  useScrollToTop()
  const params = useParams()
  const id = params.recipeId
  const [prevId, setPrevId] = useState<undefined | string>(undefined)

  const effectRan = useRef<boolean>(false)
  const {isResolved, handleResolveRecipe} = useResolveRecipe(id)

  const {leaveEditMode} = useToggleEditMode()

  useEffect(() => {
    if (!effectRan.current && !isResolved && id) {
      handleResolveRecipe(id)
      setPrevId(id)
    }

    return () => {
      effectRan.current = true
    }
  }, [isResolved])

  useEffect(() => {
    if (id && prevId && prevId !== id && !isResolved) {
      handleResolveRecipe(id)
      setPrevId(id)
    }
  }, [prevId, id, isResolved])

  useEffect(() => {
    return () => {
      leaveEditMode()
    }
  }, [])

  return (
    <PageTemplate className="sm:px-6 px-4">
      <Content id={id} />
    </PageTemplate>
  )
}

export default RecipePage
