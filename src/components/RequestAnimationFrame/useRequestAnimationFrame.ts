import { useCallback, useEffect } from 'react'

const InvalidRequestId = -1

// TODO: properly scope
let requestId: number = InvalidRequestId
export const useRequestAnimationFrame = (perform: (time: number) => void) => {
  // const [requestId, setRequestId] = useState<number>(InvalidRequestId)

  const animateFrame = useCallback(
    (time: number) => {
      if (requestId === InvalidRequestId) {
        return
      }

      perform(time)

      if (requestAnimationFrame) {
        requestId = requestAnimationFrame(animateFrame)
      } else {
        throw new Error('requestAnimationFrame is not supported')
      }
    },
    [perform]
  )

  useEffect(() => {
    if (requestAnimationFrame) {
      requestId = requestAnimationFrame(animateFrame)
    } else {
      throw new Error('requestAnimationFrame is not supported')
    }

    return () => {
      if (requestId !== InvalidRequestId) {
        cancelAnimationFrame(requestId)
        requestId = InvalidRequestId
      }
    }
  }, [animateFrame])

  return {}
}
