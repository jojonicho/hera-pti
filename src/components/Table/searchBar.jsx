import React, { useState } from 'react'
import { Button, Box, Input } from '@chakra-ui/core'
import PropTypes from 'prop-types'

const SearchBar = ({ handleClickSearchButton }) => {
  const [search, setSearch] = useState('')

  function handleChangeSearchInput(value) {
    setSearch(value)
  }

  return (
    <Box d="flex" alignItems="center" w="70%" mr="10px">
      <Input
        id="search"
        placeholder="Search by project name"
        borderRadius="md"
        borderColor="border"
        onChange={e => handleChangeSearchInput(e.target.value)}
      />
      <Button
        bg="secondary"
        color="#FFF"
        fontWeight="400"
        px="30px"
        borderRadius="md"
        onClick={() => handleClickSearchButton(search)}
      >
        Search
      </Button>
    </Box>
  )
}

SearchBar.propTypes = {
  handleClickSearchButton: PropTypes.func.isRequired,
}

export default SearchBar
