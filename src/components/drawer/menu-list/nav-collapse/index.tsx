import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { NavGroupProps } from '../nav-group';
import NavItem from '../nav-item';
import useConfig from '../../../../hooks/useConfig';

interface NavCollapseProps {
    menu: NavGroupProps['item'];
    level: number;
}

const NavCollapse = ({ menu, level }: NavCollapseProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { borderRadius } = useConfig()

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null | undefined>(null);

    const handleClick = () => {
        setOpen(!open);
        setSelected(!open ? menu.id : null);
    };

    const { pathname } = useLocation();
    const checkOpenForParent = (child: any, id?: string) => {
        child.forEach((item: any) => {
            if (item.url === pathname) {
                setOpen(true);
                setSelected(id);
            }
        });
    };

    // menu collapse for sub-levels
    useEffect(() => {
        const childrens = menu.children ? menu.children : [];
        childrens.forEach((item: any) => {
            if (item.children?.length) {
                checkOpenForParent(item.children, menu.id);
            }
            if (pathname && (pathname.includes('product-details') || pathname.includes('social-profile'))) {
                if (item.url && (item.url.includes('product-details') || item.url.includes('social-profile'))) {
                    setSelected(menu.id);
                    setOpen(true);
                }
            }
            if (item.url === pathname) {
                setSelected(menu.id);
                setOpen(true);
            }
        });
    }, [pathname, menu.children]);

    // menu collapse & item
    const menus = menu.children?.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <Box>

            <ListItemButton
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 0.5,
                    backgroundColor: 'transparent',
                    py: level > 1 ? 0.5 : 0.75,
                    px: "16px",
                    borderRadius: `${borderRadius}px`,
                    mx:"8px",
                    color: theme.palette.text.primary,
                    fontWeight:400,
                    transition:"ease-in-out",
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.mode=="dark" ?theme.palette.text.primary:theme.palette.text.secondary
                    },
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.mode=="dark" ?theme.palette.text.primary:theme.palette.text.secondary,
                        
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.text.secondary,
                        },
                    },
                }}
                selected={selected === menu.id}
                onClick={handleClick}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
                    <ListItemIcon
                        sx={{
                            fontSize: 12,
                            minWidth: '38px',
                            color: "inherit"
                        }}>
                        {menu.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant={'body2'}
                                sx={{
                                    my: 'auto',
                                    color: "inherit",
                                    fontWeight:"inherit"
                                }}
                            >
                                {t(menu.title!)}
                            </Typography>
                        }
                        secondary={
                            menu.caption && (
                                <Typography variant="caption" display="block" gutterBottom>
                                    {t(menu.caption.toString())}
                                </Typography>
                            )
                        }
                    />
                </Box>

                {open ? (
                    <IconChevronUp stroke={1.5} size="16px" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                ) : (
                    <IconChevronDown stroke={1.5} size="16px" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {open && (
                    <List
                        component="div"
                        disablePadding
                        sx={{ position: 'relative' }}
                    >
                        {menus}
                    </List>
                )}
            </Collapse>
        </Box>
    );
};

export default NavCollapse;
