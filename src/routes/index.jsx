import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { css, Global } from '@emotion/react'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Facebook as Loader } from 'react-content-loader'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'

import { AUTH_TOKEN_STORAGE_KEY, USER_URL, TOKEN_URL } from 'constants/auth'
import { LandingPage } from 'containers'
import { UserContext } from 'utils/datastore/UserContext'
import theme from 'utils/theme'

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
      try {
        const response = await fetch(USER_URL, {
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          }),
          method: 'GET',
        })
        const json = await response.json()
        setUser(json)
      } catch (e) {
        console.log(e)
        refreshAuthStatus()
        setUser(null)
      }
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
      try {
        // for some reason ga work kalo pake yang di auth/constants
        const headers = new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        })

        const response = await fetch(TOKEN_URL, {
          headers,
          method: 'POST',
          body: JSON.stringify({ access_token: token.accessToken, code: '' }),
        })

        const authToken = await response.json()
        if (authToken.detail) {
          console.log(response)
          return
        }
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, authToken.key)
        refreshAuthStatus()
        getUser()
        history.push('/')
      } catch (e) {
        console.log(e)
        setUser(null)
      }
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
