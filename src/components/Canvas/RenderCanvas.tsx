import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import React from 'react'

import { useRequestAnimationFrame } from '../RequestAnimationFrame/useRequestAnimationFrame'
import { Canvas, Props as ParentProps } from './Canvas'
import { Methods } from './Methods'

export interface Props extends ParentProps {
  render: (Canvas: Methods, context: CanvasRenderingContext2D) => void
}

export const RenderCanvas = forwardRef<Methods, Props>(
  (
    { width, height, flip = false, style, className, render }: Props,
    forwardedRef
  ) => {
    const ref = useRef<Methods>(null)

    const handleRequestAnimationFrame = useCallback(() => {
      if (!ref.current) {
        return
      }
      const context = ref.current.getContext()
      if (!context) {
        return
      }
      render(ref.current, context)
    }, [render])

    useRequestAnimationFrame(handleRequestAnimationFrame)

    useImperativeHandle(
      forwardedRef,
      () => ({
        drawVideo: (video: HTMLVideoElement) => {
          if (!ref.current) {
            return
          }
          ref.current.drawVideo(video)
        },
        clear: () => {
          if (!ref.current) {
            return
          }
          ref.current.clear()
        },
        getContext: () => {
          if (!ref.current) {
            return
          }
          return ref.current.getContext()
        },
        width: () => {
          if (!ref.current) {
            return 0
          }
          return ref.current.width()
        },
        height: () => {
          if (!ref.current) {
            return 0
          }
          return ref.current.height()
        }
      }),
      [ref]
    )

    return (
      <Canvas
        width={width}
        height={height}
        flip={flip}
        style={style}
        className={className}
        ref={ref}
      />
    )
  }
)

RenderCanvas.displayName = 'RenderCanvas'
