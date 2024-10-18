import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { OBSERVATION_BY_ID, OBSERVATION_LATEST_BY_ID, OBSERVATION_VIEW_CHART, OBSERVATIONS_LATEST_GET_ALL } from "../store/observation/action";
import { getObservationsById, getObservationsByIdLatest, getObservationsByRange } from "../services/observation-services";
import dayjs from "dayjs";

function useObservation(dataStreamId?: number) {
    const { observationsLatest,observationLatest, observations, observation,isViewChart } = useAppSelector(state => state.observation)
    const { stations,station } = useAppSelector(state => state.station)
    const {sensors}=useAppSelector(state => state.sensor)

    const [isLoadingObservation, setLoadingObservation] = useState(false);
    const dispath = useAppDispatch()

    useEffect(() => {
        const fetchDataObservation = async () => {
            try {
                setLoadingObservation(true)
                const results = await Promise.all(stations?.map(async (station) => {
                    const observations = await Promise.all(station.multiDataStreamDTOs?.map(async (stream) => {
                        const response = await getObservationsByIdLatest(stream?.multiDataStreamId);
                        const resultData = await response.data;
                        return {
                            dataStreamId: stream?.multiDataStreamId,
                            id: resultData?.id,
                            name: sensors?.find(item=>item?.id===stream?.sensor?.sensorId)?.name,
                            result: resultData?.result,
                            resultTime: resultData?.resultTime
                        };
                    }));
                    return {
                        observations,
                        stationName: station.name,
                        stationId: station.id
                    };
                }));
                dispath(OBSERVATIONS_LATEST_GET_ALL({ observationsLatest: results }));
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingObservation(false)
            }
        }
        fetchDataObservation()
    }, [stations,sensors]);


    useEffect(() => {
        const fetchDataObservationById = async () => {
            try {
                setLoadingObservation(true)
                const response=await getObservationsById(dataStreamId)
                dispath(OBSERVATION_BY_ID({ observation: {
                    observations:response?.data,
                    stationId:station?.id,
                    stationName: station?.name,
                } }));

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingObservation(false)
            }
        }
       if(dataStreamId) fetchDataObservationById()
    }, [station,sensors]);

    useEffect(() => {
        const fetchDataObservationLatestById = async () => {
            try {
                setLoadingObservation(true)
                const response = await Promise.all(station.multiDataStreamDTOs?.map(async (stream) => {
                    const response = await getObservationsByIdLatest(stream?.multiDataStreamId);
                    const resultData = await response.data;
                    return {
                        dataStreamId: stream?.multiDataStreamId,
                        id: resultData?.id,
                        name: sensors?.find(item=>item?.id===stream?.sensor?.sensorId)?.name,
                        result: resultData?.result,
                        resultTime: resultData?.resultTime
                    };
                }));
                
                dispath(OBSERVATION_LATEST_BY_ID({ observationLatest: {
                    observations:response,
                    stationId:station?.id,
                    stationName: station?.name,
                } }));

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingObservation(false)
            }
        }
       if(dataStreamId) fetchDataObservationLatestById()
    }, [station,sensors]);

    const filterObservationByRange = async (range) => {
        if(dataStreamId){
            try {
                const startTime=dayjs(range?.startTime).toISOString();
                const endTime=dayjs(range?.endTime).toISOString();
                setLoadingObservation(true)
                const response=await getObservationsByRange(dataStreamId,startTime,endTime)
                dispath(OBSERVATION_BY_ID({ observation: {
                    observations:response?.data,
                    stationId:station?.id,
                    stationName: station?.name,
                } }));
    
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingObservation(false)
            }
        }
    }

    const setViewChart = (isView:boolean) => { 
        dispath(OBSERVATION_VIEW_CHART({isViewChart:isView}))
    }
    return {
        observationsLatest,
        observationLatest,
        observations,
        observation,
        isLoadingObservation,
        isViewChart,
        filterObservationByRange,
        setViewChart

    }
}

export default useObservation;