"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const OpaqueOnMouseHover_1 = require("./OpaqueOnMouseHover");
const core_1 = require("@material-ui/core");
// import Icon from '@material-ui/core/Icon'
const IconButton_1 = require("@material-ui/core/IconButton");
const Collapse_1 = require("@material-ui/core/Collapse");
const useStyles = core_1.makeStyles((theme) => ({
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
}));
const IconCollapsablePanel = (props) => {
    const [expanded, setExpanded] = react_1.default.useState(false);
    const handleExpandToggled = () => {
        setExpanded(!expanded);
    };
    const classes = useStyles();
    const renderExpandToggle = () => {
        const { icon } = props;
        const ariaLabel = props['aria-label'];
        const expandToggleColor = expanded ? 'primary' : 'inherit';
        return (<IconButton_1.default aria-label={ariaLabel} onClick={handleExpandToggled}>
        {icon(expandToggleColor)}
      </IconButton_1.default>);
    };
    return (<OpaqueOnMouseHover_1.default>
      <core_1.Card className={classes.Container}>
        <core_1.CardContent className={classes.Contents} style={{
        padding: 0
    }}>
          <Collapse_1.default className={classes.CollapsedContent} 
    // transitionDuration='auto'
    in={expanded} unmountOnExit>
            {props.children}
          </Collapse_1.default>
        </core_1.CardContent>
        <core_1.CardActions style={{
        padding: 0
    }}>
          {renderExpandToggle()}
        </core_1.CardActions>
      </core_1.Card>
    </OpaqueOnMouseHover_1.default>);
};
exports.default = IconCollapsablePanel;
