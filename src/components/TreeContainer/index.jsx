import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import generateOrder from 'utils/tree/preprocess'
import Tree from 'components/Tree'

const Container = styled.div`
  position: relative;
  width: 25rem;
  min-height: 8rem;
  height: 25rem;
  overflow-x: scroll;
  overflow-y: scroll;
`

const TreeContainer = ({ data }) => {
  let order = generateOrder(data)

  return (
    <Container>
      {order.map((item, index) => (
        <Tree key={index} item={item} data={data} />
      ))}
    </Container>
  )
}

TreeContainer.propTypes = {
  data: PropTypes.shape({
    pages: PropTypes.arrayOf({
      page: PropTypes.shape({
        id: PropTypes.string.isRequired,
        parent: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default TreeContainer
