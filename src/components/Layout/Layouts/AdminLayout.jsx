import React from 'react'
import PropTypes from 'prop-types'

import LayoutComponent from '../LayoutComponent/'
import Footer from '../../Footer'
import Navbar from '../../Navbar'

export const AdminLayout = ({ children }) => {
  const footer = <Footer />
  const navbar = <Navbar navItems={[]} />

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