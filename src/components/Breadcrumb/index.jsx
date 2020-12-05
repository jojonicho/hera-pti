import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const DefaultBreadcrumb = ({ pages }) => {
  const location = useLocation()

  return (
    <Breadcrumb spacing={[1, 2]} separator={<Icon color="brand" name="chevron-right" />}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {pages.map(({ path, name }, index) => (
        <BreadcrumbItem key={`breadcrumb${index}`} isCurrentPage={path === location.pathname}>
          <BreadcrumbLink href={path}>{name}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

DefaultBreadcrumb.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default DefaultBreadcrumb
