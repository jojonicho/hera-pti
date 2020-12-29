import { Button, FormControl, Input, InputGroup, Stack, Text, useToast } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Code as Loader } from 'react-content-loader'
import { useForm } from 'react-hook-form'
import { request } from 'services/api'
import { DISCUSSION_BY_ID_URL, postMessageById } from 'services/discussion'
import { toDayDateString, toTimeString } from 'utils/date/date'
import { smoothScrollToRef } from 'utils/discussion/smoothScrollToRef'
import { Message } from './Message'

export const DiscussionDetail = ({ discussionData, isHistory, isReadOnly }) => {
  const { id: discussionId, resolved_at } = discussionData

  const isResolved = Boolean(resolved_at)
  const [state, setState] = useState({ data: null, loading: false })

  const { register, reset, handleSubmit, formState, errors } = useForm({
    mode: 'onChange',
  })
  const toast = useToast()
  const onSubmit = async ({ content }) => {
    const [newMessage, error] = await postMessageById(isHistory, discussionId, content)
    reset()
    if (error) {
      console.log(error)
      toast({
        title: 'An error occurred.',
        description: error.statusText,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    setState(prev => ({ data: [newMessage, ...prev.data] }))
    smoothScrollToRef(messagesRef)
  }

  const onOpen = useCallback(async () => {
    setState(prev => ({ data: prev.data, loading: true }))
    const [response] = await request(DISCUSSION_BY_ID_URL(isHistory, discussionId))
    setState({ data: response.messages, loading: false })
  }, [discussionId, isHistory])

  useEffect(() => {
    onOpen()
  }, [onOpen])

  let prevDate
  const messagesRef = useRef(null)

  return (
    <Stack align="center" justify="center" height="100%">
      <Stack w="100%" justify="flex-end">
        <Stack maxH="25vh" overflowY="scroll" overflowX="hidden" flexDir="column-reverse">
          <Stack ref={messagesRef} />
          {state.loading ? (
            <Loader />
          ) : !state.data ? (
            <Stack align="center" justify="center" h="100%">
              <Text fontWeight="bold" color="brand">
                Discussion {isHistory && 'history'} not found.
              </Text>
            </Stack>
          ) : state.data && state.data.length > 0 ? (
            state.data.map(({ user: messageUser, content, created_at }, id) => {
              const currentDate = new Date(created_at)
              const changeDay = currentDate - prevDate >= 24 * 60 * 60
              prevDate = currentDate
              return (
                <div key={id}>
                  <Message
                    id={id}
                    isAdmin={messageUser.is_admin}
                    username={messageUser.username}
                    content={content}
                    createdAt={toTimeString(currentDate)}
                  />
                  {changeDay && (
                    <Text fontWeight="bold" color="gray.600">
                      {toDayDateString(currentDate)}
                    </Text>
                  )}
                </div>
              )
            })
          ) : (
            <Stack align="center" justify="center" h="100%">
              <Text color="gray.600">
                There seems to be nothing here.
                <br />
                Start a disccussion!
              </Text>
            </Stack>
          )}
          {prevDate && (
            <Text fontWeight="bold" color="gray.600">
              {toDayDateString(prevDate)}
            </Text>
          )}
        </Stack>
        {!isReadOnly && !isHistory && !isResolved && (
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <FormControl isInvalid={errors.content && errors.content.message}>
              <InputGroup size="md">
                <Input
                  isReadOnly={isHistory || isResolved}
                  variant="filled"
                  pr="4.5rem"
                  bg="darkCard"
                  placeholder={errors.content ? errors.content.message : 'Enter a message'}
                  name="content"
                  ref={register({
                    required: 'Message cannot be blank',
                  })}
                />
                <Button
                  ml="0.5rem"
                  size="sm"
                  variantColor="blue"
                  type="submit"
                  isDisabled={!state.data || !formState.isValid}
                  isLoading={formState.isSubmitting}
                >
                  Send
                </Button>
              </InputGroup>
            </FormControl>
          </form>
        )}
      </Stack>
    </Stack>
  )
}

DiscussionDetail.propTypes = {
  isHistory: PropTypes.bool,
  discussionData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message_unread_by_admin_count: PropTypes.number,
    message_unread_by_requester_count: PropTypes.number,
    resolved_at: PropTypes.string,
  }).isRequired,
  isReadOnly: PropTypes.bool,
}
