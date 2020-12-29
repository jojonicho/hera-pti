import { Heading, Stack, Text } from '@chakra-ui/core'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Layout } from 'components'
import { ApiContext } from 'utils/datastore/ApiContext'

const ErrorPage = () => {
  const { error } = useContext(ApiContext)
  console.log(error)
  return (
    <Layout>
      <Stack align="center" justify="center" minHeight="90%" minWidth="100vw" spacing="0.1rem">
        <Text>Something went wrong :(</Text>
        <Heading>{error.response.statusText}</Heading>
        <Text>
          &quot; <i>{error.error.detail || error.error.message}</i> &quot;
        </Text>
        <Text>
          Click
          <Link to="/" style={{ textDecoration: 'underline', margin: '0 0.3em' }}>
            here
          </Link>
          to go back to our main page
        </Text>
      </Stack>
    </Layout>
  )
}

export default ErrorPage
