import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Text, Button, Stack, useToast } from '@chakra-ui/core'
import GoogleLogin from 'react-google-login'

import { ReactComponent as Logo } from 'assets/logo.svg'
import { UserContext } from 'utils/datastore/UserContext'
import { GOOGLE_CLIENT_ID } from 'constants/auth'
import { Layout } from 'components/Layout'

const LandingPage = () => {
  const { user, login } = useContext(UserContext)

  const toast = useToast()
  const loginToast = loginUser =>
    toast({
      title: `Welcome back, ${loginUser.email}`,
      description: loginUser.is_admin && 'You are an admin',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  const errorToast = err => {
    toast({
      title: 'An error occurred.',
      description: err.error,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
    console.log(err)
  }
  return (
    <Layout>
      <Stack alignItems="center" justifyContent="center" flexGrow={1}>
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
                <Link to="/dashboard">Visit Dashboard</Link>
              </Button>
            </Stack>
          ) : (
            <>
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={async token => {
                  const loginUser = await login(token)
                  loginToast(loginUser)
                }}
                onFailure={err => {
                  errorToast(err)
                }}
                cookiePolicy={'single_host_origin'}
              />
            </>
          )}
        </Stack>
      </Stack>
    </Layout>
  )
}

export default LandingPage
