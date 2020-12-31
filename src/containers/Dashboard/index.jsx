import React, { useState, useEffect, useContext } from 'react'
import { Box, Heading, Spinner, Stack } from '@chakra-ui/core'
import { Pagination, Table, Breadcrumb } from 'components'
import { Layout } from 'components/Layout'
import { request } from 'services/api'
import { PROJECT_URL } from 'constants/urls'
import { UserContext } from 'utils/datastore/UserContext'
import processStatus from 'utils/table/processStatus'
import { DEFAULT_PROJECTS_SHOWN } from 'constants/pagination'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [selectedFilters, setSelectedFilters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      let filtersString = ''
      selectedFilters.forEach(filter => (filtersString += processStatus(filter) + ','))
      const [data, error] = await request(
        `${PROJECT_URL}?search=${search}&status=${filtersString}&page=${currentPage}&page_size=${DEFAULT_PROJECTS_SHOWN}`,
      )
      if (!error) {
        setData(data)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [search, selectedFilters, currentPage])

  const handleChangeStatus = async (id, status) => {
    const [error] = await request(`${PROJECT_URL}${id}/set-status/`, { status: status }, 'PUT')
    if (error) return
    setData(prev => ({
      ...prev,
      results: [
        ...prev.results.map(project => {
          if (project.id === id) {
            project.status = status
          }
          return project
        }),
      ],
    }))
  }

  const handleClickDeleteButton = async id => {
    const [error] = await request(`${PROJECT_URL}${id}`, {}, 'DELETE')
    if (error) return
    setData(prev => ({
      ...prev,
      results: prev.results.filter(project => project.id !== id),
    }))
  }

  return (
    <Layout>
      <Stack px="9vw" display="flex" flexGrow={1} flexFlow="column">
        <Breadcrumb pages={[{ path: '/dashboard/', name: 'Dashboard' }]} />
        <Heading my="2rem" height="2rem" textAlign="left">
          {user.is_admin ? 'Project Requests' : 'Your Projects'}
        </Heading>
        {isLoading ? (
          <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
            <Spinner size="xl" />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" justifyContent="space-between" flexGrow={1}>
            <Table
              projects={data.results}
              count={data.count}
              isAdmin={user.is_admin}
              isSuperAdmin={user.is_superadmin}
              search={search}
              selectedFilters={selectedFilters}
              handleClickSearchButton={val => setSearch(val)}
              handleChangeFiltersInput={values => setSelectedFilters(values)}
              handleChangeStatus={handleChangeStatus}
              handleClickDeleteButton={handleClickDeleteButton}
            />
            <Box display="flex" justifyContent="center">
              {data.count > 0 && (
                <Pagination
                  totalItems={data.count}
                  itemsShownPerPage={DEFAULT_PROJECTS_SHOWN}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </Box>
          </Box>
        )}
      </Stack>
    </Layout>
  )
}

export default Dashboard
