import { createReducer } from '@reduxjs/toolkit'
import { DOMAINS_DETAIL_GET_ALL, DOMAINS_DETAIL_GET_BY_TIME, DOMAINS_GET_ALL } from './action'


export type DomainDetail = {
    so_serial: string,
    ngay_gui: string,
    nhiet_do: number,
    do_man: number,
    do_pH: number,
    trang_thai: number,
    muc_nuoc: number,
    DO: number
}

export type Domain = {
    _id:string,
    name:string,
    description:string
}
export type Domains = {
    domains: Domain[],
    domainsDetailByTime: DomainDetail[],
    domainsDetailLatest: DomainDetail[]
}

export const initialState: Domains = {
    domains: [],
    domainsDetailByTime:[],
    domainsDetailLatest: [],

}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(DOMAINS_GET_ALL, (state, action) => {
            state.domains = action.payload.domains;
        })
        .addCase(DOMAINS_DETAIL_GET_BY_TIME, (state, action) => {
            state.domainsDetailByTime = action.payload.domainsDetailByTime;
        })
        .addCase(DOMAINS_DETAIL_GET_ALL, (state, action) => {
            state.domainsDetailLatest = action.payload.domainsDetailLatest;
        })
)