import { useTranslation } from "react-i18next";
import { Box, Grid, Typography, useTheme } from "@mui/material";

import { CsPaperCenter } from "../../../components/paper";
import FilterDate from "../../ui-components/tabs/type-sensor/FilterDate";
import IBreadcrumsCustom from "../../../components/breadcrums";
import TypeSensorTabs from "../../ui-components/tabs/type-sensor";
import useStation from "../../../hooks/useStation";


const StationPage: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    
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