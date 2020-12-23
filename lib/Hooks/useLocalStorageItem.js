"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorageItem = void 0;
const react_1 = require("react");
const useLocalStorageItem = (props) => {
    const { key, defaultValue, localChangeCheckSeconds, onChange } = props;
    const [currentValue, setCurrentValue] = react_1.useState(localStorage.getItem(key));
    react_1.useEffect(() => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, defaultValue || '');
        }
    }, [key]);
    react_1.useEffect(() => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, defaultValue || '');
        }
    }, [defaultValue]);
    react_1.useEffect(() => {
        if (onChange) {
            onChange(currentValue);
        }
    }, [currentValue]);
    react_1.useEffect(() => {
        const checkChange = () => {
            const checkValue = localStorage.getItem(key);
            if (checkValue !== currentValue) {
                setCurrentValue(checkValue);
            }
        };
        const callback = (event /*Event*/) => {
            if (event.storageArea !== localStorage) {
                return;
            }
            checkChange();
        };
        window.addEventListener('storage', callback); // only fires if other docs change the storage area
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, defaultValue || '');
        }
        let intervalSubscription = undefined;
        if (localChangeCheckSeconds) {
            intervalSubscription = setInterval(checkChange, localChangeCheckSeconds * 1000);
        }
        return () => {
            window.removeEventListener('storage', callback);
            if (intervalSubscription) {
                clearInterval(intervalSubscription);
            }
        };
    }, []);
    return currentValue;
};
exports.useLocalStorageItem = useLocalStorageItem;
exports.default = exports.useLocalStorageItem;
