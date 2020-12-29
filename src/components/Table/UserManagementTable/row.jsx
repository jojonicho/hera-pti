import { Avatar, Flex, Stack, Switch, Text } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

import { userPropTypes } from 'constants/proptypes/user'
import { childrenPropTypes } from 'constants/proptypes/general'
import { TABLE_COLUMNS, MOBILE_TABLE_COLUMNS, TABLE_ROW_STYLES } from './constants'
import { useUserData } from './hooks'

export const FlexRow = ({ width, children, ...props }) => (
  <Flex direction="row" align="center" justify="center" w={width} {...props}>
    {children}
  </Flex>
)

FlexRow.propTypes = {
  width: PropTypes.string,
  children: childrenPropTypes.isRequired,
}

export const HeaderRow = ({ isMobile }) => {
  const tableColumns = isMobile ? MOBILE_TABLE_COLUMNS : TABLE_COLUMNS

  return (
    <Flex color="secondary" fontWeight="bold" {...TABLE_ROW_STYLES} my="1vh">
      {tableColumns.map(({ label, width, align }, id) => (
        <Text
          key={`usermgmt${id}`}
          textAlign={align ? align : 'center'}
          w={width}
          fontSize={['0.8rem', '1rem']}
        >
          {label}
        </Text>
      ))}
    </Flex>
  )
}

HeaderRow.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export const UserRow = ({ user }) => {
  const [userData, changeToAdmin, changeToSuperAdmin] = useUserData(user)

  return (
    <Flex {...TABLE_ROW_STYLES} mb="1vh">
      <FlexRow width={TABLE_COLUMNS[0].width}>
        <Avatar name={user.name} src={user.picture} size="sm" />
      </FlexRow>
      <Text w={TABLE_COLUMNS[1].width} pr="0.5rem">
        {user.name}
      </Text>
      <Text w={TABLE_COLUMNS[2].width}>{user.email}</Text>
      <Text textAlign="center" w={TABLE_COLUMNS[3].width}>
        {userData.affiliation || '-'}
      </Text>
      <FlexRow width={TABLE_COLUMNS[4].width}>
        <Switch isChecked={userData.is_admin} onChange={changeToAdmin} />
      </FlexRow>
      <FlexRow width={TABLE_COLUMNS[5].width}>
        <Switch isChecked={userData.is_superadmin} onChange={changeToSuperAdmin} />
      </FlexRow>
    </Flex>
  )
}

UserRow.propTypes = {
  user: userPropTypes.isRequired,
}

export const MobileUserRow = ({ user }) => {
  const [userData, changeToAdmin, changeToSuperAdmin] = useUserData(user)

  return (
    <Flex {...TABLE_ROW_STYLES} mb="1vh">
      <FlexRow width={MOBILE_TABLE_COLUMNS[0].width}>
        <Avatar name={user.name} src={user.picture} size="sm" />
      </FlexRow>
      <Stack
        width={MOBILE_TABLE_COLUMNS[1].width}
        spacing={0}
        fontSize={['0.8rem', '1rem']}
        pr="0.5rem"
      >
        <Text>{user.name}</Text>
        <Text isTruncated>{user.email}</Text>
        <Text>{userData.affiliation}</Text>
      </Stack>
      <FlexRow width={MOBILE_TABLE_COLUMNS[2].width}>
        <Switch isChecked={userData.is_admin} onChange={changeToAdmin} />
      </FlexRow>
      <FlexRow width={MOBILE_TABLE_COLUMNS[3].width}>
        <Switch isChecked={userData.is_superadmin} onChange={changeToSuperAdmin} />
      </FlexRow>
    </Flex>
  )
}

MobileUserRow.propTypes = {
  user: userPropTypes.isRequired,
}
