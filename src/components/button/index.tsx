import { Button, styled } from "@mui/material";

export const MuiEffectButton = styled(Button)(({ theme }) => ({
    backgroundColor:theme.palette.primary.main,
    boxShadow:"none",
    '&:hover': {
        transform: 'translateY(-3px)',
    }
}))