"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachThreejsDevTool = exports.createBounds2DGeometry = exports.createAxisGeometry = void 0;
// TODO: this can exist in `eunomia-typescript`
const three_1 = require("three");
const createAxisGeometry = () => {
    const boxGeometry = new three_1.BoxGeometry();
    const redMaterial = new three_1.MeshBasicMaterial({ color: 0xff0000 });
    const greenMaterial = new three_1.MeshBasicMaterial({ color: 0x00ff00 });
    const blueMaterial = new three_1.MeshBasicMaterial({ color: 0x0000ff });
    const x = new three_1.Mesh(boxGeometry, redMaterial);
    x.position.x = 0.5;
    x.scale.y = 0.1;
    x.scale.z = 0.1;
    const y = new three_1.Mesh(boxGeometry, greenMaterial);
    y.position.y = 0.5;
    y.scale.x = 0.1;
    y.scale.z = 0.1;
    const z = new three_1.Mesh(boxGeometry, blueMaterial);
    z.position.z = 0.5;
    z.scale.x = 0.1;
    z.scale.y = 0.1;
    const result = new three_1.Group();
    result.add(x);
    result.add(y);
    result.add(z);
    return result;
};
exports.createAxisGeometry = createAxisGeometry;
const createBounds2DGeometry = (bounds) => {
    const topLeft = exports.createAxisGeometry();
    topLeft.position.x = bounds.min.x;
    topLeft.position.y = bounds.min.y;
    const topRight = exports.createAxisGeometry();
    topRight.position.x = bounds.max.x;
    topRight.position.y = bounds.min.y;
    const bottomLeft = exports.createAxisGeometry();
    bottomLeft.position.x = bounds.min.x;
    bottomLeft.position.y = bounds.max.y;
    const bottomRight = exports.createAxisGeometry();
    bottomRight.position.x = bounds.max.x;
    bottomRight.position.y = bounds.max.y;
    const result = new three_1.Group();
    result.add(topLeft);
    result.add(topRight);
    result.add(bottomLeft);
    result.add(bottomRight);
    return result;
};
exports.createBounds2DGeometry = createBounds2DGeometry;
const attachThreejsDevTool = (renderer, scene, THREE) => {
    if (typeof setupThreejsDevTool === 'function') {
        setupThreejsDevTool({
            renderer,
            scene,
            THREE
        });
    }
    else {
        throw new Error('setupThreejsDevTool is not a function');
    }
};
exports.attachThreejsDevTool = attachThreejsDevTool;
