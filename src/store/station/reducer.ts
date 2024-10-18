import { createReducer } from '@reduxjs/toolkit'
import { STATIONS_DETAIL_GET_ALL, STATIONS_DETAIL_GET_BY_TIME, STATIONS_GET_ALL, STATIONS_GET_BY_ID } from './action'
import { GeoParameters } from '../thing/reducer'


export type StationDetail = {
    so_serial: string,
    ngay_gui: string,
    nhiet_do: number,
    do_man: number,
    do_pH: number,
    trang_thai: number,
    muc_nuoc: number,
    DO: number
}
type SensorType = {
    sensorDescription: string,
    sensorId: number,
    sensorName: string
}

type MultiDataStream = {
    multiDataStreamDescription: string,
    multiDataStreamId: number,
    multiDataStreamName: string,
    sensor: SensorType
}

export type Station = {
    description: string,
    historicalStations: [
        {
            id: {
                stationId: number,
                thingId: number
            },
            installationDate: string,
            isActive: boolean,
            station: {
                description: string,
                id: number,
                name: string,
                node: string
            },
            thing: {
                geoParameters: GeoParameters,
                id: number,
                imageUrl: string,
                thingName: string
            }
        }
    ],
    id: number,
    multiDataStreamDTOs: MultiDataStream[],
    name: string,
    node: string,
    taskingCapabilities:any []

}
export type Stations = {
    stations: Station[],
    station: Station,
    stationsDetailByTime: StationDetail[],
    stationsDetailLatest: StationDetail[]
}

export const initialState: Stations = {
    stations: [],
    station:null,
    stationsDetailByTime: [],
    stationsDetailLatest: [],

}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(STATIONS_GET_ALL, (state, action) => {
            state.stations = action.payload.stations;
        })
        .addCase(STATIONS_GET_BY_ID, (state, action) => {
            state.station = action.payload.station;
        })
        .addCase(STATIONS_DETAIL_GET_BY_TIME, (state, action) => {
            state.stationsDetailByTime = action.payload.stationsDetailByTime;
        })
        .addCase(STATIONS_DETAIL_GET_ALL, (state, action) => {
            state.stationsDetailLatest = action.payload.stationsDetailLatest;
        })
)