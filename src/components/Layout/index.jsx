import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@chakra-ui/core'

export const Layout = ({ children, navbar, footer }) => {
  return (
    <Stack justify="space-between" h="100vh">
      {navbar}
      <Stack align="center" justify="center">
        {children}
      </Stack>
      {footer}
    </Stack>
  )
}

Layout.propTypes = {
  navbar: PropTypes.element,
  footer: PropTypes.element,
  children: PropTypes.element,
}

export default Layout
