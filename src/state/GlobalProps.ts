import { UseGlobalState, DispatchFunction } from './GlobalState'
import { OfferingRequestInterface } from '../requests/Offering.request';
import { CSSProperties } from 'react';
import { UserRequestInterface } from 'src/requests/User.request';
import { FileRequestInterface } from 'src/requests/File.request';

export interface GlobalProps { 
    style?: CSSProperties
    useGlobalState: UseGlobalState
    dispatch: DispatchFunction
    requests: {
        offering: OfferingRequestInterface
        user: UserRequestInterface
        file: FileRequestInterface
    }
}