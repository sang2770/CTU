import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ClickAwayListener, Grid, List, ListItemButton, ListItemText, Paper, Popper, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useConfig from '../../hooks/useConfig';

const LocalizationV2Section = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { locale, onChangeLocale, borderRadius } = useConfig();

    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const anchorRef = useRef<any>(null);

    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState<string>(locale);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined,
        lng: string
    ) => {

        setOpen(false);
    };

    const handleToggle = () => {
        const lng = language == "en" ? "vn" : "en";
        setLanguage(lng);
        onChangeLocale(lng);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        setLanguage(locale);
    }, [locale]);

    return (
        <>
            <Box>
                <Tooltip title={t("Ngôn ngữ")}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            cursor: "pointer",
                            background: "transparent",
                            transition: 'all .2s ease-in-out',
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >


                        <img src={language == 'en' ? 'icons/UK.jpg' : 'icons/VN.png'} width={"24px"} height={"16px"} />

                    </Avatar>
                </Tooltip>
            </Box>

        </>
    );
};

export default LocalizationV2Section;
