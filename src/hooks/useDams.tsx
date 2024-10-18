import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { getAllDams } from "../services/dam-services";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { DAMS_GET_ALL, DAMS_GET_BY_NAME } from "../store/dam/action";
import { CsFlexStart } from "../components/flex";
import { googleMapLink } from "../utils/googleMap";
import { DAM_MARKERS_GET_ALL } from "../store/marker/action";

function useDams() {
    const { dams, filterDams } = useAppSelector(state => state.dam)
    const { damMarkers } = useAppSelector(state => state.marker)
    const dispath = useAppDispatch()

    // const [damMarkers, setDamMarkers] = useState([])
    const [isLoadingDams, setLoadingDams] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingDams(true)
                const response = await getAllDams()
                const damData = response.data

                dispath(DAMS_GET_ALL({ dams: damData }))

                const markers = damData?.map(dam => ({
                    content: (
                        <Box minWidth={"160px"}>
                            <Typography pb={1} textTransform={"uppercase"} variant="h6">{dam.damName}</Typography>
                            <CsFlexStart gap={"4px"}>
                                <Typography variant="body2" fontWeight={"bold"}>Tên sông:</Typography>
                                <Typography variant="body2">{dam.damRiver?.riverName}</Typography>
                            </CsFlexStart>
                            <CsFlexStart gap={"4px"}>
                                <Typography variant="body2" fontWeight={"bold"}>Trạng thái:</Typography>
                                <Typography variant="body2">{dam?.damCurrentStatus?.damStatusName === "OPEN" ? "Mở" : "Đóng"}</Typography>
                            </CsFlexStart>
                            <CsFlexStart gap={"4px"}>
                                <Typography variant="body2" fontWeight={"bold"}>Ngày xây dựng:</Typography>
                                <Typography variant="body2">{dam?.damConstructedAt[2] + "/" + dam?.damConstructedAt[1] + "/" + dam?.damConstructedAt[0]}</Typography>
                            </CsFlexStart>
                            <CsFlexStart gap={"4px"}>
                                <Typography variant="body2" fontWeight={"bold"}>Chiều dài:</Typography>
                                <strong>{dam.damHeight}</strong> mét
                            </CsFlexStart>

                            <CsFlexStart gap={"4px"}>
                                <Typography variant="body2" fontWeight={"bold"}>Địa điểm:</Typography>
                                <a target="_blank" rel="noopener noreferrer" href={googleMapLink(dam.damLatitude, dam.damLongitude)}>
                                    <Typography variant="body2">Xem vị trí</Typography>
                                </a>
                            </CsFlexStart>
                        </Box>
                    ),
                    icon: "icons/dam_new.png",
                    position: {
                        longitude: Number(dam?.damLongitude),
                        latitude: Number(dam?.damLatitude)
                    },
                    type: "dam"
                }));
                
                dispath(DAM_MARKERS_GET_ALL({ damsMarkers: markers }))
                
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoadingDams(false)
            }
        };
        fetchData();
    }, []);
    
    const searchDamsByName = (contentSearch: string) => {
        const resultsFound = dams?.filter(item => (item?.damName + ", " + item.damRiver?.riverName).includes(contentSearch))
        dispath(DAMS_GET_BY_NAME({ dams: resultsFound }))
    }

    return {
        dams,
        damMarkers,
        filterDams,
        isLoadingDams,
        searchDamsByName
    };
}

export default useDams;
