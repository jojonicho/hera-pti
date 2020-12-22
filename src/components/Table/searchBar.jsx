import React, { useState } from 'react'
import { Button, Box, Input } from '@chakra-ui/core'
import PropTypes from 'prop-types'

const SearchBar = ({ placeholderLabel, isMobile, handleClickSearchButton }) => {
  const [search, setSearch] = useState('')

  return (
    <Box
      d="flex"
      alignItems="center"
      w={isMobile ? '100%' : '70%'}
      mr="10px"
      mb={isMobile ? '5px' : '0'}
    >
      <Input
        id="search"
        placeholder={`Search by ${placeholderLabel}`}
        borderRadius="md"
        borderColor="border"
        onChange={e => setSearch(e.target.value)}
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
  placeholderLabel: PropTypes.string,
  isMobile: PropTypes.bool,
  handleClickSearchButton: PropTypes.func.isRequired,
}

export default SearchBar
