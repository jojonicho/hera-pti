import PropTypes from 'prop-types'

const userFieldPropTypes = {
  name: PropTypes.string,
  picture: PropTypes.string,
  email: PropTypes.string,
  affiliation: PropTypes.string,
  is_admin: PropTypes.bool,
  is_superadmin: PropTypes.bool,
}

export const userPropTypes = PropTypes.shape(userFieldPropTypes)
