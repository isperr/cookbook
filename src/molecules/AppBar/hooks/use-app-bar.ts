import React, {useState} from 'react'
import {useLocation, useNavigate} from 'react-router'

import {ThemeModeContext} from '../../../context'
import {useLoadRandom} from '../../../hooks/recipe/use-load-random'
import {selectCanEdit} from '../../../modules/auth/selectors'
import {useToggleEditMode} from '../../../pages/RecipePage/hooks/use-toggle-edit-mode'
import {useAppSelector} from '../../../utils/store-hooks'

import {RECIPE} from '../constants'

export const useAppBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const canEdit = useAppSelector(selectCanEdit)

  const {getRandomRecipeId} = useLoadRandom()
  const {isEditMode, leaveEditMode} = useToggleEditMode()

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
    if (isEditMode) {
      leaveEditMode()
    }
    navigate(link.replace(RECIPE, recipeId))
    closeDrawer()
  }

  return {
    canEdit,
    closeDrawer,
    handleDrawerToggle,
    isMobileOpen,
    onActionClick,
    themeModeContext
  }
}
