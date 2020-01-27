import { GlobalStateInterface } from "./GlobalStateInterface";
import { InitialStateInterface } from './InitialState';

export interface DispatchAction { 
    type: keyof GlobalStateInterface,
    payload?: Partial<InitialStateInterface> 
}