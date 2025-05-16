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
        sx={{position: 'fixed', bottom: 16, right: 16}}
        icon={<SpeedDialIcon />}
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
                open: true,
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
