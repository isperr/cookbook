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

import Button from '../../atoms/Button'
import {ThemeModeContext} from '../../context'

import AvatarMenu from './components/AvatarMenu'
import {actions, RECIPE, TITLE} from './constants'
import MenuDrawer from './components/MenuDrawer'

const AppBar = () => {
  const navigate = useNavigate()

  const themeModeContext = React.useContext(ThemeModeContext)

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  const handleDrawerToggle = () => {
    setIsMobileOpen(prevState => !prevState)
  }

  const onActionClick = (link: string) => {
    if (link.includes(RECIPE)) {
      navigate(link.replace(RECIPE, '1'))
    } else {
      navigate(link)
    }
    setIsMobileOpen(false)
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
        handleDrawerToggle={handleDrawerToggle}
        isMobileOpen={isMobileOpen}
        onActionClick={onActionClick}
        setMobileOpen={setIsMobileOpen}
      />
    </Box>
  )
}

export default AppBar
