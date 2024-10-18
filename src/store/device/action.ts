import { createAction } from '@reduxjs/toolkit'
import { Device } from './reducer'


export const DEVICES_GET_ALL = createAction<{ devices:Device[]  }>('@device/GET_ALL')