import {
  Badge,
  Button,
  FormControl,
  Icon,
  Input,
  InputGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/core'
import React, { useContext, useRef, useState } from 'react'
import { UserContext } from 'utils/datastore/UserContext'
import PropTypes from 'prop-types'
import { Message } from './Message'
import { useForm } from 'react-hook-form'
import { DISCUSSION_BY_ID_URL, postMessageById, putDiscussionStatusById } from 'services/discussion'
import { Code as Loader } from 'react-content-loader'
import { request } from 'services/api'
import { smoothScrollToRef } from 'utils/discussion/smoothScrollToRef'

export const DiscussionOpen = ({ discussionData, isActive, isReadOnly }) => {
  const { user } = useContext(UserContext)
  const {
    id: discussionId,
    message_unread_by_admin_count: messageUnreadByAdminCount,
    message_unread_by_requester_count: messageUnreadByRequesterCount,
    target_field_name: targetFieldName,
  } = discussionData
  const messageUnreadCount = user.is_admin
    ? messageUnreadByAdminCount
    : messageUnreadByRequesterCount

  const [cnt, setCount] = useState(messageUnreadCount || 0)
  const [fieldName, setFieldName] = useState(targetFieldName)

  const [state, setState] = useState({ data: null, loading: false })

  const { register, reset, handleSubmit, formState, errors } = useForm({
    mode: 'onChange',
  })
  const toast = useToast()
  const onSubmit = async ({ content }) => {
    const [newMessage, error] = await postMessageById(isActive, discussionId, content)
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

  const onOpen = async () => {
    setCount(0)
    setState(prev => ({ data: prev.data, loading: true }))
    const [response] = await request(DISCUSSION_BY_ID_URL(isActive, discussionId))
    setFieldName(response.target_field_name)
    setState({ data: response.messages, loading: false })
  }

  let prevDate
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const messagesRef = useRef(null)

  return (
    <Stack align="center" justify="center" height="2rem">
      <Badge
        textAlign="center"
        mt={['3.5px', '1.5px']}
        zIndex={1}
        size={['0.8rem', '1.1rem']}
        fontSize={['0.6rem', '0.8rem']}
        minWidth={['1rem', '1.2rem']}
        position="absolute"
        variantColor={
          cnt === 0 ? 'gray' : cnt < 4 ? 'green' : cnt < 7 ? 'blue' : cnt < 11 ? 'purple' : 'red'
        }
      >
        {cnt}
      </Badge>
      {isReadOnly ? (
        <Icon size={['1.2rem', '1.5rem']} name="chat" cursor="pointer" />
      ) : (
        <Popover trigger="click" placement="right" onOpen={() => onOpen()}>
          <PopoverTrigger>
            <Icon size={['1.2rem', '1.5rem']} name="chat" cursor="pointer" zIndex={2} />
          </PopoverTrigger>
          <PopoverContent border="0" bg="card" zIndex={999}>
            <PopoverHeader fontWeight="bold" border="0" fontSize="20px">
              <Stack isInline justify="space-between" mr="10%" align="center">
                <Text>{fieldName}</Text>
                {state.data && user.is_admin && (
                  <Button
                    variant="outline"
                    size="sm"
                    variantColor="blue"
                    onClick={() => putDiscussionStatusById(isActive, discussionId)}
                  >
                    Resolve
                  </Button>
                )}
              </Stack>
            </PopoverHeader>
            <PopoverCloseButton mt={2} mr={1} />
            <PopoverArrow />
            <PopoverBody>
              <Stack h="20vh" justify="flex-end">
                <Stack h="20vh" overflowY="scroll" overflowX="hidden" flexDir="column-reverse">
                  <Stack ref={messagesRef} />
                  {state.loading ? (
                    <Loader />
                  ) : !state.data ? (
                    <Stack align="center" justify="center" h="100%">
                      <Text fontWeight="bold" color="brand">
                        Discussion {!isActive ? 'history' : null} not found.
                      </Text>
                    </Stack>
                  ) : state.data && state.data.length > 0 ? (
                    state.data.map(({ user: messageUser, content, created_at }, id) => {
                      const currentDate = new Date(created_at)
                      const changeDay = currentDate - prevDate >= 24 * 60 * 60
                      prevDate = currentDate
                      return (
                        <>
                          <Message
                            key={id}
                            id={id}
                            isAdmin={messageUser.is_admin}
                            username={messageUser.username}
                            content={content}
                            createdAt={currentDate.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })}
                          />
                          {changeDay && (
                            <Text fontWeight="bold" color="gray.600">
                              {currentDate.toLocaleDateString('en-US', options)}
                            </Text>
                          )}
                        </>
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
                      {prevDate.toLocaleDateString('en-US', options)}
                    </Text>
                  )}
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <FormControl isInvalid={errors.content && errors.content.message !== ''}>
                    <InputGroup size="md">
                      <Input
                        isReadOnly={!isActive}
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
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Stack>
  )
}

DiscussionOpen.propTypes = {
  isActive: PropTypes.bool,
  discussionData: PropTypes.objectOf({
    id: PropTypes.string.isRequired,
    message_unread_by_admin_count: PropTypes.number.isRequired,
    message_unread_by_requester_count: PropTypes.number.isRequired,
    target_field_name: PropTypes.string.isRequired,
    resolved_at: PropTypes.string,
  }).isRequired,
  isReadOnly: PropTypes.bool,
}
