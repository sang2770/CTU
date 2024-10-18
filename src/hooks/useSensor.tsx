import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { SENSOR_GET_ALL, SENSORS_GET_BY_NAME } from "../store/sensor/action";
import { setAuthApiHeader } from "../services/global-axios";
import { getAllSensors } from "../services/sensing-services";

function useSensor(sensorId?: number) {
    const { sensors, filterSensors } = useAppSelector(state => state.sensor)
    const dispath = useAppDispatch()

    const [isLoadingSensor, setLoadingSensor] = useState(false)

    useEffect(() => {
        const fetchDataSensor = async () => {
            try {
                setLoadingSensor(true)
                setAuthApiHeader()
                const response = await getAllSensors()
                dispath(SENSOR_GET_ALL({ sensors: response?.data }))
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingSensor(false)
            }
        }
        fetchDataSensor()
    }, []);

    const searchSensorsByName = (contentSearch: string) => {
        if (contentSearch?.length>0) {
            const resultsFound = sensors?.filter(item => (item?.name?.toLowerCase()).includes(contentSearch?.toLowerCase()))
            dispath(SENSORS_GET_BY_NAME({ sensors: resultsFound }))
        }
        else {
            dispath(SENSORS_GET_BY_NAME({ sensors: sensors }))
        }
    }
    
    return {
        sensors,
        filterSensors,
        isLoadingSensor,
        searchSensorsByName,
    }
}

export default useSensor;