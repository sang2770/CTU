import { createAction } from '@reduxjs/toolkit'
import { Marker } from './reducer'

export const STATION_MARKERS_GET_ALL = createAction<{ stationMarkers:Marker[]  }>('@markers/STATION_MARKERS_GET_ALL')
export const DAM_MARKERS_GET_ALL = createAction<{ damsMarkers:Marker[]  }>('@markers/DAM_MARKERS_GET_ALL')