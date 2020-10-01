/* eslint-disable no-undef */
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : 'https://ptibem.cs.ui.ac.id/zeus'
export const USER_URL = BASE_URL + '/auth/user/get-data/'
export const TOKEN_URL = BASE_URL + '/auth/rest-auth/google/'
