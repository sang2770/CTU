import { useEffect, useState } from "react";
import { setAuthApiHeader } from "../services/global-axios";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { THINGS_GET_ALL } from "../store/thing/action";
import { getAllThings } from "../services/sensing-services";

function useThings() {
    const { things } = useAppSelector(state => state.thing)
    const dispath = useAppDispatch()

    const [isLoadingThings, setLoadingThings] = useState(false);
    const fetchData = async () => {
        try {
            setLoadingThings(true)
            // setAuthApiHeader()
            const response = await getAllThings()
            dispath(THINGS_GET_ALL({ things: response?.data }));
            console.log("things", response?.data);

        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoadingThings(false)
        }
    }
    useEffect(() => {

        fetchData()
    }, [])

    return {
        things,
        fetchData,
        isLoadingThings
    }
}

export default useThings;