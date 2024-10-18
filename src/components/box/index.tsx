import { Box, BoxProps, styled } from "@mui/material";

interface AspectRatioProps extends BoxProps {
    aspectRatio: number
}

export const CsBoxCenter = styled(Box)(({ theme }) => ({
    width: '100%',
    display: "grid",
    placeItems: "center",
    [theme.breakpoints.down('md')]: {
        width: "100%"
    }
}))

export const CsBoxAspectRatioCenter = styled(Box)(({ aspectRatio }: AspectRatioProps) => ({
    display: "grid",
    placeItems: "center",
    aspectRatio: aspectRatio,
    overflow: 'hidden',
    position: 'relative',
}))