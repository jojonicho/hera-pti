import { Avatar, Flex, Stack, Switch, Text } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

import { userPropTypes } from 'constants/proptypes/user'
import { childrenPropTypes, optionsPropTypes } from 'constants/proptypes/general'
import { Dropdown } from '../dropdown'
import { TABLE_COLUMNS, MOBILE_TABLE_COLUMNS, TABLE_ROW_STYLES } from './constants'
import { useUserData } from './hooks'

const FlexRow = ({ width, children, ...props }) => (
  <Flex direction="row" align="center" justify="center" w={width} {...props}>
    {children}
  </Flex>
)

FlexRow.propTypes = {
  width: PropTypes.string,
  children: childrenPropTypes.isRequired,
}

const HeaderRow = ({ isMobile }) => {
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

const UserRow = ({ user, affiliationOptions }) => {
  const { userData, changeToAdmin, changeToSuperAdmin, changeAffiliation } = useUserData(user)

  return (
    <Flex {...TABLE_ROW_STYLES} mb="1vh">
      <FlexRow width={TABLE_COLUMNS[0].width}>
        <Avatar name={user.name} src={user.picture} size="sm" />
      </FlexRow>
      <Text w={TABLE_COLUMNS[1].width} pr="0.5rem">
        {user.name}
      </Text>
      <Text w={TABLE_COLUMNS[2].width}>{user.email}</Text>
      <Dropdown
        width={TABLE_COLUMNS[3].width}
        defaultValue={userData.affiliation}
        options={affiliationOptions}
        setOption={changeAffiliation}
        bg="white"
        borderRadius="1rem"
        padding="0.5rem 1rem"
        placeholder="-"
      />
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
  affiliationOptions: optionsPropTypes.isRequired,
}

const MobileUserRow = ({ user, affiliationOptions }) => {
  const { userData, changeToAdmin, changeToSuperAdmin, changeAffiliation } = useUserData(user)

  return (
    <Flex {...TABLE_ROW_STYLES} mb="1vh" py="0.4rem">
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
        <Dropdown
          defaultValue={userData.affiliation}
          options={affiliationOptions}
          setOption={changeAffiliation}
          bg="white"
          borderRadius="0.5rem"
          padding="0.2rem 0.5rem"
          size="sm"
          placeholder="-"
        />
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
  affiliationOptions: optionsPropTypes.isRequired,
}

export { FlexRow, HeaderRow, UserRow, MobileUserRow }
