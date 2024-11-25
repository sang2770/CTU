import { useEffect, useState } from "react";
import { farmApi, setAuthApiHeader } from "../services/global-axios";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { FAMRS_GET_ALL } from "../store/farm/action";
import { getAllFarms } from "../services/sensing-services";


function useFarms() {
    const { farms } = useAppSelector(state => state.farm)
    const dispath = useAppDispatch()

    const [isLoadingFarms, setLoadingFarms] = useState(false);
    const fetchData = async () => {
        try {
            setLoadingFarms(true)
            setAuthApiHeader(farmApi)
            const response = await getAllFarms()
            dispath(FAMRS_GET_ALL({ farms: response?.data }));
            console.log("farms", response?.data);

        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoadingFarms(false)
        }
    }
    useEffect(() => {

        fetchData()
    }, [])

    return {
        farms,
        fetchData,
        isLoadingFarms
    }
}

export default useFarms;