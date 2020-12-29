import { Spinner, Box } from '@chakra-ui/core'
import React from 'react'

const LoadingPage = () => (
  <Box
    minHeight="100vh"
    minWidth="100vw"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Spinner />
  </Box>
)

export default LoadingPage
