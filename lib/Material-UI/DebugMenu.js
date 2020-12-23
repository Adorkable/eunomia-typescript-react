import React, { useState } from 'react';
import IconCollapsablePanel from './IconCollapsablePanel';
import { Icon, Button, Modal, makeStyles } from '@material-ui/core';
import { SettingsInputComponent } from '@material-ui/icons';
var useStyles = makeStyles(function (theme) { return ({
    text: theme.typography.body1,
    infoIcon: {
        display: 'inline-block',
        paddingRight: theme.spacing(),
        color: 'black'
    },
    aLink: {
        color: 'black',
        textDecoration: 'none'
    },
    modal: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        maxHeight: "calc(100vh - " + theme.spacing() * 2 + ")" //window.innerHeight - theme.spacing() * 2
    }
}); });
var renderModalViewIconContents = function (modalView) {
    if (modalView.materialIcon) {
        return modalView.materialIcon;
    }
    if (modalView.fontAwesomeIcon) {
        return React.createElement("i", { className: "fa fa-" + modalView.fontAwesomeIcon });
    }
    return null;
};
export var DebugMenu = function (props) {
    var _a = useState(undefined), openModalView = _a[0], setOpenModalView = _a[1];
    var handleClose = function () {
        setOpenModalView(undefined);
    };
    var classes = useStyles();
    var renderModal = function () {
        if (!openModalView) {
            return null;
        }
        return (React.createElement(Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: Boolean(openModalView), onClose: handleClose },
            React.createElement("div", { className: classes.modal }, openModalView.modalView)));
    };
    var renderModalViewToggle = function (modalView) {
        var style = {
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyItems: 'baseline'
        };
        var openModalView = function () {
            setOpenModalView(modalView);
        };
        return (React.createElement("span", { style: style },
            React.createElement(Button, { onClick: openModalView },
                React.createElement(Icon, { className: classes.infoIcon }, renderModalViewIconContents(modalView)),
                modalView.text)));
    };
    var modalViews = props.modalViews;
    var linkStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyItems: 'baseline'
    };
    return (React.createElement(IconCollapsablePanel, { icon: function (color) {
            return React.createElement(SettingsInputComponent, { color: color });
        }, "aria-label": "Settings input" },
        React.createElement("div", { className: classes.text },
            "Debug",
            React.createElement("br", null),
            modalViews.map(function (modalView) {
                var key = "" + (modalView.text ? modalView.text : '') + (modalView.materialIcon ? modalView.materialIcon : '') + (modalView.fontAwesomeIcon ? modalView.fontAwesomeIcon : '');
                return (React.createElement("div", { key: key, style: linkStyle }, renderModalViewToggle(modalView)));
            }),
            renderModal())));
};
export default DebugMenu;
//# sourceMappingURL=DebugMenu.js.map