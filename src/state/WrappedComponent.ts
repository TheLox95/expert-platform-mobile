import { GlobalProps } from "./GlobalProps";

export interface WrappedComponent<T = {}> extends React.FunctionComponent<T & GlobalProps> {
    
}