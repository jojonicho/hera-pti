import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { css, Global } from '@emotion/react'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Facebook as Loader } from 'react-content-loader'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'

import { AUTH_TOKEN_STORAGE_KEY } from 'constants/auth'
import { LandingPage, Dashboard } from 'containers'
import { UserContext } from 'utils/datastore/UserContext'
import theme from 'utils/theme'
import { loginApi, userInfoApi } from 'services/user'

export const Routes = () => {
  const history = useHistory()
  const [user, setUser] = useState(null)

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)),
  )
  const refreshAuthStatus = useCallback(() => {
    setIsAuthenticated(Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
    setUser(null)
    refreshAuthStatus()
  }, [refreshAuthStatus])

  const value = useMemo(() => ({ user, setUser, logout }), [user, setUser, logout])

  const getUser = useCallback(async () => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
    if (token) {
      const [data, error] = await userInfoApi()
      if (error) {
        refreshAuthStatus()
        setUser(null)
        return
      }

      setUser(data)
    } else {
      refreshAuthStatus()
      setUser(null)
    }
  }, [refreshAuthStatus])

  useEffect(() => {
    getUser()
  }, [refreshAuthStatus, getUser, isAuthenticated])

  const login = useCallback(
    async token => {
      const [data, error] = await loginApi({ access_token: token.accessToken, code: '' })
      if (error) {
        setUser(null)
        return
      }

      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.key)
      refreshAuthStatus()
      getUser()
      history.push('/')
    },
    [refreshAuthStatus, getUser, history],
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
        `}
      />
      <BrowserRouter>
        <UserContext.Provider value={value}>
          <CSSReset />
          {isAuthenticated ? (
            !user ? (
              <Loader />
            ) : (
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/" component={Dashboard} />
              </Switch>
            )
          ) : (
            <LandingPage login={login} />
          )}
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
