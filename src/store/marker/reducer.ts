import { createReducer } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { DAM_MARKERS_GET_ALL, STATION_MARKERS_GET_ALL } from './action'


export type Marker = {
    content: ReactNode,
    icon: string,
    position: {
        longitude: number,
        latitude: number
    },
    type: string
}
export type Markers = {
    stationMarkers: Marker[],
    damMarkers: Marker[],
}

export const initialState: Markers = {
    stationMarkers: [],
    damMarkers: [],

}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(STATION_MARKERS_GET_ALL, (state, action) => {
            state.stationMarkers = action.payload.stationMarkers;
        })
        .addCase(DAM_MARKERS_GET_ALL, (state, action) => {
            state.damMarkers = action.payload.damsMarkers;
        })
)