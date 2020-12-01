import PropTypes from 'prop-types'

const commonPropTypes = {
  project: PropTypes.shape({
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
    receiver: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    message_unread_by_admin_count: PropTypes.number,
    message_unread_by_requester_count: PropTypes.number,
  }),
}

export default commonPropTypes
