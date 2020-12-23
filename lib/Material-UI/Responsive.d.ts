import React from 'react';
declare type OptionalRenderingChildren = React.ReactChild | Array<React.ReactChild> | (() => React.ReactChild | Array<React.ReactChild>);
declare type ResponsiveProps = {
    minWidth?: number | string;
    maxWidth?: number | string;
    children: OptionalRenderingChildren;
};
declare const Responsive: (props: ResponsiveProps) => JSX.Element | null;
export declare type Props = {
    children: OptionalRenderingChildren;
};
export declare const Desktop: (props: Props) => JSX.Element;
export declare const Tablet: (props: Props) => JSX.Element;
export declare const Mobile: (props: Props) => JSX.Element;
export default Responsive;
