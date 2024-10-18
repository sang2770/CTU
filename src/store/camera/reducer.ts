import { createReducer } from '@reduxjs/toolkit'
import { CAMERAS_GET_ALL, CAMERAS_GET_BY_NAME } from './action'
import { Camera } from '../../types/camera'



export type Cameras = {
    cameras: Camera[]
    filterCameras: Camera[]
}

export const initialState: Cameras = {
    cameras: [],
    filterCameras:[]
}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(CAMERAS_GET_ALL, (state, action) => {
            state.cameras = action.payload.cameras;
        })
        .addCase(CAMERAS_GET_BY_NAME, (state, action) => {
            state.filterCameras = action.payload.cameras;
        })
)