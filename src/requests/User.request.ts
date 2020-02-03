import AsyncStorage from '@react-native-community/async-storage';
import { HttpInstance } from "./http";
import { User } from "../models";
import { dispatch } from '../state/GlobalState';

const UserRequest: (http: HttpInstance) => UserRequestInterface = (http) => {
    const getUser = (id: number) => {
        return http<User>({
            url: `http://localhost:1337/users/${id}`,
            method: 'GET'
        })
        .then(user => {
            user.videos = user.videos.filter(v => v.hasOwnProperty('id'));
            user.photos = user.photos.filter(p => p.hasOwnProperty('id'));
            return user;
        });
    }

    const refresh = () => {
        return AsyncStorage.getItem('user')
        .then((usrString) => {
            const u = JSON.parse(usrString || '{}') as User
            return getUser(u.id)
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

    const login = (u: string, p: string) => {
        return http<{ jwt: string, user: User }>({
            url: `http://localhost:1337/auth/local/`,
            method: 'POST',
            data: {
                identifier: u,
                password: p,
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
            return r
        })
        .then(r => dispatch({ type: 'user', payload: r.user }))
    }

    const update = (user: User) => {
        return http<User>({
            url: `http://localhost:1337/users/${user.id}`,
            method: 'put',
            data: { ...user }
        })
    }

    return {
        refresh,
        getUser,
        login,
        update,
    }
}

export interface UserRequestInterface {
    update: (user: User) => Promise<User>
    getUser: (id: number) => Promise<User>
    login: (usern: string, pass: string) => Promise<void>
    refresh: () => Promise<User>
}

export default UserRequest;