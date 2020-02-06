import AsyncStorage from '@react-native-community/async-storage';
import { HttpInstance } from "./http";
import { User } from "../models";
import { dispatch } from '../state/GlobalState';
import { WrappedHttpFunction, NoParamsWrappedHttpFunction } from "./WrapHttp";
import { getOffering } from './Offering.request';

export const getUser: WrappedHttpFunction<number, User> = (http, id) => {
    return http<User>({
        url: `http://localhost:1337/users/${id}`,
        method: 'GET'
    })
    .then(user => {
        user.videos = user.videos.filter(v => v.hasOwnProperty('id'));
        user.photos = user.photos.filter(p => p.hasOwnProperty('id'));
        return Promise.all(user.offerings.map(o => getOffering(http, o.id) ))
        .then(newOfferings => {
            user.offerings = newOfferings
            return user;
        });
    });
}

export const refresh: NoParamsWrappedHttpFunction<User> = (http) => {
    return AsyncStorage.getItem('user')
    .then((usrString) => {
        const u = JSON.parse(usrString || '{}') as User
        return getUser(http, u.id)
    })
    .then(user => {
        user.videos = user.videos.filter(v => v.hasOwnProperty('id'));
        user.photos = user.photos.filter(p => p.hasOwnProperty('id'));
        return user;
    })
    .then((r) => AsyncStorage.setItem('user', JSON.stringify(r)).then(() => r))
    .then(r => {
        dispatch({ type: 'user', payload: r })
        return r
    })

}

export const login: WrappedHttpFunction<{identifier: string, password: string}, { jwt: string, user: User }> = (http, data) => {
    return http<{ jwt: string, user: User }>({
        url: `http://localhost:1337/auth/local/`,
        method: 'POST',
        data: {
            identifier: data.identifier,
            password: data.password,
        }
    })
    .then((r) => {
        r.user = { 
            ...r.user,
            videos: r.user.videos.filter(v => v.hasOwnProperty('id')),
            photos: r.user.photos.filter(p => p.hasOwnProperty('id')),
        }
        return r;
    })
    .then((r) => AsyncStorage.setItem('token', r.jwt).then(() => r))
    .then((r) => AsyncStorage.setItem('user', JSON.stringify(r.user)).then(() => r))
    .then(r => {
        dispatch({ type: 'token', payload: r.jwt })
        dispatch({ type: 'user', payload: r.user })
        return r
    })
}

export const update: WrappedHttpFunction<User, User> = (http, user: User) => {
    return http({
        url: `http://localhost:1337/users/${user.id}`,
        method: 'put',
        data: { ...user }
    })
}

export const UserRequest: (http: HttpInstance) => UserRequestInterface = (http) => {

    return {
        refresh: () => refresh(http),
        getUser: (data) => getUser(http, data),
        login: (data) => login(http, data),
        update: (data) => update(http, data),
    }
}

export interface UserRequestInterface {
    update: (user: User) => Promise<User>
    getUser: (id: number) => Promise<User>
    login: (data: {identifier: string, password: string}) => Promise<{ jwt: string, user: User }>
    refresh: () => Promise<User>
}

export default UserRequest;