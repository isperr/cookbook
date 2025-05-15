import React from 'react'
import AppBarComponent from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Slide from '@mui/material/Slide'
import {IconButton, Typography, useScrollTrigger} from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'

import {useLogin} from '../../hooks/auth/use-login'
import {ThemeModeContext} from '../../context'

const AppBar = () => {
  const {onLogout} = useLogin()
  const themeModeContext = React.useContext(ThemeModeContext)
  const trigger = useScrollTrigger({
    threshold: 200
  })

  return (
    <Slide className="transition-all" appear={false} in={!trigger}>
      <AppBarComponent className={trigger ? 'hidden' : ''} enableColorOnDark>
        <Toolbar>
          <Typography className="flex-1">Kochbuch</Typography>
          <IconButton
            aria-label="mode"
            size="large"
            color="secondary"
            onClick={themeModeContext.toggleThemeMode}
          >
            {themeModeContext.themeMode === 'light' ? (
              <LightModeIcon fontSize="inherit" />
            ) : (
              <DarkModeIcon fontSize="inherit" />
            )}
          </IconButton>
          <IconButton
            aria-label="logout"
            size="large"
            color="secondary"
            onClick={onLogout}
          >
            <LogoutIcon fontSize="inherit" />
          </IconButton>
        </Toolbar>
      </AppBarComponent>
    </Slide>
  )
}

export default AppBar
