import { GlobalProps } from "./GlobalProps";

export interface WrappedComponent<T = {} & GlobalProps> extends React.FunctionComponent<T> {
    
}