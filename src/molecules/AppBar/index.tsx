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
    canEdit,
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
            className="sm:hidden -mr-2.5"
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
            <Button
              color="inherit"
              key="recipes"
              variant="text"
              onClick={() => onActionClick('/')}
            >
              <span className="md:block hidden">Alle Rezepte</span>
              <span className="md:hidden block">Rezepte</span>
            </Button>
            {actions.map(item => {
              if (item.name === 'add' && !canEdit) {
                return null
              }

              return (
                <Button
                  className={twMerge(
                    item.shortTitle && 'md:min-w-[64px] min-w-10'
                  )}
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
              )
            })}
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
