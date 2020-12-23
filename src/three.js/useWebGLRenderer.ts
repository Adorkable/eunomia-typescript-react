import { useEffect, useState } from 'react'
import { Vector2, WebGLRenderer, WebGLRendererParameters } from 'three'
import { createWebGLRenderer } from './Utility'

export const useWebGLRenderer = (
  container: HTMLElement | null,
  renderSize: Vector2,
  renderPixelRatio: number,
  options?: WebGLRendererParameters
): WebGLRenderer | void => {
  const [renderer, setRenderer] = useState<WebGLRenderer | void>(undefined)
  const [
    rendererDomElement,
    setRendererDomElement
  ] = useState<HTMLCanvasElement | void>(undefined)

  const attachRenderer = (container: HTMLElement) => {
    removeRenderer()

    const newRenderer = createWebGLRenderer(
      renderSize.x,
      renderSize.y,
      renderPixelRatio,
      options
    )

    setRendererDomElement(newRenderer.domElement)
    container.appendChild(newRenderer.domElement)
    setRenderer(newRenderer)
  }

  const removeRenderer = () => {
    if (rendererDomElement) {
      rendererDomElement.remove()
      setRendererDomElement(undefined)
    }

    if (renderer) {
      renderer.dispose()
      setRenderer(undefined)
    }
  }

  useEffect(() => {
    if (container) {
      attachRenderer(container)
    } else {
      removeRenderer()
    }
  }, [container])

  useEffect(() => {
    return () => {
      removeRenderer()
    }
  }, [])

  return renderer
}
