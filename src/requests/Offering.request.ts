import { HttpInstance } from "./http";
import { Offering, User } from "../models";

const OfferingRequest: (http: HttpInstance) => OfferingRequestInterface = (http) => {
    const searchOfferings = (searchTerm: string) => {
        return http<Offering[]>({
            url: `http://localhost:1337/offerings?name_contains=${searchTerm}`,
            method: 'GET'
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
        create
    }
}

export interface OfferingRequestInterface {
    create: (data: {name: string, description: string, photos: number[], videos: number[], user: User}) => Promise<Offering>
    searchOfferings: (searchTerm: string) => Promise<Offering[]>
    getOfferings: () => Promise<Offering[]>
    getOffering: (id: number) => Promise<Offering>
}

export default OfferingRequest;