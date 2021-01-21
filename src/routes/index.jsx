import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { css, Global } from '@emotion/react'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoutes'
import ContextProvider from 'utils/datastore/ContextProvider'
import theme from 'utils/theme'
import globalStyles from 'constants/globalStyles'
import {
  LandingPage,
  Dashboard,
  NotFoundPage,
  ProjectDetails,
  PageDetails,
  UserManagementPage,
} from 'containers'

export const Routes = () => (
  <ThemeProvider theme={theme}>
    <Global
      styles={css`
        ${globalStyles}
      `}
    />
    <BrowserRouter basename="/requirements-gatherer">
      <ContextProvider>
        <CSSReset />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute path="/project/create/" component={() => <ProjectDetails create />} />
          <ProtectedRoute
            path="/project/:projectId/history/"
            component={() => <ProjectDetails isHistory />}
          />
          <ProtectedRoute path="/project/:projectId/" component={ProjectDetails} />
          <ProtectedRoute path="/dashboard/" component={Dashboard} />
          <ProtectedRoute path="/page/:pageId/create/" component={() => <PageDetails create />} />
          <ProtectedRoute
            path="/page/:pageId/history/"
            component={() => <PageDetails isHistory />}
          />
          <ProtectedRoute path="/page/:pageId/" component={PageDetails} />
          <ProtectedRoute path="/users/" component={UserManagementPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ContextProvider>
    </BrowserRouter>
  </ThemeProvider>
)
