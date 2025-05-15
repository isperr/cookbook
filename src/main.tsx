import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import {StyledEngineProvider} from '@mui/material'
import {NotificationsProvider} from '@toolpad/core/useNotifications'

import './index.css'
import App from './App.tsx'
import AppWithTheme from './AppWithTheme.tsx'

import '@fontsource/jost/300.css'
import '@fontsource/jost/400.css'
import '@fontsource/jost/500.css'
import '@fontsource/jost/700.css'

const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <AppWithTheme
        appThemeOptions={{
          components: {
            MuiPopover: {
              defaultProps: {
                container: rootElement
              }
            },
            MuiPopper: {
              defaultProps: {
                container: rootElement
              }
            },
            MuiDialog: {
              defaultProps: {
                container: rootElement
              }
            },
            MuiModal: {
              defaultProps: {
                container: rootElement
              }
            }
          }
        }}
      >
        <CssBaseline />
        <BrowserRouter>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </BrowserRouter>
      </AppWithTheme>
    </StyledEngineProvider>
  </StrictMode>
)
