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
    message_unread_by_admin_count: PropTypes.number,
    message_unread_by_requester_count: PropTypes.number,
    // values below are not used/available on `projects/`. Last checked: 24/11/20
    figma_url: PropTypes.string,
    assets_url: PropTypes.string,
    access_url: PropTypes.string,
    requester: PropTypes.shape({
      name: PropTypes.string,
    }),
    deleted_at: PropTypes.string,
    sum_unread_count: PropTypes.number,
    discussion_set: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        unread_count: PropTypes.number,
      }),
    ),
  }),
}

export default commonPropTypes
