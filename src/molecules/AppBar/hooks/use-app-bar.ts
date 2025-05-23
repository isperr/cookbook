import React, {useState} from 'react'
import {useLocation, useNavigate} from 'react-router'

import {ThemeModeContext} from '../../../context'
import {useLoadRandom} from '../../../hooks/recipe/use-load-random'

import {RECIPE} from '../constants'

export const useAppBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const {getRandomRecipeId} = useLoadRandom()

  const themeModeContext = React.useContext(ThemeModeContext)
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  const handleDrawerToggle = () => {
    setIsMobileOpen(prevState => !prevState)
  }

  const closeDrawer = () => {
    setIsMobileOpen(false)
  }

  const onActionClick = (link: string) => {
    if (!link.includes(RECIPE)) {
      navigate(link)
      closeDrawer()
      return
    }

    const excludeId = location.pathname.includes('/recipes')
      ? location.pathname.split('/')[2]
      : null
    const recipeId = getRandomRecipeId(excludeId)
    navigate(link.replace(RECIPE, recipeId))
    closeDrawer()
  }

  return {
    closeDrawer,
    handleDrawerToggle,
    isMobileOpen,
    onActionClick,
    themeModeContext
  }
}
