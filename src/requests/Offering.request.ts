import { HttpInstance } from "./http";
import { Offering } from "../models";

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

    return {
        searchOfferings,
        getOfferings,
        getOffering
    }
}

export interface OfferingRequestInterface {
    searchOfferings: (searchTerm: string) => Promise<Offering[]>
    getOfferings: () => Promise<Offering[]>
    getOffering: (id: number) => Promise<Offering>
}

export default OfferingRequest;