import { useToast } from '@chakra-ui/core'
import React, { useState, useCallback, createContext, useEffect } from 'react'

import { LoadingPage } from 'containers'
import { childrenPropTypes } from 'constants/proptypes/general'
import { AUTH_TOKEN_STORAGE_KEY } from 'constants/auth'
import { loginApi, userInfoApi } from 'services/user'

export const UserContext = createContext({
  user: null,
  login: null,
  logout: null,
})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
    if (token) {
      setIsLoading(true)
      const [data, error] = await userInfoApi()
      setIsLoading(false)
      if (error) {
        setUser(null)
        errorToast(error)
        return
      }
      setUser(data)
      return data
    }
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

  useEffect(() => {
    getUser()
  }, [getUser])

  if (isLoading) return <LoadingPage />
  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: childrenPropTypes.isRequired,
}
