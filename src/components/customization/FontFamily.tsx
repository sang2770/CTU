import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import useConfig from '../../hooks/useConfig';

const FontFamily = () => {
    const theme = useTheme();
    const { fontFamily, onChangeFontFamily } = useConfig();

    let initialFont;
    switch (fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Nunito', sans-serif`:
            initialFont = 'Nunito';
            break;
        case `'K2D', sans-serif`:
            initialFont = 'K2D';
            break;
        default:
            initialFont = 'K2D';
            break;
    }
    
    const [font, setFont] = useState(initialFont);

    const handleFont = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFont(event.target.value);
        onChangeFontFamily(event.target.value);
    };

    return (
        <Box sx={{ border: 1, borderColor: theme.palette.grey[400], p: 2 }}>
            <Typography variant='h4' pb={2}>FontFamily</Typography>
            <FormControl>
                <RadioGroup aria-label="font-family" value={font} onChange={handleFont} name="row-radio-buttons-group">
                    <FormControlLabel
                        value={`'Roboto', sans-serif`}
                        control={<Radio />}
                        label="Roboto"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    />
                    <FormControlLabel
                        value={`'Nunito', sans-serif`}
                        control={<Radio />}
                        label="Nunito"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    />
                    <FormControlLabel
                        value={`'K2D', Readex Pro`}
                        control={<Radio />}
                        label="K2D"
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                        }}
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default FontFamily;
