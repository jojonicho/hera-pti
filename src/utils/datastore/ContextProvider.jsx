import React from 'react'

import { childrenPropTypes } from 'constants/proptypes/general'
import { ApiProvider } from './ApiContext'
import { UserProvider } from './UserContext'

const ContextProvider = ({ children }) => (
  <ApiProvider>
    <UserProvider>{children}</UserProvider>
  </ApiProvider>
)

ContextProvider.propTypes = {
  children: childrenPropTypes.isRequired,
}

export default ContextProvider
