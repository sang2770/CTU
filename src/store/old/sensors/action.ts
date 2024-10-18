import { createAction } from '@reduxjs/toolkit'
import { Sensor, SensorHistorys } from './reducer'

export const SENSORS_GET_ALL = createAction<{ sensors:Sensor[]  }>('@sensors/GET_ALL')
export const SENSORS_GET_BY_ID = createAction<{ sensorhistory:SensorHistorys  }>('@sensors/GET_BY_ID')
export const SENSORS_SET_FILTER_PERIOD = createAction<{ period:string  }>('@sensors/SET_FILTER_PERIOD')
export const SENSORS_SET_VIEW_CHART = createAction<{ isViewChart:boolean  }>('@sensors/SET_VIEW_CHART')