import { Grid, Typography, useTheme } from "@mui/material";
import { CsFlexAlwaysBetween, CsFlexAlwayStart } from "../../../../components/flex";
import { CsPaperCenter } from "../../../../components/paper";
import { CsBoxCenter } from "../../../../components/box";
import { convertTimeFromString, convertTimeStampFromString } from "../../../../utils/formatTime";
import useConfig from "../../../../hooks/useConfig";
import { useEffect, useState } from "react";

import useObservation from "../../../../hooks/useObservation";
import useSensor from "../../../../hooks/useSensor";
import CustomHighChart from "../../../../components/chart";
import { useParams } from "react-router-dom";
import useStation from "../../../../hooks/useStation";


function SensorTab({ dataStreamId }) {
    const theme = useTheme()
    const { borderRadius } = useConfig()
    const { sensors } = useSensor()
    const { stations } = useStation()
    const { id } = useParams()
    const { observation, observationLatest, isViewChart } = useObservation(dataStreamId, stations?.find(item => item?.id === Number(id)))

    const transformedData = observation?.observations?.map(item => {
        return [
            convertTimeStampFromString(item.resultTime), // Chuyển đổi thời gian sang mili giây
            parseFloat(item.result.trim()) // Chuyển đổi kết quả sang số
        ];
    });
    console.log("tr", observation);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <CsPaperCenter >
                    <CsFlexAlwaysBetween
                        sx={{
                            background: theme.palette.mode == "dark" ? theme.palette.background.default : theme.palette.grey[100],
                            borderTopLeftRadius: `${borderRadius}px`,
                            borderTopRightRadius: `${borderRadius}px`,
                            borderBottom: `1px solid ${theme.palette.mode == "dark" ? theme.palette.grey[800] : theme.palette.grey[300]}`
                        }}>
                        <CsBoxCenter py={2} width={"100%"}>
                            <Typography variant="body1" fontWeight={600}>Cập nhật gần nhất</Typography>
                        </CsBoxCenter>
                    </CsFlexAlwaysBetween>
                    {
                        observationLatest?.observations?.map(item => (
                            <CsFlexAlwayStart pt={2} pb={1} px={2} width={"100%"} gap={1}>
                                <Typography minWidth={"160px"} variant="body1" >{item?.name}</Typography>
                                <Typography variant="body1" fontWeight={600}>{item?.result}</Typography>

                            </CsFlexAlwayStart>
                        ))
                    }
                </CsPaperCenter>
            </Grid>
            <Grid item xs={12} md={8}>
                <CsPaperCenter >
                    {isViewChart === true ?
                        <CsFlexAlwaysBetween width={"100%"} >
                            <div style={{ width: '100%', height: '550px' }}>
                                <CustomHighChart data={transformedData} />
                            </div>
                        </CsFlexAlwaysBetween>
                        :
                        <>
                            <CsFlexAlwaysBetween
                                sx={{
                                    background: theme.palette.mode == "dark" ? theme.palette.background.default : theme.palette.grey[100],
                                    borderTopLeftRadius: `${borderRadius}px`,
                                    borderTopRightRadius: `${borderRadius}px`
                                }}>
                                <CsBoxCenter py={2} width={"60%"} sx={{ borderRight: `1px solid ${theme.palette.mode == "dark" ? theme.palette.grey[800] : theme.palette.grey[300]}` }}>
                                    <Typography variant="body1" fontWeight={600}>Thời gian</Typography>
                                </CsBoxCenter>
                                <CsBoxCenter py={2} width={"40%"}>
                                    <Typography variant="body1" fontWeight={600}>Giá trị</Typography>
                                </CsBoxCenter>

                            </CsFlexAlwaysBetween>
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
                        </>
                    }
                </CsPaperCenter>
            </Grid>
        </Grid>

    );
}

export default SensorTab;