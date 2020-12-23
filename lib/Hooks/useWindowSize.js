"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = void 0;
const react_1 = require("react");
const useWindowSize = () => {
    const [windowSize, setWindowSize] = react_1.useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    react_1.useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener('resize', handleWindowResize); //, false)
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return windowSize;
};
exports.useWindowSize = useWindowSize;
exports.default = exports.useWindowSize;
