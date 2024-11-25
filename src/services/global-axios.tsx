import axios from 'axios'

const AUTH_API_URL = process.env.REACT_APP_AUTH_HOST_API_URL
const DAM_API_URL = process.env.REACT_APP_DAM_HOST_API_URL
const CAMERA_API_URL = process.env.REACT_APP_CAMERA_HOST_API_URL

const OBSERVATION_API_URL = process.env.REACT_APP_OBSERVATION_HOST_API_URL

const TASKING_API_URL = process.env.REACT_APP_TASKING_HOST_API_URL
const SENSING_API_URL = process.env.REACT_APP_SENSING_HOST_API_URL
const OBSERVATION_API_URL_V2 = process.env.REACT_APP_OBSERVATION_HOST_API_URL_V2

const authApi = axios.create({
    baseURL: `${AUTH_API_URL}/api/v1`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

const damApi = axios.create({
    baseURL: `${DAM_API_URL}`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

const cameraApi = axios.create({
    baseURL: `${CAMERA_API_URL}/api/v1`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})


const observationApi = axios.create({
    baseURL: `${OBSERVATION_API_URL}/ctu/geo/observations`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

// SENSING SERVICE
const thingApi = axios.create({
    baseURL: `${SENSING_API_URL}/things`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
})
//FARM
const farmApi = axios.create({
    baseURL: `${SENSING_API_URL}/agri-areas`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

const stationApi = axios.create({
    baseURL: `${SENSING_API_URL}/stations`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

const sensorApi = axios.create({
    baseURL: `${SENSING_API_URL}/sensors`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

// TASKING SERVICE
const deviceControlApi = axios.create({
    baseURL: `${TASKING_API_URL}/tasking-capabilities`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

// OBSERVATION SERVICE
const observationApiV2 = axios.create({
    baseURL: `${OBSERVATION_API_URL_V2}/observations`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

// const setAuthApiHeader = () => {
//     authApi.interceptors.request.use((config) => {
//         const accessToken = JSON.parse(localStorage.getItem('_authenticatedUser'))?.accessToken
//         config.headers['Authorization'] = accessToken
//         return config
//     })
// }
const setAuthApiHeader = (apiInstance) => {
    apiInstance.interceptors.request.use((config) => {
        const accessToken = JSON.parse(localStorage.getItem('_authenticatedUser'))?.accessToken;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
};
setAuthApiHeader(farmApi)
// setAuthApiHeader(thingApi)
// setAuthApiHeader(stationApi)
export { authApi, damApi, cameraApi, deviceControlApi, observationApi, observationApiV2, thingApi, farmApi, stationApi, sensorApi, setAuthApiHeader }