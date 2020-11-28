import { ThemeProvider, CSSReset, useToast, Spinner, Box } from '@chakra-ui/core'
import { css, Global } from '@emotion/react'
import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AUTH_TOKEN_STORAGE_KEY } from 'constants/auth'
import { LandingPage, Dashboard } from 'containers'
import { UserContext } from 'utils/datastore/UserContext'
import theme from 'utils/theme'
import { loginApi, userInfoApi } from 'services/user'
import PageDetails from 'containers/PageDetails'

export const Routes = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
    setIsLoading(true)
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
    if (token) {
      const [data, error] = await userInfoApi()
      if (error) {
        setUser(null)
        errorToast(error.error)
      }
      setUser(data)
      setIsLoading(false)
      return data
    }
    setIsLoading(false)
  }, [errorToast])

  const login = useCallback(
    async token => {
      const [data, error] = await loginApi({ access_token: token.accessToken, code: '' })
      if (error) {
        setUser(null)
        errorToast(error.error)
        return
      }
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.key)
      return await getUser()
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

  if (isLoading)
    return (
      <Box
        minHeight="100vh"
        minWidth="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Box>
    )

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html {
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
            -ms-overflow-style: scrollbar;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          body {
            display: flex;
            flex-direction: column;
            font-family: ${theme.fonts.body};
          }
          input {
            border: none;
          }
          button {
            cursor: pointer;
            border: none;
          }
          h1 {
            font-family: ${theme.fonts.heading};
          }
          textarea:focus,
          button:focus,
          input:focus {
            outline: none;
          }

          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #5f637e #dedede;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #dedede;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #5f637e;
            border-radius: 20px;
            border: 2px solid #5f637e;
          }
        `}
      />
      <BrowserRouter>
        <UserContext.Provider value={{ user, login, logout }}>
          <CSSReset />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/dashboard/" component={Dashboard} />
            <Route path="/page/:pageId/create/" component={() => <PageDetails create />} />
            <Route path="/page/:pageId/history/" component={() => <PageDetails isHistory />} />
            <Route path="/page/:pageId/" component={PageDetails} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
