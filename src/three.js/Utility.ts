// TODO: some of these can exist in `eunomia-typescript`

import {
  WebGLRenderer,
  Box2,
  OrthographicCamera,
  Scene,
  Vector2,
  WebGLRendererParameters
} from 'three'
import { SizeProperties } from './Types'

export const physicalToWindowPixelRatio = (): number => {
  return window.devicePixelRatio ? window.devicePixelRatio : 1
}

export const createZeroCenteredBox = (width: number, height: number): Box2 => {
  const widthHalf = width / 2.0
  const heightHalf = height / 2.0
  return new Box2(
    new Vector2(widthHalf * -1, heightHalf * -1),
    new Vector2(widthHalf, heightHalf)
  )
}

export const createOrthographicCamera = (
  viewPortBox: Box2,
  nearClippingPlane?: number,
  farClippingPlane?: number
): OrthographicCamera => {
  const orthographicCamera = new OrthographicCamera(
    viewPortBox.min.x,
    viewPortBox.max.x,
    viewPortBox.min.y,
    viewPortBox.max.y,
    nearClippingPlane,
    farClippingPlane
  )
  return orthographicCamera
}

export const createWebGLRenderer = (
  width: number,
  height: number,
  pixelRatio: number,
  options?: WebGLRendererParameters
): WebGLRenderer => {
  const result = new WebGLRenderer(
    options || {
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true
    }
  )
  result.setPixelRatio(pixelRatio)
  result.setSize(width, height)
  result.autoClear = false
  result.setClearColor(0x000000, 0.0)
  return result
}

export const clearScene = (scene: Scene) => {
  while (scene.children.length) {
    scene.remove(scene.children[0])
  }
}

export const calculateRenderSize = (
  sizeProperties: SizeProperties,
  renderWindow: HTMLDivElement
): Vector2 => {
  let newRenderSize: Vector2
  if (sizeProperties.kind === 'FixedSize') {
    newRenderSize = new Vector2(sizeProperties.width, sizeProperties.height)
  } else if (renderWindow) {
    newRenderSize = new Vector2(
      renderWindow.offsetWidth,
      renderWindow.offsetHeight
    )
  } else {
    newRenderSize = new Vector2(window.innerWidth, window.innerHeight)
  }

  return newRenderSize
}

export const createViewPortBox = (
  sizeProperties: SizeProperties,
  renderContainer: HTMLDivElement,
  renderSize: Vector2
) => {
  let newViewPortBox: Box2

  if (sizeProperties.kind === 'ViewportSize') {
    if (!renderContainer) {
      throw new Error('Render window not available')
    }

    newViewPortBox = createZeroCenteredBox(
      sizeProperties.viewportSize,
      (sizeProperties.viewportSize * renderContainer.offsetHeight) /
        renderContainer.offsetWidth
    )
  } else {
    newViewPortBox = createZeroCenteredBox(renderSize.x, renderSize.y)
  }

  return newViewPortBox
}
