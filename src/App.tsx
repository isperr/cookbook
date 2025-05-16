import {Route, Routes} from 'react-router'

import {useAuth} from './hooks/auth/use-auth'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import './App.css'
import './fire'

const App = () => {
  const {isLoggedIn} = useAuth()

  return (
    <Routes>
      {isLoggedIn && (
        <>
          <Route path="*" element={<HomePage />} />
        </>
      )}
      {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
    </Routes>
  )
}

export default App
