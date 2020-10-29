import { Box, Button, Icon, Text } from '@chakra-ui/core'
import React from 'react'
import FilterSelect from './filterSelect'
import Row from './row'
import SearchBar from './searchBar'
import PropTypes from 'prop-types'
import commonPropTypes from '../../utils/proptype/commonPropTypes'

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
  search,
  filters,
  handleClickSearchButton,
  handleChangeFiltersInput,
  handleChangeStatus,
  handleClickDeleteButton,
}) => {
  const widthDistribution = isAdmin
    ? ADMIN_COLUMN_WIDTH_DISTRIBUTION
    : REGULAR_COLUMN_WIDTH_DISTRIBUTION

  return (
    <Box w="100%" py="20px">
      <Box d="flex" justifyContent="space-between">
        <Box d="flex" w="45%">
          <SearchBar handleClickSearchButton={handleClickSearchButton} />
          <FilterSelect filters={filters} handleChangeFiltersInput={handleChangeFiltersInput} />
        </Box>
        {!isAdmin && (
          <Button bg="accent" px="15px" d="flex" alignItems="center">
            <Icon name="add" size="0.7em" color="black" mr="10px" />
            <Text fontWeight="400" color="black">
              Request New Project
            </Text>
          </Button>
        )}
      </Box>
      <Box
        bg="formField"
        rounded="1em"
        width="100%"
        my="20px"
        px="30px"
        py="10px"
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
      {count ? (
        projects.map(project => (
          <Row
            key={project.title}
            project={project}
            isAdmin={isAdmin}
            handleChangeStatus={handleChangeStatus}
            handleClickDeleteButton={handleClickDeleteButton}
          />
        ))
      ) : (
        <Box
          bg="card"
          rounded="18px"
          width="100%"
          mb="10px"
          p="70px"
          d="flex"
          flexDir="column"
          justifyContent="space-around"
          alignItems="center"
        >
          {isAdmin ? (
            <Text color="secondary" mb="10px">
              {!search && filters.length === 0
                ? 'There are no project requests yet'
                : 'Project with specified search input not found'}
            </Text>
          ) : (
            <Box display="flex" flexDir="column" alignItems="center">
              <Text color="secondary" mb="10px">
                {!search && filters.length === 0
                  ? 'You have not requested any projects yet'
                  : 'Project with specified search input not found'}
              </Text>
              <Button
                border="1px solid #F5A200"
                bg="inherit"
                px="15px"
                d="flex"
                alignItems="center"
              >
                <Icon name="add" size="0.7em" color="accent" mr="10px" />
                <Text fontWeight="400" color="accent">
                  Request New Project
                </Text>
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

Table.propTypes = {
  projects: PropTypes.arrayOf(commonPropTypes.project),
  count: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  search: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClickSearchButton: PropTypes.func,
  handleChangeFiltersInput: PropTypes.func,
  handleChangeStatus: PropTypes.func,
  handleClickDeleteButton: PropTypes.func,
}

export default Table
