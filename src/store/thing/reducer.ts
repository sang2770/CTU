import { createReducer } from '@reduxjs/toolkit'
import { THINGS_GET_ALL } from './action'


export type HistoricalStations = {
    installationDate: string,
    isActive: boolean,
    stationId: number,
    stationName: string,
    thingId: number
}
export type GeoParameters ={
    pondBottomType: string,
    depth: string,
    shape: string,
    coordinates: string,
    radius: string
}
export type Thing = {
    geoParameters: GeoParameters,
    historicalStations: HistoricalStations[],
    imageUrl: string,
    nameThing: string,
    thingId: number
}
export type Things = {
    things: Thing[],
}

export const initialState: Things = {
    things: [],
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(THINGS_GET_ALL, (state, action) => {
            state.things = action.payload.things;
        })
)