import { Box, Checkbox, TableHead, TableRow, TableSortLabel, useTheme } from "@mui/material";
import { DataStation, HeadCell, Order } from "./table";
import { visuallyHidden } from '@mui/utils';
import { StyledTableCell } from "../../../../components/table/style";
import { useTranslation } from "react-i18next";

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataStation) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headCells: readonly HeadCell[];
    isAdmin: boolean
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const theme = useTheme()
    const { t } = useTranslation();
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, headCells, isAdmin, onRequestSort } = props;

    const createSortHandler = (property: keyof DataStation) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {isAdmin ?
                    <StyledTableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                            style={{
                                color: (rowCount > 0 && numSelected === rowCount) ?
                                    theme.palette.primary.main
                                    :
                                    theme.palette.grey[300],
                            }}
                        />
                    </StyledTableCell>
                    :
                    <StyledTableCell padding="normal">#</StyledTableCell>
                }
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.id === "action" ? "center" : (headCell.numeric ? 'right' : 'left')}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{
                                color: `${theme.palette.text.primary} !important`,
                                '& .MuiTableSortLabel-icon': {
                                    color: `${theme.palette.text.primary} !important`,
                                }
                            }}>
                            {t(headCell.label)}
                            {orderBy === headCell.id &&
                                <Box sx={visuallyHidden} >
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            }
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
                <StyledTableCell
                    align={"center"}
                    padding={'normal'}>
                    {t("Thao tác")}
                </StyledTableCell>
            </TableRow>
        </TableHead>
    );
}