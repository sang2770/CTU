import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { MarkerProps } from "../../../types/marker";
import useDams from "../../../hooks/useDams";
import { CsPaperCenter } from "../../../components/paper";
import GoogleMap from "../../ui-components/google-map";
import useStation from "../../../hooks/useStation";


function MapSection() {
    const theme = useTheme()
    const { t } = useTranslation()
    const { damMarkers, isLoadingDams } = useDams()
    const { stationMarkers, isLoadingStations } = useStation()
    
    const [mapViewMode, setMapViewMode] = useState(1)
    const [commonMarkers, setCommonMarkers] = useState<MarkerProps[]>([...damMarkers, ...stationMarkers])

    const [mapConfig, setMapConfig] = useState({
        bounds: null,
        zoom: 10,
        mapId: process.env.REACT_APP_GOOGLE_MAP_ID
    })

    const handleSetMapViewMode = (e) => {
        const value = Number(e?.target?.value)
        if ([1, 2, 3]?.includes(value)) {
            setMapViewMode(value)
            if (value === 1) {
                setCommonMarkers([...damMarkers, ...stationMarkers])
            } else if (value === 2) {
                setCommonMarkers(damMarkers)
            } else {
                setCommonMarkers(stationMarkers)
            }
        }
    }

    const handleSetBounds = (value) => {
        setMapConfig((prev) => {
            return { ...prev, bounds: value }
        })
    }

    const handleSetZoom = (value) => {
        if (typeof value?.detail?.zoom === 'number' && value?.detail?.zoom > 0) {
            setMapConfig((prev) => {
                return { ...prev, zoom: value.detail.zoom }
            })
        }
    }

    useEffect(() => {
        let minLat = Math.min(...commonMarkers?.map((item) => item?.position?.latitude));
        let maxLat = Math.max(...commonMarkers?.map((item) => item?.position?.latitude));
        let minLng = Math.min(...commonMarkers?.map((item) => item?.position?.longitude));
        let maxLng = Math.max(...commonMarkers?.map((item) => item?.position?.longitude));
        let bounds = {
            east: maxLng,
            west: minLng,
            north: maxLat,
            south: minLat
        }
        handleSetBounds(bounds)
    }, [damMarkers, stationMarkers, commonMarkers])

    useEffect(() => {
        setCommonMarkers([...damMarkers, ...stationMarkers])
    }, [damMarkers, stationMarkers])

    useEffect(() => {
        if (mapViewMode === 1) {
            setCommonMarkers([...damMarkers, ...stationMarkers])
        } else if (mapViewMode === 2) {
            setCommonMarkers(damMarkers)
        } else if (mapViewMode === 3) {
            setCommonMarkers(stationMarkers)
        }
        else setCommonMarkers([...damMarkers, ...stationMarkers])
    }, [mapViewMode, damMarkers, stationMarkers])

    return (
        <CsPaperCenter>
            <Box sx={{ width: "100%", borderBottom: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100]}`, py: "14px", px: 2 }}>
                <Typography variant="subtitle2">
                    {t("Vị trí tất cả cống / đập và trạm cảm biến")}
                </Typography>
            </Box>
            <Box sx={{ width: "100%", px: 2 }}>
                <Box>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue={1}
                        >
                            <FormControlLabel
                                value={1}
                                onChange={handleSetMapViewMode}
                                control={<Radio />}
                                label={<Typography variant="body2">{t("Tất cả")}</Typography>}
                            />
                            <FormControlLabel
                                value={2}
                                onChange={handleSetMapViewMode}
                                control={<Radio />}
                                label={<Typography variant="body2">{t("Cống/Đập")}</Typography>}
                            />
                            <FormControlLabel
                                value={3}
                                onChange={handleSetMapViewMode}
                                control={<Radio />}
                                label={<Typography variant="body2">{t("Trạm cảm biến")}</Typography>}
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                {isLoadingDams && isLoadingStations ?
                    <Typography>Loading ...</Typography>
                    :
                    <GoogleMap mapConfig={mapConfig} commonMarkers={commonMarkers} handleSetZoom={handleSetZoom} />
                }
            </Box>
        </CsPaperCenter>
    );
}

export default MapSection;
