import {ThemeOptions} from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#6db07d'
    },
    secondary: {
      main: '#a67c45'
    },
    warning: {
      main: '#f59a23'
    },
    info: {
      main: '#00c7e0'
    },
    success: {
      main: '#7ec636'
    }
  },
  typography: {
    fontFamily: 'Jost',
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
