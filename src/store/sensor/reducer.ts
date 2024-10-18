import { createReducer } from '@reduxjs/toolkit'
import { SENSOR_GET_ALL, SENSORS_GET_BY_NAME } from './action'
import { Sensor } from '../../types/sensor'

type Sensors = {
    sensors: Sensor[],
    filterSensors: Sensor[]
}
export const initialState: Sensors = {
    sensors: [],
    filterSensors:[]
}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(SENSOR_GET_ALL, (state, action) => {
            state.sensors = action.payload.sensors;
        })
        .addCase(SENSORS_GET_BY_NAME, (state, action) => {
            state.filterSensors = action.payload.sensors;
        })
)