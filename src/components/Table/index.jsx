import { Box, Button, Heading, Icon, Text } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import FilterSelect from './filterSelect'
import Row from './row'
import SearchBar from './searchBar'
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

const Table = ({ projects, isAdmin }) => {
  const widthDistribution = isAdmin
    ? ADMIN_COLUMN_WIDTH_DISTRIBUTION
    : REGULAR_COLUMN_WIDTH_DISTRIBUTION

  const [displayedProjects, setDisplayedProjects] = useState(projects)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  function displayProjects() {
    if (filter) {
      return projects.filter(project => project.status.toLowerCase() === filter.toLowerCase())
    }
    if (search) {
      return projects.filter(project => project.title.toLowerCase().includes(search.toLowerCase()))
    }
    return projects
  }

  useEffect(() => {
    setDisplayedProjects(displayProjects())
  }, [filter, search])

  return (
    <Box w="100%" p="20px">
      <Heading mb="20px">{isAdmin ? 'Project Requests' : 'Your Projects'}</Heading>
      <Box d="flex" justifyContent="space-between">
        <Box d="flex" w="45%">
          <SearchBar handleClickSearchButton={val => setSearch(val)} />
          <FilterSelect handleChangeFilterInput={val => setFilter(val)} />
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
        <Box w="5%" display="flex" justifyContent="flex-end">
          <Icon name="chat" size="1.1em" />
        </Box>
      </Box>
      {displayedProjects.length ? (
        displayedProjects.map(project => (
          <Row key={project.title} project={project} isAdmin={isAdmin} />
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
              There are no project requests yet
            </Text>
          ) : (
            <Box display="flex" flexDir="column" alignItems="center">
              <Text color="secondary" mb="10px">
                You have not requested any projects yet
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
  isAdmin: PropTypes.bool.isRequired,
}

export default Table
