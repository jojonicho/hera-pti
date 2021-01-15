import React from 'react'
import { Box, Button, Icon, Text } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import useWindowSize from 'hooks/useWindowSize'
import PropTypes from 'prop-types'

import { Row, MobileRow } from './row'
import { IPAD_MAX_WIDTH, MOBILE_MAX_WIDTH } from 'constants/size'
import { projectPropTypes } from 'constants/proptypes/project'
import FilterSelect from './filterSelect'
import SearchBar from './searchBar'
import { STATUS_OPTIONS } from 'constants/options'

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

const Table = ({
  projects,
  count,
  isAdmin,
  isSuperAdmin,
  search,
  selectedFilters,
  handleClickSearchButton,
  handleChangeFiltersInput,
  handleChangeStatus,
  handleClickDeleteButton,
}) => {
  const { width } = useWindowSize()
  const isMobile = width <= MOBILE_MAX_WIDTH
  const isIpad = width <= IPAD_MAX_WIDTH

  const widthDistribution = isSuperAdmin
    ? SUPER_ADMIN_COLUMN_WIDTH_DISTRIBUTION
    : isAdmin
    ? ADMIN_COLUMN_WIDTH_DISTRIBUTION
    : REGULAR_COLUMN_WIDTH_DISTRIBUTION

  return (
    <Box w="100%" py="1em">
      <Box d="flex" flexDir={isIpad ? 'column' : 'row'} justifyContent="space-between">
        <Box d="flex" w={isIpad ? '100%' : '45%'} flexDir={isMobile ? 'column' : 'row'}>
          <SearchBar
            placeholderLabel="project name"
            isMobile
            handleClickSearchButton={handleClickSearchButton}
          />
          <FilterSelect
            filterLabel="Status"
            options={STATUS_OPTIONS}
            selectedFilters={selectedFilters}
            handleChangeFiltersInput={handleChangeFiltersInput}
          />
        </Box>
        {!isAdmin && (
          <Link to="/project/create/">
            <Button
              bg="accent"
              px="0.75em"
              d="flex"
              alignItems="center"
              mt={isMobile ? '0.25em' : '0'}
            >
              <Icon name="add" size="0.7em" color="black" mr="0.5em" />
              <Text fontWeight="400" color="black">
                Request New Project
              </Text>
            </Button>
          </Link>
        )}
      </Box>
      {!isIpad && (
        <Box
          bg="formField"
          rounded="1em"
          width="100%"
          my="1em"
          px="1.5em"
          py="0.5em"
          color="secondary"
          fontWeight="700"
          d="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Text w={widthDistribution.name}>Project Name</Text>
          <Text textAlign="center" w={widthDistribution.status}>
            Status
          </Text>
          <Text textAlign="center" w={widthDistribution.lastUpdated}>
            Last Updated
          </Text>
          {isAdmin && (
            <Text textAlign="center" w={widthDistribution.versions}>
              Versions
            </Text>
          )}
          {isSuperAdmin && (
            <Text textAlign="center" w={widthDistribution.receiver}>
              Receiver
            </Text>
          )}
          <Box w={widthDistribution.discussion}>
            <Box w="70%" display="flex" justifyContent="flex-end">
              <Icon name="chat" size="1.1em" />
            </Box>
          </Box>
          {isAdmin && (
            <Text textAlign="center" w={widthDistribution.delete}>
              Delete
            </Text>
          )}
        </Box>
      )}
      {count ? (
        projects.map(project =>
          isIpad ? (
            <MobileRow
              key={project.title}
              project={project}
              isAdmin={isAdmin}
              isSuperAdmin={isSuperAdmin}
              handleChangeStatus={handleChangeStatus}
              handleClickDeleteButton={handleClickDeleteButton}
            />
          ) : (
            <Row
              key={project.title}
              project={project}
              isAdmin={isAdmin}
              isSuperAdmin={isSuperAdmin}
              handleChangeStatus={handleChangeStatus}
              handleClickDeleteButton={handleClickDeleteButton}
            />
          ),
        )
      ) : (
        <Box
          bg="card"
          rounded="18px"
          width="100%"
          minHeight="40vh"
          mb="0.5em"
          p="3.5em"
          d="flex"
          flexDir="column"
          justifyContent="space-around"
          alignItems="center"
        >
          {isAdmin ? (
            <Text color="secondary" mb="0.5em">
              {!search && selectedFilters.length === 0
                ? 'There are no project requests yet'
                : 'Project with specified search input not found'}
            </Text>
          ) : (
            <Box display="flex" flexDir="column" alignItems="center">
              <Text color="secondary" mb="0.5em">
                {!search && selectedFilters.length === 0
                  ? 'You have not requested any projects yet'
                  : 'Project with specified search input not found'}
              </Text>
              <Link to="/project/create/">
                <Button
                  border="1px solid #F5A200"
                  bg="inherit"
                  px="0.75em"
                  d="flex"
                  alignItems="center"
                >
                  <Icon name="add" size="0.7em" color="accent" mr="0.5em" />
                  <Text fontWeight="400" color="accent">
                    Request New Project
                  </Text>
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

Table.propTypes = {
  projects: PropTypes.arrayOf(projectPropTypes),
  count: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  search: PropTypes.string.isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClickSearchButton: PropTypes.func,
  handleChangeFiltersInput: PropTypes.func,
  handleChangeStatus: PropTypes.func,
  handleClickDeleteButton: PropTypes.func,
}

export default Table
