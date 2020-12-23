import { ReactChild } from 'react';
export declare type Props = {
    'aria-label': string;
    icon: (color: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error') => ReactChild;
    children: ReactChild | Array<ReactChild>;
};
export declare const IconCollapsablePanel: (props: Props) => JSX.Element;
export default IconCollapsablePanel;
