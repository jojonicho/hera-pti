import React, { useState } from 'react'
import { Box, Text, Icon } from '@chakra-ui/core'
import PaginationNumber from './paginationNumber'
import PropTypes from 'prop-types'

const DEFAULT_PROJECTS_SHOWN = 5
const DEFAULT_PAGES_SHOWN = 10

const Pagination = ({ totalProjects }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const maxPage = Math.ceil(totalProjects / DEFAULT_PROJECTS_SHOWN)

  const shownRecordsStart = (currentPage - 1) * DEFAULT_PROJECTS_SHOWN + 1
  const shownRecordsEnd =
    DEFAULT_PROJECTS_SHOWN * currentPage < totalProjects
      ? DEFAULT_PROJECTS_SHOWN * currentPage
      : totalProjects

  function generateRange(start, end) {
    return Array.from({ length: end - start }, (v, k) => k + start)
  }

  function generatePaginationNumberComponent(pageNum) {
    return (
      <PaginationNumber
        key={pageNum}
        pageNum={pageNum}
        isCurrentPage={pageNum === currentPage}
        handlePageChange={() => handlePageChange()}
      />
    )
  }

  function generatePaginationNums() {
    if (maxPage - currentPage >= DEFAULT_PAGES_SHOWN) {
      return (
        <Box>
          {generateRange(
            currentPage,
            currentPage + Math.ceil(DEFAULT_PAGES_SHOWN / 2),
          ).map(pageNum => generatePaginationNumberComponent(pageNum))}
          ...
          {generateRange(
            maxPage - Math.floor(DEFAULT_PAGES_SHOWN / 2) + 1,
            maxPage + 1,
          ).map(pageNum => generatePaginationNumberComponent(pageNum))}
        </Box>
      )
    }
    let startPage = maxPage < DEFAULT_PAGES_SHOWN ? 1 : maxPage - DEFAULT_PAGES_SHOWN + 1
    return (
      <Box>
        {generateRange(startPage, maxPage + 1).map(pageNum =>
          generatePaginationNumberComponent(pageNum),
        )}
      </Box>
    )
  }

  function handlePageChange(pageNum) {
    if (pageNum >= 1 && pageNum <= maxPage) setCurrentPage(pageNum)
  }

  return (
    <Box>
      <Text textAlign="center">
        Showing {shownRecordsStart}-{shownRecordsEnd} records out of {totalProjects}
      </Text>
      <Box
        borderRadius="2em"
        border="1px solid #CACACA"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="10px"
      >
        <Box as="button">
          <Icon name="chevron-left" onClick={() => handlePageChange(currentPage - 1)} />
        </Box>
        {generatePaginationNums()}
        <Box as="button">
          <Icon name="chevron-right" onClick={() => handlePageChange(currentPage + 1)} />
        </Box>
      </Box>
    </Box>
  )
}

Pagination.propTypes = {
  totalProjects: PropTypes.number.isRequired,
}

export default Pagination
