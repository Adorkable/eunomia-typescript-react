import { useCallback, useState } from 'react'

import { Callback, CallbackInfo, useRequestAnimationFrame } from './useRequestAnimationFrame'

export const useRequestAnimationFrameInterval = (
    callback: Callback,
    interval: number
) => {
    let [lastIntervalTime, setLastIntervalTime] = useState<number>(0)

    const frame = useCallback((animationFrameData: CallbackInfo) => {
        if (animationFrameData.time - lastIntervalTime < interval) {
            return
        }

        callback(animationFrameData)

        setLastIntervalTime(animationFrameData.time)
    }, [callback, interval, lastIntervalTime])

    useRequestAnimationFrame(frame)
}
