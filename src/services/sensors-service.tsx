import { authApi } from "./global-axios";

// http://dev.iotlab.net.vn:5000/api/v1/sensor-values/latest?station=647f0611ce4ba698b98b36cd&domain=64a5867ec3afc56b5b9f11d0
// http://dev.iotlab.net.vn:5000/api/v1/sensor-values/chart?station=649998928cc390d78a5b65c2&period=2024-09-13
export const getSensorsByStationAndDomain = (stationId, domainId) => authApi.get(`/sensor-values/latest?station=${stationId}&domain=${domainId}`)
export const getSensorsByStationAndTime = (stationId, period) => authApi.get(`/sensor-values/chart?station=${stationId}&period=${period}`)