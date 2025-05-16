import {useState} from 'react'
import {
  Backdrop,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const actions = [
  {icon: <SearchIcon />, name: 'search', title: 'Suche'},
  {icon: <ShuffleIcon />, name: 'random', title: 'Zufallsrezept'},
  {icon: <AddIcon />, name: 'add', title: 'Neu'}
]

const AppSpeedDial = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleClick = (name: string) => {
    console.log(name)
  }

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className="fixed bottom-4 right-4"
        icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={() => handleClick(action.name)}
            slotProps={{
              tooltip: {
                arrow: true,
                open: true,
                placement: 'top',
                title: action.title
              }
            }}
          />
        ))}
      </SpeedDial>
    </>
  )
}

export default AppSpeedDial
