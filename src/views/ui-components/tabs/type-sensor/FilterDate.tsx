import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, useTheme } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconChartHistogram, IconList } from "@tabler/icons-react";
import dayjs from "dayjs";

import useConfig from "../../../../hooks/useConfig";
import useObservation from "../../../../hooks/useObservation";


function FilterDate() {
    const [startTime, setStartTime] = useState(dayjs().subtract(30, 'day'))
    const [endTime, setEndTime] = useState(dayjs(new Date()))
    const theme = useTheme()
    const { id } = useParams();
    const dataStreamId=Number(id);
    const { borderRadius } = useConfig()

    const { filterObservationByRange,setViewChart,isViewChart  } = useObservation(dataStreamId)

    useEffect(() => {
        
        if (startTime !== null && endTime != null) {
            const range = {
                startTime: startTime,
                endTime: endTime
            }
            filterObservationByRange(dataStreamId,range);
        }
    }, [startTime, endTime]);

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 1,
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: { xs: "space-between", sm: "flex-start" },
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 1
            }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        name='date'
                        sx={{ width: '100%' }}
                        value={startTime}
                        onChange={(newValue) => {
                            setStartTime(newValue)
                        }}
                        slotProps={{ textField: { size: 'small' } }}
                        disableFuture={true}
                        format="DD/MM/YYYY hh:mm"
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        name='date'
                        sx={{ width: '100%' }}
                        value={endTime}
                        onChange={(newValue) => {
                            setEndTime(newValue)
                        }}
                        slotProps={{ textField: { size: 'small' } }}
                        disableFuture={true}
                        format="DD/MM/YYYY hh:mm"
                    />
                </LocalizationProvider>
            </Box>
            {/* <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1
            }}>
                <Avatar
                    onClick={() => setViewChart(false)}
                    variant="rounded"
                    sx={{
                        border: '1px solid',
                        cursor: "pointer",
                        borderRadius: `${borderRadius}px`,
                        borderColor: isViewChart ? theme.palette.grey[400]:'transparent',
                        background: isViewChart ? 'transparent':theme.palette.primary.dark,
                        color: isViewChart ? theme.palette.grey[400]:theme.palette.primary.light,
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: theme.palette.primary.dark,
                            background: theme.palette.primary.dark,
                            color: theme.palette.primary.light
                        }
                    }}
                >
                    <IconList />
                </Avatar>
                <Avatar
                    onClick={() => setViewChart(true)}
                    variant="rounded"
                    sx={{
                        border: '1px solid',
                        cursor: "pointer",
                        borderRadius: `${borderRadius}px`,
                        borderColor: isViewChart ? 'transparent':theme.palette.grey[400],
                        background: isViewChart ? theme.palette.primary.dark:'transparent',
                        color: isViewChart? theme.palette.primary.light:theme.palette.grey[400],
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: theme.palette.primary.dark,
                            background: theme.palette.primary.dark,
                            color: theme.palette.primary.light
                        }
                    }}
                >
                    <IconChartHistogram />
                </Avatar>
            </Box> */}
        </Box>
    );
}

export default FilterDate;