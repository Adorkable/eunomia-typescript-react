export interface Props {
    key: string;
    defaultValue?: string | null;
    localChangeCheckSeconds?: number | undefined;
    onChange?: ((newValue: string | null) => void) | undefined;
}
export declare const useLocalStorageItem: (props: Props) => string | null;
export default useLocalStorageItem;
