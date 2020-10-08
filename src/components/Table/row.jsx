import React, { useState } from 'react'
import {
  Box,
  Button,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/core'
import { STATUS } from '../../constants/status'
import { generateDateFormat1, generateDateFormat2 } from '../../utils/table/generateDateFormat'
import generateLogoByRequester from '../../utils/table/generateLogoByRequester'
import generateStatusBadgeProps from '../../utils/table/generateStatusBadgeProps'
import PropTypes from 'prop-types'
import commonPropTypes from '../../utils/proptype/commonPropTypes'

const ADMIN_COLUMN_WIDTH_DISTRIBUTION = {
  name: '50%',
  status: '15%',
  lastUpdated: '20%',
  versions: '10%',
  discussion: '5%',
}

const REGULAR_COLUMN_WIDTH_DISTRIBUTION = {
  name: '55%',
  status: '17%',
  lastUpdated: '23%',
  discussion: '5%',
}

const Row = ({ project, isAdmin }) => {
  const [isModalShown, setIsModalShown] = useState(false)

  const widthDistribution = isAdmin
    ? ADMIN_COLUMN_WIDTH_DISTRIBUTION
    : REGULAR_COLUMN_WIDTH_DISTRIBUTION

  const badgeProps = generateStatusBadgeProps(project.status.toLowerCase())

  return (
    <Box
      bg="card"
      rounded="18px"
      width="100%"
      mb="10px"
      px="30px"
      py="10px"
      color="#000"
      fontWeight="500"
      d="flex"
      justifyContent="space-around"
      alignItems="center"
    >
      <Modal isOpen={isModalShown && isAdmin}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box px="50px" py="60px" display="flex" flexDir="column" alignItems="center">
              <Text mb="5px">You&apos;re about to change {project.title} to</Text>
              <Select
                fontSize="30px"
                fontWeight="700"
                icon="triangle-down"
                width="65%"
                mb="20px"
                variant="unstyled"
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
                  onClick={() => setIsModalShown(false)}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box w={widthDistribution.name} display="flex" alignItems="center">
        <Box w="8%">
          <Image h="55px" src={generateLogoByRequester(project.requester)}></Image>
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
          {project.status}
        </Box>
      </Box>
      <Text w={widthDistribution.lastUpdated} textAlign="center" color="secondary">
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
      <Box
        w={widthDistribution.discussion}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Text paddingRight="5px">{project.sum_unread_count}</Text>
        <Icon name="chat" size="1.1em" />
      </Box>
    </Box>
  )
}

Row.propTypes = {
  project: commonPropTypes.project,
  isAdmin: PropTypes.bool.isRequired,
}

export default Row
