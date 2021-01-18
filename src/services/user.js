import { TOKEN_URL, USER_DATA_URL, USER_LIST_URL, USER_SET_ROLE_URL } from 'constants/urls'
import { request } from './api'

export async function loginApi(payload) {
  return request(TOKEN_URL, payload, 'POST')
}

export async function userInfoApi() {
  return request(USER_DATA_URL)
}

export async function retrieveUsersApi({ page = 1, search = '', role = '', affiliation = '' }) {
  return request(
    `${USER_LIST_URL}?page=${page}&search=${search}${role}&affiliation_in=${affiliation}`,
  )
}

export async function updateUserRoleApi(userId, payload) {
  return request(USER_SET_ROLE_URL(userId), payload, 'PUT')
}
