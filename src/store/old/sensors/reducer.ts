import { createReducer } from '@reduxjs/toolkit'
import { SENSORS_GET_ALL, SENSORS_GET_BY_ID, SENSORS_SET_FILTER_PERIOD, SENSORS_SET_VIEW_CHART } from './action'
import { Station } from '../stations/reducer'


export type Sensor = {
    station:Station
    data:{
        waterph: string
        dissolvedOxygen: string
        waterTemp: string
        sal: string
        dateTime: string
    }
}
export type SensorHistorys = {
    station:Station
    data:any
}
export type Sensors = {
    sensors: Sensor[],
    sensorHistorys: SensorHistorys,
    period:string,
    viewChart:boolean
}

export const initialState: Sensors = {
    sensors: [],
    sensorHistorys:null,
    period:'',
    viewChart:false
}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(SENSORS_GET_ALL, (state, action) => {
            state.sensors = action.payload.sensors;
        })
        .addCase(SENSORS_GET_BY_ID, (state, action) => {
            state.sensorHistorys = action.payload.sensorhistory;
        })
        .addCase(SENSORS_SET_FILTER_PERIOD, (state, action) => {
            state.period = action.payload.period
        })
        .addCase(SENSORS_SET_VIEW_CHART, (state, action) => {
            state.viewChart = action.payload.isViewChart
        })
)