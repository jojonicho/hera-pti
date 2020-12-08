import { Stack, Heading } from '@chakra-ui/core'
import React, { useState, useEffect, useCallback } from 'react'

import { Layout, Breadcrumb } from 'components'
import UserManagementTable from 'components/Table/UserManagementTable'
import { retrieveUsersApi } from 'services/user'

const UserManagementPage = () => {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])

  const fetchUserData = useCallback(async () => {
    const [data, error] = await retrieveUsersApi()
    if (error) return

    setCount(data.count)
    setUsers(data.results)
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return (
    <Layout>
      <Stack align="center" flexGrow={1}>
        <Stack width={['95%', '85%']}>
          <Breadcrumb pages={[{ path: '/users', name: 'User Management', current: true }]} />
          <Heading mt="5vh" fontSize="2rem">
            Users
          </Heading>
          <UserManagementTable count={count} users={users} />
        </Stack>
      </Stack>
    </Layout>
  )
}

export default UserManagementPage
