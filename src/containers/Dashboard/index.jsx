import React, { useState, useEffect, useContext } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Icon,
  Heading,
  Spinner,
  Stack,
} from '@chakra-ui/core'
import { Pagination, Table } from 'components'
import { Layout } from 'components/Layout'
import { request } from 'services/api'
import { PROJECT_URL } from 'constants/urls'
import { UserContext } from 'utils/datastore/UserContext'
import processStatus from 'utils/table/processStatus'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      let filtersString = ''
      filters.forEach(filter => (filtersString += processStatus(filter) + ','))
      const [data, error] = await request(
        `${PROJECT_URL}?title=${search}&status=${filtersString}&page=${currentPage}`,
      )
      if (!error) {
        setData(data)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [search, filters, currentPage])

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

  const breadcrumbComponent = (
    <Breadcrumb spacing={[1, 2]} separator={<Icon color="brand" name="chevron-right" />}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )

  return (
    <Layout>
      <Stack
        py="5rem"
        px="9rem"
        display="flex"
        flexGrow={1}
        flexFlow="column"
        flexDirection="column"
      >
        {breadcrumbComponent}
        <Heading my="2rem" height="2rem" textAlign="left">
          {user.is_admin ? 'Project Requests' : 'Your Projects'}
        </Heading>
        {isLoading ? (
          <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
            <Spinner />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" justifyContent="space-between" flexGrow={1}>
            <Table
              projects={data.results}
              count={data.count}
              isAdmin={user.is_admin}
              search={search}
              filters={filters}
              handleClickSearchButton={val => setSearch(val)}
              handleChangeFiltersInput={values => setFilters(values)}
              handleChangeStatus={handleChangeStatus}
              handleClickDeleteButton={handleClickDeleteButton}
            />
            <Box display="flex" justifyContent="center">
              {data.count > 0 && (
                <Pagination
                  totalProjects={data.count}
                  currentPage={currentPage}
                  handleClickPrev={() => {
                    if (data.prev) setCurrentPage(currentPage - 1)
                  }}
                  handleClickNext={() => {
                    if (data.next) setCurrentPage(currentPage + 1)
                  }}
                  handleClickPageNum={pageNum => setCurrentPage(pageNum)}
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
