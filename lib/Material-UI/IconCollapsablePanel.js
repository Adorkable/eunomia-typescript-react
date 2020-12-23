import React, { useState } from 'react';
import OpaqueOnMouseHover from './OpaqueOnMouseHover';
import { Card, CardContent, CardActions, makeStyles } from '@material-ui/core';
// import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
var useStyles = makeStyles(function (theme) { return ({
    Container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing()
    },
    Contents: {
        display: 'flex',
        flexDirection: 'column'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    CollapsedContent: {
        padding: theme.spacing()
    }
}); });
export var IconCollapsablePanel = function (props) {
    var _a = useState(false), expanded = _a[0], setExpanded = _a[1];
    var handleExpandToggled = function () {
        setExpanded(!expanded);
    };
    var classes = useStyles();
    var renderExpandToggle = function () {
        var icon = props.icon;
        var ariaLabel = props['aria-label'];
        var expandToggleColor = expanded ? 'primary' : 'inherit';
        return (React.createElement(IconButton, { "aria-label": ariaLabel, onClick: handleExpandToggled }, icon(expandToggleColor)));
    };
    return (React.createElement(OpaqueOnMouseHover, null,
        React.createElement(Card, { className: classes.Container },
            React.createElement(CardContent, { className: classes.Contents, style: {
                    padding: 0
                } },
                React.createElement(Collapse, { className: classes.CollapsedContent, 
                    // transitionDuration='auto'
                    in: expanded, unmountOnExit: true }, props.children)),
            React.createElement(CardActions, { style: {
                    padding: 0
                } }, renderExpandToggle()))));
};
export default IconCollapsablePanel;
//# sourceMappingURL=IconCollapsablePanel.js.map