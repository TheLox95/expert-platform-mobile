import axios, { AxiosRequestConfig } from 'axios';
import { DispatchAction } from '../state/DispatchAction';

export type HttpInstance = <T>(config: AxiosRequestConfig) => Promise<T>


const HttpConstructor = (dispatch: (action: DispatchAction ) => void): HttpInstance => {
    return <T>(config: AxiosRequestConfig) => {
        dispatch({ type: 'loading' })
        return axios(config)
        .then(r =>{
            dispatch({ type: 'loaded' })
            return r.data as T;
        })
        .catch((err) => {
            console.log(err)
            throw err
        }) 
    }
}

export {
    HttpConstructor
}