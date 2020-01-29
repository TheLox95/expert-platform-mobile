import React from 'react';
import { WrappedComponent } from './WrappedComponent';
import { useGlobalState, dispatch } from './GlobalState'
import OfferingRequest from '../requests/Offering.request';
import { HttpConstructor } from '../requests/http';
import Skeleton from '../tools/skeleton';
import { Spinner, Content } from 'native-base';
import { useNavigationState } from 'react-navigation-hooks';

type WrapperOptions = { skeleton: boolean }

export default function Wrapper<P extends {}>(Component: WrappedComponent<P>, options?: WrapperOptions): React.FunctionComponent<P> {

    const http = HttpConstructor(dispatch);

    const OfferingsRequest = OfferingRequest(http);

    const requests = {
        offering: OfferingsRequest
    }


    return (props: React.PropsWithChildren<P>) => {
        const [ loading ] = useGlobalState('loading');

        if (options && options.skeleton === false) {
            return (
                <Component {...props} useGlobalState={useGlobalState} dispatch={dispatch} requests={requests} />    
            );
        }

        console.log(useNavigationState())

        return (
            <Skeleton>
                {loading === true ? <Spinner /> : null}
                {/* TODO: we need to find a way to remove the component form the view layout without removing the component
                from the react tree to not trigger the mount function */}
                <Content style={{ opacity: loading === true ? 0: 1 }}>
                    <Component {...props} useGlobalState={useGlobalState} dispatch={dispatch} requests={requests} />
                </Content>
            </Skeleton>            
        );        
    }

}