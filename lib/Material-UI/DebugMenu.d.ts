import React from 'react';
export declare type ModalView = {
    text?: string;
    materialIcon?: string;
    fontAwesomeIcon?: string;
    modalView: React.ReactElement<any>;
};
export declare type Props = {
    modalViews: Array<ModalView>;
};
declare const DebugMenu: (props: Props) => JSX.Element;
export default DebugMenu;
