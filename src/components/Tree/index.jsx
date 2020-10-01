import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/core'

import theme from 'utils/theme'
import TreeTripleDot from 'components/TripleDot/TreeTripleDot'

const Item = styled.div`
  margin-left: ${props => props.left}rem;
  margin-bottom: 0.3rem;
  background-color: ${theme.colors.formField};
  color: ${theme.colors.formFont};
  width: 75%;
  border-radius: 5px;
  padding: 0.4rem;
`

const LeftElement = styled.div`
  margin-left: 0.1rem;
  align-items: center;
  display: flex;
  flex-direction: column;
`
const RightElement = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const RowElement = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 0.3rem;
  justify-content: space-between;
  vertical-align: middle;
`

const Tree = ({ item, data }) => {
  return (
    <Item left={item.depth}>
      <RowElement>
        <LeftElement>{item.page.title}</LeftElement>
        <RightElement>
          <DropdownMenu item={item} data={data} />
        </RightElement>
      </RowElement>
    </Item>
  )
}

const DropdownMenu = props => {
  return (
    <Menu>
      <MenuButton>
        <TreeTripleDot />
      </MenuButton>
      <MenuList>
        <MenuItem as={() => <NestedSubmenu {...props} />} />
        <MenuItem>Remove page</MenuItem>
      </MenuList>
    </Menu>
  )
}

const NestedSubmenu = props => {
  const { data, item } = props
  return (
    <Menu>
      <MenuButton paddingLeft="1rem">Change parent page</MenuButton>
      <MenuList>
        {data.pages.map(
          (otherPage, index) =>
            otherPage.id !== item.page.id && <MenuItem key={index}>{otherPage.title}</MenuItem>,
        )}
      </MenuList>
    </Menu>
  )
}

Tree.propTypes = {
  item: PropTypes.shape({
    depth: PropTypes.number.isRequired,
    page: PropTypes.shape({
      id: PropTypes.string.isRequired,
      parent: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    pages: PropTypes.arrayOf({
      page: PropTypes.shape({
        id: PropTypes.string.isRequired,
        parent: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
}

NestedSubmenu.propTypes = {
  data: PropTypes.shape({
    pages: PropTypes.arrayOf({
      page: PropTypes.shape({
        id: PropTypes.string.isRequired,
        parent: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  item: PropTypes.shape({
    depth: PropTypes.number.isRequired,
    page: PropTypes.shape({
      id: PropTypes.string.isRequired,
      parent: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Tree
