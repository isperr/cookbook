import {UserDocumentData} from './slice'

export const getUserName = (user: UserDocumentData) => {
  const {firstName, lastName, username} = user
  if (firstName || lastName) {
    return [firstName, lastName].filter(Boolean).join(' ')
  }

  return username
}

export const getUserInitials = (username: string) =>
  username
    .split(' ')
    .map(name => name.substring(0, 1).toUpperCase())
    .join('')
