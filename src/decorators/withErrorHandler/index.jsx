import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ErrorPage } from 'containers'
import { ApiContext } from 'utils/datastore/ApiContext'

const withErrorHandler = Component => {
  const WrappedComponent = () => {
    const { error } = useContext(ApiContext)

    if (error) {
      return <ErrorPage />
    }
    return <Component />
  }

  return WrappedComponent
}

withErrorHandler.propTypes = {
  Component: PropTypes.func,
}

export default withErrorHandler
