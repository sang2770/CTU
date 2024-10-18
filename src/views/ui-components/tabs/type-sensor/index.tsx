import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import useStation from '../../../../hooks/useStation';
import dayjs from 'dayjs';
import SensorTab from './SensorTab';
import { useParams } from 'react-router-dom';
import useConfig from '../../../../hooks/useConfig';
import { useMemo, useState } from 'react';
import useThings from '../../../../hooks/useThings';
import useSensors from '../../../../hooks/useObservation';
import TransformArray from '../../../../utils/objectToKey';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TypeSensorTabs() {
    const theme = useTheme()
    const { id } = useParams();
    const { borderRadius } = useConfig()
    const [fromDate, setFromDate] = useState(new Date())
    const [value, setValue] = useState(0)


    
    const { station, isLoadingStations } = useStation(Number(id))

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                    TabIndicatorProps={{ sx: { display: 'none' } }}
                    sx={{

                        '& .MuiTabs-flexContainer': {
                            flexWrap: 'wrap',
                        },
                        "& .MuiTab-root.Mui-selected": {
                            color: theme.palette.text.secondary,
                            backgroundColor: theme.palette.primary.main,
                            border: `1px solid ${theme.palette.primary.main}`
                        },
                        "& .MuiTab-root": {
                            color: theme.palette.grey[500],
                            border: `1px solid ${theme.palette.grey[300]}`,
                            borderBottom: 0,
                        }
                    }}
                >
                    {
                        station?.multiDataStreamDTOs?.map((dataSensor, index) => (
                            <Tab label={<Typography color="inherit" variant='body1'>{dataSensor?.sensor?.sensorName}</Typography>} {...a11yProps(index)} />
                        ))
                    }
                </Tabs>
            </Box>
            {
                station?.multiDataStreamDTOs?.map((dataSensor, index) => (
                    <CustomTabPanel value={value} index={index}>
                        <SensorTab dataStreamId={dataSensor?.multiDataStreamId} />
                    </CustomTabPanel>
                ))
            }
        </Box>
    );
}
