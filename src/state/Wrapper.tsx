import React from 'react';
import { WrappedComponent } from './WrappedComponent';
import { useGlobalState, dispatch } from './GlobalState'
import OfferingRequest from '../requests/Offering.request';
import { HttpConstructor } from '../requests/http';

export default (Component: WrappedComponent) => {

    const http = HttpConstructor(dispatch);

    const OfferingsRequest = OfferingRequest(http);

    const requests = {
        offering: OfferingsRequest
    }


    return <Component useGlobalState={useGlobalState} dispatch={dispatch} requests={requests} />

}