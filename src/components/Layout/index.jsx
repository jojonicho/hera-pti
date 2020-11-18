import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import RequesterLayout from './Layouts/RequesterLayout'
import AdminLayout from './Layouts/AdminLayout'
import { UserContext } from 'utils/datastore/UserContext'

export const Layout = ({ children }) => {
  const { user } = useContext(UserContext)

  let Layout
  if (user && user.is_admin) {
    Layout = AdminLayout
  } else {
    Layout = RequesterLayout
  }

  return <Layout>{children}</Layout>
}

Layout.propTypes = {
  children: PropTypes.element,
}

export default Layout
