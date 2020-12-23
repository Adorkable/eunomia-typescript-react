import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
var useStyles = makeStyles(function (theme) { return ({
    hide: {
        opacity: 0.2,
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.shortest
        })
    },
    show: {
        opacity: 1,
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.shortest
        })
    }
}); });
export var OpaqueOnMouseHover = function (props) {
    var _a = useState(false), hovered = _a[0], setHovered = _a[1];
    var handleMouseEnter = function () {
        setHovered(true);
    };
    var handleMouseLeave = function () {
        setHovered(false);
    };
    var classes = useStyles();
    return (React.createElement("div", { className: hovered ? classes.show : classes.hide, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, props.children));
};
export default OpaqueOnMouseHover;
//# sourceMappingURL=OpaqueOnMouseHover.js.map