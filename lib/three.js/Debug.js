// TODO: this can exist in `eunomia-typescript`
import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
export var createAxisGeometry = function () {
    var boxGeometry = new BoxGeometry();
    var redMaterial = new MeshBasicMaterial({ color: 0xff0000 });
    var greenMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
    var blueMaterial = new MeshBasicMaterial({ color: 0x0000ff });
    var x = new Mesh(boxGeometry, redMaterial);
    x.position.x = 0.5;
    x.scale.y = 0.1;
    x.scale.z = 0.1;
    var y = new Mesh(boxGeometry, greenMaterial);
    y.position.y = 0.5;
    y.scale.x = 0.1;
    y.scale.z = 0.1;
    var z = new Mesh(boxGeometry, blueMaterial);
    z.position.z = 0.5;
    z.scale.x = 0.1;
    z.scale.y = 0.1;
    var result = new Group();
    result.add(x);
    result.add(y);
    result.add(z);
    return result;
};
export var createBounds2DGeometry = function (bounds) {
    var topLeft = createAxisGeometry();
    topLeft.position.x = bounds.min.x;
    topLeft.position.y = bounds.min.y;
    var topRight = createAxisGeometry();
    topRight.position.x = bounds.max.x;
    topRight.position.y = bounds.min.y;
    var bottomLeft = createAxisGeometry();
    bottomLeft.position.x = bounds.min.x;
    bottomLeft.position.y = bounds.max.y;
    var bottomRight = createAxisGeometry();
    bottomRight.position.x = bounds.max.x;
    bottomRight.position.y = bounds.max.y;
    var result = new Group();
    result.add(topLeft);
    result.add(topRight);
    result.add(bottomLeft);
    result.add(bottomRight);
    return result;
};
export var attachThreejsDevTool = function (renderer, scene, THREE) {
    if (typeof setupThreejsDevTool === 'function') {
        setupThreejsDevTool({
            renderer: renderer,
            scene: scene,
            THREE: THREE
        });
    }
    else {
        throw new Error('setupThreejsDevTool is not a function');
    }
};
//# sourceMappingURL=Debug.js.map