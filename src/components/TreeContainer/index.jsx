import React, { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import generateOrder from 'utils/tree/preprocess'
import Tree from 'components/Tree'
import { request } from 'services/api'
import { PROJECT_PAGE_LIST_URL, PROJECT_PAGE_LIST_HISTORY_URL } from 'constants/urls'

const Container = styled.div`
  position: relative;
  min-height: 8rem;
  height: 25rem;
  overflow-x: scroll;
  overflow-y: scroll;
  margin-top: 0.5rem;

  @media screen and (max-width: 480px) {
    width: 90%;
  }

  @media screen and (max-width: 992px) {
    width: 95%;
  }
`

const TreeContainer = ({ projectId, isHistory, isReadOnly, create }) => {
  const [pages, setPages] = useState([])

  const fetchProjectPagesData = useCallback(async () => {
    const url = isHistory
      ? PROJECT_PAGE_LIST_HISTORY_URL(projectId)
      : PROJECT_PAGE_LIST_URL(projectId)
    const [data, error] = await request(url)
    if (error) return
    setPages(data)
  }, [projectId])

  useEffect(() => {
    !create && fetchProjectPagesData()
  }, [fetchProjectPagesData])

  let order
  if (projectId) {
    order = generateOrder(pages)
  }

  return (
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
  )
}

TreeContainer.propTypes = {
  projectId: PropTypes.string,
  isHistory: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  create: PropTypes.bool,
}

export default TreeContainer
