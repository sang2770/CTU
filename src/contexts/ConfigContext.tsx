import { createContext, ReactNode } from 'react';
import { PaletteMode } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ConfigProps, CustomizationProps } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

const defaultConfig: ConfigProps = {
    fontFamily: `'K2D', Readex Pro`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'theme1', // default, theme1, theme2, theme3
    locale: 'vn', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

const initialState: CustomizationProps = {
    ...defaultConfig,
    onChangeMenuType: () => { },
    onChangePresetColor: () => { },
    onChangeLocale: () => { },
    onChangeRTL: () => { },
    onChangeContainer: () => { },
    onChangeFontFamily: () => { },
    onChangeBorderRadius: () => { },
    onChangeOutlinedField: () => { }
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
    children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
    const { i18n } = useTranslation();
    const [config, setConfig] = useLocalStorage('berry-config', {
        fontFamily: initialState.fontFamily,
        borderRadius: initialState.borderRadius,
        outlinedFilled: initialState.outlinedFilled,
        navType: initialState.navType,
        presetColor: initialState.presetColor,
        locale: initialState.locale,
        rtlLayout: initialState.rtlLayout
    });

    const onChangeMenuType = (navType: PaletteMode) => {
        setConfig({
            ...config,
            navType
        });
    };

    const onChangePresetColor = (presetColor: string) => {
        setConfig({
            ...config,
            presetColor
        });
    };

    const onChangeLocale = (locale: string) => {
        setConfig({
            ...config,
            locale
        });
        i18n.changeLanguage(locale);
    };

    const onChangeRTL = (rtlLayout: boolean) => {
        setConfig({
            ...config,
            rtlLayout
        });
    };

    const onChangeContainer = () => {
        setConfig({
            ...config,
            container: !config.container
        });
    };

    const onChangeFontFamily = (fontFamily: string) => {
        setConfig({
            ...config,
            fontFamily
        });
    };

    const onChangeBorderRadius = (event: Event, newValue: number | number[]) => {
        setConfig({
            ...config,
            borderRadius: newValue as number
        });
    };

    const onChangeOutlinedField = (outlinedFilled: boolean) => {
        setConfig({
            ...config,
            outlinedFilled
        });
    };

    return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeMenuType,
                onChangePresetColor,
                onChangeLocale,
                onChangeRTL,
                onChangeContainer,
                onChangeFontFamily,
                onChangeBorderRadius,
                onChangeOutlinedField
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}

export { ConfigProvider, ConfigContext };
