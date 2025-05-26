import {useMemo} from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

import {useLogin} from '../../../hooks/auth/use-login'

export type LogoutItemProps = {
  onClose?: () => void
  type: 'menu' | 'drawer'
}

const LogoutItem = ({onClose, type}: LogoutItemProps) => {
  const {onLogout} = useLogin()
  const handleClose = () => {
    onClose?.()
    onLogout()
  }

  const content = useMemo(
    () => (
      <>
        <ListItemIcon className="justify-center">
          <LogoutIcon fontSize="inherit" />
        </ListItemIcon>
        <ListItemText primary="Ausloggen" />
      </>
    ),
    []
  )

  if (type === 'menu') {
    return <MenuItem onClick={handleClose}>{content}</MenuItem>
  }

  if (type === 'drawer') {
    return (
      <ListItem key="logout" disablePadding>
        <ListItemButton onClick={onLogout}>{content}</ListItemButton>
      </ListItem>
    )
  }

  return null
}

export default LogoutItem
