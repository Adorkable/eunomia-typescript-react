import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { physicalToWindowPixelRatio, calculateRenderSize, createViewPortBox } from './Utility';
import { Vector2 } from 'three';
import useWindowSize from '../Hooks/useWindowSize';
import { useWebGLRenderer } from './useWebGLRenderer';
export var SizePropertiesDefault = {
    kind: 'ViewportSize',
    viewportSize: 10
};
export var ContainerReferenceNotAvailableError = 'Container reference not available';
export var RendererNotAvailableError = 'Renderer not available';
export var THREEView = forwardRef(function (props, ref) {
    var containerRef = useRef(null);
    var sizeProperties = useState(props.size || SizePropertiesDefault)[0];
    var windowSize = useWindowSize();
    var _a = useState(1), renderPixelRatio = _a[0], setRenderPixelRatio = _a[1];
    useEffect(function () {
        var newValue = (function () {
            if (sizeProperties.kind === 'FitWindowSize') {
                return sizeProperties.pixelsPerWindowPixel;
            }
            return physicalToWindowPixelRatio();
        })();
        setRenderPixelRatio(newValue);
    }, [sizeProperties]);
    var _b = useState(new Vector2(1, 1)), renderSize = _b[0], setRenderSize = _b[1];
    var renderer = useWebGLRenderer(containerRef.current, renderSize, renderPixelRatio);
    useEffect(function () {
        if (!sizeProperties || !containerRef.current) {
            return;
        }
        var newValue = calculateRenderSize(sizeProperties, containerRef.current);
        setRenderSize(newValue);
    }, [sizeProperties, containerRef.current]);
    useEffect(function () {
        if (!renderer) {
            return;
        }
        props.onSetUp();
    }, [renderer]);
    useEffect(function () {
        if (!renderer) {
            return;
        }
        console.log('Render size', renderSize);
        renderer.setSize(renderSize.x, renderSize.y);
    }, [renderer, renderSize]);
    useEffect(function () {
        if (!renderer) {
            return;
        }
        renderer.setPixelRatio(renderPixelRatio);
    }, [renderer, renderPixelRatio]);
    useEffect(function () {
        if (sizeProperties.kind === 'FitWindowSize') {
            if (sizeProperties.resizeRendererToFit && renderer) {
                setRenderSize(new Vector2(windowSize.width, windowSize.height));
            }
        }
    }, [windowSize]);
    useImperativeHandle(ref, function () { return ({
        getDOMElementSize: function () {
            if (!containerRef.current) {
                throw new Error(ContainerReferenceNotAvailableError);
            }
            // TODO: useEffect cache
            return new Vector2(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        },
        getViewPort: function () {
            if (!containerRef.current) {
                throw new Error(ContainerReferenceNotAvailableError);
            }
            // TODO: useEffect cache
            return createViewPortBox(sizeProperties, containerRef.current, renderSize);
        },
        getRenderer: function () {
            if (!renderer) {
                throw new Error(RendererNotAvailableError);
            }
            return renderer;
        },
        clear: function () {
            if (renderer) {
                renderer.clear();
            }
        },
        saveToImageData: function () {
            if (!renderer) {
                throw new Error(RendererNotAvailableError);
            }
            var imageMime = 'image/png';
            // TODO: do we have to use the dom element? can't we copy from the renderer?
            return renderer.domElement.toDataURL(imageMime);
        }
    }); });
    return (React.createElement("div", { className: 'container', style: {
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
        }, ref: containerRef }));
});
export default THREEView;
//# sourceMappingURL=THREEView.js.map