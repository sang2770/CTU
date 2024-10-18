import { useEffect, useState } from "react";
import { getAllDomains } from "../../services/authentication-services";
import { setAuthApiHeader } from "../../services/global-axios";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { DOMAINS_GET_ALL } from "../../store/old/domains/action";

function useDomains() {
    const { domains } = useAppSelector(state => state.domains_old)
    const dispath = useAppDispatch()

    const [isLoadingDomains, setLoadingDomains] = useState(false);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingDomains(true)
                setAuthApiHeader()
                const response = await getAllDomains()
                dispath(DOMAINS_GET_ALL({domains:response?.data?.data?.result}));
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally{
                setLoadingDomains(false)
            }
        }
        fetchData()
    }, [])

    return {
        domains,
        isLoadingDomains
    }
}

export default useDomains;