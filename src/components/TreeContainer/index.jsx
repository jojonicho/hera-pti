import React, { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { Box, Spinner } from '@chakra-ui/core'
import PropTypes from 'prop-types'

import generateOrder from 'utils/tree/preprocess'
import Tree from 'components/Tree'
import { request } from 'services/api'
import { PROJECT_PAGE_LIST_URL, PROJECT_PAGE_LIST_HISTORY_URL } from 'constants/urls'
import theme from 'utils/theme'

const Container = styled.div`
  position: relative;
  min-height: 8rem;
  height: 32rem;
  overflow-x: auto;
  overflow-y: auto;
  margin-top: 0.5rem;
  scrollbar-color: ${theme.colors.formaddon} ${theme.colors.formField};
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${theme.colors.formField};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.formaddon};
  }

  @media screen and (max-width: 480px) {
    width: 90%;
  }

  @media screen and (max-width: 992px) {
    width: 95%;
  }
`

const TreeContainer = ({ projectId, isHistory, isReadOnly, create }) => {
  const [pages, setPages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProjectPagesData = useCallback(async () => {
    const url = isHistory
      ? PROJECT_PAGE_LIST_HISTORY_URL(projectId)
      : PROJECT_PAGE_LIST_URL(projectId)
    const [data, error] = await request(url)
    if (error) return
    setPages(data)
  }, [projectId, isHistory])

  useEffect(() => {
    setIsLoading(true)
    !create && fetchProjectPagesData()
    setIsLoading(false)
  }, [create, fetchProjectPagesData])

  let order
  if (projectId) {
    order = generateOrder(pages)
  }

  return (
    <>
      {isLoading ? (
        <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          {projectId === undefined || pages.length === 0 ? (
            <>No pages yet.</>
          ) : (
            <Container>
              {order.map((item, index) => (
                <Tree
                  key={index}
                  item={item}
                  data={pages}
                  setData={setPages}
                  isReadOnly={isReadOnly}
                  isHistory={isHistory}
                />
              ))}
            </Container>
          )}
        </>
      )}
    </>
  )
}

TreeContainer.propTypes = {
  projectId: PropTypes.string,
  isHistory: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  create: PropTypes.bool,
}

export default TreeContainer
