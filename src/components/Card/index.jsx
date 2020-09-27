import { Box, Stack, Heading } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ title, button, children }) => (
  <Box bg="card" p={['1rem', '2rem']} rounded="lg" width={['95%', '95%', '80%', '40%']}>
    <Stack isInline justify="space-between" align="center" mb="1.5rem">
      <Heading as="h3" size="lg">
        {title}
      </Heading>
      {button}
    </Stack>
    {children}
  </Box>
)

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
  button: PropTypes.element,
}

export default Card
