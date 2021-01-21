import { Stack, Text, Heading } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

import { optionsPropTypes } from 'constants/proptypes/general'
import { userPropTypes } from 'constants/proptypes/user'
import { ROLE_FILTER_OPTIONS } from 'constants/options'
import useWindowSize from 'hooks/useWindowSize'
import { FlexRow, HeaderRow, UserRow, MobileUserRow } from './row'
import SearchBar from '../searchBar'
import FilterSelect from '../filterSelect'

const UserManagementTable = ({
  count,
  users,
  affiliationOptions,
  setSearch,
  selectedRoles,
  selectedAffiliations,
  setSelectedRoles,
  setSelectedAffiliations,
}) => {
  const { isIpad, isMobile } = useWindowSize()
  const TableRow = isIpad ? MobileUserRow : UserRow

  return (
    <Stack spacing="0.7rem">
      <Heading fontSize="2rem" mt="5vh">
        Users
      </Heading>
      <Stack w={isIpad ? '100%' : '55%'} direction={isMobile ? 'column' : 'row'}>
        <SearchBar
          placeholderLabel="name or email"
          handleClickSearchButton={setSearch}
          isMobile={isMobile}
        />
        <FilterSelect
          isMobile={isMobile}
          filterLabel="Role"
          options={ROLE_FILTER_OPTIONS}
          selectedFilters={selectedRoles}
          handleChangeFiltersInput={setSelectedRoles}
        />
        <FilterSelect
          isMobile={isMobile}
          filterLabel="Affiliation"
          options={affiliationOptions}
          selectedFilters={selectedAffiliations}
          handleChangeFiltersInput={setSelectedAffiliations}
        />
      </Stack>
      <HeaderRow isMobile={isIpad} />
      <Stack width="100%">
        {count ? (
          users.map((user, id) => (
            <TableRow key={`user${id}`} user={user} affiliationOptions={affiliationOptions} />
          ))
        ) : (
          <FlexRow bg="card" minHeight="20vh" rounded="0.5rem" color="secondary">
            <Text>No Users</Text>
          </FlexRow>
        )}
      </Stack>
    </Stack>
  )
}

UserManagementTable.propTypes = {
  count: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(userPropTypes).isRequired,
  affiliationOptions: optionsPropTypes.isRequired,
  setSearch: PropTypes.func.isRequired,
  selectedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedAffiliations: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedRoles: PropTypes.func.isRequired,
  setSelectedAffiliations: PropTypes.func.isRequired,
}

export default UserManagementTable
