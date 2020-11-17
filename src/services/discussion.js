import { DISCUSSION_URL, HISTORY_DISCUSSION_URL } from 'constants/urls'
import { request } from './api'

export const DISCUSSION_BY_ID_URL = (isActive, id, action = '') =>
  `${isActive ? DISCUSSION_URL : HISTORY_DISCUSSION_URL}${id}/${action}`

export async function getDiscussionById(isActive, id) {
  return await request(DISCUSSION_BY_ID_URL(isActive, id))
}

export async function postMessageById(isActive, id, payload) {
  return await request(
    DISCUSSION_BY_ID_URL(isActive, id, 'post-message/'),
    { message: payload },
    'POST',
  )
}

export async function putDiscussionStatusById(isActive, id, payload = { is_resolved: true }) {
  return await request(DISCUSSION_BY_ID_URL(isActive, id, 'set-resolve-status/'), payload, 'PUT')
}
