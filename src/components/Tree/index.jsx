import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/core'

import theme from 'utils/theme'
import TreeTripleDot from 'components/TripleDot/TreeTripleDot'
import { request } from 'services/api'
import { PAGE_BY_ID_URL, SET_PARENT_PAGE_BY_ID_URL } from 'constants/urls'
import { UserContext } from 'utils/datastore/UserContext'

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
  align-items: center;
`

const DiscussionIcon = styled.div`
  color: ${theme.colors.brand};
`

const Tree = ({ item, data, setData, isReadOnly, isHistory }) => {
  const { user } = useContext(UserContext)

  return (
    <Item left={item.depth}>
      <RowElement>
        <Link to={isHistory ? `/page/${item.page.id}/history/` : `/page/${item.page.id}/`}>
          <LeftElement>{item.page.title}</LeftElement>
        </Link>
        <RightElement>
          <RowElement>
            {user.is_admin && item.page.message_unread_by_admin_count > 0 && (
              <DiscussionIcon>
                {item.page.message_unread_by_admin_count}{' '}
                <Icon name="chat" size={['1.2rem', '1.5rem']} />
              </DiscussionIcon>
            )}
            {!user.is_admin && item.page.message_unread_by_requester_count > 0 && (
              <DiscussionIcon>
                {item.page.message_unread_by_requester_count}{' '}
                <Icon name="chat" size={['1.2rem', '1.5rem']} />
              </DiscussionIcon>
            )}
            <DropdownMenu item={item} data={data} setData={setData} isReadOnly={isReadOnly} />
          </RowElement>
        </RightElement>
      </RowElement>
    </Item>
  )
}

const DropdownMenu = props => {
  const { data, item, setData, isReadOnly } = props

  const removePage = itemId => {
    let parentId = data.filter(page => page.id === itemId)[0].parent
    request(PAGE_BY_ID_URL(itemId), {}, 'DELETE')
      .then(() =>
        setData(
          data
            .map(page => {
              if (page.parent == itemId) {
                page.parent = parentId
                return page
              }
              return page
            })
            .filter(page => page.id !== itemId),
        ),
      )
      .catch(error => console.log(error))
  }

  return (
    <Menu>
      {!isReadOnly && (
        <MenuButton>
          <TreeTripleDot />
        </MenuButton>
      )}
      <MenuList>
        <MenuItem as={() => <NestedSubmenu {...props} />} />
        <MenuItem onClick={() => removePage(item.page.id)}>Remove page</MenuItem>
      </MenuList>
    </Menu>
  )
}

const NestedSubmenu = props => {
  const { data, item, setData } = props

  const changeParent = (itemId, parentId) => {
    request(SET_PARENT_PAGE_BY_ID_URL(itemId), { parent: parentId }, 'PUT')
      .then(() =>
        setData(
          data.map(page => {
            if (page.id === itemId) {
              page.parent = parentId
              return page
            }
            return page
          }),
        ),
      )
      .catch(error => console.log(error))
  }

  return (
    <Menu>
      <MenuButton paddingLeft="1rem">Change parent page</MenuButton>
      <MenuList>
        {data.map(
          (otherPage, index) =>
            otherPage.id !== item.page.id && (
              <MenuItem onClick={() => changeParent(item.page.id, otherPage.id)} key={index}>
                {otherPage.title}
              </MenuItem>
            ),
        )}
        <MenuItem onClick={() => changeParent(item.page.id, null)}>None (set as root)</MenuItem>
      </MenuList>
    </Menu>
  )
}

Tree.propTypes = {
  data: PropTypes.array.isRequired,
  item: PropTypes.shape({
    page: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      message_unread_by_admin_count: PropTypes.number,
      message_unread_by_requester_count: PropTypes.number,
    }).isRequired,
    depth: PropTypes.number.isRequired,
  }).isRequired,
  setData: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
  isHistory: PropTypes.bool,
}

DropdownMenu.propTypes = {
  data: PropTypes.array.isRequired,
  item: PropTypes.shape({
    page: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    depth: PropTypes.number.isRequired,
  }).isRequired,
  setData: PropTypes.object.isRequired,
  isReadOnly: PropTypes.bool,
}

NestedSubmenu.propTypes = {
  data: PropTypes.array.isRequired,
  item: PropTypes.shape({
    page: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    depth: PropTypes.number.isRequired,
  }).isRequired,
  setData: PropTypes.func.isRequired,
}

export default Tree
