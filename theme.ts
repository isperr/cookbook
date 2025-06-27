// colors must always be in unison with colors in /index.css
export const themeColors = {
  blue: {
    DEFAULT: '#00c7e0',
    light: '#33d2e6',
    dark: '#008b9c'
  },
  orange: {
    DEFAULT: '#f59a23',
    light: '#f7ae4f',
    dark: '#ab6b18'
  },
  green: {
    DEFAULT: '#7ec636',
    light: '#97d15e',
    dark: '#588a25'
  },
  red: {
    DEFAULT: '#f44336',
    light: '#e57373',
    dark: '#d32f2f'
  },
  primary: {
    DEFAULT: '#6db07d',
    light: '#8abf97',
    dark: '#4c7b57'
  },
  secondary: {
    DEFAULT: '#a67c45',
    light: '#b7966a',
    dark: '#745630'
  },
  divider: {
    dark: '#ffffffd9',
    light: '#000000d9'
  },
  background: {
    dark: {
      default: '#303030',
      paper: '#424242'
    },
    light: {
      default: '#fafafa',
      paper: '#ffffff'
    }
  },
  text: {
    dark: {
      primary: '#ffffff',
      secondary: '#ffffffb3',
      disabled: '#ffffff80',
      hint: '#ffffff80'
    },
    light: {
      primary: '#000000de',
      secondary: '#0000008a',
      disabled: '#00000061',
      hint: '#00000061'
    }
  }
}

const theme = {
  colors: themeColors
}

export default theme
