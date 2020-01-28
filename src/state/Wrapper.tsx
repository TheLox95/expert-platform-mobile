import React from 'react';
import { WrappedComponent } from './WrappedComponent';
import { useGlobalState, dispatch } from './GlobalState'
import OfferingRequest from '../requests/Offering.request';
import { HttpConstructor } from '../requests/http';
import Skeleton from '../tools/skeleton';
import { Spinner } from 'native-base';

export default (Component: WrappedComponent): React.FunctionComponent => {

    const http = HttpConstructor(dispatch);

    const OfferingsRequest = OfferingRequest(http);

    const requests = {
        offering: OfferingsRequest
    }


    return ({ children }) => {
        const [ loading ] = useGlobalState('loading');

        return (
            <Skeleton>
                {loading === true ? <Spinner /> : null}
                <Component style={{ display: loading === true ? 'none' : 'unset' }} useGlobalState={useGlobalState} dispatch={dispatch} requests={requests} />
            </Skeleton>
        );
    }

}