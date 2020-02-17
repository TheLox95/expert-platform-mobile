import React from 'react';
import { WrappedComponent } from './WrappedComponent';
import { useGlobalState, dispatch } from './GlobalState'
import OfferingRequest from '../requests/Offering.request';
import { HttpConstructor } from '../requests/http';
import Skeleton from '../tools/skeleton';
import { Spinner, Content, Toast } from 'native-base';
import UserRequest from '../requests/User.request';
import FileRequest from '../requests/File.request';

type WrapperOptions = { skeleton: boolean }

export default function Wrapper<P extends {}>(Component: WrappedComponent<P>, options?: WrapperOptions): React.FunctionComponent<P> {
    return (props: React.PropsWithChildren<P>) => {
        const [ loading ] = useGlobalState('loading');
        const [ error ] = useGlobalState('error');
        const [ token ] = useGlobalState('token');
        const [ info ] = useGlobalState('info');
        const [ success ] = useGlobalState('success');

        const http = HttpConstructor(dispatch, token)

        const OfferingsRequest = OfferingRequest(http);
        const UsersRequest = UserRequest(http);
        const FilesRequest = FileRequest(http);

        const requests = {
            offering: OfferingsRequest,
            user: UsersRequest,
            file: FilesRequest,
        }

        if (error) {
            Toast.show({
                duration: 5000,
                text: error,
                type: 'danger',
                onClose: () => {dispatch({ type: 'error', payload: null })}
              })
        }

        if (info) {
            Toast.show({
                duration: 5000,
                text: info,
                style: { backgroundColor: '#607d8b'},
                textStyle: { color: '#FFFFFF'},
                onClose: () => {dispatch({ type: 'info', payload: null })}
            })
        }

        if (success) {
            Toast.show({
                duration: 5000,
                text: success,
                type: 'success',
                textStyle: { color: '#ffffff'},
                onClose: () => {dispatch({ type: 'success', payload: null })}
              })
        }

        if (options && options.skeleton === false) {
            return (
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Component {...props} useGlobalState={useGlobalState} dispatch={dispatch} requests={requests} />    
                </Content>

            );
        }

        return (
            <Skeleton>
                {loading === true ? <Spinner /> : null}
                {/* TODO: we need to find a way to remove the component form the view layout without removing the component
                from the react tree to not trigger the mount function */}
                <Content style={{ opacity: loading === true ? 0: 1 }} contentContainerStyle={{ flex: 1 }}>
                    <Component {...props} useGlobalState={useGlobalState} dispatch={dispatch} requests={requests} />
                </Content>
            </Skeleton>            
        );        
    }

}