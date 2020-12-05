import PropTypes from 'prop-types'

export const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.element),
  PropTypes.element,
  PropTypes.string,
])
