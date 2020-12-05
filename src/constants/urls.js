/* eslint-disable no-undef */
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : 'https://ptibem.cs.ui.ac.id/zeus'

export const USER_URL = `${BASE_URL}/auth/user`
export const USER_SET_ROLE_URL = userId => `${USER_URL}/${userId}/set-admin-role/`
export const USER_DATA_URL = `${USER_URL}/get-data/`
export const TOKEN_URL = BASE_URL + '/auth/rest-auth/google/'
export const USER_LIST_URL = page => `${BASE_URL}/auth/users/?page=${page}`

export const PROJECT_URL = BASE_URL + '/projects/'
export const PROJECT_BY_ID_URL = projectId => `${PROJECT_URL}${projectId}/`
export const SET_STATUS_PROJECT_BY_ID_URL = projectId =>
  `${PROJECT_BY_ID_URL(projectId)}set-status/`
export const PROJECT_PAGE_LIST_URL = projectId => `${PROJECT_BY_ID_URL(projectId)}pages/`
export const PROJECT_HISTORY_URL = BASE_URL + '/histories/projects/'
export const PROJECT_HISTORY_BY_ID_URL = projectId => `${PROJECT_HISTORY_URL}${projectId}/`
export const PROJECT_PAGE_LIST_HISTORY_URL = projectId =>
  `${PROJECT_HISTORY_BY_ID_URL(projectId)}pages/`

export const PAGE_URL = BASE_URL + '/pages/'
export const PAGE_BY_ID_URL = pageId => `${PAGE_URL}${pageId}/`
export const SET_PARENT_PAGE_BY_ID_URL = pageId => `${PAGE_BY_ID_URL(pageId)}set-parent/`
export const PAGE_HISTORY_URL = BASE_URL + '/histories/pages/'
export const PAGE_HISTORY_BY_ID_URL = pageId => `${PAGE_HISTORY_URL}${pageId}/`

export const DISCUSSION_URL = BASE_URL + '/discussions/'
export const HISTORY_DISCUSSION_URL = BASE_URL + '/histories/discussions/'
