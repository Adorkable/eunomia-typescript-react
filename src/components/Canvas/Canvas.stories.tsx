import * as React from 'react'
import { useCallback, useRef } from 'react'

import { Canvas, Methods as CanvasMethods } from './Canvas'

const displayConfig = {
  title: 'Canvas'
}
export default displayConfig

interface Props {
  width: number
  height: number

  flip: boolean
}

export const Default = ({ width, height, flip }: Props) => {
  const canvas = useRef<CanvasMethods | null>()

  const draw = useCallback(() => {
    if (!canvas || !canvas.current) {
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
  }, [])

  // const drawIntoVideo = useCallback(() => {
  // }, [])

  return (
    <div>
      <Canvas
        ref={(ref) => (canvas.current = ref)}
        width={width}
        height={height}
        flip={flip}
      />
      <br />
      Width: {canvas.current?.width()} Height: {canvas.current?.height()}
      <br />
      <button onClick={draw}>Draw</button>
      <button onClick={() => canvas.current?.clearContext()}>Clear</button>
    </div>
  )
}
Default.args = {
  width: 640,
  height: 480,

  flip: false
}
