import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Stack, Text } from '@chakra-ui/core'

export const Message = ({ id, isAdmin, username, content, createdAt }) => {
  return (
    <Stack key={id} spacing={0} mt={2}>
      <Stack isInline align="center" justify="space-between">
        <Stack isInline align="center">
          <Text color={isAdmin ? 'yellow.500' : 'blue.500'} fontWeight="bold">
            {username}
          </Text>
          {isAdmin && <Badge variantColor="yellow">admin</Badge>}
        </Stack>
        <Text color="gray.600">{createdAt}</Text>
      </Stack>
      <Text>{content}</Text>
    </Stack>
  )
}

Message.propTypes = {
  id: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}
