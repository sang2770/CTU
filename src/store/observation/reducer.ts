import { createReducer } from '@reduxjs/toolkit'
import { OBSERVATION_BY_ID, OBSERVATION_LATEST_BY_ID, OBSERVATION_VIEW_CHART, OBSERVATIONS_GET_ALL, OBSERVATIONS_LATEST_GET_ALL } from './action'

export type ObservationHistory = {
    dataStreamId: number,
    id: string,
    name:string,
    result: string,
    resultTime: string
}
export type Observation = {
    observations: ObservationHistory[],
    stationName:string,
    stationId: number
}
type ObservationHistories = {
    observationsLatest: Observation[],
    observationLatest: Observation,
    observations: Observation[],
    observation:Observation,
    isViewChart:boolean
}
export const initialState: ObservationHistories = {
    observationsLatest: null,
    observationLatest:null,
    observations: null,
    observation:null,
    isViewChart:false,
}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(OBSERVATIONS_LATEST_GET_ALL, (state, action) => {
            state.observationsLatest = action.payload.observationsLatest;
        })
        .addCase(OBSERVATION_LATEST_BY_ID, (state, action) => {
            state.observationLatest = action.payload.observationLatest;
        })
        .addCase(OBSERVATIONS_GET_ALL, (state, action) => {
            state.observations = action.payload.observations;
        })
        .addCase(OBSERVATION_BY_ID, (state, action) => {  
            state.observation = action.payload.observation;
        })
        .addCase(OBSERVATION_VIEW_CHART, (state, action) => {  
            state.isViewChart = action.payload.isViewChart;
        })
)