import { createReducer } from '@reduxjs/toolkit'
import { FAMRS_GET_ALL } from './action'


export type Farm = {
    agriAreaId: number,
    userId: string,
    displayedId: string,
    deputy: string,
    areaName: string,
    phone: string,
    email: string,
    productionUnitCode: string,
    productionType: string,
    cropsNumberPerYear: number,
    acreage: 0,
    locationId: string
}
export type Farms = {
    farms: Farm[],
}

export const initialState: Farms = {
    farms: [],
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(FAMRS_GET_ALL, (state, action) => {
            state.farms=action.payload.farms;
        })
)