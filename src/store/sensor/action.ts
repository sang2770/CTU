import { createAction } from '@reduxjs/toolkit'
import { Sensor } from '../../types/sensor'

export const SENSOR_GET_ALL = createAction<{ sensors:Sensor[]  }>('@sensor/GET_ALL')
export const SENSORS_GET_BY_NAME = createAction<{ sensors:Sensor[]  }>('@sensor/GET_BY_NAME')
