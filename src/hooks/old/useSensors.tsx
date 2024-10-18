import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { setAuthApiHeader } from "../../services/global-axios";
import { getSensorsByStationAndDomain, getSensorsByStationAndTime } from "../../services/sensors-service";
import { SENSORS_GET_ALL, SENSORS_GET_BY_ID, SENSORS_SET_FILTER_PERIOD, SENSORS_SET_VIEW_CHART } from "../../store/old/sensors/action";
import dayjs, { Dayjs } from "dayjs";

interface DomainAndStation {
    domainId?: string
    stationId?: string
    period?: string
}
function useSensors(stationId?: string) {
    const { domains } = useAppSelector(state => state.domains_old)
    const { sensors, sensorHistorys, period, viewChart } = useAppSelector(state => state.sensors_old)
    const { stations } = useAppSelector(state => state.station_old)

    const [isLoadingSensors, setLoadingSensors] = useState(false);
    const dispath = useAppDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingSensors(true)
                setAuthApiHeader()

                // Lấy danh sách các id trạm
                let domainAndStation: DomainAndStation[] = []
                stations?.map(station => {
                    domainAndStation.push({ domainId: station?.domain?._id, stationId: station?._id })
                })

                // Tạo một mảng các promises
                const promisesSensors = domainAndStation?.map(item => getSensorsByStationAndDomain(item?.stationId, item?.domainId));

                // Chờ tất cả các promises hoàn thành
                const responseStation = await Promise.all(promisesSensors);

                let tempSensors = [];
                responseStation?.map(item => {
                    tempSensors.push(item.data?.data)

                })
                dispath(SENSORS_GET_ALL({ sensors: tempSensors }));
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingSensors(false)
            }
        }
        const fetchDataHistory = async () => {
            try {
                setLoadingSensors(true)
                setAuthApiHeader()
                const responseStation = await getSensorsByStationAndTime(stationId, period)
                dispath(SENSORS_GET_BY_ID({ sensorhistory: responseStation?.data?.data }));

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingSensors(false)
            }
        }
        fetchData();
        if (period?.length>0) fetchDataHistory()
    }, [stations, domains, period]);

    const filterPeriod = (contentFiler: Dayjs) => {
        const stringDate = dayjs(contentFiler).format('YYYY-MM-DD');
        dispath(SENSORS_SET_FILTER_PERIOD({ period: stringDate }))
    }

    const setViewChart = (isView: boolean) => {
        dispath(SENSORS_SET_VIEW_CHART({ isViewChart: isView }))
    }

    return {
        sensors,
        period,
        sensorHistorys,
        isLoadingSensors,
        isViewChart: viewChart,
        filterPeriod,
        setViewChart

    }
}

export default useSensors;