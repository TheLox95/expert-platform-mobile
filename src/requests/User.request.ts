import AsyncStorage from '@react-native-community/async-storage';
import { HttpInstance } from "./http";
import { Offering, User } from "../models";
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

    const login = (u: string, p: string) => {
        console.log(u, p)
        return http<{ jwt: string }>({
            url: `http://localhost:1337/auth/local/`,
            method: 'POST',
            data: {
                identifier: u,
                password: p,
            }
        }).then((r) => {
            console.log('token recieved')
            return AsyncStorage.setItem('token', r.jwt).then(() => r)
        })
        .then(r => {
            console.log('dispatching token')
            return dispatch({ type: 'token', payload: r.jwt })
        })
    }

    return {
        getUser,
        login,
    }
}

export interface UserRequestInterface {
    getUser: (id: number) => Promise<User>
    login: (usern: string, pass: string) => Promise<void>
}

export default UserRequest;