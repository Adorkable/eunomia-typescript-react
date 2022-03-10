import * as React from 'react'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

export interface Methods {
  drawContext: (video: HTMLVideoElement) => void
  clearContext: () => void
  getContext: () => CanvasRenderingContext2D | null | undefined

  width: () => number
  height: () => number
}

interface Props {
  width: number
  height: number

  flip?: boolean

  style?: React.CSSProperties
  className?: string
}

export const Canvas = forwardRef<Methods, Props>(
  ({ width, height, flip = false, style, className }: Props, forwardedRef) => {
    const ref = useRef<HTMLCanvasElement | null>()
    const contextRef = useRef<CanvasRenderingContext2D | null>()

    useEffect(() => {
      if (!ref.current) {
        return
      }
      ref.current.width = width
    }, [ref, width])

    useEffect(() => {
      if (!ref.current) {
        return
      }
      ref.current.height = height
    }, [ref, height])

    useEffect(() => {
      if (!contextRef.current) {
        return
      }
      if (flip) {
        contextRef.current.translate(width, 0) //result.video.videoWidth, 0)
        contextRef.current.scale(-1, 1)
      }
      return () => {
        if (!contextRef.current) {
          return
        }
        if (flip) {
          contextRef.current.scale(1, 1)
          contextRef.current.translate(-width, 0) //result.video.videoWidth, 0)
        }
      }
    }, [ref, width, flip])

    useEffect(() => {
      if (!ref.current) {
        return
      }
      // TODO: support configurable context
      contextRef.current = ref.current.getContext('2d')

      return () => {
        contextRef.current = null
      }
    }, [ref])

    useImperativeHandle(forwardedRef, () => ({
      drawContext: (video: HTMLVideoElement) => {
        if (!contextRef.current) {
          return
        }
        contextRef.current.drawImage(
          video,
          0,
          0,
          video.videoWidth,
          video.videoHeight
        )
      },
      clearContext: () => {
        if (!ref.current || !contextRef.current) {
          return
        }
        contextRef.current.clearRect(
          0,
          0,
          ref.current.width,
          ref.current.height
        )
      },
      getContext: () => {
        return contextRef.current
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
      <canvas
        ref={(newRef) => {
          ref.current = newRef
        }}
        style={style}
        className={className}
      />
    )
  }
)
Canvas.displayName = 'Canvas'
