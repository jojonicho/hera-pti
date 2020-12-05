import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import RequesterLayout from './Layouts/RequesterLayout'
import AdminLayout from './Layouts/AdminLayout'
import SuperAdminLayout from './Layouts/SuperAdminLayout'
import { UserContext } from 'utils/datastore/UserContext'

export const Layout = ({ children }) => {
  const { user } = useContext(UserContext)

  let Layout
  if (!user) {
    Layout = RequesterLayout
  } else if (user.is_superadmin) {
    Layout = SuperAdminLayout
  } else {
    Layout = AdminLayout
  }

  return <Layout>{children}</Layout>
}

Layout.propTypes = {
  children: PropTypes.element,
}

export default Layout
