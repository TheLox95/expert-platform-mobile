import { HttpInstance } from "./http";
import { Offering, User } from "../models";

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

    return {
        getUser,
    }
}

export interface UserRequestInterface {
    getUser: (id: number) => Promise<User>
}

export default UserRequest;