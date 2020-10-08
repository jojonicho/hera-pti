import React from 'react'
import { Box, Text } from '@chakra-ui/core'
import PropTypes from 'prop-types'

const PaginationNumber = ({ pageNum, isCurrentPage, handlePageChange }) => {
  const colorStyle = isCurrentPage ? { color: '#37B3E9' } : {}

  return (
    <Box as="button" onClick={() => handlePageChange(pageNum)} padding="8px" {...colorStyle}>
      <Text>{pageNum}</Text>
    </Box>
  )
}

PaginationNumber.propTypes = {
  pageNum: PropTypes.number.isRequired,
  isCurrentPage: PropTypes.bool.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

export default PaginationNumber
