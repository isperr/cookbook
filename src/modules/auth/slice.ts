import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../utils/store'

// Define a type for the slice state
interface AuthState {
  isLoading: boolean
  isLoggedIn: boolean
  username: string | null
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  username: null
}

export const authState = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: state => {
      state.isLoading = true
    },
    loginSuccess: state => {
      state.isLoading = false
      state.isLoggedIn = true
    },
    loginFailure: state => {
      state.isLoading = false
      state.isLoggedIn = false
    },
    logout: state => {
      state.isLoading = true
    },
    logoutSuccess: state => {
      state.isLoading = false
      state.isLoggedIn = false
    },
    logoutFailure: state => {
      state.isLoading = false
      state.isLoggedIn = true
    },
    setValidUser: (state, action: PayloadAction<string | null>) => {
      state.isLoggedIn = true
      state.username = action.payload
    }
  }
})

export const {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  setValidUser
} = authState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsLoading = (state: RootState) => state.auth.isLoading
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectUsername = (state: RootState) => state.auth.username

export default authState.reducer
