import React, { useContext } from 'react'
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
  useToast,
} from '@chakra-ui/core'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from 'assets/logo.svg'
import { UserContext } from 'utils/datastore/UserContext'
import PropTypes from 'prop-types'
import { useWindowSize } from 'hooks'

const Navbar = ({ navItems }) => {
  const { user, logout } = useContext(UserContext)
  const { isMobile } = useWindowSize()
  const toast = useToast()

  return (
    <Stack
      spacing={1}
      isInline
      align="center"
      justify="space-between"
      p="2"
      pr={['2', '1.5vw']}
      bg="brand"
      minWidth="100vw"
    >
      <Link to="/">
        <Stack isInline ml={2} color="white" align="center">
          <Logo cursor="pointer" fill="white" width="30px" height="30px" />
          <Text fontSize="calc(0.7rem + 0.2vw)" ml={2}>
            Requirements Gatherer
          </Text>
        </Stack>
      </Link>
      {user && (
        <Stack align="center" justify="space-between" isInline>
          {navItems.map(navItem => navItem)}
          <Image src={user.picture} alt="google-profile" width="30px" borderRadius="50%" />
          {!isMobile && (
            <Text fontSize="calc(0.7rem + 0.2vw)" color="white" textAlign="center">
              {user.name}
            </Text>
          )}
          <Popover trigger="click" placement="bottom-end">
            <PopoverTrigger>
              <Icon color="white" cursor="pointer" mr={2} name="triangle-down" size="12px" />
            </PopoverTrigger>
            <PopoverContent width="200px" border="0">
              <PopoverBody p="0">
                <Stack spacing={0}>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: `Goodbye, ${user.given_name}`,
                        duration: 5000,
                        isClosable: true,
                      })
                      logout()
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
      )}
    </Stack>
  )
}

export default Navbar

Navbar.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.element),
}
