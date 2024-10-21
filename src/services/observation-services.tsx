// import { observationApi } from "./global-axios"

// export const getDataSensorById = (sensorId) => observationApi.get(`/dataStreamId/${sensorId}`)
// export const getDataSensorByIdLatest = (sensorId) => observationApi.get(`/dataStreamId/${sensorId}/latest`)


import axios from 'axios'
import station from './station'
import { observationApiV2 } from './global-axios'
const RYNAN_URL = "https://api-mekong.rynangate.com/api/v1/"


export const getObservationsById = (sensorId) => observationApiV2.get(`/dataStreamId/${sensorId}`)
export const getObservationsByRange = (sensorId, startTime,endTime) => observationApiV2.get(`/dataStreamId/${sensorId}/byRange?startTime=${startTime}&endTime=${endTime}`)
// export const getObservationsByIdLatest = (sensorId) => observationApiV2.get(`/dataStreamId/${sensorId}/latest`)
export const getObservationsByIdLatest = (sensorIds) => observationApiV2.post(`/dataStreamIds/latest`, sensorIds)

export default {
    //Rynan
    getDataStation: async function (serialStation, startDate, endDate, page, limit) {
        try {
            const rynanToken = await station.returnRynanToken();
            const response = await axios.get(`${RYNAN_URL}get-data-stations?so_serial=${serialStation}&tu_ngay=${startDate}&den_ngay=${endDate}&limit=${limit}`,
                {
                    headers: {
                        "x-access-token": rynanToken,
                        "x-api-key": process.env.REACT_APP_RYNAN_X_API_KEY
                    }
                }
            );
            return response.data;
        } catch (error) {
            if (error.response.data.errorCode === "002") {
                sessionStorage.clear();
                const reloadCount = sessionStorage.getItem('reloadCount');
                if (Number(reloadCount) < 2) {
                    sessionStorage.setItem('reloadCount', String(reloadCount + 1));
                    window.location.reload();
                } else {
                    sessionStorage.removeItem('reloadCount');
                }
            }
            throw error;
        }

    }
}