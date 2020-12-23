/// <reference types="react" />
declare type Props = {
    value: number;
    minimum: number;
    maximum: number;
    onChange: (newValue: number) => void;
};
export declare const SliderView: (props: Props) => JSX.Element;
export default SliderView;
