import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/core'

import Layout from '../index'
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
    <Layout footer={footer} navbar={navbar}>
      {children}
    </Layout>
  )
}

RequesterLayout.propTypes = {
  children: PropTypes.element,
}

export default RequesterLayout
