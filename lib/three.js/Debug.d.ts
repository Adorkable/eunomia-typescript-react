import { Group, Box2, WebGLRenderer, Scene } from 'three';
export declare const createAxisGeometry: () => Group;
export declare const createBounds2DGeometry: (bounds: Box2) => Group;
export declare const attachThreejsDevTool: (renderer: WebGLRenderer, scene: Scene, THREE: any) => void;
