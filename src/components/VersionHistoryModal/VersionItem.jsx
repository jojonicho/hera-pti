import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Heading, Text } from '@chakra-ui/core'

const getStatusCopy = (status, user, projectHistory) => {
  if (projectHistory) {
    return `${user} updated the project.`
  }
  switch (status) {
    case 'draft':
      return 'Project is in draft.'
    case 'submitted':
      return 'Project submitted.'
    case 'in_review':
      return 'Project is in review.'
    case 'accepted':
      return 'Project is accepted.'
    case 'rejected':
      return 'Project rejected.'
    case 'ongoing':
      return 'Project is ongoing.'
    case 'closed':
      return 'Project completed.'
    default:
      return
  }
}

const getDetailCopy = (version, user, projectHistory) =>
  projectHistory ? `version ${version}` : `by ${user}`

const formatStackedDate = datetime => {
  const [date, time] = datetime.split(',').map(d => d.trim())

  return (
    <>
      <Text color="secondary" fontSize="14" lineHeight="20px">
        {date}
      </Text>
      <Text color="secondary" fontSize="12px" lineHeight="16px">
        {time}
      </Text>
    </>
  )
}

const VersionItem = ({ data }) => {
  const { status, time, isLastElement = false, user, project_history, version } = data
  return (
    <Box display="flex">
      <Box display="flex" flexDir="column" alignItems="flex-end">
        {formatStackedDate(time, user, project_history)}
      </Box>
      <Box borderRadius="50%" height="32px" width="32px" background="#DEDEDE" ml="11px"></Box>
      {!isLastElement && (
        <Divider
          orientation="vertical"
          borderColor="#DEDEDE"
          position="relative"
          top="32px"
          left="-24px"
          height="62px"
        />
      )}
      <Box pb={!isLastElement ? '54px' : '0'} ml={isLastElement ? '18px' : '0'}>
        <Heading size="sm" color={status === 'closed' ? 'completedBadge' : 'black'}>
          {getStatusCopy(status, user, project_history)}
        </Heading>
        <Text color="formFont" fontSize="14px" lineHeight="20px">
          {getDetailCopy(version, user, project_history)}
        </Text>
      </Box>
    </Box>
  )
}

VersionItem.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.string,
    time: PropTypes.string,
    user: PropTypes.string,
    project_history: PropTypes.string,
    version: PropTypes.number.isRequired,
    isLastElement: PropTypes.bool,
  }).isRequired,
}

export default VersionItem
