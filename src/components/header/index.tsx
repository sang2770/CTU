import { AppBar, Avatar, Box, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IconMenu2 } from "@tabler/icons-react";

import { HEADER_HEIGHT } from "../../constant/customize";
import { OPEN_DRWAWER } from "../../store/menu/action";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { WEB_NAME } from "../../constant";
import LocalizationSection from "../customization/Localization";
import ProfileSection from "../customization/ProfileSection";
import ThemeModeSection from "../customization/ThemeMode";
import useConfig from "../../hooks/useConfig";

export default function HeaderAdmin() {
    const { borderRadius } = useConfig()
    const { drawerOpen } = useAppSelector((state) => state.menu)
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                p: 0,
                m: 0,
                height: `${HEADER_HEIGHT}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start"
            }}>
            <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }} sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",

            }}>

                <Box sx={{
                    pl: { xs: 1 },
                    pr: { xs: 1, md: 3 },
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Box display={"flex"} gap={1} justifyContent={"center"} alignItems={"center"}>
                        <Avatar
                            sx={{
                                // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 12px",
                                cursor: "pointer",
                                borderColor: "transparent",
                                background: "transparent",
                                color: theme.palette.primary.main,
                                '&[aria-controls="menu-list-grow"],&:hover': {
                                    borderColor: "transparent",
                                    background: "transparent",
                                    color: theme.palette.text.primary,
                                },
                                borderRadius: `${borderRadius}px`
                            }}
                            onClick={() => dispatch(OPEN_DRWAWER({ drawerOpen: !drawerOpen }))}
                            variant="rounded">

                            <IconMenu2 />
                        </Avatar>
                        {matchUpMd &&
                            <Typography variant="h6" textTransform={"uppercase"}>{WEB_NAME}</Typography>
                        }
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <LocalizationSection />
                        <ThemeModeSection />
                        <ProfileSection />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}