import React from 'react';
export declare type Props = {
    'aria-label': string;
    icon: (color: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error') => React.ReactChild;
    children: React.ReactChild | Array<React.ReactChild>;
};
declare const IconCollapsablePanel: (props: Props) => JSX.Element;
export default IconCollapsablePanel;
