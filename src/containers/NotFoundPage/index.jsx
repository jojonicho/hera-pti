import { Heading, Stack, Text } from '@chakra-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

import { Layout } from 'components'

const NotFoundPage = () => (
  <Layout>
    <Stack
      align="center"
      justify="center"
      minHeight="90%"
      minWidth="100vw"
      spacing="0.1rem"
      padding="1em"
    >
      <Text textAlign="center">Page Not Found</Text>
      <Heading textAlign="center">The page you are looking for does not exist</Heading>
      <Text>
        Click
        <Link to="/" style={{ textDecoration: 'underline', margin: '0.3em' }}>
          here
        </Link>
        to go back to our main page.
      </Text>
    </Stack>
  </Layout>
)

export default NotFoundPage
