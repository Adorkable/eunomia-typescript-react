import * as React from 'react'

import { Video, Methods as VideoMethods } from './Video'

import { useUserMedia } from '../UserMedia'
import { useCallback, useRef } from 'react'

const displayConfig = {
  title: 'Video'
}
export default displayConfig

interface Props {
  autoplay: boolean
  muted: boolean
  controls: boolean
  crossOrigin: string | null
  loop: boolean
  playbackRate: number
  playsInline: boolean
  volume: number
}

export const Default = ({
  autoplay,
  muted,
  controls,
  crossOrigin,
  loop,
  playbackRate,
  playsInline,
  volume
}: Props) => {
  const constraints = {
    audio: false,
    video: {
      facingMode: 'user',
      width: 360,
      height: 270,
      frameRate: {
        ideal: 60
      }
    }
  }
  const { stream } = useUserMedia({ constraints })
  const video = useRef<VideoMethods | null>()

  const play = useCallback(() => {
    if (!video || !video.current) {
      return
    }
    video.current.play()
  }, [video])

  const pause = useCallback(() => {
    if (!video || !video.current) {
      return
    }
    video.current.pause()
  }, [video])

  return (
    <div>
      <Video
        ref={(ref) => (video.current = ref)}
        stream={stream}
        autoplay={autoplay}
        muted={muted}
        controls={controls}
        crossOrigin={crossOrigin}
        loop={loop}
        playbackRate={playbackRate}
        playsInline={playsInline}
        volume={volume}
      />
      <br />
      Ready State: {video.current?.readyState()} Is Ready:{' '}
      {video.current?.isReady()} Width: {video.current?.width()} Height:{' '}
      {video.current?.height()}
      <br />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  )
}
Default.args = {
  autoplay: true,
  muted: true,
  controls: false,
  crossOrigin: null,
  loop: false,
  playbackRate: 1,
  playsInline: true,
  volume: 1
}
