import { createReducer } from '@reduxjs/toolkit'
import { STATIONS_DETAIL_GET_ALL, STATIONS_DETAIL_GET_BY_TIME, STATIONS_GET_ALL } from './action'
import { Domain } from '../domains/reducer'


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
type DataSensor={
    _id: string,
    name: string,
    codeName: string,
    sensorVariable: string,
    unit: string,
    numericFormat: string,
    oldId: string[]
}
export type Station = {
    _id: string
    name: string
    secretCode: string
    secretKey: string
    longitude: string
    latitude: string
    dataTypes: DataSensor[],
    description: "",
    createdAt: string,
    updatedAt: string,
    __v: number,
    domain: Domain


}
export type Stations = {
    stations: Station[],
    stationsDetailByTime: StationDetail[],
    stationsDetailLatest: StationDetail[]
}

export const initialState: Stations = {
    stations: [],
    stationsDetailByTime: [],
    stationsDetailLatest: [],

}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(STATIONS_GET_ALL, (state, action) => {
            state.stations = action.payload.stations;
        })
        .addCase(STATIONS_DETAIL_GET_BY_TIME, (state, action) => {
            state.stationsDetailByTime = action.payload.stationsDetailByTime;
        })
        .addCase(STATIONS_DETAIL_GET_ALL, (state, action) => {
            state.stationsDetailLatest = action.payload.stationsDetailLatest;
        })
)