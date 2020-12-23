/// <reference types="react" />
import { ViewportSize, SizeProperties } from './Types';
import { WebGLRenderer, Vector2, Box2 } from 'three';
export declare type Props = {
    size?: SizeProperties | void;
    /**
     * Callback called when everything is set up
     */
    onSetUp: () => void;
};
export interface THREEViewHandlers {
    getDOMElementSize: () => Vector2;
    getViewPort: () => Box2;
    getRenderer: () => WebGLRenderer;
    clear: () => void;
    saveToImageData: () => string;
}
export declare const SizePropertiesDefault: ViewportSize;
export declare const ContainerReferenceNotAvailableError = "Container reference not available";
export declare const RendererNotAvailableError = "Renderer not available";
export declare const THREEView: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<THREEViewHandlers>>;
export default THREEView;
