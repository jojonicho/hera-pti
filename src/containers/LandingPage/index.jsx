import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Text, Button, Stack } from '@chakra-ui/core'
import GoogleLogin from 'react-google-login'

import { ReactComponent as Logo } from 'assets/logo.svg'
import { UserContext } from 'utils/datastore/UserContext'
import { GOOGLE_CLIENT_ID } from 'constants/auth'

const LandingPage = ({ login }) => {
  const { user } = useContext(UserContext)
  return (
    <Stack
      align="center"
      justify="center"
      spacing={3}
      p={5}
      width={['100%', '80%', '80vw', '33vw']}
    >
      <Logo fill="black" />
      <Text fontSize="calc(1.5rem + 0.5vw)" fontWeight="bold">
        Requirements Gatherer
      </Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, atque libero? Debitis
        deserunt ex voluptatem. Error quae, officiis reiciendis repellendus cupiditate,
        necessitatibus ducimus rem debitis non vitae voluptatum ratione veniam.
      </Text>
      {user ? (
        <Button variantColor="blue" variant="outline">
          Visit Dashboard
        </Button>
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={token => login(token)}
          onFailure={err => console.log(err)}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </Stack>
  )
}

LandingPage.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LandingPage
