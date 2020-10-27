import React, { useState, useEffect, useContext } from 'react'
import { Box, Heading } from '@chakra-ui/core'
import Pagination from '../../components/Pagination'
import Table from '../../components/Table'
import processStatus from '../../utils/table/processStatus'
import { request } from '../../services/api'
import { PROJECT_URL } from '../../constants/urls'
import { UserContext } from '../../utils/datastore/UserContext'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const [projects, setProjects] = useState([])
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [next, setNext] = useState('')
  const [prev, setPrev] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      let filtersString = ''
      filters.forEach(filter => (filtersString += processStatus(filter) + ','))
      const [data, error] = await request(
        `${PROJECT_URL}?title=${search}&status=${filtersString}&page=${currentPage}`,
      )
      if (error) return
      setProjects(data.results)
      setCount(data.count)
      setNext(data.next)
      setPrev(data.previous)
    }

    fetchData()
  }, [search, filters, currentPage])

  const handleChangeStatus = async (id, status) => {
    const updatedProject = projects.filter(project => project.id === id)
    updatedProject[0].status = status
    const [error] = await request(`${PROJECT_URL}${id}/set-status/`, { status: status }, 'PUT')
    if (error) return
    setProjects([...projects.filter(project => project.id !== id), ...updatedProject])
  }

  const handleClickDeleteButton = async id => {
    const [error] = await request(`${PROJECT_URL}${id}`, {}, 'DELETE')
    if (error) return
    setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <Box margin="auto" width="95vw" py="20px">
      <Heading mb="20px">{user.isAdmin ? 'Project Requests' : 'Your Projects'}</Heading>
      <Table
        projects={projects}
        count={count}
        isAdmin={user.isAdmin}
        search={search}
        filters={filters}
        handleClickSearchButton={val => setSearch(val)}
        handleChangeFiltersInput={values => setFilters(values)}
        handleChangeStatus={handleChangeStatus}
        handleClickDeleteButton={handleClickDeleteButton}
      />
      <Box display="flex" justifyContent="center">
        {count > 0 && (
          <Pagination
            totalProjects={count}
            currentPage={currentPage}
            handleClickPrev={() => {
              if (prev) setCurrentPage(currentPage - 1)
            }}
            handleClickNext={() => {
              if (next) setCurrentPage(currentPage + 1)
            }}
            handleClickPageNum={pageNum => setCurrentPage(pageNum)}
          />
        )}
      </Box>
    </Box>
  )
}

export default Dashboard
