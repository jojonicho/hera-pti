import { DISCUSSION_URL } from 'constants/urls'
import { request } from './api'

const DISCUSSION_BY_ID_URL = (id, action = '') => `${DISCUSSION_URL}${id}/${action}`

export async function getDiscussionById(id) {
  return request(DISCUSSION_BY_ID_URL(id))
}

export async function postMessageById(id, payload) {
  return request(DISCUSSION_BY_ID_URL(id, 'post-message/'), { message: payload }, 'POST')
}

export async function putDiscussionStatusById(id, payload = { is_resolved: true }) {
  return request(DISCUSSION_BY_ID_URL(id, 'set-resolve-status/'), payload, 'PUT')
}
