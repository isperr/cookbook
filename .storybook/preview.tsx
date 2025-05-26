import {withThemeByClassName} from '@storybook/addon-themes'
import type {Preview} from '@storybook/react'
import '../src/App.css'
import '../src/index.css'
import {themeOptions} from '../src/theme'
import {themeColors} from '../theme'
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  CssBaseline
} from '@mui/material'

const withMuiTheme = (Story, context) => {
  const {theme} = context.globals

  return (
    <ThemeProvider
      theme={createTheme({
        ...themeOptions,
        palette: {
          ...themeOptions.palette,
          mode: theme,
          ...(theme === 'dark' && {
            background: themeColors.background.dark,
            divider: themeColors.divider.dark,
            text: themeColors.text.dark
          })
        }
      })}
    >
      <CssBaseline />
      <Story />
    </ThemeProvider>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark'
      },
      defaultTheme: 'light'
    }),
    withMuiTheme
  ]
}

export default preview
