import { HttpInstance } from "./http";
import { Offering } from "../models";

const OfferingRequest: (http: HttpInstance) => OfferingRequestInterface = (http) => {
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
        getOfferings,
        getOffering
    }
}

export interface OfferingRequestInterface {
    getOfferings: () => Promise<Offering[]>
    getOffering: (id: number) => Promise<Offering>
}

export default OfferingRequest;