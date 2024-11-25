import { createAction } from '@reduxjs/toolkit'
import { Farm } from '../farm/reducer' 

export const FAMRS_GET_ALL = createAction<{ farms:Farm[]  }>('@farms/GET_ALL')