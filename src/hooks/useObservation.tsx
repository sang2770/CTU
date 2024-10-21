import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getObservationsByIdLatest, getObservationsByRange } from "../services/observation-services";
import { OBSERVATION_BY_ID, OBSERVATION_LATEST_BY_ID, OBSERVATION_VIEW_CHART } from "../store/observation/action";
import { Observation, ObservationHistory } from "../store/observation/reducer";
import { useAppDispatch, useAppSelector } from "../store/hook";


function useObservation(dataStreamId?: number, stationIn?: any, range?:any) {
    const { observationsLatest, observationLatest, observations, observation, isViewChart } = useAppSelector(state => state.observation);
    const { stations, station } = useAppSelector(state => state.station);
    const { sensors } = useAppSelector(state => state.sensor);
    const [observationsData, setObservations] = useState<Observation[]>([]);
    const [isLoadingObservation, setLoadingObservation] = useState(false);
    const dispatch = useAppDispatch();

    const fetchDataObservationByStationId = async (stationData) => {
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

    useEffect(() => {
        const fetchAllObservations = async () => {
            const groupedObservations = {};

            for (const station of stations) {
                const data = await fetchDataObservationByStationId(station);
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

            setObservations(Object.values(groupedObservations));
        };

        if (stations.length) {
            fetchAllObservations();
        }
    }, [stations]);

    // useEffect(() => {
    //     filterObservationByRange(range)
    // }, [range, dataStreamId]);

    const filterObservationByRange = async (range) => {
        if (dataStreamId) {
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
        }
    };

    const setViewChart = (isView) => {
        dispatch(OBSERVATION_VIEW_CHART({ isViewChart: isView }));
    };
    useEffect(() => {
        console.log(stationIn);
        const fetchDataObservationByStationId = async (stationData) => {
            try {
                setLoadingObservation(true)
                let tempDTO = [];
                let tempSensor = []
                stationData?.multiDataStreamDTOs?.map(multiDataStreamDTO => {
                    tempDTO?.push(multiDataStreamDTO?.multiDataStreamId)
                    tempSensor?.push(multiDataStreamDTO?.sensor.sensorId)
                })
                const response = await getObservationsByIdLatest(tempDTO);
                let tempObs: ObservationHistory[] = []

                response?.data?.map(item => {
                    tempObs.push({
                        dataStreamId: item?.dataStreamId,
                        id: item?.id,
                        name: sensors?.find(item => tempSensor?.find(s => s === item?.id))?.name,
                        result: item?.result,
                        resultTime: item?.resultTime
                    })
                })
                const data: Observation = {
                    observations: tempObs,
                    stationName: stationData.name,
                    stationId: stationData.id
                };
                dispatch(OBSERVATION_LATEST_BY_ID({ observationLatest: data }));
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingObservation(false)
            }
        }
        if (stationIn) fetchDataObservationByStationId(stationIn)
    }, [station, sensors]);
    return {
        observationsData,
        observationsLatest,
        observationLatest,
        observations,
        observation,
        isLoadingObservation,
        isViewChart,
        filterObservationByRange,
        setViewChart,
        fetchDataObservationByStationId
    };
}

export default useObservation;
