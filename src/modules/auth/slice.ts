import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DocumentData} from 'firebase/firestore'

import {getUserInitials, getUserName} from './util'

export type UserDocumentData = DocumentData & {
  canEdit: boolean
  firstName: string | null
  lastName: string | null
  username: string
}

// Define a type for the slice state
interface AuthState {
  hasLoggedIn: boolean
  isLoading: boolean
  isLoggedIn: boolean
  isLoggedOut: boolean
  name?: string
  user?: UserDocumentData
  initials?: string
}

// Define the initial state using that type
const initialState: AuthState = {
  hasLoggedIn: false,
  isLoading: false,
  isLoggedIn: false,
  isLoggedOut: false,
  name: undefined,
  user: undefined,
  initials: undefined
}

export const authState = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: state => {
      state.isLoading = true
      state.isLoggedOut = false
    },
    loginSuccess: state => {
      state.isLoading = false
      state.hasLoggedIn = true
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
      state.name = undefined
      state.user = undefined
      state.initials = undefined
      state.isLoggedOut = true
    },
    logoutFailure: state => {
      state.isLoading = false
      state.isLoggedIn = true
    },
    setValidUser: (state, action: PayloadAction<UserDocumentData>) => {
      const user = action.payload

      const username = getUserName(user)
      state.initials = getUserInitials(username)
      state.name = username
      state.user = user

      state.isLoggedIn = true
      state.hasLoggedIn = false
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

export default authState.reducer
