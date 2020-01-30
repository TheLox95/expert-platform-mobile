export const GlobalState = {
    loading: false,
    error: null,
    token: null
};

export interface GlobalStateInterface {
    loading: boolean
    error: string | null
    token: string | null
};

type ErrorState = { type: 'error', payload: string | null }
type TokenState = { type: 'token', payload: string | null }
type LoadingState = { type: 'loading' }
type LoadedState = { type: 'loaded' }

export type States = ErrorState | LoadingState | LoadedState | TokenState;

