import {useState} from 'react'
import {PaletteMode, useMediaQuery} from '@mui/material'
import {useLocalStorageState} from '@toolpad/core'

export const useThemeMode = () => {
  // get 'themeMode' from local-storage to see if it was already set
  const [state, setState] = useLocalStorageState('themeMode', null)
  const convertedAppModeFromState =
    state === 'light' || state === 'dark' ? state : undefined

  // in the case it is not set, check if user prefers dark color-scheme
  const isSystemDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const defaultMode = isSystemDarkMode ? 'dark' : 'light'

  // set themeMode with local-storage or fallback to default-mode
  const [themeMode, setAppMode] = useState<PaletteMode>(
    convertedAppModeFromState ?? defaultMode
  )

  // set newly selected theme within local-storage and themeMode-state
  const toggleThemeMode = () => {
    setState(themeMode === 'light' ? 'dark' : 'light')
    setAppMode(prevAppMode => (prevAppMode === 'light' ? 'dark' : 'light'))
  }

  return {themeMode, toggleThemeMode}
}
