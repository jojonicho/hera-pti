import React from 'react'
import { Box, Text } from '@chakra-ui/core'
import PropTypes from 'prop-types'

const PaginationNumber = ({ pageNum, isCurrentPage, handleClickPageNum }) => {
  const colorStyle = isCurrentPage ? { color: '#37B3E9' } : {}

  return (
    <Box as="button" onClick={() => handleClickPageNum(pageNum)} padding="0.5em" {...colorStyle}>
      <Text>{pageNum}</Text>
    </Box>
  )
}

PaginationNumber.propTypes = {
  pageNum: PropTypes.number.isRequired,
  isCurrentPage: PropTypes.bool.isRequired,
  handleClickPageNum: PropTypes.func.isRequired,
}

export default PaginationNumber
