import {ThemeOptions} from '@mui/material/styles'
import {themeColors} from '../theme'

export const themeOptions: ThemeOptions = {
  palette: {
    background: themeColors.background.light,
    primary: {
      main: themeColors.primary.DEFAULT,
      light: themeColors.primary.light,
      dark: themeColors.primary.dark
    },
    secondary: {
      main: themeColors.secondary.DEFAULT,
      light: themeColors.secondary.light,
      dark: themeColors.secondary.dark
    },
    warning: {
      main: themeColors.orange.DEFAULT,
      light: themeColors.orange.light,
      dark: themeColors.orange.dark
    },
    info: {
      main: themeColors.blue.DEFAULT,
      light: themeColors.blue.light,
      dark: themeColors.blue.dark
    },
    success: {
      main: themeColors.green.DEFAULT,
      light: themeColors.green.light,
      dark: themeColors.green.dark
    },
    error: {
      main: themeColors.red.DEFAULT,
      light: themeColors.red.light,
      dark: themeColors.red.dark
    },
    divider: themeColors.divider.light,
    text: themeColors.text.light
  },
  typography: {
    fontFamily: '"Jost", "Helvetica", "Arial", sans-serif',
    fontSize: 16
  },
  spacing: 8,
  shape: {
    borderRadius: 4
  },
  components: {
    MuiSwitch: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none'
            }
          }
        },
        thumb: {
          width: 24,
          height: 24
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }
      }
    },
    MuiList: {
      defaultProps: {
        dense: true
      }
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true
      }
    },
    MuiTable: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiButton: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiFab: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        size: 'small'
      }
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiRadio: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        size: 'small'
      }
    }
  }
}
