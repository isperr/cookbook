import {useEffect, useRef} from 'react'
import PageTemplate from '../../templates/Page'
import {useParams} from 'react-router'
import {useResolveRecipe} from './hooks/use-resolve-recipe'
import Content from './components/Content'
import {useScrollToTop} from '../../hooks/use-scroll-to-top'

const RecipePage = () => {
  useScrollToTop()
  const params = useParams()
  const id = params.recipeId

  const effectRan = useRef<boolean>(false)
  const {isResolved, handleResolveRecipe} = useResolveRecipe(id)

  useEffect(() => {
    if (!effectRan.current && !isResolved) {
      handleResolveRecipe()
    }

    return () => {
      effectRan.current = true
    }
  }, [isResolved])

  return (
    <PageTemplate className="sm:px-6 px-4">
      <Content id={id} />
    </PageTemplate>
  )
}

export default RecipePage
