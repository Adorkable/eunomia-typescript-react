"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderView = void 0;
const react_1 = require("react");
const Typography_1 = require("@material-ui/core/Typography");
const Slider_1 = require("@material-ui/core/Slider");
const SliderView = (props) => {
    const { value, minimum, maximum, onChange } = props;
    const onChangeWrapper = (event, newValue) => {
        if (Array.isArray(newValue)) {
            onChange(newValue[0]); // TODO: what should we do about array value??
        }
        else {
            onChange(newValue);
        }
    };
    // const marks = [
    //   {
    //     value:
    //   }
    // ]
    // marks[`${minimum}`] = minimum
    // marks[`${maximum}`] = maximum
    return (<div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
      <Typography_1.default>{value.toFixed(2)}</Typography_1.default>
      <Slider_1.default value={value} min={minimum} max={maximum} 
    // marks={marks}
    onChange={onChangeWrapper}/>
    </div>);
};
exports.SliderView = SliderView;
exports.default = exports.SliderView;
