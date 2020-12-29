import {
  Badge,
  Box,
  Button,
  Icon,
  IconButton,
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
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react'
import { DISCUSSION_URL } from 'constants/urls'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { Code as Loader } from 'react-content-loader'
import { request } from 'services/api'
import { putDiscussionStatusById } from 'services/discussion'
import { UserContext } from 'utils/datastore/UserContext'
import { toDateString } from 'utils/date/date'
import convertFieldName from 'utils/discussion/fieldNameConverter'
import { getColorFromNumber } from 'utils/discussion/numberToColor'
import { DiscussionDetail } from './DiscussionDetail'

export const DiscussionList = ({
  discussions,
  isActive,
  isReadOnly,
  label,
  targetFieldName,
  targetPageId,
  targetProjectId,
}) => {
  const { user } = useContext(UserContext)
  const [state, setState] = useState({ loading: false, data: discussions || [] })
  const {
    id,
    message_unread_by_admin_count: messageUnreadByAdminCount,
    message_unread_by_requester_count: messageUnreadByRequesterCount,
  } = state.data[0]
  const messageUnreadCount = user.is_admin
    ? messageUnreadByAdminCount
    : messageUnreadByRequesterCount
  const toast = useToast()
  const [isResolved, setIsResolved] = useState(state.data[0].resolved_at != null)
  const onResolve = async id => {
    setState(prev => ({ data: prev.data, loading: true }))
    const [data, error] = await putDiscussionStatusById(!isActive, id)
    if (error) {
      console.log(error)
      toast({
        title: 'An error occurred.',
        description: error.statusText,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setState(prev => ({ data: prev.data, loading: false }))
      return
    }
    setIsResolved(true)
    setState(prev => ({ data: [data, ...prev.data.slice(1)], loading: false }))
  }

  const [unreadCount, setUnreadCount] = useState(messageUnreadCount || 0)

  const onOpen = () => {
    setUnreadCount(0)
  }

  const onCreate = async () => {
    setState(prev => ({ data: prev.data, loading: true }))
    const [data, error] = await request(
      DISCUSSION_URL,
      {
        target_project: targetProjectId,
        target_page: targetPageId,
        target_field_name: targetFieldName,
      },
      'POST',
    )
    if (error) {
      console.log(error)
      toast({
        title: 'An error occurred.',
        description: error.statusText,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setState(prev => ({ data: prev.data, loading: false }))
      return
    }
    setIsResolved(false)
    setState(prev => ({ data: [data, ...prev.data], loading: false }))
  }

  return (
    <Stack align="center" justify="center" maxH="100vh">
      <Badge
        textAlign="center"
        mt={['3.5px', '2.5px']}
        zIndex={1}
        fontSize={['0.6rem', '0.8rem']}
        minWidth={['1rem', '1.2rem']}
        position="absolute"
        variantColor={getColorFromNumber(unreadCount)}
      >
        {unreadCount}
      </Badge>

      <Popover trigger="click" placement="right" onOpen={onOpen}>
        <PopoverTrigger>
          <Icon size={['1.2rem', '1.5rem']} name="chat" cursor="pointer" zIndex={2} />
        </PopoverTrigger>
        {state.loading ? (
          <Loader />
        ) : (
          <PopoverContent bg="card" border="0" zIndex={999} overflowY="scroll">
            <PopoverHeader fontWeight="bold" border="0" fontSize="20px">
              <Stack isInline justify="space-between" mr="10%" align="center">
                <Text>{convertFieldName(label)}</Text>
                {!isReadOnly &&
                  (isResolved ? (
                    <IconButton icon="add" onClick={onCreate} />
                  ) : (
                    user.is_admin && (
                      <Button
                        variant="outline"
                        size="sm"
                        variantColor="blue"
                        onClick={() => onResolve(id)}
                      >
                        Resolve
                      </Button>
                    )
                  ))}
              </Stack>
            </PopoverHeader>
            <PopoverCloseButton mt={2} mr={1} />
            <PopoverArrow />
            <PopoverBody>
              <Accordion defaultIndex={!isResolved && [0]} allowToggle maxH="90vh">
                {state.data.map((discussion, idx) => {
                  const isDiscussionResolved = Boolean(discussion.resolved_at)
                  return (
                    <AccordionItem key={idx}>
                      <AccordionButton
                        mb={4}
                        _hover={{
                          transform: 'scale(1.02) translate(0.5rem,0)',
                        }}
                      >
                        <Badge variantColor={isDiscussionResolved ? 'gray' : 'purple'} w="100%">
                          <Box
                            boxShadow="base"
                            bg={isDiscussionResolved ? 'gray' : 'purple'}
                            p="0.4rem"
                          >
                            <Stack isInline justifyContent="space-between">
                              <Text>
                                {discussion.resolved_at
                                  ? toDateString(new Date(discussion.resolved_at))
                                  : 'Ongoing Discussion'}
                              </Text>
                              <AccordionIcon />
                            </Stack>
                          </Box>
                        </Badge>
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <DiscussionDetail
                          isHistory={!isActive}
                          discussionData={discussion}
                          isReadOnly={isReadOnly || isDiscussionResolved}
                        />
                      </AccordionPanel>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
    </Stack>
  )
}

DiscussionList.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  discussions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message_unread_by_admin_count: PropTypes.number,
      message_unread_by_requester_count: PropTypes.number,
      resolved_at: PropTypes.string,
    }),
  ).isRequired,
  isReadOnly: PropTypes.bool,
  targetFieldName: PropTypes.string,
  targetProjectId: PropTypes.string,
  targetPageId: PropTypes.string,
}
