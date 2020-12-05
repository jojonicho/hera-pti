import PropTypes from 'prop-types'

export const projectPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  version: PropTypes.number,
  deadline: PropTypes.string,
  figma_url: PropTypes.string,
  assets_url: PropTypes.string,
  request_type: PropTypes.string,
  access_url: PropTypes.string,
  status: PropTypes.string,
  requester: PropTypes.shape({
    name: PropTypes.string,
  }),
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  deleted_at: PropTypes.string,
  sum_unread_count: PropTypes.number,
  discussion_set: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      unread_count: PropTypes.number,
    }),
  ),
})
