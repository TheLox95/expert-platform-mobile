export const GlobalState = {
    loading: false,
    error: null
};

export interface GlobalStateInterface {
    loading: boolean
    error: string | null
};

type ErrorState = { type: 'error', payload: string | null }
type LoadingState = { type: 'loading' }
type LoadedState = { type: 'loaded' }

export type States = ErrorState | LoadingState | LoadedState;

