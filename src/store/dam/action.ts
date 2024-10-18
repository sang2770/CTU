import { createAction } from '@reduxjs/toolkit'
import { Dam } from './reducer'

export const DAMS_GET_ALL = createAction<{ dams:Dam[]  }>('@dams/GET_ALL')
export const DAMS_GET_BY_NAME = createAction<{ dams:Dam[]  }>('@dams/GET_BY_NAME')