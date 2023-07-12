import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import React from 'react'

import { Methods, methods } from './Methods'

export type { Methods } from './Methods'

interface Props {
  width: number
  height: number

  flip?: boolean

  style?: React.CSSProperties
  className?: string
}

export const Canvas = forwardRef<Methods, Props>(
  ({ width, height, flip = false, style, className }: Props, forwardedRef) => {
    const canvas = useRef<HTMLCanvasElement>(null)
    const renderContext = useRef<CanvasRenderingContext2D>()

    useEffect(() => {
      if (!canvas.current) {
        return
      }
      canvas.current.width = width
    }, [width])

    useEffect(() => {
      if (!canvas.current) {
        return
      }
      canvas.current.height = height
    }, [height])

    useEffect(() => {
      if (!renderContext.current) {
        return
      }
      if (flip) {
        renderContext.current.translate(width, 0) //result.video.videoWidth, 0)
        renderContext.current.scale(-1, 1)
      }
      return () => {
        if (!renderContext.current) {
          return
        }
        if (flip) {
          renderContext.current.scale(1, 1)
          renderContext.current.translate(-width, 0) //result.video.videoWidth, 0)
        }
      }
    }, [flip, width])

    useEffect(() => {
      if (!canvas.current) {
        return
      }
      // TODO: support configurable context
      renderContext.current = canvas.current.getContext('2d') || undefined

      return () => {
        renderContext.current = undefined
      }
    }, [])

    useImperativeHandle(forwardedRef, methods(canvas, renderContext), [
      canvas,
      renderContext
    ])

    return <canvas ref={canvas} style={style} className={className} />
  }
)
Canvas.displayName = 'Canvas'
