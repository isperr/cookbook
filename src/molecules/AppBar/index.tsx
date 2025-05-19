import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router'
import {twMerge} from 'tailwind-merge'
import MenuIcon from '@mui/icons-material/Menu'
import {
  IconButton,
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Typography
} from '@mui/material'
import {useNotifications} from '@toolpad/core'

import Button from '../../atoms/Button'
import {ThemeModeContext} from '../../context'
import {getRandomRecipeId} from '../../utils/get-random-recipe'
import {getToastConfig} from '../../utils/get-toast-config'

import AvatarMenu from './components/AvatarMenu'
import MenuDrawer from './components/MenuDrawer'
import {actions, RECIPE, TITLE} from './constants'

const AppBar = () => {
  const navigate = useNavigate()
  const notifications = useNotifications()

  const themeModeContext = React.useContext(ThemeModeContext)

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  const handleDrawerToggle = () => {
    setIsMobileOpen(prevState => !prevState)
  }

  const closeDrawer = () => {
    setIsMobileOpen(false)
  }

  const onActionClick = async (link: string) => {
    if (!link.includes(RECIPE)) {
      navigate(link)
      closeDrawer()
      return
    }

    try {
      const recipeId = await getRandomRecipeId()
      navigate(link.replace(RECIPE, recipeId))
      closeDrawer()
    } catch (error) {
      notifications.show(
        'Beim Aussuchen des Zufallrezepts ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }

  return (
    <Box className="flex">
      <MuiAppBar component="nav" enableColorOnDark>
        <Toolbar className="flex justify-between">
          <Link to="/" onClickCapture={() => setIsMobileOpen(false)}>
            <Typography
              className={twMerge(
                themeModeContext.themeMode === 'dark' && 'text-white',
                themeModeContext.themeMode === 'light' && 'text-black'
              )}
              component="div"
              variant="h6"
            >
              {TITLE}
            </Typography>
          </Link>
          <IconButton
            className="sm:hidden pr-0"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Box
            className={twMerge(
              themeModeContext.themeMode === 'dark' && 'text-white',
              themeModeContext.themeMode === 'light' && 'text-black',
              'sm:flex justify-end items-center hidden'
            )}
          >
            {actions.map(item => (
              <Button
                color="inherit"
                key={item.name}
                variant="text"
                onClick={() => onActionClick(item.link)}
              >
                <span className="md:block hidden">{item.title}</span>
                <span className="md:hidden block">
                  {item.shortTitle ?? item.title}
                </span>
              </Button>
            ))}
            <AvatarMenu />
          </Box>
        </Toolbar>
      </MuiAppBar>

      <MenuDrawer
        closeDrawer={closeDrawer}
        handleDrawerToggle={handleDrawerToggle}
        isMobileOpen={isMobileOpen}
        onActionClick={onActionClick}
      />
    </Box>
  )
}

export default AppBar
