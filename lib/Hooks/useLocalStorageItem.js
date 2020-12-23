import { useEffect, useState } from 'react';
export var useLocalStorageItem = function (props) {
    var key = props.key, defaultValue = props.defaultValue, localChangeCheckSeconds = props.localChangeCheckSeconds, onChange = props.onChange;
    var _a = useState(localStorage.getItem(key)), currentValue = _a[0], setCurrentValue = _a[1];
    useEffect(function () {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, defaultValue || '');
        }
    }, [key]);
    useEffect(function () {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, defaultValue || '');
        }
    }, [defaultValue]);
    useEffect(function () {
        if (onChange) {
            onChange(currentValue);
        }
    }, [currentValue]);
    useEffect(function () {
        var checkChange = function () {
            var checkValue = localStorage.getItem(key);
            if (checkValue !== currentValue) {
                setCurrentValue(checkValue);
            }
        };
        var callback = function (event /*Event*/) {
            if (event.storageArea !== localStorage) {
                return;
            }
            checkChange();
        };
        window.addEventListener('storage', callback); // only fires if other docs change the storage area
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, defaultValue || '');
        }
        var intervalSubscription = undefined;
        if (localChangeCheckSeconds) {
            intervalSubscription = setInterval(checkChange, localChangeCheckSeconds * 1000);
        }
        return function () {
            window.removeEventListener('storage', callback);
            if (intervalSubscription) {
                clearInterval(intervalSubscription);
            }
        };
    }, []);
    return currentValue;
};
export default useLocalStorageItem;
//# sourceMappingURL=useLocalStorageItem.js.map