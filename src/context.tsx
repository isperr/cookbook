import React from 'react'
import {PaletteMode} from '@mui/material'

export const ThemeModeContext = React.createContext<{
  themeMode: PaletteMode
  toggleThemeMode: () => void
}>({
  themeMode: 'light',
  toggleThemeMode: () => {}
})
