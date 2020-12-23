"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mobile = exports.Tablet = exports.Desktop = exports.Responsive = void 0;
const react_1 = require("react");
const useMediaQuery_1 = require("@material-ui/core/useMediaQuery");
const json2mq_1 = require("json2mq");
const Responsive = (props) => {
    const match = useMediaQuery_1.default(json2mq_1.default({
        minWidth: props.minWidth || false,
        maxWidth: props.maxWidth || false
    }));
    if (match) {
        let children;
        if (typeof props.children === 'function') {
            children = props.children();
        }
        else {
            children = props.children;
        }
        return <react_1.Fragment>{children}</react_1.Fragment>;
    }
    return null;
};
exports.Responsive = Responsive;
const Desktop = (props) => (<exports.Responsive minWidth={1025} children={props.children}/>);
exports.Desktop = Desktop;
const Tablet = (props) => (<exports.Responsive minWidth={768} maxWidth={1024} children={props.children}/>);
exports.Tablet = Tablet;
const Mobile = (props) => (<exports.Responsive maxWidth={767} children={props.children}/>);
exports.Mobile = Mobile;
exports.default = exports.Responsive;
