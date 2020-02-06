import { HttpInstance } from "./http";

export interface WrappedHttpFunction<ExpectType, ToReturn> {
    (h: HttpInstance, v: ExpectType): Promise<ToReturn>
}
export interface NoParamsWrappedHttpFunction<ToReturn> {
    (h: HttpInstance): Promise<ToReturn>
}