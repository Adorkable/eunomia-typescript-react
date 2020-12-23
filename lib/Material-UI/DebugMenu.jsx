"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMenu = void 0;
const react_1 = require("react");
const IconCollapsablePanel_1 = require("./IconCollapsablePanel");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const useStyles = core_1.makeStyles((theme) => ({
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
        maxHeight: `calc(100vh - ${theme.spacing() * 2})` //window.innerHeight - theme.spacing() * 2
    }
}));
const renderModalViewIconContents = (modalView) => {
    if (modalView.materialIcon) {
        return modalView.materialIcon;
    }
    if (modalView.fontAwesomeIcon) {
        return <i className={`fa fa-${modalView.fontAwesomeIcon}`}/>;
    }
    return null;
};
const DebugMenu = (props) => {
    const [openModalView, setOpenModalView] = react_1.useState(undefined);
    const handleClose = () => {
        setOpenModalView(undefined);
    };
    const classes = useStyles();
    const renderModal = () => {
        if (!openModalView) {
            return null;
        }
        return (<core_1.Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={Boolean(openModalView)} onClose={handleClose}>
        <div className={classes.modal}>{openModalView.modalView}</div>
      </core_1.Modal>);
    };
    const renderModalViewToggle = (modalView) => {
        const style = {
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyItems: 'baseline'
        };
        const openModalView = () => {
            setOpenModalView(modalView);
        };
        return (<span style={style}>
        <core_1.Button onClick={openModalView}>
          <core_1.Icon className={classes.infoIcon}>
            {renderModalViewIconContents(modalView)}
          </core_1.Icon>
          {modalView.text}
        </core_1.Button>
      </span>);
    };
    const { modalViews } = props;
    const linkStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyItems: 'baseline'
    };
    return (<IconCollapsablePanel_1.default icon={(color) => {
        return <icons_1.SettingsInputComponent color={color}/>;
    }} aria-label="Settings input">
      <div className={classes.text}>
        Debug
        <br />
        {modalViews.map((modalView) => {
        const key = `${modalView.text ? modalView.text : ''}${modalView.materialIcon ? modalView.materialIcon : ''}${modalView.fontAwesomeIcon ? modalView.fontAwesomeIcon : ''}`;
        return (<div key={key} style={linkStyle}>
              {renderModalViewToggle(modalView)}
            </div>);
    })}
        {renderModal()}
      </div>
    </IconCollapsablePanel_1.default>);
};
exports.DebugMenu = DebugMenu;
exports.default = exports.DebugMenu;
