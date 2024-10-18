import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import IBreadcrumsCustom from "../../../components/breadcrums";
import { CsPaperCenter } from "../../../components/paper";
import { CsFlexAlwaysBetween } from "../../../components/flex";
import { MuiEffectButton } from "../../../components/button";
import { IconPlus } from "@tabler/icons-react";
import CustomSensorTable from "../../ui-components/table/sensor-table";
import CustomizedDialogs from "../../../components/dialog";
import { useState } from "react";
import FormSensor from "../../ui-components/forms/FormSensor";

function SensorManagement() {
    const theme = useTheme()
    const { t } = useTranslation()

    const [isOpenAddDialog, setOpenAddDialog] = useState<boolean>(false);


    const handleOpenAddDialog = () => {
        setOpenAddDialog(true)
      }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <IBreadcrumsCustom isBreadcumbs breadcumbs={[t("Quản lý cảm biến")]} link={["/sensor-management",]} />
            </Grid>
            <Grid item xs={12}>
                <CsPaperCenter>
                    <Box sx={{ width: "100%", borderBottom: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100]}`, py: "14px", px: 2 }}>
                        <CsFlexAlwaysBetween>
                            <Typography variant="subtitle2">
                                {t("Quản lý cảm biến")}
                            </Typography>
                            <MuiEffectButton
                                variant="contained"
                                startIcon={<IconPlus size={"18px"} />}
                                onClick={handleOpenAddDialog}
                            >
                                Thêm cảm biến
                            </MuiEffectButton>
                        </CsFlexAlwaysBetween>
                    </Box>
                    <Box sx={{ width: "100%", p: 2 }}>
                        <CustomSensorTable isAdmin />
                    </Box>
                </CsPaperCenter>
                <CustomizedDialogs
                    title={"Thêm cảm biến"}
                    open={isOpenAddDialog}
                    handleOpen={setOpenAddDialog}
                    body={<FormSensor handleOpen={setOpenAddDialog}/>}
                />
            </Grid>
        </Grid>
    );
}

export default SensorManagement;