import { User } from "src/models";

export const GlobalState: GlobalStateInterface = {
    loading: false,
    error: null,
    info: null,
    success: null,
    token: null,
    user: null,
    offeringIdToDisplay: null
};

export interface GlobalStateInterface {
    loading: boolean
    error: string | null
    success: string | null
    info: string | null
    token: string | null
    user: User | null
    offeringIdToDisplay: number | null
};

type ErrorState = { type: 'error', payload: string | null }
type InfoState = { type: 'info', payload: string | null }
type SuccessState = { type: 'success', payload: string | null }
type TokenState = { type: 'token', payload: string | null }
type UserState = { type: 'user', payload: User | null }
type OfferingToDisplayState = { type: 'offeringIdToDisplay', payload: number | null }
type LoadingState = { type: 'loading' }
type LoadedState = { type: 'loaded' }

export type States = ErrorState | LoadingState | LoadedState | TokenState | InfoState | SuccessState | UserState | OfferingToDisplayState;

