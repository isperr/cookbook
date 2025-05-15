import {Route, Routes} from 'react-router'
import {Paper, Typography, useScrollTrigger} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Slide from '@mui/material/Slide'

import './App.css'
import './fire'
import LoginPage from './pages/LoginPage'
import {useAuth} from './hooks/auth/use-auth'
import {useLogin} from './hooks/auth/use-login'
import Button from './atoms/Button'
import HomePage from './pages/HomePage'

const App = () => {
  const {isLoggedIn} = useAuth()
  const {onLogout} = useLogin()

  return (
    <>
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="*" element={<HomePage />} />
          </>
        )}
        {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
      </Routes>
    </>
  )
}

export default App
