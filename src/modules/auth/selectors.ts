import {createSelector} from '@reduxjs/toolkit'
import {RootState} from '../../utils/store'

export const selectIsLoggedOut = (state: RootState) => state.auth.isLoggedOut
export const selectIsLoading = (state: RootState) => state.auth.isLoading
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectHasLoggedIn = (state: RootState) => state.auth.hasLoggedIn
export const selectUser = (state: RootState) => state.auth.user
export const selectName = (state: RootState) => state.auth.name
export const selectInitials = (state: RootState) => state.auth.initials

export const selectCanEdit = createSelector(selectUser, user =>
  Boolean(user?.canEdit)
)
export const selectRecipeData = (): ((state: RootState) => boolean) =>
  createSelector([(state: RootState) => selectUser(state)], user =>
    user ? user.canEdit : false
  )

export const selectShouldPreventAuthCheck = createSelector(
  selectIsLoading,
  selectIsLoggedIn,
  selectIsLoggedOut,
  (isLoading, isLoggedIn, hasLoggedOut) => {
    return isLoggedIn || isLoading || hasLoggedOut
  }
)
