import styled from '@emotion/styled'
import React from 'react'
import PropTypes from 'prop-types'

import theme from 'utils/theme'
import generateOrder from 'utils/tree/preprocess'

const Container = styled.div`
  position: relative;
  width: 25rem;
  min-height: 10rem;
  overflow-x: scroll;
`

const Item = styled.div`
  margin-left: ${props => props.left}rem;
  margin-bottom: 0.3rem;
  background-color: ${theme.colors.formField};
  color: ${theme.colors.formFont};
  width: 80%;
  border-radius: 5px;
  padding: 0.4rem;
`

const Tree = ({ data }) => {
  let order = generateOrder(data)

  return (
    <Container>
      {order.map((item, index) => (
        <Item key={index} left={item.depth}>
          {item.page.title}
        </Item>
      ))}
    </Container>
  )
}

Tree.propTypes = {
  data: PropTypes.shape.isRequired,
}

export default Tree
