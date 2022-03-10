import * as React from 'react'

import { useUserMedia } from './useUserMedia'

const displayConfig = {
  title: 'useUserMedia'
}
export default displayConfig

interface Props {
  audio: boolean
  facingMode: string
  width: number
  height: number
  idealFrameRate: number
}

export const Default = ({
  audio,
  facingMode,
  width,
  height,
  idealFrameRate
}: Props) => {
  const { stream } = useUserMedia({
    constraints: {
      audio,
      video: {
        facingMode,
        width,
        height,
        frameRate: {
          ideal: idealFrameRate
        }
      }
    }
  })

  return (
    <div>
      Id: {stream?.id}
      <br />
      Active: {stream?.active}
      <br />
      Video Track Count: {stream?.getVideoTracks()?.length}
    </div>
  )
}
Default.args = {
  audio: false,
  facingMode: 'user',
  width: 360,
  height: 270,
  idealFrameRate: 60
}
