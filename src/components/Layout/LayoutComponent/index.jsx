import React from 'react'
import PropTypes from 'prop-types'

export const LayoutComponent = ({ children, navbar, footer }) => {
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    minWidth: '100vw',
  }

  const contentStyle = {
    display: 'flex',
    minWidth: '100vw',
    minHeight: '100vh',
    paddingTop: '5rem',
    paddingBottom: '4rem',
  }

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    zIndex: 999,
  }

  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    zIndex: 999,
  }

  return (
    <div style={containerStyle}>
      <div style={navbarStyle}>{navbar}</div>
      <div style={contentStyle}>{children}</div>
      <div style={footerStyle}>{footer}</div>
    </div>
  )
}

LayoutComponent.propTypes = {
  navbar: PropTypes.element,
  footer: PropTypes.element,
  children: PropTypes.element,
}

export default LayoutComponent
