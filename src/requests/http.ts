import axios, { AxiosRequestConfig } from 'axios';
import { DispatchFunction } from 'src/state/GlobalState';

export type HttpInstance = <T>(config: AxiosRequestConfig) => Promise<T>


const HttpConstructor = (dispatch: DispatchFunction, token: string | null): HttpInstance => {
    return <T>(config: AxiosRequestConfig & { disableLoad?: boolean }) => {

        if (config.disableLoad !== true) {
            dispatch({ type: 'loading' })
        }

        const authHeader = token ? { Authorization: `Bearer ${token}`} : {}

        return axios({
            ...config,
            headers: {
                ...config.headers,
                ...authHeader
            }
        })
        .then(r =>{
            if (config.disableLoad !== true) {
                dispatch({ type: 'loaded' })
            }
            
            return r.data as T;
        })
        .catch((error) => {
            if (config.disableLoad !== true) {
                dispatch({ type: 'loaded' })
            }

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                dispatch({ type: 'error', payload: JSON.stringify(error.response.data.message)})
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
                dispatch({ type: 'error', payload: 'The request was made but no response was received' })
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
                dispatch({ type: 'error', payload: 'Unknow network error' })
            }

            throw error

        }) 
    }
}

export {
    HttpConstructor
}