import { useEffect, useState } from 'react';
export var useWindowSize = function () {
    var _a = useState({
        width: window.innerWidth,
        height: window.innerHeight
    }), windowSize = _a[0], setWindowSize = _a[1];
    useEffect(function () {
        var handleWindowResize = function () {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener('resize', handleWindowResize); //, false)
        return function () {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return windowSize;
};
export default useWindowSize;
//# sourceMappingURL=useWindowSize.js.map