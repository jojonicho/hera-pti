import { Stack, Text } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

import { userPropTypes } from 'constants/proptypes/user'
import useWindowSize from 'hooks/useWindowSize'
import { IPAD_MAX_WIDTH } from 'constants/size'
import { FlexRow, HeaderRow, UserRow, MobileUserRow } from './row'

const UserManagementTable = ({ count, users }) => {
  const { width } = useWindowSize()
  const TableRow = width < IPAD_MAX_WIDTH ? MobileUserRow : UserRow

  return (
    <>
      <HeaderRow isMobile={width < IPAD_MAX_WIDTH} />
      <Stack width="100%">
        {count ? (
          users.map((user, id) => <TableRow key={`user${id}`} user={user} />)
        ) : (
          <FlexRow bg="card" minHeight="20vh" rounded="0.5rem" color="secondary">
            <Text>No Users</Text>
          </FlexRow>
        )}
      </Stack>
    </>
  )
}

UserManagementTable.propTypes = {
  count: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(userPropTypes).isRequired,
}

export default UserManagementTable
