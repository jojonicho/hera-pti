import React from 'react'
import PropTypes from 'prop-types'

import LayoutComponent from '../LayoutComponent/'
import { Footer, Navbar, NavItem } from 'components'

export const SuperAdminLayout = ({ children }) => {
  const footer = <Footer />
  const navbar = (
    <Navbar
      navItems={[
        <NavItem key={1} to="/users">
          User Management
        </NavItem>,
        <NavItem key={2} to="/dashboard">
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

SuperAdminLayout.propTypes = {
  children: PropTypes.element,
}

export default SuperAdminLayout
