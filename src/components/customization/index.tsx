import { useState } from 'react';
import { Button, Drawer, Fab, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconSettings } from '@tabler/icons-react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import BorderRadius from './BorderRadius';
import PresetColor from './PresetColor';
import FontFamily from './FontFamily';

const Customization = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen(!open);

    return (
        <>
            <Tooltip title="Cài đặt">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color='secondary'
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        backgroundColor: theme.palette.primary.dark,
                        top: '35%',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial,
                    }}
                >
                    <Button >
                        <IconButton size="large" disableRipple>
                            <IconSettings color={theme.palette.primary.light} />
                        </IconButton>
                    </Button>
                </Fab>
            </Tooltip>
            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                {open && (
                    <PerfectScrollbar component="div">
                        <Grid container spacing={3} sx={{ p: 2 }}>
                            <Grid item xs={12}>
                                <Typography variant='h2'>Cài đặt</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <BorderRadius />
                            </Grid>
                            <Grid item xs={12}>
                                <PresetColor />
                            </Grid>
                            <Grid item xs={12}>
                                <FontFamily />
                            </Grid>
                        </Grid>
                    </PerfectScrollbar>
                )}
            </Drawer>
        </>
    );
};

export default Customization;
