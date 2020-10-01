import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const TabContainer = ({ labels, contents }) => (
  <Tabs variant="enclosed">
    <TabList borderBottom="0">
      {labels.map((label, index) => (
        <Tab
          key={`tab${index}`}
          bg="formaddon"
          opacity="50%"
          roundedTop="lg"
          mr="0.4rem"
          px="1.5rem"
          _selected={{ bg: 'card', fontWeight: 'bold', opacity: '100%' }}
        >
          {label}
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
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  contents: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default TabContainer
