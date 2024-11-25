import { AppBar, Box, Link, Toolbar, Typography, useTheme } from "@mui/material";

import { HEADER_HEIGHT } from "../../constant/customize";
import { AUTHOR_ONE, AUTHOR_TWO } from "../../constant";

export default function FooterAdmin() {
    const theme = useTheme()

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "transparent",
                color: theme.palette.text.primary,
                p: 0,
                m: 0,
                height: `${HEADER_HEIGHT}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start"
            }}>
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
            }}>
                <Box>
                    <Link href={"https://www.cit.ctu.edu.vn/index.php/cacdonvi/khoa-cong-nghe-phan-mem"} sx={{ color: theme.palette.primary.main }}>
                        <Typography variant="body2" sx={{ color: theme.palette.primary.main, }}>{AUTHOR_ONE}</Typography>
                    </Link>
                </Box>


                <Box justifyContent={"flex-end"} alignItems={"center"} sx={{ display: "flex", gap: 1 }}>
                    <Link href={"https://www.cit.ctu.edu.vn/"} sx={{ color: theme.palette.primary.main }}>
                        <Typography variant="body2" sx={{ color: theme.palette.primary.main, }}>{AUTHOR_TWO}</Typography>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>

    )
}