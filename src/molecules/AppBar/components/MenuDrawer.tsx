import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import {Link} from 'react-router'

import {useLoadRandom} from '../../../hooks/recipe/use-load-random'

import {actions, drawerWidth} from '../constants'
import ModeItem from './ModeItem'
import LogoutItem from './LogoutItem'

export type MenuDrawerProps = {
  closeDrawer: () => void
  handleDrawerToggle: () => void
  isMobileOpen: boolean
  onActionClick: (link: string) => void
}

const MenuDrawer = ({
  closeDrawer,
  handleDrawerToggle,
  isMobileOpen,
  onActionClick
}: MenuDrawerProps) => {
  const {isButtonDisabled} = useLoadRandom()

  return (
    <nav>
      <Drawer
        anchor="right"
        container={undefined}
        variant="temporary"
        open={isMobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: {xs: 'block', sm: 'none'},
          '& .MuiDrawer-paper': {
            backgroundColor: '#6db07d',
            boxSizing: 'border-box',
            width: drawerWidth
          }
        }}
      >
        <Box className="text-center">
          <Link to="/" onClickCapture={closeDrawer}>
            <Typography className="my-[9.5px]" variant="h6">
              Menü
            </Typography>
          </Link>
          <Divider />
          <List>
            {actions.map(item => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  disabled={item.name === 'random' && isButtonDisabled}
                  onClick={() => onActionClick(item.link)}
                >
                  <ListItemIcon className="justify-center">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ModeItem type="drawer" />
            <LogoutItem type="drawer" />
          </List>
        </Box>
      </Drawer>
    </nav>
  )
}

export default MenuDrawer
