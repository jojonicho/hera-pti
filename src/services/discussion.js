import { HISTORY_DISCUSSION_URL, DISCUSSION_URL } from 'constants/urls'
import { request } from './api'

export const DISCUSSION_BY_ID_URL = (isHistory, id, action = '') =>
  `${isHistory ? HISTORY_DISCUSSION_URL : DISCUSSION_URL}${id}/${action}`

export async function getDiscussionById(isHistory, id) {
  return await request(DISCUSSION_BY_ID_URL(isHistory, id))
}

export async function postMessageById(isHistory, id, payload) {
  return await request(
    DISCUSSION_BY_ID_URL(isHistory, id, 'post-message/'),
    { message: payload },
    'POST',
  )
}

export async function putDiscussionStatusById(isHistory, id, payload = { is_resolved: true }) {
  return await request(DISCUSSION_BY_ID_URL(isHistory, id, 'set-resolve-status/'), payload, 'PUT')
}
