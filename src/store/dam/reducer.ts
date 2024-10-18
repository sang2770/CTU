import { createReducer } from '@reduxjs/toolkit'
import { DAMS_GET_ALL, DAMS_GET_BY_NAME } from './action'


export type Dam = {
    damId: string,
    damName: string,
    damConstructedAt: number[]
    damDescription: string,
    damHeight: number,
    damCapacity: number,
    damLongitude: number,
    damLatitude: number,
    damType: {
        damTypeId: string,
        damTypeName: string,
        damTypeCode: null,
        damTypeDescription: string
    },
    damRiver: {
        riverId: string,
        riverName: string,
        riverCode: null,
        riverLocation: string,
        riverLatitude: string,
        riverLongitude: string,
        riverLevel: string,
        riverAddress: string,
        riverNearestProcessingAt: number[],
        riverLength: number,
        riverWidth: number
    },
    damCurrentStatus: {
        damStatusId: string,
        damStatusName: string
    }
}
export type Dams = {
    dams: Dam[]
    filterDams: Dam[]
}

export const initialState: Dams = {
    dams: [],
    filterDams:[]
}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(DAMS_GET_ALL, (state, action) => {
            state.dams = action.payload.dams;
        })
        .addCase(DAMS_GET_BY_NAME, (state, action) => {
            state.filterDams = action.payload.dams;
        })
)