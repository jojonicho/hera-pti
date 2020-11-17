import { createContext } from 'react'

export const UserContext = createContext({
  user: null,
  login: null,
  logout: null,
})
