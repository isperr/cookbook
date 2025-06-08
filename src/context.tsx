import {createContext, useContext} from 'react'
import {PaletteMode} from '@mui/material'

export type ThemeModeContextType = {
  themeMode: PaletteMode
  toggleThemeMode: () => void
}
const defaultThemeModeContextState: ThemeModeContextType = {
  themeMode: 'light',
  toggleThemeMode: () => {}
}

export const ThemeModeContext = createContext<ThemeModeContextType>(
  defaultThemeModeContextState
)
export const useThemeModeContext = (): ThemeModeContextType =>
  useContext<ThemeModeContextType>(ThemeModeContext)
