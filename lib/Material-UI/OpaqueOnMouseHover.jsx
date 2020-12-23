"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpaqueOnMouseHover = void 0;
const react_1 = require("react");
const styles_1 = require("@material-ui/core/styles");
const useStyles = styles_1.makeStyles((theme) => ({
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
}));
const OpaqueOnMouseHover = (props) => {
    const [hovered, setHovered] = react_1.useState(false);
    const handleMouseEnter = () => {
        setHovered(true);
    };
    const handleMouseLeave = () => {
        setHovered(false);
    };
    const classes = useStyles();
    return (<div className={hovered ? classes.show : classes.hide} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {props.children}
    </div>);
};
exports.OpaqueOnMouseHover = OpaqueOnMouseHover;
exports.default = exports.OpaqueOnMouseHover;
