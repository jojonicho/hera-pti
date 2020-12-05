import { ThemeProvider, CSSReset, Spinner, Box } from '@chakra-ui/core'
import { css, Global } from '@emotion/react'
import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoutes'
import { UserContext, useUserContext } from 'utils/datastore/UserContext'
import theme from 'utils/theme'
import { LandingPage, Dashboard, ProjectDetails, PageDetails, UserManagementPage } from 'containers'

export const Routes = () => {
  const { user, userIsLoading, getUser, login, logout } = useUserContext()

  useEffect(() => {
    getUser()
  }, [getUser])

  if (userIsLoading)
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
            <ProtectedRoute
              path="/project/create/"
              component={() => <ProjectDetails create isAdmin={user.is_admin} />}
            />
            <ProtectedRoute
              path="/project/:projectId/history/"
              component={() => <ProjectDetails isHistory isAdmin={user.is_admin} />}
            />
            <ProtectedRoute
              path="/project/:projectId/"
              component={() => <ProjectDetails isAdmin={user.is_admin} />}
            />
            <ProtectedRoute path="/dashboard/" component={Dashboard} />
            <ProtectedRoute path="/page/:pageId/create/" component={() => <PageDetails create />} />
            <ProtectedRoute
              path="/page/:pageId/history/"
              component={() => <PageDetails isHistory />}
            />
            <ProtectedRoute path="/page/:pageId/" component={PageDetails} />
            <ProtectedRoute path="/users/" component={UserManagementPage} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
