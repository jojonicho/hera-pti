import PropTypes from 'prop-types'
import { organizationPropTypes } from './organization'

export const projectPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  request_type: PropTypes.string,
  department: PropTypes.string,
  status: PropTypes.string,
  version: PropTypes.number,
  deadline: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  receiver: organizationPropTypes,
  message_unread_by_admin_count: PropTypes.number,
  message_unread_by_requester_count: PropTypes.number,
})
