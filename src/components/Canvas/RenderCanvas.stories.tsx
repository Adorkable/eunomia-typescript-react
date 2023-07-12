import { Meta } from '@storybook/react'
import * as React from 'react'
import { useCallback, useRef } from 'react'

import { Canvas } from './Canvas'
import { Methods as CanvasMethods } from './Methods'
import { RenderCanvas } from './RenderCanvas'

const displayConfig: Meta = {
  title: 'RenderCanvas'
}
export default displayConfig

interface Props {
  width: number
  height: number

  flip: boolean
}

export const Default = ({ width, height, flip }: Props) => {
  const canvas = useRef<CanvasMethods>(null)
  const offset = useRef(0)
  const stops = useRef(['green', 'cyan', 'red'])

  const handleRender = useCallback(
    (canvas: CanvasMethods, context: CanvasRenderingContext2D) => {
      let gradient = context.createLinearGradient(
        0,
        0,
        canvas.width(),
        canvas.height()
      )
      gradient.addColorStop(offset.current, stops.current[0])
      gradient.addColorStop(offset.current + 0.25, stops.current[1])
      gradient.addColorStop(offset.current + 0.5, stops.current[2])

      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width(), canvas.height())

      offset.current += 0.01
      if (offset.current >= 0.49) {
        offset.current = 0
        stops.current.push(stops.current.shift() as string)
      }
    },
    [width, height]
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <div
        style={{
          border: '1px solid black',
          margin: 0,
          padding: 0,
          width,
          height
        }}
      >
        <RenderCanvas
          ref={canvas}
          width={width}
          height={height}
          flip={flip}
          render={handleRender}
        />
      </div>
    </div>
  )
}
Default.args = {
  width: 640,
  height: 480,

  flip: false
}
