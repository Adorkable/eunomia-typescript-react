import { useEffect, useState } from 'react'

export interface WindowSize {
  width: number
  height: number
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleWindowResize) //, false)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return windowSize
}

export default useWindowSize
