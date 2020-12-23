import { ReactNode } from 'react';
export interface Props<ValueType> {
    initialValue: ValueType;
    child: (value: ValueType, setValue: (newValue: ValueType) => void) => ReactNode;
}
export declare const StateHolder: <ValueType extends unknown>(props: Props<ValueType>) => JSX.Element;
export default StateHolder;
