import { PROJECT_URL, PROJECT_BY_ID_URL, SET_STATUS_PROJECT_BY_ID_URL } from 'constants/urls'
import { request } from 'services/api'

export function getProjectDetailsById(projectId) {
  return request(PROJECT_BY_ID_URL(projectId))
}

export async function postProjectById(create, projectId, payload) {
  return request(
    create ? PROJECT_URL : PROJECT_BY_ID_URL(projectId),
    payload,
    create ? 'POST' : 'PUT',
  )
}

export async function putProjectStatus(projectId, projectStatus) {
  return request(SET_STATUS_PROJECT_BY_ID_URL(projectId), { status: projectStatus }, 'PUT')
}
