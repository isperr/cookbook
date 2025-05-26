import {Route, Routes} from 'react-router'

import {useAuth} from './hooks/auth/use-auth'
import AppBar from './molecules/AppBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'
import './fire'
import RecipePage from './pages/RecipePage'
import AddPage from './pages/AddPage'

const App = () => {
  const {canEdit, isLoggedIn} = useAuth()

  return (
    <>
      {isLoggedIn && <AppBar />}
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes/:recipeId" element={<RecipePage />} />
            {canEdit && <Route path="/new" element={<AddPage />} />}

            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
        {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
      </Routes>
    </>
  )
}

export default App
