import { createReducer } from '@reduxjs/toolkit'
import { DEVICES_GET_ALL } from './action'


export type Device = {

    actuator: {
        description: string,
        documentation: {
            metadata: string,
            encodingType: string
        },
        id: number,
        name: string
    },
    autoConfig: {
        middle: string,
        min: string,
        max: string
    },
    automation: number,
    configuration: {
        status: string
    },
    description: string,
    id: number,
    name: string,
    thing: {
        description: string,
        id: number,
        locationId: number,
        name: string,
        station: {
            description: string,
            id: number,
            name: string,
            node: string,
            status: string
        }
    }
}
export type Devices={
    devices:Device[]
}
export const initialState: Devices = {
    devices:[],
}
export default createReducer(initialState, (builder) =>
    builder
        .addCase(DEVICES_GET_ALL, (state, action) => {
            state.devices=action.payload.devices;
        })
)