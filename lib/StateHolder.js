import React, { Fragment, useEffect, useState } from 'react';
export var StateHolder = function (props) {
    var initialValue = props.initialValue;
    var _a = useState(initialValue), value = _a[0], setValue = _a[1];
    useEffect(function () {
        setValue(initialValue);
    }, [initialValue]);
    return React.createElement(Fragment, null, props.child(value, setValue));
};
export default StateHolder;
//# sourceMappingURL=StateHolder.js.map