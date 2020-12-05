import { useToast } from '@chakra-ui/core'
import { useState, useCallback, createContext } from 'react'

import { AUTH_TOKEN_STORAGE_KEY } from 'constants/auth'
import { loginApi, userInfoApi } from 'services/user'

export const UserContext = createContext({
  user: null,
  login: null,
  logout: null,
})

export const useUserContext = () => {
  const [user, setUser] = useState(null)
  const [userIsLoading, setUserIsLoading] = useState(true)

  const toast = useToast()
  const errorToast = useCallback(
    err => {
      toast({
        title: 'An error occurred.',
        description: err && err.error ? err.error : 'unknown error',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.log(err)
    },
    [toast],
  )

  const getUser = useCallback(async () => {
    setUserIsLoading(true)
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
    if (token) {
      const [data, error] = await userInfoApi()
      setUserIsLoading(false)
      if (error) {
        setUser(null)
        errorToast(error)
        return
      }
      setUser(data)
      return data
    }
    setUserIsLoading(false)
  }, [errorToast])

  const login = useCallback(
    async res => {
      if ('accessToken' in res) {
        const [data, error] = await loginApi({
          access_token: res.accessToken,
          code: '',
        })
        if (error) {
          setUser(null)
          errorToast(error.error)
          return
        }
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.key)
        return await getUser()
      }
    },
    [getUser, errorToast],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
    setUser(null)
  }, [])

  return { user, login, logout, getUser, userIsLoading }
}
