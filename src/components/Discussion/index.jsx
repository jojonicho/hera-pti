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
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Message } from './Message'
import { useForm } from 'react-hook-form'

export const Discussion = ({ messageUnreadCount, messages, readOnly }) => {
  const [cnt, setCount] = useState(messageUnreadCount || 0)
  const { register, reset, handleSubmit, formState, errors } = useForm({
    mode: 'onChange',
  })
  const onSubmit = () => {
    reset()
  }
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
              <Text>Discussions</Text>
              <Button variant="outline" size="sm" variantColor="blue">
                Resolve
              </Button>
            </Stack>
          </PopoverHeader>
          <PopoverCloseButton mt={2} mr={1} />
          <PopoverArrow />
          <PopoverBody>
            <Stack h="16vh" overflowY="scroll" flexDirection="column-reverse">
              {messages &&
                messages.map(({ id, is_admin, username, content }) => (
                  <Message
                    key={id}
                    id={id}
                    is_admin={is_admin}
                    username={username}
                    content={content}
                  />
                ))}
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <FormControl isInvalid={errors.content && errors.content.message !== ''}>
                <InputGroup size="md">
                  <Input
                    isReadOnly={readOnly}
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
                  >
                    Send
                  </Button>
                </InputGroup>
              </FormControl>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Stack>
  )
}

Discussion.propTypes = {
  readOnly: PropTypes.bool,
  messageUnreadCount: PropTypes.number,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      is_admin: PropTypes.bool.isRequired,
      username: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
}

export default Discussion
