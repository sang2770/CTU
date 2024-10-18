import { createAction } from '@reduxjs/toolkit'
import { Station, StationDetail } from './reducer'

export const STATIONS_GET_ALL = createAction<{ stations:Station[]  }>('@stations/GET_ALL')
export const STATIONS_DETAIL_GET_ALL = createAction<{stationsDetailLatest:StationDetail[]  }>('@stations/GET_ALL_DETAIL')
export const STATIONS_DETAIL_GET_BY_TIME = createAction<{stationsDetailByTime:StationDetail[]  }>('@stations/GET_ALL_DETAIL_BY_TIME')