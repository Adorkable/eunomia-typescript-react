import { Meta } from '@storybook/react'
import * as React from 'react'
import { useCallback, useRef } from 'react'

import { Canvas } from './Canvas'
import { Methods as CanvasMethods } from './Methods'

const displayConfig: Meta = {
  title: 'Canvas'
}
export default displayConfig

interface Props {
  width: number
  height: number

  flip: boolean
}

export const Default = ({ width, height, flip }: Props) => {
  const canvas = useRef<CanvasMethods>(null)

  const handleClickDraw = useCallback(() => {
    if (!canvas.current) {
      return
    }
    const context = canvas.current.getContext()
    if (!context) {
      return
    }
    let gradient = context.createLinearGradient(
      0,
      0,
      canvas.current.width(),
      canvas.current.height()
    )
    gradient.addColorStop(0, 'green')
    gradient.addColorStop(0.5, 'cyan')
    gradient.addColorStop(1, 'red')

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.current.width(), canvas.current.height())
  }, [width, height])

  // const drawIntoVideo = useCallback(() => {
  // }, [])

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
        <Canvas ref={canvas} width={width} height={height} flip={flip} />
      </div>
      <br />
      <button onClick={handleClickDraw}>Draw</button>
      <button onClick={() => canvas.current?.clear()}>Clear</button>
    </div>
  )
}
Default.args = {
  width: 640,
  height: 480,

  flip: false
}
