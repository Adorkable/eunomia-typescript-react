/// <reference types="react" />
export * as Hooks from './Hooks';
export * as MaterialUI from './Material-UI';
export { StateHolder } from './StateHolder';
export type { Props as StateHolderProps } from './StateHolder';
import type { THREEViewHandlers as threejs_THREEViewHandlers, Props as threejs_THREEViewProps } from './three.js/THREEView';
import type { FitWindowSize as threejs_FitWindowSize, FixedSize as threejs_FixedSize, ViewportSize as threejs_ViewportSize, SizeProperties as threejs_SizeProperties } from './three.js/Types';
export declare namespace threejs {
    const createAxisGeometry: () => import("three").Group;
    const createBounds2DGeometry: (bounds: import("three").Box2) => import("three").Group;
    const THREEView: import("react").ForwardRefExoticComponent<threejs_THREEViewProps & import("react").RefAttributes<threejs_THREEViewHandlers>>;
    const SizePropertiesDefault: threejs_ViewportSize;
    type THREEViewHandlers = threejs_THREEViewHandlers;
    type THREEViewProps = threejs_THREEViewProps;
    type FitWindowSize = threejs_FitWindowSize;
    type FixedSize = threejs_FixedSize;
    type ViewportSize = threejs_ViewportSize;
    type SizeProperties = threejs_SizeProperties;
    const useWebGLRenderer: (container: HTMLElement | null, renderSize: import("three").Vector2, renderPixelRatio: number, options?: import("three").WebGLRendererParameters | undefined) => void | import("three").WebGLRenderer;
    const physicalToWindowPixelRatio: () => number;
    const createZeroCenteredBox: (width: number, height: number) => import("three").Box2;
    const createOrthographicCamera: (viewPortBox: import("three").Box2, nearClippingPlane?: number | undefined, farClippingPlane?: number | undefined) => import("three").OrthographicCamera;
    const createWebGLRenderer: (width: number, height: number, pixelRatio: number, options?: import("three").WebGLRendererParameters | undefined) => import("three").WebGLRenderer;
    const clearScene: (scene: import("three").Scene) => void;
    const calculateRenderSize: (sizeProperties: threejs_SizeProperties, renderWindow: HTMLDivElement) => import("three").Vector2;
    const createViewPortBox: (sizeProperties: threejs_SizeProperties, renderContainer: HTMLDivElement, renderSize: import("three").Vector2) => import("three").Box2;
}
