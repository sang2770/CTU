import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { STATIONS_GET_ALL, STATIONS_GET_BY_ID } from "../store/station/action";
import { setAuthApiHeader } from "../services/global-axios";
import { getAllStations, getStationById } from "../services/sensing-services";

function useStation(stationId?: number) {
    const { stations, station } = useAppSelector(state => state.station)
    const { stationMarkers } = useAppSelector(state => state.marker)
    const { things } = useAppSelector(state => state.thing)
    const dispath = useAppDispatch()

    const [isLoadingStations, setLoadingStations] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingStations(true)
                // setAuthApiHeader()
                const responseStations = await getAllStations()
                dispath(STATIONS_GET_ALL({ stations: responseStations?.data }))
                console.log("stations", responseStations?.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingStations(false)
            }
        };
        fetchData();
    }, [things]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingStations(true)
                // setAuthApiHeader()
                const responseStations = await getStationById(stationId)
                dispath(STATIONS_GET_BY_ID({ station: responseStations?.data }))
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingStations(false)
            }
        };
        if (stationId) fetchData();
    }, [things]);


    // useEffect(() => {
    //     const stationHavePosition = stations?.filter(item => item?.latitude !== "")

    //     // Map the station data to markers
    //     const getMarkers = stationHavePosition?.map(station => ({
    //         content: (
    //             <Box minWidth={"160px"}>
    //                 <Typography pb={1} textTransform={"uppercase"} variant="h6">{station?.name}</Typography>

    //                 <CsFlexStart gap={"4px"}>
    //                     <Typography variant="body2" fontWeight={"bold"}>Địa điểm:</Typography>
    //                     <a target="_blank" rel="noopener noreferrer" href={googleMapLink(station?.latitude, station?.longitude)}>
    //                         <Typography variant="body2">Xem vị trí</Typography>
    //                     </a>
    //                 </CsFlexStart>
    //             </Box>
    //         ),
    //         icon: "icons/station_new.png",
    //         position: {
    //             longitude: Number(station?.latitude),
    //             latitude: Number(station?.longitude)
    //         },
    //         type: "station"
    //     }));


    //     dispath(STATION_MARKERS_GET_ALL({ stationMarkers: getMarkers }));
    // }, [things]);

    return {
        stations,
        station,
        stationMarkers,
        isLoadingStations,
    };
}

export default useStation;
