import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

import theme1 from './colors/_theme1.module.scss';
import theme2 from './colors/_theme2.module.scss';
import theme3 from './colors/_theme3.module.scss';

interface ColorProps {
    readonly [key: string]: string;
}
const Palette = (navType: PaletteMode, presetColor: string) => {
    let colors: ColorProps;
    switch (presetColor) {
        case 'theme1':
            colors = theme1;
            break;
        case 'theme2':
            colors = theme2;
            break;
        case 'theme3':
            colors = theme3;
            break;
        default:
            colors = theme1;
    }

    return createTheme({
        palette: {
            mode: navType,
            common: {
                black: colors.lightPaper,
                white: colors.darkBackground
            },
            primary: {
                light: navType === 'dark' ? colors.darkPrimaryLight : colors.lightPrimaryLight,
                main: navType === 'dark' ? colors.darkPrimaryMain : colors.lightPrimaryMain,
                dark: navType === 'dark' ? colors.darkPrimaryDark : colors.lightPrimaryDark,
            },
            secondary: {
                light: navType === 'dark' ? colors.darkSecondaryLight : colors.lightSecondaryLight,
                main: navType === 'dark' ? colors.darkSecondaryMain : colors.lightSecondaryMain,
                dark: navType === 'dark' ? colors.darkSecondaryDark : colors.lightSecondaryDark,
            },
            error: {
                light: colors.errorLight,
                main: colors.errorMain,
                dark: colors.errorDark
            },
            warning: {
                light: colors.warningLight,
                main: colors.warningMain,
                dark: colors.warningDark
            },
            success: {
                light: colors.successLight,
                main: colors.successMain,
                dark: colors.successDark
            },
            grey: {
                50: colors.grey50,
                100: colors.grey100,
                200: colors.grey200,
                300: colors.grey300,
                500: colors.grey500,
                600: colors.grey600,
                700: colors.grey700,
                900: colors.grey900
            },
            text: {
                primary: navType === 'dark' ? colors.darkTextPrimary : colors.lightTextPrimary,
                secondary: navType === 'dark' ? colors.lightTextPrimary : colors.darkTextPrimary,
            },
            divider: navType === 'dark' ? colors.grey300 : colors.grey200,
            background: {
                paper: navType === 'dark' ? colors.darkPaper : colors.lightPaper,
                default: navType === 'dark' ? colors.darkBackground : colors.lightBackground
            },
        }
    });
};

export default Palette;
