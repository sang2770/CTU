import { Avatar, Button, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CsAlwayFlexEnd } from "../flex";
import useAuth from "../../hooks/useAuth";
import useConfig from "../../hooks/useConfig";


function ProfileSection() {
    const { borderRadius } = useConfig()
    const { t } = useTranslation()
    const theme = useTheme()

    const { isAuthenticated, logout } = useAuth()

    const [dataUser, setDataUser] = useState(JSON.parse(localStorage?.getItem("_authenticatedUser")))
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    useEffect(() => {
        setDataUser(JSON.parse(localStorage?.getItem("_authenticatedUser")))
    }, []);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        isAuthenticated() ?
            <>
                <CsAlwayFlexEnd gap={1}
                    sx={{
                        width: "auto",
                        pl: 2,
                        borderRadius: `${borderRadius}px`,
                        background: theme.palette.primary.light,
                    }}>
                    <Typography variant="body2" color={theme.palette.mode === "dark" ? theme.palette.text.secondary : theme.palette.primary.main}>{dataUser?.fullName}</Typography>
                    <Avatar
                        sx={{
                            cursor: "pointer",
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
                            background: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
                            color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                borderColor: theme.palette.primary.main,
                                background: theme.palette.primary.main,
                                color: theme.palette.primary.light
                            },
                            borderBottomRightRadius: `${borderRadius}px`,
                            borderTopRightRadius: `${borderRadius}px`,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                        }}
                        onClick={handleOpenUserMenu} variant="rounded"
                    >
                        <IconUser />
                    </Avatar>
                </CsAlwayFlexEnd>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem sx={{ minWidth: "120px" }} >  {/* gọi hàm handleLogout */}
                        <Typography textAlign="center" variant="body2">{t("Quản lý")}</Typography>
                    </MenuItem>
                    <MenuItem sx={{ minWidth: "120px" }} onClick={handleLogout}>  {/* gọi hàm handleLogout */}
                        <Typography textAlign="center" variant="body2">{t("Đăng xuất")}</Typography>
                    </MenuItem>
                </Menu>
            </>
            :
            <Button variant="contained" href="/login">
                {t("Đăng nhập")}
            </Button>
    );
}

export default ProfileSection;