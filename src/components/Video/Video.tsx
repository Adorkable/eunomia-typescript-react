import * as React from 'react'

import {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'

export interface Methods {
  play: () => void
  pause: () => void

  readyState: () => number
  isReady: () => boolean
  waitUntilReady: () => Promise<void>

  element: () => HTMLVideoElement | null | undefined
  width: () => number
  height: () => number

  // currentTime: () => number
  // paused: () => boolean
  // fastSeek: (time: number) => void
  // duration: () => number
  // ended: () => boolean
  // error: () => MediaError | null
}

interface Props {
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
  crossOrigin?: string | null
  loop?: boolean
  playbackRate?: number
  playsInline?: boolean
  volume?: number

  style?: React.CSSProperties
  className?: string

  stream?: MediaStream | null
}

type VideoRef = MutableRefObject<HTMLVideoElement | null | undefined>

const readyState = (ref: VideoRef): number => {
  if (!ref.current) {
    return HTMLMediaElement.HAVE_NOTHING
  }
  return ref.current.readyState
}

const isReady = (ref: VideoRef): boolean => {
  const readyStateValue = readyState(ref)
  return (
    readyStateValue === HTMLMediaElement.HAVE_CURRENT_DATA ||
    readyStateValue === HTMLMediaElement.HAVE_ENOUGH_DATA ||
    readyStateValue === HTMLMediaElement.HAVE_FUTURE_DATA
  )
}

const waitUntilReady = async (ref: VideoRef): Promise<void> => {
  const isReadyValue = isReady(ref)
  if (isReadyValue) {
    return Promise.resolve()
  }
  const refInstance = ref.current
  if (!refInstance) {
    throw new Error('Video element is not available yet')
  }
  await new Promise((resolve) => {
    refInstance.onloadeddata = () => {
      resolve(null)
    }
  })
}

const setVideoElementSettings = (
  video: HTMLVideoElement,
  {
    autoplay = true,
    muted = true,
    controls = false,
    crossOrigin = null,
    loop = false,
    playbackRate = 1,
    playsInline = true,
    volume = 1,
    stream = null
  }: Props
) => {
  video.srcObject = stream
  video.autoplay = autoplay
  video.controls = controls
  video.crossOrigin = crossOrigin
  video.loop = loop
  video.playbackRate = playbackRate
  video.playsInline = playsInline
  video.volume = volume
  video.muted = muted
}

export const Video = forwardRef<Methods, Props>(
  (
    {
      autoplay = true,
      muted = true,
      controls = false,
      crossOrigin = null,
      loop = false,
      playbackRate = 1,
      playsInline = true,
      volume = 1,
      style,
      className,
      stream = null
    }: Props,
    forwardedRef
  ) => {
    const ref = useRef<HTMLVideoElement | null>()

    const onRefSet = useCallback(
      (refInstance: HTMLVideoElement | null) => {
        if (refInstance) {
          setVideoElementSettings(refInstance, {
            autoplay,
            controls,
            crossOrigin,
            loop,
            muted,
            playbackRate,
            playsInline,
            volume,
            stream
          })

          ref.current = refInstance
        } else {
          if (ref.current) {
            ref.current.srcObject = null
            ref.current = null
          }
        }
      },
      [
        stream,
        autoplay,
        controls,
        crossOrigin,
        loop,
        muted,
        playbackRate,
        playsInline,
        volume
      ]
    )

    useEffect(() => {
      if (ref.current) {
        setVideoElementSettings(ref.current, {
          autoplay,
          controls,
          crossOrigin,
          loop,
          muted,
          playbackRate,
          playsInline,
          volume,
          stream
        })
      }

      return () => {
        if (ref.current) {
          ref.current.srcObject = null
        }
      }
    }, [
      stream,
      autoplay,
      controls,
      crossOrigin,
      loop,
      muted,
      playbackRate,
      playsInline,
      volume
    ])

    useImperativeHandle(forwardedRef, () => ({
      play: () => {
        if (!ref.current) {
          return
        }
        ref.current.play()
      },
      pause: () => {
        if (!ref.current) {
          return
        }
        ref.current.pause()
      },
      readyState: () => {
        return readyState(ref)
      },
      isReady: () => {
        return isReady(ref)
      },
      waitUntilReady: async () => {
        await waitUntilReady(ref)
      },
      element: () => {
        return ref.current
      },
      width: () => {
        if (!ref.current) {
          return 0
        }
        return ref.current.width
      },
      height: () => {
        if (!ref.current) {
          return 0
        }
        return ref.current.height
      }
    }))

    return (
      <video
        ref={onRefSet}
        playsInline={playsInline}
        style={style}
        className={className}
      />
    )
  }
)
Video.displayName = 'Video'
