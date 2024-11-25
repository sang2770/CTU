import { sensorApi, stationApi, thingApi, farmApi } from "./global-axios"

export const getAllThings = () => thingApi.get(`/`)
export const getThingByFarmId = (farmId: string) => thingApi.get(`/agri-area/${farmId}`)
export const getAllFarms = () => farmApi.get(`/`)
export const getAllStations = () => stationApi.get(`/`)
export const getStationById = (stationId) => stationApi.get(`/${stationId}`)

export const getAllSensors = () => sensorApi.get(`/`)
