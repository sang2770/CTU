import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { NavItemProps } from '../../type';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { OPEN_DRWAWER, SELECT_ITEM } from '../../../../store/menu/action';
import useConfig from '../../../../hooks/useConfig';

const NavItem = ({ item, level }: NavItemProps) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const { borderRadius } = useConfig()
    const { pathname } = useLocation()
    const { selectedItem } = useAppSelector((state) => state.menu)

    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'))

    const itemHandler = (id: string) => {
        dispatch(SELECT_ITEM({ selectedItem: [id] }));
        navigate(item.url!)
        matchesSM && dispatch(OPEN_DRWAWER({ drawerOpen: false }));
    };

    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(SELECT_ITEM({ selectedItem: [item.id!] }));
        }
    }, [pathname, dispatch, item.id]);

    return (
        <Box>
            <ListItemButton
                disabled={item.disabled}
                sx={{
                    display: 'flex',
                    mb: 0.5,
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    py: level > 1 ? 0.5 : 0.75,
                    px: "16px",
                    borderRadius: `${borderRadius}px`,
                    mx: "8px",
                    fontWeight: 400,
                    transition:"ease-in-out",
                    color: theme.palette.text.primary,
                    '&:hover': {
                        backgroundColor: level > 1 ? "transparent" : theme.palette.primary.main,
                        color: level > 1 ? theme.palette.text.primary : theme.palette.text.secondary,
                        fontWeight: level > 1 ? 600 : 400,
                    },
                    '&.Mui-selected': {
                        backgroundColor:level > 1?"transparent":theme.palette.primary.main,
                        color: level > 1 ?
                            theme.palette.text.primary
                            :
                            theme.palette.mode == "dark" ? theme.palette.text.primary : theme.palette.text.secondary,
                        fontWeight: level > 1 ? 600 : 400,
                        '&:hover': {
                            backgroundColor: level > 1 ? "transparent" : theme.palette.primary.main,
                            color: level > 1 ? theme.palette.text.primary : theme.palette.text.secondary,
                            fontWeight: level > 1 ? 600 : 400,
                        },
                    },
                }}
                selected={selectedItem?.findIndex((id: string | undefined) => id === item.id) > -1}
                onClick={() => itemHandler(item.id!)}
            >
                {level == 1 &&
                    <ListItemIcon

                        sx={{
                            fontSize: 12, minWidth: '38px',
                            color: "inherit"
                        }}>
                        {item.icon}
                    </ListItemIcon>
                }
                <ListItemText sx={{ color: "inherit" }}>
                    <Typography variant='body2' sx={{ color: "inherit", fontWeight: "inherit" }}>{t(item.title!)}</Typography>
                </ListItemText>
                {item.chip && (
                    <Chip
                        color={item.chip.color}
                        variant={item.chip.variant}
                        size={item.chip.size}
                        label={item.chip.label}
                        avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                    />
                )}
            </ListItemButton>
        </Box>
    );
};

export default NavItem;
