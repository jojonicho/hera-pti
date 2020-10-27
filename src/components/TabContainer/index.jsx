import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const TabContainer = ({ labels, contents }) => (
  <Tabs variant="enclosed">
    <TabList borderBottom="0">
      {labels.map((item, index) => (
        <Tab
          key={`tab${index}`}
          bg="formaddon"
          opacity="50%"
          roundedTop="lg"
          mr="0.4rem"
          px="1.5rem"
          _selected={{ bg: 'card', opacity: '100%' }}
          _active={{}}
          borderWidth="2px"
          borderColor={item.border !== '' ? item.border : 'transparent'}
          borderBottom="0"
        >
          {item.label}
        </Tab>
      ))}
    </TabList>
    <TabPanels>
      {contents.map((content, index) => (
        <TabPanel
          key={`tabpanel${index}`}
          minHeight="50vh"
          bg="card"
          rounded="lg"
          roundedTopLeft="0"
        >
          {content}
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
)

TabContainer.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      border: PropTypes.string,
    }),
  ).isRequired,
  contents: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default TabContainer
