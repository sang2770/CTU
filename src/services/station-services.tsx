import { authApi } from "./global-axios";

export const getStationByDomainId = (page, pageSize, domainId) => authApi.get(`/stations?page=${page}&pageSize=${pageSize}=&domain=${domainId}`)