import { ORGANIZATION_URL } from 'constants/urls'
import { request } from './api'

export async function retrieveOrganizationsApi() {
  return request(ORGANIZATION_URL)
}
