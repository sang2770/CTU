import { useEffect, useState } from "react";
import { getThingByFarmId } from "../services/sensing-services";
import { Thing } from "../store/thing/reducer";

function useThingsByFarmId(farmId: string) {
    const [isLoading, setIsLoading] = useState(false)
    const [things, setThings] = useState<Thing[]>([])
    const fetchData = async () => {
        try {
            setIsLoading(true)
            // setAuthApiHeader()
            const response = await getThingByFarmId(farmId)
            setThings(response?.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return {
        things,
        isLoading,
        fetchData
    }
}

export default useThingsByFarmId;