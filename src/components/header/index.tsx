import { AppBar, Avatar, Box, Button, Grid, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { HEADER_HEIGHT } from "../../constant/customize";
import { IconMenu2, IconUser } from "@tabler/icons-react";
import { OPEN_DRWAWER } from "../../store/menu/action";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useTranslation } from "react-i18next";
import LocalizationSection from "../customization/Localization";
import ThemeModeSection from "../customization/ThemeMode";
import useConfig from "../../hooks/useConfig";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { CsAlwayFlexEnd, CsFlexEnd } from "../flex";
import { WEB_NAME, WEB_NAME_BRIEF } from "../../constant";
import ProfileSection from "../customization/ProfileSection";


const settings = ["Đổi mật khẩu", "Đăng xuất"];

export default function HeaderAdmin() {
    const { borderRadius } = useConfig()
    const { drawerOpen } = useAppSelector((state) => state.menu)
    const { t } = useTranslation()
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

    const { isAuthenticated, logout } = useAuth()

    const [dataUser, setDataUser] = useState(JSON.parse(localStorage?.getItem("_authenticatedUser")))
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    useEffect(() => {
        setDataUser(JSON.parse(localStorage?.getItem("_authenticatedUser")))
    }, []);



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