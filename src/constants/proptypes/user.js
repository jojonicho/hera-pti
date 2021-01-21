import PropTypes from 'prop-types'
import { organizationPropTypes } from './organization'

const userFieldPropTypes = {
  name: PropTypes.string,
  picture: PropTypes.string,
  email: PropTypes.string,
  affiliation: organizationPropTypes,
  is_admin: PropTypes.bool,
  is_superadmin: PropTypes.bool,
}

export const userPropTypes = PropTypes.shape(userFieldPropTypes)
