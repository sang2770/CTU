import { useMemo, useState } from "react";
import { Box, Checkbox, FormControl, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack, Table, TableBody, TableContainer, Typography, useTheme } from "@mui/material";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconPencil, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { ContainerTable, StyledTableCell, StyledTableRow } from "../../../../components/table/style";
import { CsFlexBetween } from "../../../../components/flex";
import { Data, HeadCell, Order } from "./table";
import { EnhancedTableHead } from "./TableHead";
import { EnhancedTableToolbar } from "../../../../components/table/TableToolBar";
import { googleMapLink } from "../../../../utils/googleMap";
import { ROWSPERPAGE } from "../../../../constant/customize";
import { SearchAndFilter } from "./TableSearchAndFilter";
import { getComparator, stableSort } from "../../../../utils/table";
import CustomInput from "../../../../components/input/CustomInput";
import CustomizedDialogs from "../../../../components/dialog";
import useDams from "../../../../hooks/useDams";
import Nodata from "../../../../components/nodata";

function createData(
  id: number,
  name: string,
  status: string,
  date: string,
  position: string
): Data {
  return {
    id,
    name,
    status,
    date,
    position,
  };
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Tên đập",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Thời gian",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Vị trí",
  },
];

interface TableProps {
  isAdmin: boolean;
}
function CustomTable({ isAdmin }: TableProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const { filterDams, isLoadingDams } = useDams();

  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(ROWSPERPAGE);
  const [isOpenUpdate, setOpenUpdate] = useState<boolean>(false);

  const rows = useMemo(() => {
    return filterDams?.map((dam: any, index: any) =>
      createData(
        index + 1,
        dam?.damName + ", " + dam.damRiver?.riverName,
        dam?.damCurrentStatus.damStatusName === "OPEN" ? t("Mở") : t("Đóng"),
        t("Chưa có"),
        googleMapLink(dam?.damLatitude, dam?.damLongitude)
      )
    );
  }, [filterDams]);

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy))?.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(Number(event.target.value));
  };

  return (
    <Stack spacing={2}>
      <ContainerTable>
        {/* Tool */}
        <EnhancedTableToolbar numSelected={selected.length} />
        {/* Search and Filter */}
        {isLoadingDams ?
          <>Đang tải dữ liệu...</>
          :
          
            <>
              <SearchAndFilter />

              <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                <TableContainer >
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                      headCells={headCells}
                      isAdmin={isAdmin}
                    />
                    <TableBody>
                      {visibleRows?.length === 0 ?
                        // Nếu không có dữ liệu hoặc gặp lỗi
                        <StyledTableRow>
                          <StyledTableCell align="center" colSpan={headCells?.length + 1}>
                            <Nodata/>
                          </StyledTableCell>
                        </StyledTableRow>
                        :
                        // Nếu có dữ liệu
                        visibleRows?.map((row, index) => {
                          const isItemSelected = isSelected(Number(row.id));
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <StyledTableRow
                              hover
                              // onClick={(event) => handleClick(event, row.id)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isItemSelected}
                              sx={{ cursor: "pointer" }}
                            >
                              {isAdmin ?
                                <StyledTableCell padding="checkbox">
                                  <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ "aria-labelledby": labelId }}
                                    style={{
                                      color: theme.palette.grey[400],
                                    }}
                                  />
                                </StyledTableCell>
                                :
                                <StyledTableCell padding="normal">
                                  {index + 1 + ((page - 1) * rowsPerPage)}
                                </StyledTableCell>
                              }
                              <StyledTableCell
                                component="th"
                                id={labelId}
                                scope="row"
                              >
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {row.status}
                              </StyledTableCell>
                              <StyledTableCell align="left">{row.date}</StyledTableCell>
                              <StyledTableCell align="left">
                                {row?.position ? (
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={row?.position}
                                    style={{ color: theme.palette.primary.main }}
                                  >
                                    <Typography variant="body2" sx={{ color: theme.palette.primary.main, }}>{t("Xem vị trí")}</Typography>
                                  </a>
                                ) : null}
                              </StyledTableCell>

                              {isAdmin &&
                                <StyledTableCell align="center">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <IconPencil
                                      onClick={() => setOpenUpdate(true)}
                                      size={20}
                                      stroke={1.5}
                                    />
                                    <IconTrash size={20} stroke={1.5} />
                                  </Box>
                                </StyledTableCell>
                              }
                            </StyledTableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Panigation */}
                {rows?.length > rowsPerPage &&
                  <Box
                    sx={{
                      py: 2,
                      display: "flex",
                      justifyContent: { xs: "center", sm: "space-between" },
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        py: 2,
                        display: { xs: "none", sm: "flex" },
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 1,

                      }}
                    >
                      <FormControl sx={{ minWidth: 64 }}>
                        <Select
                          value={rowsPerPage.toString()}
                          size="small"
                          onChange={handleChangeRowsPerPage}
                          input={<CustomInput size="small" />}
                        >
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                        </Select>
                      </FormControl>
                      <Typography variant="body2">{t("Số dòng")}</Typography>
                    </Box>
                    <Pagination
                      count={Number((rows?.length / rowsPerPage).toFixed(0))}
                      page={page}
                      onChange={handleChange}
                      variant="outlined"
                      renderItem={(item) => (
                        <PaginationItem
                          components={{
                            last: (props) => (
                              <IconChevronsRight {...props} stroke={1.5} />
                            ),
                            next: (props) => (
                              <IconChevronRight {...props} stroke={1.5} />
                            ),
                            first: (props) => (
                              <IconChevronsLeft {...props} stroke={1.5} />
                            ),
                            previous: (props) => (
                              <IconChevronLeft {...props} stroke={1.5} />
                            ),
                          }}
                          {...item}
                        />
                      )}
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                }


              </Box>
            </>
        }


      </ContainerTable>
    </Stack>
  );
}
export default CustomTable;
