import React, { useState } from 'react'
import {
  Box,
  Button,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/core'
import { Code } from '@chakra-ui/react'
import { STATUS } from 'constants/status'
import { generateDateFormat1, generateDateFormat2 } from 'utils/table/generateDateFormat'
import generateLogoByRequester from 'utils/table/generateLogoByRequester'
import generateStatusBadgeProps from 'utils/table/generateStatusBadgeProps'
import processStatus from 'utils/table/processStatus'
import PropTypes from 'prop-types'
import { projectPropTypes } from 'constants/proptypes/project'
import { VersionHistoryModal } from 'components'

const SUPER_ADMIN_COLUMN_WIDTH_DISTRIBUTION = {
  name: '40%',
  status: '10%',
  lastUpdated: '15%',
  versions: '12%',
  receiver: '10%',
  discussion: '5%',
  delete: '8%',
}

const ADMIN_COLUMN_WIDTH_DISTRIBUTION = {
  name: '45%',
  status: '10%',
  lastUpdated: '18%',
  versions: '12%',
  discussion: '7%',
  delete: '8%',
}

const REGULAR_COLUMN_WIDTH_DISTRIBUTION = {
  name: '55%',
  status: '17%',
  lastUpdated: '23%',
  discussion: '5%',
}

const Row = ({ project, isAdmin, isSuperAdmin, handleClickDeleteButton, handleChangeStatus }) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const [isVerificationModalShown, setIsVerificationModalShown] = useState(false)
  const [deleteTitle, setDeleteTitle] = useState('')
  const [isVersionModalShown, setIsVersionModalShown] = useState(false)
  const [option, setOption] = useState('draft')

  const widthDistribution = isSuperAdmin
    ? SUPER_ADMIN_COLUMN_WIDTH_DISTRIBUTION
    : isAdmin
    ? ADMIN_COLUMN_WIDTH_DISTRIBUTION
    : REGULAR_COLUMN_WIDTH_DISTRIBUTION

  const badgeProps = generateStatusBadgeProps(project.status.toLowerCase())

  return (
    <Box
      bg="card"
      rounded="18px"
      width="100%"
      maxHeight="4rem"
      mb="1rem"
      px="2rem"
      py="1rem"
      color="#000"
      fontWeight="500"
      d="flex"
      justifyContent="space-around"
      alignItems="center"
    >
      <Modal isOpen={isModalShown && isAdmin}>
        <ModalOverlay />
        <ModalContent borderRadius="10px">
          <ModalBody>
            <Box px="50px" py="60px" display="flex" flexDir="column" alignItems="center">
              <Text mb="5px">You are about to change {project.title} to</Text>
              <Select
                fontSize="1.25rem"
                padding="0.25rem"
                fontWeight="700"
                icon="triangle-down"
                width="65%"
                mb="20px"
                variant="unstyled"
                onChange={e => setOption(processStatus(e.target.value))}
              >
                {STATUS.map(status => (
                  <option key={status}>{status}</option>
                ))}
              </Select>
              <Box display="flex" justifyContent="space-around" width="100%">
                <Button width="45%" variant="outline" onClick={() => setIsModalShown(false)}>
                  Cancel
                </Button>
                <Button
                  width="45%"
                  bg="primary"
                  color="white"
                  onClick={() => {
                    handleChangeStatus(project.id, option)
                    setIsModalShown(false)
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isVerificationModalShown && isAdmin}>
        <ModalOverlay />
        <ModalContent borderRadius="10px">
          <ModalBody>
            <Box px="50px" py="60px" display="flex" flexDir="column" alignItems="center">
              <Text>
                You are about to <b>permanently delete</b> this project. Please type the following
                to confirm:
              </Text>
              <Code backgroundColor="form">{project.title}</Code>
              <Input
                id="delete"
                borderRadius="md"
                borderColor="border"
                my="20px"
                onChange={e => setDeleteTitle(e.target.value)}
              />
              <Box display="flex" justifyContent="space-around" width="100%">
                <Button
                  width="45%"
                  variant="outline"
                  onClick={() => {
                    setDeleteTitle('')
                    setIsVerificationModalShown(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  width="45%"
                  bg="rejectedBadge"
                  isDisabled={deleteTitle !== project.title}
                  color="white"
                  onClick={() => {
                    handleClickDeleteButton(project.id, deleteTitle)
                    setIsVerificationModalShown(false)
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <VersionHistoryModal
        projectId={project.id}
        isModalShown={isVersionModalShown}
        setIsModalShown={setIsVersionModalShown}
        isAdmin={isAdmin}
      />
      <Box w={widthDistribution.name} display="flex" alignItems="center" paddingRight="5px">
        <Box w="8%" justifyContent="center" alignItems="center">
          <Image
            src={generateLogoByRequester(project.department)}
            maxHeight="3.5rem"
            maxWidth="3.5rem"
          />
        </Box>
        <Box marginLeft="20px">
          {project.title}
          <Text fontSize="0.8em" fontWeight="400" color="secondary">
            {project.description}
          </Text>
        </Box>
      </Box>
      <Box w={widthDistribution.status} display="flex" justifyContent="center">
        <Box
          as="button"
          onClick={() => setIsModalShown(true)}
          p={1}
          width="7em"
          borderRadius="0.7em"
          bg={badgeProps.bg}
          color={badgeProps.color}
          textTransform="capitalize"
        >
          {project.status === 'in_review' ? 'In Review' : project.status}
        </Box>
      </Box>
      <Text
        w={widthDistribution.lastUpdated}
        textAlign="center"
        color="secondary"
        cursor="pointer"
        onClick={() => setIsVersionModalShown(true)}
      >
        {generateDateFormat1(project.updated_at)}
      </Text>
      {isAdmin && (
        <Box w={widthDistribution.versions} display="flex" justifyContent="center">
          <Box>
            <Text>Version {project.version}</Text>
            <Text fontSize="0.8em" fontWeight="400" color="secondary" textAlign="right">
              {generateDateFormat2(project.created_at)}
            </Text>
          </Box>
          <IconButton
            icon="triangle-down"
            variant="ghost"
            aria-label="Trigger version history"
            size="sm"
          />
        </Box>
      )}
      {isSuperAdmin && (
        <Box w={widthDistribution.receiver}>
          <Text textAlign="center">{project.receiver.name}</Text>
        </Box>
      )}
      <Box w={widthDistribution.discussion}>
        <Box w="70%" display="flex" justifyContent="flex-end">
          <Text paddingRight="5px">
            {isAdmin
              ? project.message_unread_by_admin_count
              : project.message_unread_by_requester_count}
          </Text>
          <Icon name="chat" size="1.1em" />
        </Box>
      </Box>
      {isAdmin && (
        <Box w={widthDistribution.delete} display="flex" justifyContent="center">
          <Button
            bg="rejectedBadge"
            color="white"
            size="sm"
            onClick={() => setIsVerificationModalShown(true)}
          >
            Delete
          </Button>
        </Box>
      )}
    </Box>
  )
}

Row.propTypes = {
  project: projectPropTypes,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  handleClickDeleteButton: PropTypes.func,
  handleChangeStatus: PropTypes.func,
}

export default Row
