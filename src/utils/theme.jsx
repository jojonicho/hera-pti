import { theme as chakraTheme } from '@chakra-ui/core'
import React from 'react'

const fonts = {
  ...chakraTheme.fonts,
  body: 'system-ui, sans-serif',
  heading: 'system-ui, sans-serif',
  mono: 'Menlo, monospace',
}

const breakpoints = ['30em', '48em', '62em', '80em']

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    formField: '#E8EAED',
    formFont: '#5F637E',
    brand: '#171837',
    accent: '#F5A200',
    primary: '#1565C0',
    secondary: '#5F637E',
    form: '#E8EAED',
    formaddon: '#C6C8D1',
    card: '#F5F5F5',
    darkCard: '#E8EAED',
  },
  fonts,
  breakpoints,
  icons: {
    ...chakraTheme.icons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163',
    },
  },
}

export default theme
