import React, {useState} from 'react'
import {twMerge} from 'tailwind-merge'
import {Avatar, IconButton, Menu} from '@mui/material'

import {ThemeModeContext} from '../../../context'
import {selectInitials} from '../../../modules/auth/selectors'
import {useAppSelector} from '../../../utils/store-hooks'

import LogoutItem from './LogoutItem'
import ModeItem from './ModeItem'

const AvatarMenu = () => {
  const themeModeContext = React.useContext(ThemeModeContext)
  const initials = useAppSelector(selectInitials)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div key="avatar">
      <IconButton
        className="-mr-2.5"
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
          className={twMerge(
            'size-8 bg-secondary',
            themeModeContext.themeMode === 'dark' && 'text-white',
            themeModeContext.themeMode === 'light' && 'text-black'
          )}
          sx={{fontSize: '16px'}}
        >
          {initials}
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ModeItem type="menu" />
        <LogoutItem onClose={handleClose} type="menu" />
      </Menu>
    </div>
  )
}

export default AvatarMenu
