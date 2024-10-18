
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Button, Checkbox, Divider, FormControl, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack, Table, TableBody, TableContainer, Tooltip, Typography, useTheme } from "@mui/material";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconEye, IconPencil, IconReport, IconTrash, IconVideo } from "@tabler/icons-react";
import { ContainerTable, StyledTableCell, StyledTableRow } from "../../../../components/table/style";
import { convertTimeFromString } from "../../../../utils/formatTime";
import { CsFlexAlwaysBetween, CsFlexAlwaysCenter } from "../../../../components/flex";
import { DataStation } from "./table";
import { EnhancedTableHead } from "./TableHead";
import { EnhancedTableToolbar } from "../../../../components/table/TableToolBar";
import { getComparator, stableSort } from "../../../../utils/table";
import { HeadCell, Order } from "../station-table/table";
import { ROWSPERPAGE } from "../../../../constant/customize";
import CustomInput from "../../../../components/input/CustomInput";
import CustomizedDialogs from "../../../../components/dialog";
import Nodata from "../../../../components/nodata";
import useConfig from "../../../../hooks/useConfig";
import useStation from "../../../../hooks/useStation";
import useThings from "../../../../hooks/useThings";
import { SearchAndFilter } from "./TableSearchAndFilter";
import FormStation from "../../forms/FormStation";
import useObservation from "../../../../hooks/useObservation";
import useSensor from "../../../../hooks/useSensor";

function createData(
  id: number,
  code: string,
  name: string,
  address: string,
  camera: string,
  sensors: any,
  date: string,
): DataStation {
  return {
    id,
    code,
    name,
    address,
    camera,
    sensors,
    date,
  };
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Tên thing",
  },

  {
    id: "sensors",
    numeric: false,
    disablePadding: false,
    label: "Cảm biến",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Thời gian",
  },
];

interface TableProps {
  isAdmin: boolean;
}
function CustomStationTable({ isAdmin }: TableProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { borderRadius } = useConfig()
  const navigate = useNavigate();

  const { observations, observationsLatest, isLoadingObservation } = useObservation()
  const { stations, isLoadingStations } = useStation()
  const { things, isLoadingThings } = useThings()
  const {sensors}=useSensor()

  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof DataStation>("id");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(ROWSPERPAGE);

  const [isOpenUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState(0)
  const [deleteId, setDeleteId] = useState(0)

  const getStationNameById = (id) => {
    return stations?.find(item => item?.id === id)?.name
  };

  const rows = useMemo(() => {
    return observationsLatest?.map((observation, index) => {
      return createData(
        index + 1,
        "",
        observation?.stationName,
        things?.find(item => item?.historicalStations?.find(stationOfThing => stationOfThing?.stationId === observation?.stationId))?.nameThing,
        "",
        observation?.observations,
        "date"// Nếu có trường dateTime
      );
    });
  }, [observationsLatest]);

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
    property: keyof DataStation
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

  const handleClick = (event: React.ChangeEvent<unknown>, value: number) => {
    if (!selected?.includes(value)) {
      setSelected([...selected, value])
    }
    else {
      setSelected(selected?.filter(item => item !== value))
    }
  };

  const handleOpenUpdateDialog = (updateId) => {
    setUpdateId(updateId);
    setOpenUpdateDialog(true)
  }

  const handleOpenDeleteDialog = (deleteId) => {
    setDeleteId(deleteId);
    setOpenDeleteDialog(true)
  }

  const handleDelete = (deleteId) => {
    console.log(deleteId);
    setOpenDeleteDialog(false)
  }

  return (
    <Stack spacing={2}>
      <ContainerTable>
        {/* Tool */}
        <EnhancedTableToolbar numSelected={selected?.length} />
        {/* Search and Filter */}
        {isLoadingStations || isLoadingObservation || isLoadingThings ?
          <>Đang tải dữ liệu...</>
          :
          <>
            <SearchAndFilter />
            {/* Table */}
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={"medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected?.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows?.length}
                    headCells={headCells}
                    isAdmin={isAdmin}
                  />
                  <TableBody>
                    {visibleRows?.length === 0 ?
                      // Nếu không có dữ liệu hoặc gặp lỗi
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={headCells?.length + 1}>
                          <Nodata />
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
                                  onClick={(event) => handleClick(event, row.id)}
                                  inputProps={{ "aria-labelledby": labelId }}
                                  style={{
                                    color: isItemSelected ? theme.palette.primary.main : theme.palette.grey[300],
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
                              <Typography variant="subtitle2">{row?.name || "-"}</Typography>
                              <Typography fontWeight={"inherit"} variant="body2">{row?.address || "-"}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left" padding="none">
                              {row?.sensors?.map((item) =>
                                <>
                                  <CsFlexAlwaysBetween>
                                    <Typography fontWeight={"inherit"} px={2} py={1}>{item?.name || "-"}</Typography>
                                    <Typography fontWeight={600} px={2} py={1}>{item?.result || "-"}</Typography>
                                  </CsFlexAlwaysBetween>
                                  {row?.sensors.length > 1 && <Divider />}
                                </>
                              )}
                            </StyledTableCell>
                            <StyledTableCell align="left" padding="none">
                              {row?.sensors?.map((item) =>
                                <>
                                  <CsFlexAlwaysBetween>
                                    <Typography fontWeight={600} px={2} py={1}>{convertTimeFromString(item?.resultTime) || "-"}</Typography>
                                  </CsFlexAlwaysBetween>
                                  {row?.sensors.length > 1 && <Divider />}
                                </>
                              )}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <CsFlexAlwaysCenter gap={1}>
                                <Tooltip title="Chi tiết">
                                  <Avatar
                                    onClick={() => { navigate(`/station/${row.id}`)}}
                                    variant="rounded"
                                    sx={{
                                      border: '1px solid',
                                      cursor: "pointer",
                                      borderRadius: `${borderRadius}px`,
                                      borderColor: theme.palette.primary.main,
                                      background: theme.palette.primary.main,
                                      color: theme.palette.primary.light,
                                      '&[aria-controls="menu-list-grow"],&:hover': {
                                        borderColor: theme.palette.primary.dark,
                                        background: theme.palette.primary.dark,
                                        color: theme.palette.primary.light
                                      }
                                    }}
                                  >
                                    <IconEye />
                                  </Avatar>
                                </Tooltip>
                                {isAdmin &&
                                  <Tooltip title="Chỉnh sửa">
                                    <Avatar
                                      onClick={() => handleOpenUpdateDialog(row?.id)}
                                      variant="rounded"
                                      sx={{
                                        border: '1px solid',
                                        cursor: "pointer",
                                        borderRadius: `${borderRadius}px`,
                                        borderColor: "green",
                                        background: "green",
                                        color: theme.palette.primary.light,
                                        '&[aria-controls="menu-list-grow"],&:hover': {
                                          borderColor: "#14A44D",
                                          background: "#14A44D",
                                          color: theme.palette.primary.light
                                        }
                                      }}
                                    >
                                      <IconPencil size={20} stroke={1.5} />
                                    </Avatar>
                                  </Tooltip>
                                }
                                {isAdmin &&
                                  <Tooltip title="Xóa">
                                    <Avatar
                                      onClick={() => handleOpenDeleteDialog(row?.id)}
                                      variant="rounded"
                                      sx={{
                                        border: '1px solid',
                                        cursor: "pointer",
                                        borderRadius: `${borderRadius}px`,
                                        borderColor: "red",
                                        background: "red",
                                        color: theme.palette.primary.light,
                                        '&[aria-controls="menu-list-grow"],&:hover': {
                                          borderColor: "#dc3545",
                                          background: "#dc3545",
                                          color: theme.palette.primary.light
                                        }
                                      }}
                                    >
                                      <IconTrash size={20} stroke={1.5} />
                                    </Avatar>
                                  </Tooltip>
                                }
                                {row.camera &&
                                  <a target="_blank" rel="noopener noreferrer" href={`http://${row?.camera}`}>
                                    <Tooltip title="Xem camera">
                                      <Avatar
                                        variant="rounded"
                                        sx={{
                                          border: '1px solid',
                                          cursor: "pointer",
                                          borderRadius: `${borderRadius}px`,
                                          borderColor: theme.palette.primary.main,
                                          background: theme.palette.primary.main,
                                          color: theme.palette.primary.light,
                                          '&[aria-controls="menu-list-grow"],&:hover': {
                                            borderColor: theme.palette.primary.dark,
                                            background: theme.palette.primary.dark,
                                            color: theme.palette.primary.light
                                          }
                                        }}
                                      >
                                        <IconVideo />
                                      </Avatar>
                                    </Tooltip>
                                  </a>
                                }
                              </CsFlexAlwaysCenter>
                            </StyledTableCell>
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
      {/* Dialog */}
      <CustomizedDialogs
      
        title={getStationNameById(updateId)}
        open={isOpenUpdateDialog}
        handleOpen={setOpenUpdateDialog}
        body={<FormStation/>}
      />
      <CustomizedDialogs
        title={getStationNameById(deleteId)}
        open={isOpenDeleteDialog}
        handleOpen={setOpenDeleteDialog}
        body={<Typography variant="body2">Bạn có chắc chắn muốn xóa trạm quan trắc này không ? </Typography>}
        actions={
          <>
            <Button variant="contained" onClick={() => handleDelete(deleteId)} sx={{ background: "red" }}>
              Xóa
            </Button>
            <Button variant="contained" onClick={() => setOpenDeleteDialog(false)} sx={{ background: "green" }}>
              Hủy
            </Button>
          </>
        }
      />
    </Stack>
  );
}
export default CustomStationTable;
