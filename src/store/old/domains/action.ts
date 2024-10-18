import { createAction } from '@reduxjs/toolkit'
import { Domain, DomainDetail } from './reducer'

export const DOMAINS_GET_ALL = createAction<{ domains:Domain[]  }>('@domains/GET_ALL')
export const DOMAINS_DETAIL_GET_ALL = createAction<{domainsDetailLatest:DomainDetail[]  }>('@domains/GET_ALL_DETAIL')
export const DOMAINS_DETAIL_GET_BY_TIME = createAction<{domainsDetailByTime:DomainDetail[]  }>('@domains/GET_ALL_DETAIL_BY_TIME')