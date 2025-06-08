import {useMemo} from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import {useThemeModeContext} from '../../../context'

export type ModeItemProps = {
  type: 'menu' | 'drawer'
}

const ModeItem = ({type}: ModeItemProps) => {
  const {themeMode, toggleThemeMode} = useThemeModeContext()

  const content = useMemo(
    () => (
      <>
        <ListItemIcon className="justify-center">
          {themeMode === 'light' ? (
            <LightModeIcon fontSize="inherit" />
          ) : (
            <DarkModeIcon fontSize="inherit" />
          )}
        </ListItemIcon>
        <ListItemText primary="Erscheinungsbild" />
      </>
    ),
    [themeMode]
  )

  if (type === 'menu') {
    return <MenuItem onClick={toggleThemeMode}>{content}</MenuItem>
  }

  if (type === 'drawer') {
    return (
      <ListItem key="mode" disablePadding>
        <ListItemButton onClick={toggleThemeMode}>{content}</ListItemButton>
      </ListItem>
    )
  }

  return null
}

export default ModeItem
