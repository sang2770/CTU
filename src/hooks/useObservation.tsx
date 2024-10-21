import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getObservationsByIdLatest, getObservationsByRange } from "../services/observation-services";
import { OBSERVATION_BY_ID, OBSERVATION_LATEST_BY_ID, OBSERVATION_VIEW_CHART, OBSERVATIONS_LATEST_GET_ALL } from "../store/observation/action";
import { Observation, ObservationHistory } from "../store/observation/reducer";
import { useAppDispatch, useAppSelector } from "../store/hook";


function useObservation(dataStreamId?: number, stationIn?: any, range?: any) {
    const { observationsLatest, observationLatest, observations, observation, isViewChart } = useAppSelector(state => state.observation);
    const { stations, station } = useAppSelector(state => state.station);
    const { sensors } = useAppSelector(state => state.sensor);
    const dispatch = useAppDispatch();

    const [isLoadingObservation, setLoadingObservation] = useState(false);

    const getObservationByStationId = async (stationData) => {
        try {
            setLoadingObservation(true);
            let tempDTO = [];
            let tempSensor = [];
            stationData?.multiDataStreamDTOs?.forEach(item => {
                tempDTO.push(item?.multiDataStreamId);
                tempSensor.push(item?.sensor.sensorId);
            });

            const response = await getObservationsByIdLatest(tempDTO);
            let tempObs: ObservationHistory[] = [];


            response?.data?.forEach(item => {
                const sensor = stationData?.multiDataStreamDTOs?.find(dto => dto?.multiDataStreamId == item?.dataStreamId);
                console.log("tp", sensor);
                const sensorName = sensor ? sensor.sensor.sensorName : "Unknown Sensor"; // Handle undefined sensorName
                tempObs.push({
                    dataStreamId: item?.dataStreamId,
                    id: item?.id,
                    name: sensorName,
                    result: item?.result,
                    resultTime: item?.resultTime
                });
            });

            return {
                observations: tempObs,
                stationName: stationData.name,
                stationId: stationData.id
            };
        } catch (error) {
            console.error("Error fetching data:", error);
            return null; // Return null in case of error
        } finally {
            setLoadingObservation(false);
        }
    };

    // Lấy dữ liệu quan trắc mới nhất của một station
    const getObservationLatest = async (stationIn) => {
        const data = await getObservationByStationId(stationIn);
        dispatch(OBSERVATION_LATEST_BY_ID({ observationLatest: data }));
    }

    // Lấy dữ liệu quan trắc mới nhất của tất cả các station
    const getObservations = async () => {
        const groupedObservations = {};

        for (const station of stations) {
            const data = await getObservationByStationId(station);

            if (data) {
                const { stationId } = data;
                if (!groupedObservations[stationId]) {
                    groupedObservations[stationId] = {
                        ...data,
                        observations: []
                    };
                }
                groupedObservations[stationId].observations.push(...data.observations);
            }
        }

        dispatch(OBSERVATIONS_LATEST_GET_ALL({ observationsLatest: Object.values(groupedObservations) }))
    };
    // Lấy dữ liệu quan trắc theo thời gian của một station bằng datastreamId
    const filterObservationByRange = async (dataStreamId, range) => {
        try {
            const startTime = dayjs(range?.startTime).toISOString();
            const endTime = dayjs(range?.endTime).toISOString();
            setLoadingObservation(true);
            const response = await getObservationsByRange(dataStreamId, startTime, endTime);
            dispatch(OBSERVATION_BY_ID({
                observation: {
                    observations: response?.data,
                    stationId: station?.id,
                    stationName: station?.name,
                }
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingObservation(false);
        }
    };

    useEffect(() => {
        if (dataStreamId && range) filterObservationByRange(dataStreamId, range)
    }, [dataStreamId,range]);

    useEffect(() => {
        if (stations.length > 0) getObservations();
    }, [stations]);

    useEffect(() => {
        if (stationIn) getObservationLatest(stationIn)
    }, [station, sensors]);

    const setViewChart = (isView) => {
        dispatch(OBSERVATION_VIEW_CHART({ isViewChart: isView }));
    };

    return {
        observationsLatest,
        observationLatest,
        observations,
        observation,
        isLoadingObservation,
        isViewChart,
        filterObservationByRange,
        setViewChart,
        // getObservationByStationId
    };
}

export default useObservation;
