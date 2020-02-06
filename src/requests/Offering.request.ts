import { HttpInstance } from "./http";
import { Offering, User, Photo, Video, Opinion } from "../models";
import { WrappedHttpFunction, NoParamsWrappedHttpFunction } from "./WrapHttp";
import { getUser } from "./User.request";

export const create: WrappedHttpFunction<{ name: string, description: string, photos: number[], videos: number[], user: User }, Offering> = (http, data) => {
    return http({
        url: `http://localhost:1337/offerings/`,
        method: 'post',
        data: {
            ...data,
            user: data.user.id
        }
    })
}

export const searchOfferings: WrappedHttpFunction<string,Offering[]> = (http, searchTerm) => {
    return http({
        url: `http://localhost:1337/offerings?name_contains=${searchTerm}`,
        method: 'GET'
    })
}

export const edit: WrappedHttpFunction<{ id: number, name: string, description: string, photos: Photo[], videos: Video[], user: User }, Offering> = (http, data) => {
    return http({
        url: `http://localhost:1337/offerings/${data.id}`,
        method: 'PUT',
        data: {
            ...data,
            user: data.user.id
        }
    })
}

export const getOfferings: NoParamsWrappedHttpFunction<Offering[]> = (http) => {
    return http({
        url: 'http://localhost:1337/offerings',
        method: 'GET'
    })
}

export const getOffering:  WrappedHttpFunction<number, Offering> = (http, id) => {
    const reqs: [Promise<Offering>, Promise<Opinion[]>] = [
        http<Offering>({
            url: `http://localhost:1337/offerings/${id}`,
            method: 'GET'
        }),
        http<Opinion[]>({
            url: `http://localhost:1337/opinions?offering.id=${id}`,
            method: 'GET'
        })
    ]
    return Promise.all(reqs)
        .then(([offering, opinions]) => {
            return Promise.all(opinions.map(o => {
                if (typeof o.user !== 'number') return null
                return getUser(http, o.user)
            }))
                .then((r) => {
                    r.forEach((u, idx) => {
                        if (!u) return
                        opinions[idx].user = u
                    })
                    offering.opinions = opinions
                    return offering;
                })
        })
}


const OfferingRequest: (http: HttpInstance) => OfferingRequestInterface = (http) => {

    return {
        searchOfferings: (data) => searchOfferings(http, data),
        getOfferings: () => getOfferings(http),
        getOffering: (data) => getOffering(http, data),
        create: (data) => create(http, data),
        edit: (data) => edit(http, data),
    }
}

export interface OfferingRequestInterface {
    create: (data: { name: string, description: string, photos: number[], videos: number[], user: User }) => Promise<Offering>
    edit: (data: { id: number, name: string, description: string, photos: Photo[], videos: Video[], user: User }) => Promise<Offering>
    searchOfferings: (searchTerm: string) => Promise<Offering[]>
    getOfferings: () => Promise<Offering[]>
    getOffering: (id: number) => Promise<Offering>
}

export default OfferingRequest;