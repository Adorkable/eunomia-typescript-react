import { useEffect, useState } from 'react';
import { createWebGLRenderer } from './Utility';
export var useWebGLRenderer = function (container, renderSize, renderPixelRatio, options) {
    var _a = useState(undefined), renderer = _a[0], setRenderer = _a[1];
    var _b = useState(undefined), rendererDomElement = _b[0], setRendererDomElement = _b[1];
    var attachRenderer = function (container) {
        removeRenderer();
        var newRenderer = createWebGLRenderer(renderSize.x, renderSize.y, renderPixelRatio, options);
        setRendererDomElement(newRenderer.domElement);
        container.appendChild(newRenderer.domElement);
        setRenderer(newRenderer);
    };
    var removeRenderer = function () {
        if (rendererDomElement) {
            rendererDomElement.remove();
            setRendererDomElement(undefined);
        }
        if (renderer) {
            renderer.dispose();
            setRenderer(undefined);
        }
    };
    useEffect(function () {
        if (container) {
            attachRenderer(container);
        }
        else {
            removeRenderer();
        }
    }, [container]);
    useEffect(function () {
        return function () {
            removeRenderer();
        };
    }, []);
    return renderer;
};
//# sourceMappingURL=useWebGLRenderer.js.map