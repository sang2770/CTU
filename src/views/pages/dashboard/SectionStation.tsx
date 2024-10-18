import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { CsPaperCenter } from "../../../components/paper";
import CustomTable from "../../ui-components/table/station-table";
// import CustomTable from "../../ui-components/table/station-table-old";

function StationSection() {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <CsPaperCenter>
            <Box sx={{ width: "100%", borderBottom: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100]}`, py: "14px", px: 2 }}>
                <Typography variant="subtitle2">
                    {t("Thông tin trạm quan trắc")}
                </Typography>
            </Box>
            <Box sx={{ width: "100%", p: 2 }}>
                <CustomTable isAdmin={false} />
            </Box>
        </CsPaperCenter>
    );
}

export default StationSection;