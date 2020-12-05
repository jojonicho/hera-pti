import React from 'react'
import { Link } from '@chakra-ui/core'
import { Link as RLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { childrenPropTypes } from 'constants/proptypes/general'

export const NavItem = ({ to, children }) => (
  <Link as={RLink} to={to} color="white" fontSize="calc(0.7rem + 0.2vw)" mr="calc(0.5rem + 1.5vw)">
    {children}
  </Link>
)

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: childrenPropTypes.isRequired,
}
