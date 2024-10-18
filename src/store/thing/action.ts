import { createAction } from '@reduxjs/toolkit'
import { Thing } from './reducer'

export const THINGS_GET_ALL = createAction<{ things:Thing[]  }>('@things/GET_ALL')