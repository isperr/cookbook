import React, {useMemo} from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import {ThemeModeContext} from '../../../context'

export type ModeItemProps = {
  type: 'menu' | 'drawer'
}

const ModeItem = ({type}: ModeItemProps) => {
  const themeModeContext = React.useContext(ThemeModeContext)

  const content = useMemo(
    () => (
      <>
        <ListItemIcon className="justify-center">
          {themeModeContext.themeMode === 'light' ? (
            <LightModeIcon fontSize="inherit" />
          ) : (
            <DarkModeIcon fontSize="inherit" />
          )}
        </ListItemIcon>
        <ListItemText primary="Erscheinungsbild" />
      </>
    ),
    [themeModeContext.themeMode]
  )

  if (type === 'menu') {
    return (
      <MenuItem onClick={themeModeContext.toggleThemeMode}>{content}</MenuItem>
    )
  }

  if (type === 'drawer') {
    return (
      <ListItem key="mode" disablePadding>
        <ListItemButton onClick={themeModeContext.toggleThemeMode}>
          {content}
        </ListItemButton>
      </ListItem>
    )
  }

  return null
}

export default ModeItem
