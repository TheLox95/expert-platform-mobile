import axios, { AxiosRequestConfig } from 'axios';
import { DispatchType } from 'src/state/GlobalState';

export type HttpInstance = <T>(config: AxiosRequestConfig) => Promise<T>


const HttpConstructor = (dispatch: DispatchType): HttpInstance => {
    return <T>(config: AxiosRequestConfig) => {
        dispatch({ type: 'loading' })
        return axios(config)
        .then(r =>{
            dispatch({ type: 'loaded' })
            return r.data as T;
        })
        .catch((error) => {
            dispatch({ type: 'loaded' })
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