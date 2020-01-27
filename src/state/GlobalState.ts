import { createStore } from 'react-hooks-global-state';
import { GlobalState, GlobalStateInterface } from './InitialState';
import { DispatchAction } from './DispatchAction';

const reducer = (state: GlobalStateInterface, action: DispatchAction ) => {
    switch (action.type) {
      case "loading": return { ...state, loading: true };
      case 'loaded': return { ...state, loading: false };
      default: return state;
    }
  };

export const { useGlobalState, dispatch } = createStore(reducer, GlobalState);

export type UseGlobalState = <Name extends keyof GlobalStateInterface>(name: Name) => readonly [GlobalStateInterface[Name], (u: import("react").SetStateAction<GlobalStateInterface[Name]>) => void];