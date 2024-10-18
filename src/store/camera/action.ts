import { createAction } from '@reduxjs/toolkit'
import { Camera } from '../../types/camera'

export const CAMERAS_GET_ALL = createAction<{ cameras:Camera[]  }>('@cameras/GET_ALL')
export const CAMERAS_GET_BY_NAME = createAction<{ cameras:Camera[]  }>('@cameras/GET_BY_NAME')