import { Stack, Text, Image } from '@chakra-ui/core'
import React from 'react'

import bemLogo from 'assets/bem_logo.png'

const Footer = () => (
  <Stack
    bg="gray.100"
    p="2"
    pr={['2', '1.5vw']}
    isInline
    justify="space-between"
    align="center"
    minWidth="100vw"
  >
    <Text fontSize="calc(0.8rem + 0.1vw)">© PTI Fasilkom UI 2020</Text>
    <Image h="30px" src={bemLogo}></Image>
  </Stack>
)

export default Footer
