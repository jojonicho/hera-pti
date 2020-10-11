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
} from '@chakra-ui/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Message } from './Message'
import { useForm } from 'react-hook-form'
import { UserContext } from 'utils/datastore/UserContext'
import { DISCUSSION_BY_ID_URL, postMessageById, putDiscussionStatusById } from 'services/discussion'
import { useFetch } from 'services/api'
import { Code as Loader } from 'react-content-loader'

export const Discussion = ({
  discussionId,
  fieldName,
  messageUnreadByAdminCount,
  messageUnreadByRequesterCount,
  isActive,
}) => {
  const { user } = useContext(UserContext)
  const messageUnreadCount = user.is_admin
    ? messageUnreadByAdminCount
    : messageUnreadByRequesterCount

  const [cnt, setCount] = useState(messageUnreadCount || 0)
  const { data, loading } = useFetch(DISCUSSION_BY_ID_URL(discussionId))

  const [messages, setMessages] = useState([])

  const { register, reset, handleSubmit, formState, errors } = useForm({
    mode: 'onChange',
  })
  const onSubmit = async ({ content }) => {
    const [newMessage, error] = await postMessageById(discussionId, content)
    reset()
    if (error) {
      return
    }
    setMessages(prev => [newMessage, ...prev])
    scrollToBottom()
  }
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }

  useEffect(() => {
    if (data) {
      setMessages(data.messages)
    }
  }, [data, loading])

  let prevDate
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const messagesRef = useRef(null)

  return (
    <Stack align="center">
      <Badge
        textAlign="center"
        mt={'3.5px'}
        zIndex="-1"
        width="30px"
        position="absolute"
        variantColor="blue"
      >
        {cnt}
      </Badge>
      <Popover trigger="click" placement="right" onOpen={() => setCount(0)}>
        <PopoverTrigger>
          <Icon size="30px" name="chat" cursor="pointer" />
        </PopoverTrigger>
        <PopoverContent border="0" bg="card">
          <PopoverHeader fontWeight="bold" border="0" fontSize="20px">
            <Stack isInline justify="space-between" mr="10%" align="center">
              <Text>{fieldName}</Text>
              {user.is_admin && (
                <Button
                  variant="outline"
                  size="sm"
                  variantColor="blue"
                  onClick={() => putDiscussionStatusById(discussionId)}
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
                {loading ? (
                  <Loader />
                ) : messages && messages.length > 0 ? (
                  messages.map(({ user: messageUser, content, created_at }, id) => {
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
                      isDisabled={!formState.isValid}
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
    </Stack>
  )
}

Discussion.propTypes = {
  isActive: PropTypes.bool,
  discussionId: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  messageUnreadByAdminCount: PropTypes.number.isRequired,
  messageUnreadByRequesterCount: PropTypes.number.isRequired,
  resolvedAt: PropTypes.string,
}

export default Discussion
