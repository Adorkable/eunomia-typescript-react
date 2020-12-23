// TODO: some of these can exist in `eunomia-typescript`
import { WebGLRenderer, Box2, OrthographicCamera, Vector2 } from 'three';
export var physicalToWindowPixelRatio = function () {
    return window.devicePixelRatio ? window.devicePixelRatio : 1;
};
export var createZeroCenteredBox = function (width, height) {
    var widthHalf = width / 2.0;
    var heightHalf = height / 2.0;
    return new Box2(new Vector2(widthHalf * -1, heightHalf * -1), new Vector2(widthHalf, heightHalf));
};
export var createOrthographicCamera = function (viewPortBox, nearClippingPlane, farClippingPlane) {
    var orthographicCamera = new OrthographicCamera(viewPortBox.min.x, viewPortBox.max.x, viewPortBox.min.y, viewPortBox.max.y, nearClippingPlane, farClippingPlane);
    return orthographicCamera;
};
export var createWebGLRenderer = function (width, height, pixelRatio, options) {
    var result = new WebGLRenderer(options || {
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
export var clearScene = function (scene) {
    while (scene.children.length) {
        scene.remove(scene.children[0]);
    }
};
export var calculateRenderSize = function (sizeProperties, renderWindow) {
    var newRenderSize;
    if (sizeProperties.kind === 'FixedSize') {
        newRenderSize = new Vector2(sizeProperties.width, sizeProperties.height);
    }
    else if (renderWindow) {
        newRenderSize = new Vector2(renderWindow.offsetWidth, renderWindow.offsetHeight);
    }
    else {
        newRenderSize = new Vector2(window.innerWidth, window.innerHeight);
    }
    return newRenderSize;
};
export var createViewPortBox = function (sizeProperties, renderContainer, renderSize) {
    var newViewPortBox;
    if (sizeProperties.kind === 'ViewportSize') {
        if (!renderContainer) {
            throw new Error('Render window not available');
        }
        newViewPortBox = createZeroCenteredBox(sizeProperties.viewportSize, (sizeProperties.viewportSize * renderContainer.offsetHeight) /
            renderContainer.offsetWidth);
    }
    else {
        newViewPortBox = createZeroCenteredBox(renderSize.x, renderSize.y);
    }
    return newViewPortBox;
};
//# sourceMappingURL=Utility.js.map