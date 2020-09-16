import { Stack, Text, Image } from '@chakra-ui/core'
import React from 'react'

import bemLogo from '../../assets/bem_logo.png'

export const Footer = () => (
  <Stack bg="gray.100" p="2" isInline justify="space-between" align="center">
    <Text fontSize="calc(0.8rem + 0.1vw)">© Biro PTI 2020</Text>
    <Image h="30px" src={bemLogo}></Image>
  </Stack>
)
