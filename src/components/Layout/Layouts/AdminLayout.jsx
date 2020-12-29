import React from 'react'
import PropTypes from 'prop-types'

import LayoutComponent from '../LayoutComponent/'
import { Footer, Navbar, NavItem } from 'components'

export const AdminLayout = ({ children }) => {
  const footer = <Footer />
  const navbar = (
    <Navbar
      navItems={[
        <NavItem key={1} to="/dashboard">
          Dashboard
        </NavItem>,
      ]}
    />
  )

  return (
    <LayoutComponent footer={footer} navbar={navbar}>
      {children}
    </LayoutComponent>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.element,
}

export default AdminLayout
