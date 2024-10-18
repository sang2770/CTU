import { Theme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const fontFamilyExtra = (fontFamily: string) => fontFamily.indexOf(',') !== -1 ? fontFamily?.slice(fontFamily.indexOf(',') + 1).trim() : ''


const Typography = (theme: Theme, borderRadius: number, fontFamily: string): TypographyOptions => ({
    fontFamily,
    h6: {
        fontWeight: 600,
        color: theme.palette.primary.main,
        fontSize: '18px',
        [theme.breakpoints.down("md")]: {
            fontSize: "14px",
        },
        [theme.breakpoints.down("lg")]: {
            fontSize: "16px",
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: "18px",
        },
    },
    h5: {
        fontSize: '22px',
        color: theme.palette.primary.main,
        fontWeight: 600
    },
    h4: {
        fontSize: '24px',
        color: theme.palette.primary.main,
        fontWeight: 600,
        lineHeight: '2em',
    },
    h3: {
        fontSize: '26px',
        color: theme.palette.primary.main,
        fontWeight: 600,
        lineHeight: '1.5em',
    },
    h2: {
        fontSize: '32px',
        color: theme.palette.primary.main,
        fontWeight: 700,
        lineHeight: '1.5em',

    },
    h1: {
        fontSize: '52px',
        color: theme.palette.primary.main,
        fontWeight: 700,
    },
    subtitle1: {
        fontSize: '16px',
        fontWeight: 600,
        color: theme.palette.primary.main,
        [theme.breakpoints.down("md")]: {
            fontSize: "14px",
        },
        [theme.breakpoints.down("lg")]: {
            fontSize: "14px",
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: "16px",
        },
        fontFamily: fontFamilyExtra(fontFamily)
    },
    subtitle2: {
        fontSize: '16px',
        fontWeight: 500,
        color: theme.palette.primary.main,
        fontFamily: fontFamilyExtra(fontFamily)
    },
    caption: {
        fontSize: '13px',
        color: theme.palette.text.secondary,
        fontWeight: 300,
        fontFamily: fontFamilyExtra(fontFamily)
    },
    body1: {
        fontSize: '15px',
        fontWeight: 500,
        lineHeight: '1.5em',
        color: theme.palette.text.primary,
        fontFamily: fontFamilyExtra(fontFamily)
    },
    body2: {
        fontSize: '14px',
        letterSpacing: '0em',
        fontWeight: 400,
        lineHeight: '1.5em',
        color: theme.palette.mode === "dark" ? theme.palette.text.primary : theme.palette.grey[700],
        fontFamily: fontFamilyExtra(fontFamily)
    },
    button: {
        textTransform: 'none',
        color: theme.palette.text.primary,
        fontFamily: fontFamilyExtra(fontFamily)
    }
});

export default Typography;
