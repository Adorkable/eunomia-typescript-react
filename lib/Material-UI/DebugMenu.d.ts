import { ReactElement } from 'react';
export declare type ModalView = {
    text?: string;
    materialIcon?: string;
    fontAwesomeIcon?: string;
    modalView: ReactElement<any>;
};
export declare type Props = {
    modalViews: Array<ModalView>;
};
export declare const DebugMenu: (props: Props) => JSX.Element;
export default DebugMenu;
