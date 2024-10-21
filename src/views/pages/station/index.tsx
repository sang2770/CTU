import { useTranslation } from "react-i18next";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";

import { CsPaperCenter } from "../../../components/paper";
import FilterDate from "../../ui-components/tabs/type-sensor/FilterDate";
import IBreadcrumsCustom from "../../../components/breadcrums";
import TypeSensorTabs from "../../ui-components/tabs/type-sensor";
import useStation from "../../../hooks/useStation";
import { CsFlexAlwaysBetween, CsFlexAlwayStart } from "../../../components/flex";
import { CsBoxCenter } from "../../../components/box";
import useConfig from "../../../hooks/useConfig";
import useObservation from "../../../hooks/useObservation";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import CustomHighChart from "../../../components/chart";
import { convertTimeFromString, convertTimeStampFromString } from "../../../utils/formatTime";
import { useEffect, useState } from "react";


const StationPage = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const theme = useTheme()
    const { borderRadius } = useConfig()
    const [rangeTime, setRangeTime] = useState({
        startTime: dayjs().subtract(30, 'day'),
        endTime: dayjs(new Date())
    })

    const { station, isLoadingStations } = useStation(Number(id))
    const initDataStreamId = station?.multiDataStreamDTOs?.[0].sensor?.sensorId
    const [dataStreamId, setDataStreamId] = useState(initDataStreamId);
    const { observation, observationLatest, isViewChart } = useObservation(dataStreamId, station, rangeTime)

    useEffect(() => {
        setDataStreamId(initDataStreamId)
    }, [station]);

    const transformedData = observation?.observations?.map(item => {
        return [
            convertTimeStampFromString(item.resultTime), // Chuyển đổi thời gian sang mili giây
            parseFloat(item.result.trim()) // Chuyển đổi kết quả sang số
        ];
    });



    const handleChange = (event: SelectChangeEvent) => {
        setDataStreamId(Number(event.target.value));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <IBreadcrumsCustom isBreadcumbs breadcumbs={[t("Trang chủ"), t(station?.name)]} link={["/dashboard", `/dashboard/stations/${id}`]} />
            </Grid >

            <Grid item xs={12}>
                <CsPaperCenter sx={{ py: 2, px: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ width: "100%", borderBottom: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100]}` }}>
                                <Typography variant="subtitle2" pb={2}>
                                    {t(`Dữ liệu quan trắc mới nhất`)}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {
                                    observationLatest?.observations?.map(item => (
                                        <Grid item xs={12} sm={6} md={4}>
                                            <CsFlexAlwayStart width={"100%"} gap={1}>
                                                <Typography minWidth={"160px"} variant="body2" >{item?.name}</Typography>
                                                <Typography variant="body1" fontWeight={600}>{item?.result}</Typography>
                                            </CsFlexAlwayStart>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>


                    </Grid>
                </CsPaperCenter>
            </Grid>
            <Grid item xs={7}>
                <CsPaperCenter sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box>
                                <Typography variant="subtitle2">
                                    {t(`Biểu đồ dữ liệu cảm biến `)}{station?.multiDataStreamDTOs?.find(item => item.sensor?.sensorId === dataStreamId)?.multiDataStreamName}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{
                                width: '100%', height: '460px',
                                borderRadius: `${borderRadius}px`,
                                border: `1px solid ${theme.palette.mode == "dark" ? theme.palette.grey[800] : theme.palette.grey[300]}`
                            }}>

                                <CustomHighChart data={transformedData} />
                            </Box>
                        </Grid>

                    </Grid>

                </CsPaperCenter>
                {/* <Box sx={{ width: "100%", px: 2 }}>
                                <TypeSensorTabs />
                            </Box> */}
            </Grid>
            <Grid item xs={5}>
                <CsPaperCenter sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box>
                                <Typography pb={2} variant="subtitle2">
                                    {t(`Dữ liệu quan trắc`)}
                                </Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    {isLoadingStations ?
                                        <>Đang tải ...</>
                                        :
                                        <FormControl fullWidth size="small">
                                            <Select
                                                size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={dataStreamId?.toString()}
                                                onChange={handleChange}
                                            >

                                                {station?.multiDataStreamDTOs?.map(multiDataStreamDTO =>
                                                    <MenuItem value={multiDataStreamDTO?.sensor?.sensorId}>{multiDataStreamDTO?.sensor?.sensorName}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    }

                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box>
                                <FilterDate />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{
                                borderRadius: `${borderRadius}px`,
                                border: `1px solid ${theme.palette.mode == "dark" ? theme.palette.grey[800] : theme.palette.grey[300]}`
                            }}
                            >
                                <CsFlexAlwaysBetween
                                    sx={{
                                        background: theme.palette.mode == "dark" ? theme.palette.background.default : theme.palette.grey[100],


                                    }}>
                                    <CsBoxCenter py={1} width={"60%"} sx={{ borderRight: `1px solid ${theme.palette.mode == "dark" ? theme.palette.grey[800] : theme.palette.grey[300]}` }}>
                                        <Typography variant="body1" fontWeight={600}>Thời gian</Typography>
                                    </CsBoxCenter>
                                    <CsBoxCenter py={1} width={"40%"}>
                                        <Typography variant="body1" fontWeight={600}>Giá trị</Typography>
                                    </CsBoxCenter>

                                </CsFlexAlwaysBetween>
                                <Box sx={{overflow:"scroll", maxHeight:"310px"}}>
                                    {
                                        observation?.observations?.map(item =>
                                            <CsFlexAlwaysBetween>
                                                <CsBoxCenter
                                                    sx={{
                                                        borderRight: `1px solid ${theme.palette.mode == "dark" ? theme.palette.grey[800] : theme.palette.grey[300]}`,
                                                        borderTop: `1px solid ${theme.palette.mode == "dark" ? theme.palette.grey[800] : theme.palette.grey[300]}`
                                                    }}
                                                    py={1}
                                                    width={"60%"}
                                                >
                                                    <Typography>{convertTimeFromString(item?.resultTime)}</Typography>
                                                </CsBoxCenter>
                                                <CsBoxCenter
                                                    borderTop={`1px solid ${theme.palette.mode == "dark" ? theme.palette.grey[800] : theme.palette.grey[300]}`}
                                                    py={1}
                                                    width={"40%"}
                                                >
                                                    <Typography>{item?.result}</Typography>
                                                </CsBoxCenter>
                                            </CsFlexAlwaysBetween>
                                        )
                                    }
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </CsPaperCenter>
            </Grid>
        </Grid>
    );
}

export default StationPage;