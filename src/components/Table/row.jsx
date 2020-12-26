import React, { useState } from 'react'
import {
  Box,
  Button,
  Icon,
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
import { Link } from 'react-router-dom'

const Modals = ({
  project,
  isAdmin,
  isModalShown,
  setIsModalShown,
  option,
  setOption,
  handleChangeStatus,
  isVerificationModalShown,
  setIsVerificationModalShown,
  handleClickDeleteButton,
  isVersionModalShown,
  setIsVersionModalShown,
}) => {
  const [deleteTitle, setDeleteTitle] = useState('')

  return (
    <Box>
      <Modal isOpen={isModalShown && isAdmin}>
        <ModalOverlay />
        <ModalContent borderRadius="10px">
          <ModalBody>
            <Box px="2.5em" py="3em" display="flex" flexDir="column" alignItems="center">
              <Text mb="0.25em">You are about to change {project.title} to</Text>
              <Select
                fontSize="1.25rem"
                padding="0.25rem"
                fontWeight="700"
                icon="triangle-down"
                width="65%"
                mb="1em"
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
            <Box px="2.5em" py="3em" display="flex" flexDir="column" alignItems="center">
              <Text>
                You are about to <b>permanently delete</b> this project. Please type the following
                to confirm:
              </Text>
              <Code backgroundColor="form">{project.title}</Code>
              <Input
                id="delete"
                borderRadius="md"
                borderColor="border"
                my="1em"
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
    </Box>
  )
}

Modals.propTypes = {
  project: projectPropTypes,
  isAdmin: PropTypes.bool,
  isModalShown: PropTypes.bool,
  setIsModalShown: PropTypes.func,
  option: PropTypes.string,
  setOption: PropTypes.func,
  handleChangeStatus: PropTypes.func,
  isVerificationModalShown: PropTypes.bool,
  setIsVerificationModalShown: PropTypes.func,
  handleClickDeleteButton: PropTypes.func,
  isVersionModalShown: PropTypes.bool,
  setIsVersionModalShown: PropTypes.func,
}

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

export const Row = ({
  project,
  isAdmin,
  isSuperAdmin,
  handleClickDeleteButton,
  handleChangeStatus,
}) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const [isVerificationModalShown, setIsVerificationModalShown] = useState(false)
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
      mb="1rem"
      px="1.5em"
      py="0.5em"
      color="#000"
      fontWeight="500"
      d="flex"
      justifyContent="space-around"
      alignItems="center"
    >
      <Modals
        project={project}
        isAdmin
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        option={option}
        setOption={setOption}
        handleChangeStatus={handleChangeStatus}
        isVerificationModalShown={isVerificationModalShown}
        setIsVerificationModalShown={setIsVerificationModalShown}
        handleClickDeleteButton={handleClickDeleteButton}
        isVersionModalShown={isVersionModalShown}
        setIsVersionModalShown={setIsVersionModalShown}
      />
      <Box w={widthDistribution.name}>
        <Link to={`/project/${project.id}/`}>
          <Box display="flex" alignItems="center" paddingRight="0.25em">
            <Image
              src={generateLogoByRequester(project.department)}
              maxHeight="3.5rem"
              maxWidth="3.5rem"
            />
            <Box marginLeft="1em">
              {project.title}
              <Text fontSize="0.8em" fontWeight="400" color="secondary">
                {project.description}
              </Text>
            </Box>
          </Box>
        </Link>
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
        <Box w={widthDistribution.versions} display="flex" flexDir="column" alignItems="center">
          <Text>Version {project.version}</Text>
          <Text fontSize="0.8em" fontWeight="400" color="secondary" textAlign="right">
            {generateDateFormat2(project.created_at)}
          </Text>
        </Box>
      )}
      {isSuperAdmin && (
        <Box w={widthDistribution.receiver}>
          <Text textAlign="center">{project.receiver.name}</Text>
        </Box>
      )}
      <Box w={widthDistribution.discussion}>
        <Box w="70%" display="flex" justifyContent="flex-end" alignItems="center">
          <Text paddingRight="0.25em">
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

export const MobileRow = ({
  project,
  isAdmin,
  isSuperAdmin,
  handleClickDeleteButton,
  handleChangeStatus,
}) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const [isVerificationModalShown, setIsVerificationModalShown] = useState(false)
  const [isVersionModalShown, setIsVersionModalShown] = useState(false)
  const [option, setOption] = useState('draft')

  const badgeProps = generateStatusBadgeProps(project.status.toLowerCase())

  return (
    <Box bg="card" rounded="8px" width="100%" mt="1rem" fontSize="0.8em">
      <Modals
        project={project}
        isAdmin
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        option={option}
        setOption={setOption}
        handleChangeStatus={handleChangeStatus}
        isVerificationModalShown={isVerificationModalShown}
        setIsVerificationModalShown={setIsVerificationModalShown}
        handleClickDeleteButton={handleClickDeleteButton}
        isVersionModalShown={isVersionModalShown}
        setIsVersionModalShown={setIsVersionModalShown}
      />
      <Box
        w="100%"
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
        py="0.3rem"
        cursor="pointer"
        onClick={() => setIsModalShown(true)}
        {...badgeProps}
      >
        <Text textTransform="capitalize" textAlign="center">
          {project.status === 'in_review' ? 'In Review' : project.status}
        </Text>
      </Box>
      <Box d="flex" p="1rem">
        <Image
          src={generateLogoByRequester(project.department)}
          maxHeight="2.5rem"
          maxWidth="2.5rem"
        />
        <Box w="70%" ml="0.5em">
          <Text>{project.title}</Text>
          <Text fontSize="0.8em" fontWeight="400" color="secondary">
            {project.description}
          </Text>
        </Box>
      </Box>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        px="1rem"
        paddingBottom="1rem"
      >
        <Box maxWidth="60%">
          {isSuperAdmin && <Text>{project.receiver.name}</Text>}
          <Text
            textAlign="center"
            color="secondary"
            cursor="pointer"
            onClick={() => setIsVersionModalShown(true)}
          >
            {generateDateFormat1(project.updated_at)}
          </Text>
        </Box>
        {isAdmin && (
          <Box d="flex" flexDir="column" alignItems="center">
            <Text>Version {project.version}</Text>
            <Text fontSize="0.8em" fontWeight="400" color="secondary" textAlign="right">
              {generateDateFormat2(project.created_at)}
            </Text>
          </Box>
        )}
        <Box d="flex" flexDir="column" alignItems="flex-end">
          <Box d="flex" alignItems="center">
            <Text paddingRight="0.25em">
              {isAdmin
                ? project.message_unread_by_admin_count
                : project.message_unread_by_requester_count}
            </Text>
            <Icon name="chat" size="1.1em" />
          </Box>
          {isAdmin && (
            <Box cursor="pointer" onClick={() => setIsVerificationModalShown(true)}>
              <Icon name="delete" size="1.1em" color="rejectedBadge" />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

MobileRow.propTypes = {
  project: projectPropTypes,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  handleClickDeleteButton: PropTypes.func,
  handleChangeStatus: PropTypes.func,
}
