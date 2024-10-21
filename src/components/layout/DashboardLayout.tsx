import { useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

import { SLIDEBAR_WIDTH } from "../../constant/customize";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { OPEN_DRWAWER } from "../../store/menu/action";
import { MainCardProps } from "../card/MainCard";
import HeaderAdmin from "../header";
import useConfig from "../../hooks/useConfig";
import FooterAdmin from "../footer/FooterAdmin";
import DrawerDashboard from "../drawer";

interface MainStyleProps extends MainCardProps {
    open: boolean;
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }: MainStyleProps) => ({
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
        height: `100vh`,
        ...(!open && {
            width: '100%',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.shorter
            }),

            [theme.breakpoints.up('md')]: {
                marginLeft: -(SLIDEBAR_WIDTH),
                width: '100%',
            },
            [theme.breakpoints.down('md')]: {
                width: '100%',
            },
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            }
        }),
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter
            }),
            marginLeft: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            width: `calc(100% - ${SLIDEBAR_WIDTH}px)`,
            [theme.breakpoints.down('md')]: {
                marginLeft: '0px'
            },
            [theme.breakpoints.down('sm')]: {
                marginLeft: '0px'
            }
        })
    })
);

function DashboardLayout() {
    const theme = useTheme();
    const { borderRadius } = useConfig()
    const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));

    const dispatch = useAppDispatch();
    const { drawerOpen } = useAppSelector((state) => state.menu);

    useEffect(() => {
        dispatch(OPEN_DRWAWER({ drawerOpen: !matchDownMd }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);


    return (
        <Box display={"flex"}>
            <DrawerDashboard />
            <Main theme={theme} open={drawerOpen}>
                <HeaderAdmin />
                <Box sx={{
                    bgcolor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.background.default,
                    borderRadius: {xs:0,lg:`${borderRadius}px`},
                    px: { xs: 1, lg: 2, xl: 3 },
                    py: 3,
                    mr: { xs: 0, lg: 2, xl: 3 },
                    minHeight: `100vh`
                }}>
                    <Outlet />
                </Box>
                <FooterAdmin />
            </Main>
            {/* <Customization /> */}
        </Box>
    );
};

export default DashboardLayout;
