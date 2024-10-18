import { Box, Grid, Typography, useTheme } from "@mui/material";
import { CsPaperCenter } from "../../../components/paper";
import { useTranslation } from "react-i18next";
import IBreadcrumsCustom from "../../../components/breadcrums";
import { CsFlexAlwaysBetween } from "../../../components/flex";
import { MuiEffectButton } from "../../../components/button";
import { IconPlus } from "@tabler/icons-react";
import CustomStationTable from "../../ui-components/table/station-table";

function StationManagement() {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <IBreadcrumsCustom isBreadcumbs breadcumbs={[t("Quản lý trạm quan trắc")]} link={["/station-management",]} />
            </Grid>
            <Grid item xs={12}>
                <CsPaperCenter>
                    <Box sx={{ width: "100%", borderBottom: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100]}`, py: "14px", px: 2 }}>
                        <CsFlexAlwaysBetween>
                            <Typography variant="subtitle2">
                                {t("Quản lý cống/đập")}
                            </Typography>
                            <MuiEffectButton
                                variant="contained"
                                startIcon={<IconPlus size={"18px"} />}
                            >
                                Thêm cống/đập
                            </MuiEffectButton>
                        </CsFlexAlwaysBetween>
                    </Box>
                    <Box sx={{ width: "100%", p: 2 }}>
                        <CustomStationTable isAdmin />
                    </Box>
                </CsPaperCenter>
            </Grid>
        </Grid>
    );
}

export default StationManagement;