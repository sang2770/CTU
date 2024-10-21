import { Grid, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

import { convertTimeFromString, convertTimeStampFromString } from "../../../../utils/formatTime";
import { CsBoxCenter } from "../../../../components/box";
import { CsFlexAlwaysBetween, CsFlexAlwayStart } from "../../../../components/flex";
import { CsPaperCenter } from "../../../../components/paper";
import CustomHighChart from "../../../../components/chart";
import useConfig from "../../../../hooks/useConfig";
import useObservation from "../../../../hooks/useObservation";

import useStation from "../../../../hooks/useStation";
import { useState } from "react";
import dayjs from "dayjs";


function SensorTab({ dataStreamId }) {
    const theme = useTheme()
    const { id } = useParams()
    const { borderRadius } = useConfig()
    const { stations } = useStation()

    const range = {
        startTime: dayjs().subtract(7, 'day'),
        endTime: dayjs(new Date()),
    }
    const stationById = stations?.find(item => item?.id === Number(id))
    const { observation, isViewChart } = useObservation(dataStreamId, stationById, range)

    const transformedData = observation?.observations?.map(item => {
        return [
            convertTimeStampFromString(item.resultTime), // Chuyển đổi thời gian sang mili giây
            parseFloat(item.result.trim()) // Chuyển đổi kết quả sang số
        ];
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
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