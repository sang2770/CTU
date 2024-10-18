import { Paper, TableCell, TableRow, styled, tableCellClasses } from "@mui/material";

export const ContainerTable = styled(Paper)(({ theme }) => ({
    width: "100%",
    backgroundColor: "transparent",
    border: "0px",
    // borderStyle: "solid",
    // borderColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300],
    // padding: 2
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300],
    // backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[100]:theme.palette.grey[700],
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default:theme.palette.grey[100],
        color: theme.palette.text.primary,
        fontWeight: 600,
        p: 0,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontWeight: 300,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.grey[200],
    // },
    // hide last border
    // '&:last-child td,&:last-child th': {
    //     border: 0,
       
    // },
}));