import { Stack, Flex } from '@chakra-ui/core'
import React, { useState, useEffect, useCallback, useContext } from 'react'

import { LoadingPage } from 'containers'
import { Layout, Breadcrumb, Pagination } from 'components'
import UserManagementTable from 'components/Table/UserManagementTable'
import { DEFAULT_USERS_SHOWN } from 'constants/pagination'
import { retrieveUsersApi } from 'services/user'
import { retrieveOrganizationsApi } from 'services/organization'
import { withErrorHandler } from 'decorators'
import { ApiContext } from 'utils/datastore/ApiContext'

const UserManagementPage = () => {
  const { setError } = useContext(ApiContext)

  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedRoles, setSelectedRoles] = useState([])
  const [selectedAffiliations, setSelectedAffiliations] = useState([])
  const [affiliationOptions, setAffiliationOptions] = useState([])

  const fetchAffiliations = useCallback(async () => {
    const [data, error, response] = await retrieveOrganizationsApi()
    if (error) {
      setError({ error, response })
      return
    }
    setAffiliationOptions(
      data.map(org => ({
        label: org.name,
        value: org.id,
      })),
    )
  }, [setError])

  const fetchUserData = useCallback(async () => {
    const query = {
      page: currentPage,
      search: search,
      role: selectedRoles.join(''),
      affiliation: selectedAffiliations.join(','),
    }
    const [data, error, response] = await retrieveUsersApi(query)
    setIsLoading(false)
    if (error) {
      setError({ error, response })
      return
    }

    setCount(data.count)
    setUsers(data.results)
  }, [setError, currentPage, search, selectedRoles, selectedAffiliations])

  useEffect(() => {
    fetchAffiliations()
    fetchUserData()
  }, [fetchAffiliations, fetchUserData])

  return isLoading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <Stack align="center" flexGrow={1}>
        <Stack width={['90%', '85%']} flexGrow={1}>
          <Breadcrumb pages={[{ path: '/users', name: 'User Management' }]} />
          <Stack justify="space-between" flexGrow={1}>
            <UserManagementTable
              count={count}
              users={users}
              affiliationOptions={affiliationOptions}
              setSearch={setSearch}
              selectedRoles={selectedRoles}
              selectedAffiliations={selectedAffiliations}
              setSelectedRoles={setSelectedRoles}
              setSelectedAffiliations={setSelectedAffiliations}
            />
            <Flex justify="center">
              {count > 0 && (
                <Pagination
                  totalItems={count}
                  itemsShownPerPage={DEFAULT_USERS_SHOWN}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  )
}

export default withErrorHandler(UserManagementPage)
