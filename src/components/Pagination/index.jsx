import React from 'react'
import { Box, Text, Icon } from '@chakra-ui/core'
import PaginationNumber from './paginationNumber'
import PropTypes from 'prop-types'
import { DEFAULT_PAGES_SHOWN } from 'constants/pagination'

const Pagination = ({ totalItems, itemsShownPerPage, currentPage, setCurrentPage }) => {
  const maxPage = Math.ceil(totalItems / itemsShownPerPage)

  const shownRecordsStart = (currentPage - 1) * itemsShownPerPage + 1
  const shownRecordsEnd =
    itemsShownPerPage * currentPage < totalItems ? itemsShownPerPage * currentPage : totalItems

  function generateRange(start, end) {
    return Array.from({ length: end - start }, (v, k) => k + start)
  }

  function generatePaginationNumberComponent(pageNum) {
    return (
      <PaginationNumber
        key={pageNum}
        pageNum={pageNum}
        isCurrentPage={pageNum === currentPage}
        handleClickPageNum={pageNum => setCurrentPage(pageNum)}
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
        Showing {shownRecordsStart}-{shownRecordsEnd} records out of {totalItems}
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
          <Icon
            name="chevron-left"
            onClick={() => {
              if (currentPage !== 1) setCurrentPage(currentPage - 1)
            }}
          />
        </Box>
        {generatePaginationNums()}
        <Box as="button">
          <Icon
            name="chevron-right"
            onClick={() => {
              if (currentPage !== maxPage) setCurrentPage(currentPage + 1)
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsShownPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}

export default Pagination
