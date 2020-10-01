import { TOKEN_URL, USER_URL } from 'constants/urls'
import { request } from './api'

export async function loginApi(payload) {
  return request(TOKEN_URL, payload, 'POST')
}

export async function userInfoApi() {
  return request(USER_URL)
}
