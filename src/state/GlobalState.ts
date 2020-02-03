import { createStore } from 'react-hooks-global-state';
import { GlobalState, GlobalStateInterface, States } from './InitialState';

const reducer = (state: GlobalStateInterface, action: States ) => {
    switch (action.type) {
      case "loading": return { ...state, loading: true };
      case "loaded": return { ...state, loading: false };
      case 'error': return { ...state, error: action.payload }; 
      case 'info': return { ...state, info: action.payload }; 
      case 'success': return { ...state, success: action.payload }; 
      case 'user': return { ...state, user: action.payload }; 
      case 'token': return { ...state, token: action.payload };
      case 'offeringIdToDisplay': return { ...state, offeringIdToDisplay: action.payload };
      default: return state;
    }
  };

const store = createStore(reducer, GlobalState);

export const useGlobalState = store.useGlobalState;

export type DispatchFunction = ( data: States) => void
export const dispatch: DispatchFunction = store.dispatch;

export type UseGlobalState = <Name extends keyof GlobalStateInterface>(name: Name) => readonly [GlobalStateInterface[Name], (u: import("react").SetStateAction<GlobalStateInterface[Name]>) => void];