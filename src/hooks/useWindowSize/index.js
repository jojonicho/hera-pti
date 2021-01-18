import { useState, useEffect, useCallback } from 'react'

import { IPAD_MAX_WIDTH, MOBILE_MAX_WIDTH } from 'constants/size'

function useWindowSize() {
  const isClient = typeof window === 'object'

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }, [isClient])

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient])

  return {
    ...windowSize,
    isMobile: windowSize.width <= MOBILE_MAX_WIDTH,
    isIpad: windowSize.width <= IPAD_MAX_WIDTH,
  }
}

export default useWindowSize
