import { sensorApi, stationApi, thingApi } from "./global-axios"

export const getAllThings = () => thingApi.get(`/`)

export const getAllStations = () => stationApi.get(`/`)
export const getStationById = (stationId) => stationApi.get(`/${stationId}`)

export const getAllSensors = () => sensorApi.get(`/`)
