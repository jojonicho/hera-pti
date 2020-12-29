import { Stack, Heading } from '@chakra-ui/core'
import React, { useState, useEffect, useCallback, useContext } from 'react'

import { Layout, Breadcrumb } from 'components'
import UserManagementTable from 'components/Table/UserManagementTable'
import { retrieveUsersApi } from 'services/user'
import { withErrorHandler } from 'decorators'
import { ApiContext } from 'utils/datastore/ApiContext'
import { LoadingPage } from 'containers'

const UserManagementPage = () => {
  const { setError } = useContext(ApiContext)

  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserData = useCallback(async () => {
    const [data, error, response] = await retrieveUsersApi()
    setIsLoading(false)
    if (error) {
      setError({ error, response })
      return
    }

    setCount(data.count)
    setUsers(data.results)
  }, [setError])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return isLoading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <Stack align="center" flexGrow={1}>
        <Stack width={['95%', '85%']}>
          <Breadcrumb pages={[{ path: '/users', name: 'User Management' }]} />
          <Heading mt="5vh" fontSize="2rem">
            Users
          </Heading>
          <UserManagementTable count={count} users={users} />
        </Stack>
      </Stack>
    </Layout>
  )
}

export default withErrorHandler(UserManagementPage)
