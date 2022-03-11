import { useEffect, useRef, useState } from 'react'
import { stopMediaStream } from './Utility'

export interface Props {
  constraints?: MediaStreamConstraints | undefined
}

export const useUserMedia = ({ constraints }: Props) => {
  const stream = useRef<MediaStream>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isStreamSet, setIsStreamSet] = useState<boolean>(false) // Hack to force rerender with new reference returned
  const [error, setError] = useState<Error>()

  useEffect(() => {
    let cancelEnable = false

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((result) => {
        if (!cancelEnable) {
          stream.current = result
          setIsStreamSet(true)
        }
      })
      .catch((reason) => {
        if (!cancelEnable) {
          setError(
            new Error(`Error enabling video stream: ${JSON.stringify(reason)}}`)
          )
        }
      })

    return () => {
      cancelEnable = true
    }
  }, [constraints, setIsStreamSet, setError])

  useEffect(() => {
    return () => {
      if (stream.current) {
        stopMediaStream(stream.current)
      }
    }
  }, [stream])

  return { stream: stream.current, error }
}
