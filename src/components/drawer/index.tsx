import { Box, Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import { IconLogout2 } from "@tabler/icons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import PerfectScrollbar from "react-perfect-scrollbar";

import { OPEN_DRWAWER, SELECT_ITEM } from "../../store/menu/action";
import { SLIDEBAR_WIDTH } from "../../constant/customize";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { VERSION } from "../../constant";
import Logo from "../logo";
import MenuList from "./menu-list";


// ==============================|| SIDEBAR DRAWER ||============================== //

interface SidebarProps {
  window?: Window;
}

const DrawerDashboard = ({ window }: SidebarProps) => {
  const theme = useTheme();
  const { drawerOpen } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate()


  const drawer = useMemo(() => (
    <PerfectScrollbar
      component="div"
      style={{
        height: "94vh",
        paddingTop: "16px",
        paddingBottom: "16px",
      }}
    >
      <Box py={2}>
      <Logo size="sm" onClick={() => { navigate('/dashboard'); dispatch(SELECT_ITEM({ selectedItem: ["home"] })); }} />
      </Box>
      <MenuList />
    </PerfectScrollbar>
  ), []);

  const footerDrawer = useMemo(() => (
    <Box px={1} sx={{ height: "6vh", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="caption" color={theme.palette.text.secondary}>{VERSION}</Typography>
      <Box>
        <IconButton>
          <IconLogout2 color={theme.palette.primary.light} />
        </IconButton>
      </Box>
    </Box>
  ), [])

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <Box
        component="nav"
        sx={{
          flexShrink: { md: 0 },
          width: matchUpMd ? SLIDEBAR_WIDTH : 'auto',
          background: theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.background.paper,
          height: "100vh",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant={matchUpMd ? 'persistent' : 'temporary'}
          anchor="left"
          open={drawerOpen}
          onClose={() => dispatch(OPEN_DRWAWER({ drawerOpen: !drawerOpen }))}
          sx={{

            '& .MuiDrawer-paper': {
              width: SLIDEBAR_WIDTH,
              background: theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRight: 0,
              m: 0,
              padding: 0,
            }
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {drawerOpen && drawer}
          {drawerOpen && footerDrawer}
        </Drawer>
      </Box>
    </>
  );
};

export default DrawerDashboard;
