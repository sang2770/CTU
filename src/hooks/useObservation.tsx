import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { OBSERVATION_BY_ID, OBSERVATION_LATEST_BY_ID, OBSERVATION_VIEW_CHART, OBSERVATIONS_LATEST_GET_ALL } from "../store/observation/action";
import { getObservationsById, getObservationsByIdLatest, getObservationsByRange } from "../services/observation-services";
import dayjs from "dayjs";
import { Observation, ObservationHistory } from "../store/observation/reducer";

function useObservation(dataStreamId?: number, stationIn?: any) {
    const { observationsLatest, observationLatest, observations, observation, isViewChart } = useAppSelector(state => state.observation)
    const { stations, station } = useAppSelector(state => state.station)
    const { sensors } = useAppSelector(state => state.sensor)
    const [observationsData, setObservations] = useState<Observation[]>([]);
    const [isLoadingObservation, setLoadingObservation] = useState(false);
    const dispath = useAppDispatch()

    const fetchDataObservationByStationId = async (stationData) => {
        try {
            setLoadingObservation(true)
            let tempDTO = [];
            let tempSensor = []
            stationData?.multiDataStreamDTOs?.map(item => {
                tempDTO?.push(item?.multiDataStreamId)
                tempSensor?.push(item?.sensor.sensorId)
            })
            const response = await getObservationsByIdLatest(tempDTO);
            let tempObs: ObservationHistory[] = []
            console.log("res", response?.data);

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

            const uniqueStationIds = new Set(observationsData.map(obs => obs.stationId));

            if (!uniqueStationIds.has(data.stationId)) {
                setObservations(prevObservations => [...prevObservations, data]);
            }
            

            
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoadingObservation(false)
        }
    }
    useEffect(() => {
        stations?.map(item => fetchDataObservationByStationId(item))
        // dispath(OBSERVATIONS_LATEST_GET_ALL({ observationsLatest: observationsData  }));
    }, [stations]);

    useEffect(() => {
        console.log(stationIn);
        const fetchDataObservationByStationId = async (stationData) => {
            try {
                setLoadingObservation(true)
                let tempDTO = [];
                let tempSensor = []
                stationData?.multiDataStreamDTOs?.map(item => {
                    tempDTO?.push(item?.multiDataStreamId)
                    tempSensor?.push(item?.sensor.sensorId)
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
                dispath(OBSERVATION_LATEST_BY_ID({ observationLatest: data }));
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingObservation(false)
            }
        }
        if (stationIn) fetchDataObservationByStationId(stationIn)
    }, [station, sensors]);

    const filterObservationByRange = async (range) => {
        if (dataStreamId) {
            try {
                const startTime = dayjs(range?.startTime).toISOString();
                const endTime = dayjs(range?.endTime).toISOString();
                setLoadingObservation(true)
                const response = await getObservationsByRange(dataStreamId, startTime, endTime)
                dispath(OBSERVATION_BY_ID({
                    observation: {
                        observations: response?.data,
                        stationId: station?.id,
                        stationName: station?.name,
                    }
                }));

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingObservation(false)
            }
        }
    }

    const setViewChart = (isView: boolean) => {
        dispath(OBSERVATION_VIEW_CHART({ isViewChart: isView }))
    }
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
    }
}

export default useObservation;