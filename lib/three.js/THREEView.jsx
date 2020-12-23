"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.THREEView = exports.RendererNotAvailableError = exports.ContainerReferenceNotAvailableError = exports.SizePropertiesDefault = void 0;
const react_1 = require("react");
const Utility_1 = require("./Utility");
const three_1 = require("three");
const useWindowSize_1 = require("../Hooks/useWindowSize");
const useWebGLRenderer_1 = require("./useWebGLRenderer");
exports.SizePropertiesDefault = {
    kind: 'ViewportSize',
    viewportSize: 10
};
exports.ContainerReferenceNotAvailableError = 'Container reference not available';
exports.RendererNotAvailableError = 'Renderer not available';
exports.THREEView = react_1.forwardRef((props, ref) => {
    const containerRef = react_1.useRef(null);
    const [sizeProperties] = react_1.useState(props.size || exports.SizePropertiesDefault);
    const windowSize = useWindowSize_1.default();
    const [renderPixelRatio, setRenderPixelRatio] = react_1.useState(1);
    react_1.useEffect(() => {
        const newValue = (() => {
            if (sizeProperties.kind === 'FitWindowSize') {
                return sizeProperties.pixelsPerWindowPixel;
            }
            return Utility_1.physicalToWindowPixelRatio();
        })();
        setRenderPixelRatio(newValue);
    }, [sizeProperties]);
    const [renderSize, setRenderSize] = react_1.useState(new three_1.Vector2(1, 1));
    const renderer = useWebGLRenderer_1.useWebGLRenderer(containerRef.current, renderSize, renderPixelRatio);
    react_1.useEffect(() => {
        if (!sizeProperties || !containerRef.current) {
            return;
        }
        const newValue = Utility_1.calculateRenderSize(sizeProperties, containerRef.current);
        setRenderSize(newValue);
    }, [sizeProperties, containerRef.current]);
    react_1.useEffect(() => {
        if (!renderer) {
            return;
        }
        props.onSetUp();
    }, [renderer]);
    react_1.useEffect(() => {
        if (!renderer) {
            return;
        }
        console.log('Render size', renderSize);
        renderer.setSize(renderSize.x, renderSize.y);
    }, [renderer, renderSize]);
    react_1.useEffect(() => {
        if (!renderer) {
            return;
        }
        renderer.setPixelRatio(renderPixelRatio);
    }, [renderer, renderPixelRatio]);
    react_1.useEffect(() => {
        if (sizeProperties.kind === 'FitWindowSize') {
            if (sizeProperties.resizeRendererToFit && renderer) {
                setRenderSize(new three_1.Vector2(windowSize.width, windowSize.height));
            }
        }
    }, [windowSize]);
    react_1.useImperativeHandle(ref, () => ({
        getDOMElementSize: () => {
            if (!containerRef.current) {
                throw new Error(exports.ContainerReferenceNotAvailableError);
            }
            // TODO: useEffect cache
            return new three_1.Vector2(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        },
        getViewPort: () => {
            if (!containerRef.current) {
                throw new Error(exports.ContainerReferenceNotAvailableError);
            }
            // TODO: useEffect cache
            return Utility_1.createViewPortBox(sizeProperties, containerRef.current, renderSize);
        },
        getRenderer: () => {
            if (!renderer) {
                throw new Error(exports.RendererNotAvailableError);
            }
            return renderer;
        },
        clear: () => {
            if (renderer) {
                renderer.clear();
            }
        },
        saveToImageData: () => {
            if (!renderer) {
                throw new Error(exports.RendererNotAvailableError);
            }
            const imageMime = 'image/png';
            // TODO: do we have to use the dom element? can't we copy from the renderer?
            return renderer.domElement.toDataURL(imageMime);
        }
    }));
    return (<div className={'container'} style={{
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
    }} ref={containerRef}></div>);
});
exports.default = exports.THREEView;
