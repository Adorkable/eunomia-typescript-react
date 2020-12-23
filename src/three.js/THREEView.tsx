import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import { ViewportSize, SizeProperties } from './Types'

import {
  physicalToWindowPixelRatio,
  calculateRenderSize,
  createViewPortBox
} from './Utility'

import { WebGLRenderer, Vector2, Box2 } from 'three'
import useWindowSize from '../Hooks/useWindowSize'
import { useWebGLRenderer } from './useWebGLRenderer'

export type Props = {
  size?: SizeProperties | void

  /**
   * Callback called when everything is set up
   */
  onSetUp: () => void
}

export interface THREEViewHandlers {
  getDOMElementSize: () => Vector2
  getViewPort: () => Box2

  getRenderer: () => WebGLRenderer

  clear: () => void

  saveToImageData: () => string
}

export const SizePropertiesDefault: ViewportSize = {
  kind: 'ViewportSize',

  viewportSize: 10
}

export const ContainerReferenceNotAvailableError =
  'Container reference not available'
export const RendererNotAvailableError = 'Renderer not available'

export const THREEView = forwardRef<THREEViewHandlers, Props>(
  (props: Props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const [sizeProperties] = useState<SizeProperties>(
      props.size || SizePropertiesDefault
    )

    const windowSize = useWindowSize()

    const [renderPixelRatio, setRenderPixelRatio] = useState<number>(1)

    useEffect(() => {
      const newValue = ((): number => {
        if (sizeProperties.kind === 'FitWindowSize') {
          return sizeProperties.pixelsPerWindowPixel
        }
        return physicalToWindowPixelRatio()
      })()
      setRenderPixelRatio(newValue)
    }, [sizeProperties])

    const [renderSize, setRenderSize] = useState<Vector2>(new Vector2(1, 1))

    const renderer = useWebGLRenderer(
      containerRef.current,
      renderSize,
      renderPixelRatio
    )

    useEffect(() => {
      if (!sizeProperties || !containerRef.current) {
        return
      }

      const newValue = calculateRenderSize(sizeProperties, containerRef.current)
      setRenderSize(newValue)
    }, [sizeProperties, containerRef.current])

    useEffect(() => {
      if (!renderer) {
        return
      }

      props.onSetUp()
    }, [renderer])

    useEffect(() => {
      if (!renderer) {
        return
      }
      console.log('Render size', renderSize)
      renderer.setSize(renderSize.x, renderSize.y)
    }, [renderer, renderSize])

    useEffect(() => {
      if (!renderer) {
        return
      }
      renderer.setPixelRatio(renderPixelRatio)
    }, [renderer, renderPixelRatio])

    useEffect(() => {
      if (sizeProperties.kind === 'FitWindowSize') {
        if (sizeProperties.resizeRendererToFit && renderer) {
          setRenderSize(new Vector2(windowSize.width, windowSize.height))
        }
      }
    }, [windowSize])

    useImperativeHandle(
      ref,
      (): THREEViewHandlers => ({
        getDOMElementSize: () => {
          if (!containerRef.current) {
            throw new Error(ContainerReferenceNotAvailableError)
          }
          // TODO: useEffect cache
          return new Vector2(
            containerRef.current.offsetWidth,
            containerRef.current.offsetHeight
          )
        },
        getViewPort: () => {
          if (!containerRef.current) {
            throw new Error(ContainerReferenceNotAvailableError)
          }
          // TODO: useEffect cache
          return createViewPortBox(
            sizeProperties,
            containerRef.current,
            renderSize
          )
        },
        getRenderer: () => {
          if (!renderer) {
            throw new Error(RendererNotAvailableError)
          }
          return renderer
        },
        clear: () => {
          if (renderer) {
            renderer.clear()
          }
        },
        saveToImageData: () => {
          if (!renderer) {
            throw new Error(RendererNotAvailableError)
          }
          const imageMime = 'image/png'
          // TODO: do we have to use the dom element? can't we copy from the renderer?
          return renderer.domElement.toDataURL(imageMime)
        }
      })
    )

    return (
      <div
        className={'container'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          flexBasis: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
          overflow: 'hidden'
        }}
        ref={containerRef}
      ></div>
    )
  }
)

export default THREEView
