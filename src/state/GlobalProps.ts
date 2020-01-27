import { UseGlobalState } from './GlobalState'
import { DispatchAction } from './DispatchAction';
import { OfferingRequestInterface } from '../requests/Offering.request';

export interface GlobalProps { 
    useGlobalState: UseGlobalState
    dispatch: (action: DispatchAction) => DispatchAction
    requests: {
        offering: OfferingRequestInterface
    }
}