import React from 'react'
import { Box, Text, Icon } from '@chakra-ui/core'
import PaginationNumber from './paginationNumber'
import PropTypes from 'prop-types'

const DEFAULT_PROJECTS_SHOWN = 10
const DEFAULT_PAGES_SHOWN = 10

const Pagination = ({
  totalProjects,
  currentPage,
  handleClickPrev,
  handleClickNext,
  handleClickPageNum,
}) => {
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
        handleClickPageNum={pageNum => handleClickPageNum(pageNum)}
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
          <Icon name="chevron-left" onClick={() => handleClickPrev()} />
        </Box>
        {generatePaginationNums()}
        <Box as="button">
          <Icon name="chevron-right" onClick={() => handleClickNext()} />
        </Box>
      </Box>
    </Box>
  )
}

Pagination.propTypes = {
  totalProjects: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleClickPrev: PropTypes.func.isRequired,
  handleClickNext: PropTypes.func.isRequired,
  handleClickPageNum: PropTypes.func.isRequired,
}

export default Pagination
