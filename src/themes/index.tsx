import { createTheme, ThemeOptions, ThemeProvider, Theme } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { useMemo, ReactNode } from 'react';

import componentStyleOverrides from './override';
import Palette from './palette';
import Typography from './typography';
import useConfig from '../hooks/useConfig';

interface Props {
    children: ReactNode;
}

export default function ThemeCustomization({ children }: Props) {
    const { borderRadius, fontFamily, navType, outlinedFilled, presetColor } = useConfig();

    const theme: Theme = useMemo<Theme>(() => Palette(navType, presetColor), [navType, presetColor]);

    const themeTypography: TypographyOptions = useMemo<TypographyOptions>(
        () => Typography(theme, borderRadius, fontFamily),
        [theme, borderRadius, fontFamily]
    );
    
    const themeOptions: ThemeOptions = useMemo(() => ({
        palette: theme.palette,
        typography: themeTypography,
    }), [theme, themeTypography]);

    const themes: Theme = createTheme(themeOptions)

    themes.components = useMemo(() =>{
        return componentStyleOverrides(themes, borderRadius, outlinedFilled)
    },[themes, borderRadius, outlinedFilled]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
