import { PAGE_BY_ID_URL, PAGE_HISTORY_BY_ID_URL } from 'constants/urls'
import { request } from './api'

export async function retrievePageApi(pageId) {
  return request(PAGE_BY_ID_URL(pageId))
}

export async function retrievePageHistoryApi(pageId) {
  return request(PAGE_HISTORY_BY_ID_URL(pageId))
}

export async function updatePageApi(pageId, payload) {
  return request(PAGE_BY_ID_URL(pageId), payload, 'PUT')
}
