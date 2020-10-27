import { useEffect, useState } from 'react'
import { request } from 'services/api'

const useFetch = (url, body = {}, method = 'GET', extraHeaders = {}) => {
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

export default useFetch
