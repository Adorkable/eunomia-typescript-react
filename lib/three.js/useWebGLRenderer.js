"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebGLRenderer = void 0;
const react_1 = require("react");
const Utility_1 = require("./Utility");
const useWebGLRenderer = (container, renderSize, renderPixelRatio, options) => {
    const [renderer, setRenderer] = react_1.useState(undefined);
    const [rendererDomElement, setRendererDomElement] = react_1.useState(undefined);
    const attachRenderer = (container) => {
        removeRenderer();
        const newRenderer = Utility_1.createWebGLRenderer(renderSize.x, renderSize.y, renderPixelRatio, options);
        setRendererDomElement(newRenderer.domElement);
        container.appendChild(newRenderer.domElement);
        setRenderer(newRenderer);
    };
    const removeRenderer = () => {
        if (rendererDomElement) {
            rendererDomElement.remove();
            setRendererDomElement(undefined);
        }
        if (renderer) {
            renderer.dispose();
            setRenderer(undefined);
        }
    };
    react_1.useEffect(() => {
        if (container) {
            attachRenderer(container);
        }
        else {
            removeRenderer();
        }
    }, [container]);
    react_1.useEffect(() => {
        return () => {
            removeRenderer();
        };
    }, []);
    return renderer;
};
exports.useWebGLRenderer = useWebGLRenderer;
