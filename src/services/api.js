import { AUTH_TOKEN_STORAGE_KEY } from 'constants/auth'

/**
 * Base request builder function.
 *
 * @param {string} path url path extending BASE_URL
 * @param {object} body request body payload
 * @param {string} method HTTP method
 * @param {object} extraHeaders extra header key-values
 */
export async function request(path, body = {}, method = 'GET', extraHeaders = {}) {
  let response, data, error

  try {
    response = await fetch(path, {
      headers: { ...getDefaultHeaders(), ...extraHeaders },
      method,
      body: JSON.stringify(body),
    })
    data = await response.json()
  } catch (err) {
    // can do default/generic error handling here, i.e. error popup notification, console.error, etc
    error = err
  }

  // returning fetch response object if other things are needed, i.e. status code or response headers
  return [data, error, response]
}

function getDefaultHeaders() {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  const values = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    values.Authorization = `Token ${token}`
  }

  return values
}
