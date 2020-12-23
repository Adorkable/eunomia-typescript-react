"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateHolder = void 0;
const react_1 = require("react");
const StateHolder = (props) => {
    const { initialValue } = props;
    const [value, setValue] = react_1.default.useState(initialValue);
    react_1.default.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    return <react_1.default.Fragment>
            {props.child(value, setValue)}
        </react_1.default.Fragment>;
};
exports.StateHolder = StateHolder;
exports.default = exports.StateHolder;
