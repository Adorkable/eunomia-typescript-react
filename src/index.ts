export * as Hooks from './Hooks'

export * as MaterialUI from './Material-UI'

export { StateHolder } from './StateHolder'
export type { Props as StateHolderProps } from './StateHolder'

import {
  createAxisGeometry as threejs_createAxisGeometry,
  createBounds2DGeometry as threejs_createBounds2DGeometry
} from './three.js/Debug'

import {
  THREEView as threejs_THREEView,
  SizePropertiesDefault as threejs_SizePropertiesDefault
} from './three.js/THREEView'
import type {
  THREEViewHandlers as threejs_THREEViewHandlers,
  Props as threejs_THREEViewProps
} from './three.js/THREEView'

import type {
  FitWindowSize as threejs_FitWindowSize,
  FixedSize as threejs_FixedSize,
  ViewportSize as threejs_ViewportSize,
  SizeProperties as threejs_SizeProperties
} from './three.js/Types'

import { useWebGLRenderer as threejs_useWebGLRenderer } from './three.js/useWebGLRenderer'

import {
  physicalToWindowPixelRatio as threejs_physicalToWindowPixelRatio,
  createZeroCenteredBox as threejs_createZeroCenteredBox,
  createOrthographicCamera as threejs_createOrthographicCamera,
  createWebGLRenderer as threejs_createWebGLRenderer,
  clearScene as threejs_clearScene,
  calculateRenderSize as threejs_calculateRenderSize,
  createViewPortBox as threejs_createViewPortBox
} from './three.js/Utility'

export namespace threejs {
  export const createAxisGeometry = threejs_createAxisGeometry
  export const createBounds2DGeometry = threejs_createBounds2DGeometry

  export const THREEView = threejs_THREEView
  export const SizePropertiesDefault = threejs_SizePropertiesDefault
  export type THREEViewHandlers = threejs_THREEViewHandlers
  export type THREEViewProps = threejs_THREEViewProps

  export type FitWindowSize = threejs_FitWindowSize
  export type FixedSize = threejs_FixedSize
  export type ViewportSize = threejs_ViewportSize
  export type SizeProperties = threejs_SizeProperties

  export const useWebGLRenderer = threejs_useWebGLRenderer

  export const physicalToWindowPixelRatio = threejs_physicalToWindowPixelRatio
  export const createZeroCenteredBox = threejs_createZeroCenteredBox
  export const createOrthographicCamera = threejs_createOrthographicCamera
  export const createWebGLRenderer = threejs_createWebGLRenderer
  export const clearScene = threejs_clearScene
  export const calculateRenderSize = threejs_calculateRenderSize
  export const createViewPortBox = threejs_createViewPortBox
}
