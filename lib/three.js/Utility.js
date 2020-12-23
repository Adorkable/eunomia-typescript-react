"use strict";
// TODO: some of these can exist in `eunomia-typescript`
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewPortBox = exports.calculateRenderSize = exports.clearScene = exports.createWebGLRenderer = exports.createOrthographicCamera = exports.createZeroCenteredBox = exports.physicalToWindowPixelRatio = void 0;
const three_1 = require("three");
const physicalToWindowPixelRatio = () => {
    return window.devicePixelRatio ? window.devicePixelRatio : 1;
};
exports.physicalToWindowPixelRatio = physicalToWindowPixelRatio;
const createZeroCenteredBox = (width, height) => {
    const widthHalf = width / 2.0;
    const heightHalf = height / 2.0;
    return new three_1.Box2(new three_1.Vector2(widthHalf * -1, heightHalf * -1), new three_1.Vector2(widthHalf, heightHalf));
};
exports.createZeroCenteredBox = createZeroCenteredBox;
const createOrthographicCamera = (viewPortBox, nearClippingPlane, farClippingPlane) => {
    const orthographicCamera = new three_1.OrthographicCamera(viewPortBox.min.x, viewPortBox.max.x, viewPortBox.min.y, viewPortBox.max.y, nearClippingPlane, farClippingPlane);
    return orthographicCamera;
};
exports.createOrthographicCamera = createOrthographicCamera;
const createWebGLRenderer = (width, height, pixelRatio, options) => {
    const result = new three_1.WebGLRenderer(options || {
        antialias: true,
        preserveDrawingBuffer: true,
        alpha: true
    });
    result.setPixelRatio(pixelRatio);
    result.setSize(width, height);
    result.autoClear = false;
    result.setClearColor(0x000000, 0.0);
    return result;
};
exports.createWebGLRenderer = createWebGLRenderer;
const clearScene = (scene) => {
    while (scene.children.length) {
        scene.remove(scene.children[0]);
    }
};
exports.clearScene = clearScene;
const calculateRenderSize = (sizeProperties, renderWindow) => {
    let newRenderSize;
    if (sizeProperties.kind === 'FixedSize') {
        newRenderSize = new three_1.Vector2(sizeProperties.width, sizeProperties.height);
    }
    else if (renderWindow) {
        newRenderSize = new three_1.Vector2(renderWindow.offsetWidth, renderWindow.offsetHeight);
    }
    else {
        newRenderSize = new three_1.Vector2(window.innerWidth, window.innerHeight);
    }
    return newRenderSize;
};
exports.calculateRenderSize = calculateRenderSize;
const createViewPortBox = (sizeProperties, renderContainer, renderSize) => {
    let newViewPortBox;
    if (sizeProperties.kind === 'ViewportSize') {
        if (!renderContainer) {
            throw new Error('Render window not available');
        }
        newViewPortBox = exports.createZeroCenteredBox(sizeProperties.viewportSize, (sizeProperties.viewportSize * renderContainer.offsetHeight) /
            renderContainer.offsetWidth);
    }
    else {
        newViewPortBox = exports.createZeroCenteredBox(renderSize.x, renderSize.y);
    }
    return newViewPortBox;
};
exports.createViewPortBox = createViewPortBox;
