import { WebGLRenderer, Box2, OrthographicCamera, Scene, Vector2, WebGLRendererParameters } from 'three';
import { SizeProperties } from './Types';
export declare const physicalToWindowPixelRatio: () => number;
export declare const createZeroCenteredBox: (width: number, height: number) => Box2;
export declare const createOrthographicCamera: (viewPortBox: Box2, nearClippingPlane?: number | undefined, farClippingPlane?: number | undefined) => OrthographicCamera;
export declare const createWebGLRenderer: (width: number, height: number, pixelRatio: number, options?: WebGLRendererParameters | undefined) => WebGLRenderer;
export declare const clearScene: (scene: Scene) => void;
export declare const calculateRenderSize: (sizeProperties: SizeProperties, renderWindow: HTMLDivElement) => Vector2;
export declare const createViewPortBox: (sizeProperties: SizeProperties, renderContainer: HTMLDivElement, renderSize: Vector2) => Box2;
