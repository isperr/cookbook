import {Route, Routes} from 'react-router'

import {useAuth} from './hooks/auth/use-auth'
import AppBar from './molecules/AppBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'
import './fire'

const App = () => {
  const {isLoggedIn} = useAuth()

  return (
    <>
      {isLoggedIn && <AppBar />}
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
        {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
      </Routes>
    </>
  )
}

export default App
