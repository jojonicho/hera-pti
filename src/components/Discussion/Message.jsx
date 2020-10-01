import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Stack, Text } from '@chakra-ui/core'

export const Message = ({ id, is_admin, username, content }) => {
  return (
    <Stack key={id} spacing={0} mb={2}>
      <Stack isInline align="center">
        <Text color={is_admin ? 'yellow.500' : 'blue.500'} fontWeight="bold">
          {username}
        </Text>
        {is_admin && <Badge variantColor="yellow">admin</Badge>}
      </Stack>
      <Text>{content}</Text>
    </Stack>
  )
}

Message.propTypes = {
  id: PropTypes.number,
  is_admin: PropTypes.bool,
  username: PropTypes.string,
  content: PropTypes.string,
}
