import { Avatar, Box, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import useConfig from '../../hooks/useConfig';

const ThemeModeSection = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    const { navType, onChangeMenuType, borderRadius } = useConfig();

    return (
        <Box display='flex' alignItems="center" justifyContent='space-between'>
            <Tooltip title={t("Chủ đề")}>
                <Avatar
                    variant="rounded"
                    sx={{
                        border: '1px solid',
                        cursor: "pointer",
                        borderRadius: `${borderRadius}px`,
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
                        background: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: theme.palette.primary.main,
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.light
                        }
                    }}
                    onClick={() => onChangeMenuType(navType === 'dark' ? 'light' : 'dark')}
                    color="inherit"
                >
                    {navType === 'dark' ? <IconMoon /> : <IconSun />}
                </Avatar>
            </Tooltip>
        </Box>
    );
};

export default ThemeModeSection;
