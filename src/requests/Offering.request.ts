import { HttpInstance } from "./http";
import { Offering } from "../models";

const OfferingRequest: (http: HttpInstance) => OfferingRequestInterface = (http) => {
    const getOfferings = () => {
        return http<Offering[]>({
            url: 'http://localhost:1337/offerings',
            method: 'GET'
        })
    }

    return {
        getOfferings
    }
}

export interface OfferingRequestInterface {
    getOfferings: () => Promise<Offering[]>
}

export default OfferingRequest;