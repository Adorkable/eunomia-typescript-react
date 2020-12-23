import React, { Fragment } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';
export var Responsive = function (props) {
    var match = useMediaQuery(json2mq({
        minWidth: props.minWidth || false,
        maxWidth: props.maxWidth || false
    }));
    if (match) {
        var children = void 0;
        if (typeof props.children === 'function') {
            children = props.children();
        }
        else {
            children = props.children;
        }
        return React.createElement(Fragment, null, children);
    }
    return null;
};
export var Desktop = function (props) { return (React.createElement(Responsive, { minWidth: 1025, children: props.children })); };
export var Tablet = function (props) { return (React.createElement(Responsive, { minWidth: 768, maxWidth: 1024, children: props.children })); };
export var Mobile = function (props) { return (React.createElement(Responsive, { maxWidth: 767, children: props.children })); };
export default Responsive;
//# sourceMappingURL=Responsive.js.map