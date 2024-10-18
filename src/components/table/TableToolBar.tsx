import { Box, IconButton, Tooltip, Typography, alpha, useTheme } from "@mui/material";
import { EnhancedTableToolbarProps } from "./type";
import { IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import useConfig from "../../hooks/useConfig";

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    const theme = useTheme()
    const { t } = useTranslation()
    const { borderRadius } = useConfig()

    return (
        <Box
            sx={{
                mb: numSelected > 0 ? 2 : 0,
                px: 2,
                pb: numSelected > 0 ? "8px" : 0,
                pt: numSelected > 0 ? "8px" : 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: `${borderRadius}px`,
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    // color="inherit"
                    variant="subtitle2"
                // component="div"
                >
                    {numSelected} được chọn
                </Typography>
            ) : null}
            {numSelected > 0 && (
                <Tooltip title="Xóa">
                    <IconButton >
                        <IconTrash size={20} stroke={2} />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}