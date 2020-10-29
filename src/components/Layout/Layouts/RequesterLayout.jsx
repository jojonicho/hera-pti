import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/core'

import LayoutComponent from '../LayoutComponent/'
import Footer from '../../Footer'
import Navbar from '../../Navbar'

export const RequesterLayout = ({ children }) => {
  const footer = <Footer />
  const navbar = (
    <Navbar
      navItems={[
        <Button key={1} fontSize="calc(0.5rem + 0.3vw)" bg="accent" leftIcon="add" height="30px">
          New Project
        </Button>,
      ]}
    />
  )

  return (
    <LayoutComponent footer={footer} navbar={navbar}>
      {children}
    </LayoutComponent>
  )
}

RequesterLayout.propTypes = {
  children: PropTypes.element,
}

export default RequesterLayout
