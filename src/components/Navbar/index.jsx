import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  Text,
  Button,
  Image,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/core'
import { Instagram } from 'react-content-loader'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from 'assets/logo.svg'
import { UserContext } from 'utils/datastore/UserContext'
import Footer from 'components/Footer'

const Navbar = ({ children, logout }) => {
  const { user } = useContext(UserContext)
  return (
    <Stack justify="space-between" h="100vh">
      <Stack spacing={1} isInline align="center" justify="space-between" p={'8px'} bg="brand">
        <Stack isInline ml={2} color="white" align="center">
          <Link to="/">
            <Logo cursor="pointer" fill="white" width="30px" height="30px" />
          </Link>
          <Text fontSize="calc(0.7rem + 0.2vw)" ml={2}>
            Requirements Gatherer
          </Text>
        </Stack>
        {!user ? (
          <Instagram />
        ) : (
          <Stack align="center" justify="space-between" isInline spacing={2}>
            {!user.is_admin && (
              <Button fontSize="calc(0.5rem + 0.3vw)" bg="accent" leftIcon="add" height="30px">
                New Project
              </Button>
            )}
            <Image src={user.picture} alt="google-profile" width="30px" borderRadius="50%" />
            <Text fontSize="calc(0.7rem + 0.2vw)" color="white">
              {user.name}
            </Text>
            <Popover trigger="click" placement="bottom-end">
              <PopoverTrigger>
                <Icon color="white" cursor="pointer" mr={2} name="triangle-down" size="12px" />
              </PopoverTrigger>
              <PopoverContent width="200px" border="0">
                <PopoverBody p="0">
                  <Stack spacing={0}>
                    <Button variant="outline">Dashboard</Button>
                    <Button variant="outline" onClick={logout}>
                      Logout
                    </Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Stack>
        )}
      </Stack>
      <Stack align="center" justify="center">
        {children}
      </Stack>
      <Footer />
    </Stack>
  )
}

Navbar.propTypes = {
  children: PropTypes.element,
  logout: PropTypes.func.isRequired,
}

export default Navbar
