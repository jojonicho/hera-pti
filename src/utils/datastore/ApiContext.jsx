import React, { useState, createContext } from 'react'

import { childrenPropTypes } from 'constants/proptypes/general'

export const ApiContext = createContext({
  error: null,
  setError: null,
})

export const ApiProvider = ({ children }) => {
  const [error, setError] = useState(null)

  return (
    <ApiContext.Provider
      value={{
        error,
        setError,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

ApiProvider.propTypes = {
  children: childrenPropTypes.isRequired,
}
