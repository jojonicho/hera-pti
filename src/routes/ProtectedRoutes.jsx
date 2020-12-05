import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from 'utils/datastore/UserContext'

const ProtectedRoute = ({ render: Render, component: Component, ...rest }) => {
  const { user } = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          if (Render) return <Render />
          return <Component />
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: {
                referrer: location,
              },
            }}
          />
        )
      }}
    />
  )
}

ProtectedRoute.propTypes = {
  render: PropTypes.element,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default ProtectedRoute
