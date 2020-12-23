import React from 'react';
import Typography from '@material-ui/core/Typography';
import MaterialSlider from '@material-ui/core/Slider';
export var SliderView = function (props) {
    var value = props.value, minimum = props.minimum, maximum = props.maximum, onChange = props.onChange;
    var onChangeWrapper = function (_event, newValue) {
        if (Array.isArray(newValue)) {
            onChange(newValue[0]); // TODO: what should we do about array value??
        }
        else {
            onChange(newValue);
        }
    };
    return (React.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        } },
        React.createElement(Typography, null, value.toFixed(2)),
        React.createElement(MaterialSlider, { value: value, min: minimum, max: maximum, onChange: onChangeWrapper })));
};
export default SliderView;
//# sourceMappingURL=SliderView.js.map