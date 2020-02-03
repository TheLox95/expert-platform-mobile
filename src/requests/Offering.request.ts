import { HttpInstance } from "./http";
import { Offering, User, Photo, Video } from "../models";

const OfferingRequest: (http: HttpInstance) => OfferingRequestInterface = (http) => {
    const searchOfferings = (searchTerm: string) => {
        return http<Offering[]>({
            url: `http://localhost:1337/offerings?name_contains=${searchTerm}`,
            method: 'GET'
        })
    }

    const edit = (data: { id: number, name: string, description: string, photos: Photo[], videos: Video[], user: User}) => {
        return http<Offering>({
            url: `http://localhost:1337/offerings/${data.id}`,
            method: 'PUT',
            data: {
                ...data,
                user: data.user.id
            }
        })
    }

    const getOfferings = () => {
        return http<Offering[]>({
            url: 'http://localhost:1337/offerings',
            method: 'GET'
        })
    }

    const getOffering = (id: number) => {
        return http<Offering>({
            url: `http://localhost:1337/offerings/${id}`,
            method: 'GET'
        })
    }

    const create = (data: {name: string, description: string, photos: number[], videos: number[], user: User}) => {
        return http<Offering>({
            url: `http://localhost:1337/offerings/`,
            method: 'post',
            data: {
                ...data,
                user: data.user.id
            }
        })
    }

    return {
        searchOfferings,
        getOfferings,
        getOffering,
        create,
        edit
    }
}

export interface OfferingRequestInterface {
    create: (data: {name: string, description: string, photos: number[], videos: number[], user: User}) => Promise<Offering>
    edit: (data: {id: number, name: string, description: string, photos: Photo[], videos: Video[], user: User}) => Promise<Offering>
    searchOfferings: (searchTerm: string) => Promise<Offering[]>
    getOfferings: () => Promise<Offering[]>
    getOffering: (id: number) => Promise<Offering>
}

export default OfferingRequest;