import { Text, ButtonGroup, Button, Stack } from '@chakra-ui/core'
import React from 'react'

import { AUTH_TOKEN_STORAGE_KEY } from '../constants'

export const Home = () => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)

  if (token) {
    headers.append('Authorization', `Token ${token}`)
  }

  return (
    <Stack>
      <Text>Hello</Text>
      <ButtonGroup spacing={4}>
        <Button variantColor="teal" variant="solid">
          Button
        </Button>
        <Button variantColor="teal" variant="outline">
          Button
        </Button>
        <Button variantColor="teal" variant="ghost">
          Button
        </Button>
        <Button variantColor="teal" variant="link">
          Button
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
