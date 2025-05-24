import {useEffect, useRef} from 'react'
import {Link} from 'react-router'
import {twMerge} from 'tailwind-merge'
import MenuIcon from '@mui/icons-material/Menu'
import {
  IconButton,
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Typography
} from '@mui/material'

import Button from '../../atoms/Button'
import {useLoadRandom} from '../../hooks/recipe/use-load-random'
import {useLoadRecipeCategories} from '../../hooks/recipe-category/use-load'

import AvatarMenu from './components/AvatarMenu'
import MenuDrawer from './components/MenuDrawer'
import {actions, TITLE} from './constants'
import {useAppBar} from './hooks/use-app-bar'

const AppBar = () => {
  const effectRan = useRef<boolean>(false)
  const {isLoaded, isButtonDisabled, onLoad} = useLoadRandom()
  useLoadRecipeCategories(true)

  useEffect(() => {
    if (!effectRan.current && !isLoaded) {
      onLoad()
    }

    return () => {
      effectRan.current = true
    }
  }, [isLoaded])

  const {
    closeDrawer,
    handleDrawerToggle,
    isMobileOpen,
    onActionClick,
    themeModeContext
  } = useAppBar()

  return (
    <Box className="flex">
      <MuiAppBar component="nav" enableColorOnDark>
        <Toolbar className="flex justify-between">
          <Link to="/" onClickCapture={closeDrawer}>
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
                isDisabled={item.name === 'random' && isButtonDisabled}
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
