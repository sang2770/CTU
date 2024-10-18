import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { CsFlexStart } from "../../components/flex";
import { googleMapLink } from "../../utils/googleMap";
import observation from "../../services/observation-services";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { STATIONS_DETAIL_GET_BY_TIME, STATIONS_GET_ALL } from "../../store/old/stations/action";
import { getStationByDomainId } from "../../services/station-services";
import { setAuthApiHeader } from "../../services/global-axios";
import { STATION_MARKERS_GET_ALL } from "../../store/marker/action";
import useDomains from "./useDomains";


function useStation(fromDate?: string, toDate?: string, page?: number, limit?: number) {
    const { stations, stationsDetailLatest, stationsDetailByTime } = useAppSelector(state => state.station_old)
    const { stationMarkers } = useAppSelector(state => state.marker)
    // const { domains } = useAppSelector(state => state.domains_old)

    const { domains } = useDomains()
    const dispath = useAppDispatch()

    // const [stationMarkers, setStationMarkers] = useState([]);
    const [isLoadingStations, setLoadingStations] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingStations(true)
                setAuthApiHeader()

                // Lấy danh sách các id trạm
                let domainIds = []
                domains?.map(station => {
                    domainIds.push(station?._id)
                })

                // Tạo một mảng các promises
                const promisesStationsDetail = domainIds?.map(domainId => getStationByDomainId(page, limit, domainId));

                // Chờ tất cả các promises hoàn thành
                const responseStation = await Promise.all(promisesStationsDetail);

                let tempStation = [];
                responseStation?.map(item => {
                    item?.data?.data?.result?.map(st => {
                        tempStation.push(st)
                    })
                })


                dispath(STATIONS_GET_ALL({ stations: tempStation }))


                // Map the station data to markers
                const stationHavePosition = tempStation?.filter(item => item.latitude !== "")
                // Map the station data to markers
                const getMarkers = stationHavePosition?.map(station => ({
                    content: (
                        <Box minWidth={"160px"}>
                            <Typography pb={1} textTransform={"uppercase"} variant="h6">{station?.name}</Typography>

                            <CsFlexStart gap={"4px"}>
                                <Typography variant="body2" fontWeight={"bold"}>Địa điểm:</Typography>
                                <a target="_blank" rel="noopener noreferrer" href={googleMapLink(station?.latitude, station?.longitude)}>
                                    <Typography variant="body2">Xem vị trí</Typography>
                                </a>
                            </CsFlexStart>
                        </Box>
                    ),
                    icon: "icons/station_new.png",
                    position: {
                        longitude: Number(station?.latitude),
                        latitude: Number(station?.longitude)
                    },
                    type: "station"
                }));
                dispath(STATION_MARKERS_GET_ALL({ stationMarkers: getMarkers }));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingStations(false)
            }
        };
        fetchData();
    }, [domains]);

    const getDataStationDetailById = async (id: string) => {
        const responseStationDataDetailByTimes = await observation.getDataStation(id, fromDate, toDate, page, limit)
        let tempStationDetailByTime = []

        responseStationDataDetailByTimes?.data?.map(record => {
            tempStationDetailByTime.push(record)
        })
        dispath(STATIONS_DETAIL_GET_BY_TIME({ stationsDetailByTime: tempStationDetailByTime }))
    }

    return {
        stations,
        stationsDetailLatest,
        stationsDetailByTime,
        stationMarkers: stationMarkers,
        isLoadingStations,
        getDataStationDetailById
    };
}

export default useStation;
