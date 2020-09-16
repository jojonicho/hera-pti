/* eslint-disable no-undef */

export const AUTH_TOKEN_STORAGE_KEY = 'AUTH_TOKEN'
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : 'https://ptibem.cs.ui.ac.id/zeus'
export const USER_URL = BASE_URL + '/auth/user/get-data/'
export const TOKEN_URL = BASE_URL + '/auth/rest-auth/google/'
export const HEADERS = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})
