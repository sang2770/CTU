import { Paper, PaperProps, styled } from "@mui/material";

export const CsPaperCenter = styled(Paper)(({ theme }) => ({
    width: '100%',
    display: "grid",
    placeItems: "center",
    background:`${theme.palette.background.paper}`,
    border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300]}`,
    [theme.breakpoints.down('md')]: {
        width: "100%"
    }
}))
export const CsPaperTop = styled(Paper)(({ theme }) => ({
    width: '100%',
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start",
    background:`${theme.palette.background.paper}`,
    border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300]}`,
    [theme.breakpoints.down('md')]: {
        width: "100%"
    }
}))
type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};
export interface MainCardProps extends KeyedObject {
    children: React.ReactNode | string;
    style?: React.CSSProperties;
    className?: string;
    sx?: PaperProps['sx'];
    aspectRatio: number,
}
export const CsPaperAspectRatioCenter = styled(Paper)(({ theme, aspectRatio }: MainCardProps) => ({
    display: "grid",
    placeItems: "center",
    aspectRatio: aspectRatio,
    background:`${theme.palette.background.paper}`,
    overflow: 'hidden',
    position: 'relative',
    border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300]}`,
}))