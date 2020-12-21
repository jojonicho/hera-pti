import { Icon, Spinner, Stack } from '@chakra-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DISCUSSION_URL } from 'constants/urls'
import { request } from 'services/api'
import { DiscussionList } from './DiscussionList'

export const DiscussionCreate = ({ fieldName, targetProjectId, targetPageId }) => {
  const [state, setState] = useState({ data: null, loading: false })

  const onSubmit = async () => {
    setState(prev => ({ data: prev.data, loading: true }))
    const [data] = await request(
      DISCUSSION_URL,
      {
        target_project: targetProjectId,
        target_page: targetPageId,
        target_field_name: fieldName,
      },
      'POST',
    )
    setState({ data, loading: false })
  }
  return !state.data ? (
    !state.loading ? (
      <Stack align="center" justify="center" height="2rem">
        <Icon
          position="absolute"
          marginTop="-0.125rem"
          cursor="pointer"
          name="small-add"
          onClick={onSubmit}
        />
        <Icon size={['1.2rem', '1.5rem']} name="chat" cursor="pointer" />
      </Stack>
    ) : (
      <Spinner />
    )
  ) : (
    <DiscussionList label={fieldName} discussions={[state.data]} isActive />
  )
}

DiscussionCreate.propTypes = {
  fieldName: PropTypes.string.isRequired,
  targetProjectId: PropTypes.string,
  targetPageId: PropTypes.string,
}
