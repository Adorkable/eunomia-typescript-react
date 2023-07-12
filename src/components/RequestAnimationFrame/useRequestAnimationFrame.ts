// Based on https://github.com/franciscop/use-animation-frame/blob/master/src/index.js
// which is
// Based off a tweet and codesandbox:
// https://mobile.twitter.com/hieuhlc/status/1164369876825169920
import { useCallback, useLayoutEffect, useRef } from 'react'

/// Time is in seconds
export type CallbackInfo = {
  time: number
  delta: number
}

export type Callback = (info: CallbackInfo) => void

// Reusable component that also takes dependencies
export const useRequestAnimationFrame = (callback: Callback) => {
  if (typeof performance === 'undefined' || typeof window === 'undefined') {
    throw new Error('useAnimationFrame is not supported.')
  }

  const callbackRef = useRef<Callback>(callback)
  callbackRef.current = callback

  const frame = useRef<number>(-1)
  const init = useRef(performance.now())
  const last = useRef(performance.now())

  const animate = useCallback((now: number) => {
    // In seconds ~> you can do ms or anything in userland
    callbackRef.current({
      time: (now - init.current) / 1000,
      delta: (now - last.current) / 1000
    })
    last.current = now
    frame.current = requestAnimationFrame(animate)
  }, [])

  useLayoutEffect(() => {
    frame.current = requestAnimationFrame(animate)
    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current)
      }
    }
  }, [animate])
}
