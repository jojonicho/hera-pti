import React, { useContext } from 'react'
import { Text, Button, Stack } from '@chakra-ui/core'
import GoogleLogin from 'react-google-login'

import { ReactComponent as Logo } from 'assets/logo.svg'
import { UserContext } from 'utils/datastore/UserContext'
import { GOOGLE_CLIENT_ID } from 'constants/auth'
import { RequesterLayout } from 'components/Layout/Layouts/RequesterLayout'
import { Discussion } from 'components'

const LandingPage = () => {
  const { user, login } = useContext(UserContext)
  return (
    <RequesterLayout>
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
          <Stack>
            <Button variantColor="blue" variant="outline">
              Visit Dashboard
            </Button>
            <Discussion discussionId="b8c80564-6337-4409-a1ad-a690137cec3f" isActive />
          </Stack>
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
    </RequesterLayout>
  )
}

export default LandingPage
