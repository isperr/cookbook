import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import ShuffleIcon from '@mui/icons-material/Shuffle'

export const RECIPE = ':recipeId'
export const actions = [
  {
    icon: <AddIcon fontSize="inherit" />,
    name: 'add',
    title: 'Neues Rezept',
    shortTitle: 'Neu',
    link: '/new'
  },
  {
    icon: <SearchIcon fontSize="inherit" />,
    name: 'search',
    title: 'Suche',
    shortTitle: null,
    link: '/search'
  },
  {
    icon: <ShuffleIcon fontSize="inherit" />,
    name: 'random',
    title: 'Zufallsrezept',
    shortTitle: null,
    link: `/recipes/${RECIPE}`
  }
]

export const drawerWidth = 240
export const TITLE = "Sperr's Kochbuch"
