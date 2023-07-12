import { MutableRefObject, RefObject } from 'react'

export interface Methods {
    drawVideo: (video: HTMLVideoElement) => void
    clear: () => void
    getContext: () => CanvasRenderingContext2D | null | undefined

    width: () => number
    height: () => number
}

const drawVideo =
    (
        canvas: RefObject<HTMLCanvasElement>,
        renderContext: MutableRefObject<CanvasRenderingContext2D | undefined>
    ) =>
        (video: HTMLVideoElement) => {
            if (!renderContext.current) {
                return
            }
            renderContext.current.drawImage(
                video,
                0,
                0,
                video.videoWidth,
                video.videoHeight
            )
        }

const clear =
    (
        canvas: RefObject<HTMLCanvasElement>,
        renderContext: MutableRefObject<CanvasRenderingContext2D | undefined>
    ) =>
        () => {
            if (!canvas.current || !renderContext.current) {
                return
            }
            renderContext.current.clearRect(
                0,
                0,
                canvas.current.width,
                canvas.current.height
            )
        }

const getContext =
    (
        canvas: RefObject<HTMLCanvasElement>,
        renderContext: MutableRefObject<CanvasRenderingContext2D | undefined>
    ) =>
        () => {
            return renderContext.current
        }

const width =
    (
        canvas: RefObject<HTMLCanvasElement>,
        renderContext: MutableRefObject<CanvasRenderingContext2D | undefined>
    ) =>
        () => {
            if (!canvas.current) {
                return 0
            }
            return canvas.current.width
        }

const height =
    (
        canvas: RefObject<HTMLCanvasElement>,
        renderContext: MutableRefObject<CanvasRenderingContext2D | undefined>
    ) =>
        () => {
            if (!canvas.current) {
                return 0
            }
            return canvas.current.height
        }

export const methods =
    (
        canvas: RefObject<HTMLCanvasElement>,
        renderContext: MutableRefObject<CanvasRenderingContext2D | undefined>
    ) =>
        (): Methods => ({
            drawVideo: drawVideo(canvas, renderContext),
            clear: clear(canvas, renderContext),
            getContext: getContext(canvas, renderContext),
            width: width(canvas, renderContext),
            height: height(canvas, renderContext)
        })
