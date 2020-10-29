import React from 'react'
import PropTypes from 'prop-types'

export const LayoutComponent = ({ children, navbar, footer }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexFlow: 'column',
    minHeight: '100vh',
    minWidth: '100vw',
  }

  const contentStyle = {
    display: 'flex',
    flexFlow: 'column',
    flexGrow: 1,
    minWidth: '100vw',
  }

  return (
    <div style={containerStyle}>
      {navbar}
      <div style={contentStyle}>{children}</div>
      {footer}
    </div>
  )
}

LayoutComponent.propTypes = {
  navbar: PropTypes.element,
  footer: PropTypes.element,
  children: PropTypes.element,
}

export default LayoutComponent
