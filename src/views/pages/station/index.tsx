import { Box, Grid, Typography, useTheme } from "@mui/material";
import IBreadcrumsCustom from "../../../components/breadcrums";
import { useTranslation } from "react-i18next";
import useStation from "../../../hooks/useStation";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CsPaperCenter } from "../../../components/paper";
import FilterDate from "../../ui-components/tabs/type-sensor/FilterDate";
import TypeSensorTabs from "../../ui-components/tabs/type-sensor";
import useSensors from "../../../hooks/useObservation";


const StationPage: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslation()
    const theme = useTheme()

    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    
    const { stations } = useStation()
    
    const stationNameById = stations?.find(item => item?.id?.toString() === id)?.name


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <IBreadcrumsCustom isBreadcumbs breadcumbs={[t("Trang chủ"), t(stationNameById)]} link={["/dashboard", `/dashboard/stations/${id}`]} />
            </Grid >
            <Grid item xs={12}>
                <CsPaperCenter>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ width: "100%", borderBottom: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100]}`, py: "14px", px: 2 }}>
                                <Typography variant="subtitle2">
                                    {t(`Dữ liệu cảm biến của trạm ${stationNameById}`)}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <FilterDate />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ width: "100%", px: 2 }}>
                                <TypeSensorTabs />
                            </Box>
                        </Grid>
                    </Grid>
                </CsPaperCenter>

            </Grid>
        </Grid>
    );
}

export default StationPage;