import {useState} from 'react'
import {Route, Routes} from 'react-router'
import {Button, Paper, Typography} from '@mui/material'

import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <Routes>
      {isLoggedIn && (
        <>
          <Route
            path="*"
            element={
              <Paper className="m-4">
                <Typography>Logged in HURRAY!</Typography>
                <Button onClick={() => setIsLoggedIn(false)}>log me out</Button>
              </Paper>
            }
          />
        </>
      )}
      {!isLoggedIn && (
        <Route
          path="*"
          element={
            <Paper className="m-4">
              <Typography>Log me in</Typography>
              <Button onClick={() => setIsLoggedIn(true)}>log me in</Button>
            </Paper>
          }
        />
      )}
    </Routes>
  )
}

export default App
