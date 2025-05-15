import React from 'react'
import {PaletteMode} from '@mui/material'

export const ThemePaletteModeContext = React.createContext<{
  themePaletteMode: PaletteMode
  toggleThemePaletteMode: () => void
}>({
  themePaletteMode: 'light',
  toggleThemePaletteMode: () => {}
})
