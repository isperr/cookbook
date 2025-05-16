import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../utils/store'

// Define a type for the slice state
interface RegistrationState {
  isLoading: boolean
}

// Define the initial state using that type
const initialState: RegistrationState = {
  isLoading: false
}

export const registrationState = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    register: state => {
      state.isLoading = true
    },
    registerSuccess: state => {
      state.isLoading = false
    },
    registerFailure: state => {
      state.isLoading = false
    }
  }
})

export const {register, registerFailure, registerSuccess} =
  registrationState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsLoading = (state: RootState) =>
  state.registration.isLoading

export default registrationState.reducer
