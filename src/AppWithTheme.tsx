import {ReactNode, useMemo} from 'react'
import {createTheme, ThemeOptions, ThemeProvider} from '@mui/material'

import {useThemeMode} from './hooks/use-theme-palette-mode.tsx'
import {themeOptions} from './theme.tsx'
import {ThemeModeContext} from './context.tsx'

const AppWithTheme = ({
  appThemeOptions,
  children
}: {
  appThemeOptions: ThemeOptions
  children: ReactNode
}) => {
  const {themeMode, toggleThemeMode} = useThemeMode()

  const themeModeContextProvider = useMemo(
    () => ({
      toggleThemeMode,
      themeMode
    }),
    [themeMode]
  )

  return (
    <ThemeModeContext.Provider value={themeModeContextProvider}>
      <ThemeProvider
        theme={createTheme({
          ...themeOptions,
          ...appThemeOptions,
          palette: {
            ...themeOptions.palette,
            mode: themeMode,
            ...(themeMode === 'dark' && {
              background: {
                default: '#303030',
                paper: '#424242'
              }
            })
          }
        })}
      >
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export default AppWithTheme
