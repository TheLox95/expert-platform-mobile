import { UseGlobalState } from './GlobalState'
import { DispatchAction } from './DispatchAction';
import { OfferingRequestInterface } from '../requests/Offering.request';
import { CSSProperties } from 'react';

export interface GlobalProps { 
    style?: CSSProperties
    useGlobalState: UseGlobalState
    dispatch: (action: DispatchAction) => DispatchAction
    requests: {
        offering: OfferingRequestInterface
    }
}