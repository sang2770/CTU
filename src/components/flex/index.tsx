import { Box, styled } from "@mui/material";

export const CsFlexBetween = styled(Box)(({ theme }) => ({
    width: '100%',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 2,
    [theme.breakpoints.down('md')]: {
        flexDirection:"column"
    },
    [theme.breakpoints.up('md')]: {
        flexDirection:"row"
    },
}))
export const CsFlexAlwaysBetween = styled(Box)(({ theme }) => ({
    width: '100%',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}))
export const CsFlexAlwaysCenter = styled(Box)(({ theme }) => ({
    width: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}))
export const CsFlexStart = styled(Box)(({ theme }) => ({
    width: '100%',
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // gap: 2,
    [theme.breakpoints.down('md')]: {
        flexDirection:"column"
    },
    [theme.breakpoints.up('md')]: {
        flexDirection:"row"
    },
}))
export const CsFlexAlwayStart = styled(Box)(({ theme }) => ({
    width: '100%',
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

}))
export const CsFlexEnd = styled(Box)(({ theme }) => ({
    // width: '100%',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    // gap: 2,
    [theme.breakpoints.down('md')]: {
        flexDirection:"column"
    },
    [theme.breakpoints.up('md')]: {
        flexDirection:"row"
    },
}))
export const CsAlwayFlexEnd = styled(Box)(({ theme }) => ({
    width: '100%',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
}))
export const CsFlexAround = styled(Box)(({ theme }) => ({
    width: '100%',
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    // gap: 2,
    [theme.breakpoints.down('md')]: {
        flexDirection:"column"
    },
    [theme.breakpoints.up('md')]: {
        flexDirection:"row"
    },
}))