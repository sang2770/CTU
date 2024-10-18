
import { Avatar, Box, Checkbox, Divider, FormControl, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack, Table, TableBody, TableContainer, Tooltip, Typography, useTheme } from "@mui/material";
import { ContainerTable, StyledTableCell, StyledTableRow } from "../../../../components/table/style";
import { convertTimeFromString } from "../../../../utils/formatTime";
import { CsFlexAlwaysBetween } from "../../../../components/flex";
import { DataStation } from "./table";
import { EnhancedTableHead } from "./TableHead";
import { EnhancedTableToolbar } from "../../../../components/table/TableToolBar";
import { getComparator, stableSort } from "../../../../utils/table";
import { HeadCell, Order } from "../station-table/table";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconPencil, IconReport, IconTrash, IconVideo } from "@tabler/icons-react";
import { ROWSPERPAGE } from "../../../../constant/customize";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../../components/input/CustomInput";
import dayjs from "dayjs";
import Nodata from "../../../../components/nodata";
import useConfig from "../../../../hooks/useConfig";
import useDomains from "../../../../hooks/old/useDomains";
import useSensors from "../../../../hooks/old/useSensors";
import useStation from "../../../../hooks/old/useStation";

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
    label: "Tên đập",
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
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Hành động",
  },

];

interface TableProps {
  isAdmin: boolean;
}
function CustomTable({ isAdmin }: TableProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { borderRadius } = useConfig()
  const navigate = useNavigate();

  const today = new Date();
  const { sensors, isLoadingSensors } = useSensors()
  const { stations, isLoadingStations } = useStation(dayjs(today).format('YYYY/MM/DD'), dayjs(today).format('YYYY/MM/DD'), 1, 1000)
  const { domains, isLoadingDomains } = useDomains()

  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof DataStation>("name");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(ROWSPERPAGE);
  const [isOpenUpdate, setOpenUpdate] = useState<boolean>(false);



  // Transform data to name and value
  const sensorNameAndValue = useMemo(() => {
    return sensors?.map((sta, index) =>
      sta?.station.dataTypes.map((dataType) => {
        const value = sta?.data[dataType?.sensorVariable]
        return { key: dataType?.name, value, unit: dataType?.unit };
      })
    )
  }, [stations, domains, sensors]);

  // Latest sensor data update time
  const sensorLatestTimes = useMemo(() => {
    let tempTimes = []

    sensors?.map((sta, index) => {
      tempTimes.push(sta?.data.dateTime)
    })
    return tempTimes

  }, []);

  const rows = useMemo(() => {
    return stations?.map((station, index) => {
      return createData(
        index + 1,
        station?._id,
        station?.name,
        "",
        "",
        sensorNameAndValue[index],
        sensorLatestTimes[index]// Nếu có trường dateTime
      );
    });
  }, [stations, domains, sensors]);

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

  const handleClick = (e: any, value: any) => {
    console.log(value);
  }

  return (
    <Stack spacing={2}>
      <ContainerTable>
        {/* Tool */}
        <EnhancedTableToolbar numSelected={selected.length} />
        {/* Search and Filter */}
        {isLoadingSensors || isLoadingStations || isLoadingDomains ?
          <>Đang tải dữ liệu...</>
          :
          <>
            {/* <SearchAndFilter /> */}
            {/* Table */}
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
              <TableContainer>
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
                            onClick={(event) => handleClick(event, row.id)}
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
                              <Typography variant="subtitle2">{row?.name}</Typography>
                              <Typography fontWeight={"inherit"} variant="body2">{row?.address}</Typography>

                            </StyledTableCell>


                            <StyledTableCell align="left" padding="none">
                              {row?.sensors?.map((item) =>

                                <>
                                  <CsFlexAlwaysBetween>
                                    <Typography fontWeight={"inherit"} px={2} py={1}>{item.key}</Typography>

                                    <Typography fontWeight={600} px={2} py={1}>{item.value || "-"}</Typography>
                                  </CsFlexAlwaysBetween>
                                  {row?.sensors.length > 1 && <Divider />}
                                </>

                              )}
                            </StyledTableCell>



                            <StyledTableCell align="left">{convertTimeFromString(row.date)}</StyledTableCell>

                            <StyledTableCell align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  gap: 1,
                                }}
                              >
                                {isAdmin && <IconPencil onClick={() => setOpenUpdate(true)} size={20} stroke={1.5} />}
                                {isAdmin && <IconTrash size={20} stroke={1.5} />}
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

                                <Tooltip title="Chi tiết">
                                  <Avatar
                                    onClick={() => navigate(`/station/${row.code}`)}
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
                                    <IconReport />
                                  </Avatar>
                                </Tooltip>
                              </Box>
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
     
    </Stack>
  );
}
export default CustomTable;
