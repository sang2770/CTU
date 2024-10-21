import { createAction } from '@reduxjs/toolkit'
import { Observation } from './reducer'

export const OBSERVATIONS_LATEST_GET_ALL = createAction<{ observationsLatest:Observation[]  }>('@observation/GET_LATEST')
export const OBSERVATION_LATEST_BY_ID = createAction<{ observationLatest:Observation  }>('@observation/GET_LATEST_BY_ID')
export const OBSERVATIONS_GET_ALL = createAction<{ observations:Observation[]  }>('@observation/GET')
export const OBSERVATION_BY_ID = createAction<{ observation:Observation  }>('@observation/GET_BY_ID')
export const OBSERVATION_VIEW_CHART = createAction<{ isViewChart:boolean  }>('@observation/VIEW_CHART')