import { useEffect, useState } from 'react'
import { AUTH_TOKEN_STORAGE_KEY } from 'constants/auth'

export const useFetch = (url, body = {}, method = 'GET', extraHeaders = {}) => {
  const [state, setState] = useState({ data: null, loading: true })
  useEffect(async () => {
    setState({ data: state.data, loading: true })
    const [apiData, apiError] = await request(url, body, method, extraHeaders)
    if (apiError) {
      setState({ data: null, loading: false })
    } else {
      setState({ data: apiData, loading: false })
    }
  }, [url, useState])
  return state
}

/**
 * Base request builder function.
 *
 * @param {string} path url path extending BASE_URL
 * @param {object} body request body payload
 * @param {string} method HTTP method
 * @param {object} extraHeaders extra header key-values
 */
export async function request(path, body, method, extraHeaders) {
  let response, data, error, responseComponent

  try {
    responseComponent = {
      headers: { ...getDefaultHeaders(), ...extraHeaders },
      method,
    }
    if (method !== 'GET' && method !== 'HEAD') {
      responseComponent = { body: JSON.stringify(body), ...responseComponent }
    }
    response = await fetch(path, responseComponent)
    if (!response.ok) {
      error = response
    }
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
