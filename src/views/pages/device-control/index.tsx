import { toast } from "react-toastify";
import { Button, CircularProgress, Container, Grid, Typography, useTheme, TextField } from "@mui/material"; // Thêm Snackbar vào import
import { ChangeEvent, useEffect, useState } from "react";

import useMQTTSubscribe from "../../../hooks/useMQTTSubscribe";
import useDevice from "../../../hooks/useDevice";
import { CsFlexAlwaysBetween, CsFlexAlwayStart } from "../../../components/flex";
import { CsPaperCenter } from "../../../components/paper";

function FarmPage() {
    const theme = useTheme();

    const {
        dataFromBE,
        fetchData,
        changeStatus,
        changeStatusAuto,
        isLoadingStatus,
        isLoadingStatusAuto,
        updateConfiguration,
        showSettings,
        toggleSettings, 
    } = useDevice();

    const [configurationValue, setConfigurationValue] = useState({
        min: "0",
        middle: "0",
        max: "0"
    });

    const { message } = useMQTTSubscribe();
    useEffect(() => {
        setConfigurationValue({
            min: dataFromBE?.find(item => item.id === 1)?.autoConfig?.min,
            middle: dataFromBE?.find(item => item.id === 1)?.autoConfig?.middle,
            max: dataFromBE?.find(item => item.id === 1)?.autoConfig?.max
        });
    }, [dataFromBE]);

    useEffect(() => {
        fetchData();
    }, [message]);

    const handleClickToggle = (id: number) => {
        const currentStatus = dataFromBE?.find(dt => dt?.id === id)?.configuration?.status;
        changeStatus(id, currentStatus === "on" ? "off" : "on");
    };

    const handleClickAuto = (ids: number[], status: number) => {
        changeStatusAuto(ids, status);
    };


    const handleSaveSettings = async () => {
        updateConfiguration([1, 2], configurationValue);
        toast.success("Lưu cài đặt thành công")
        toggleSettings(); // Đặt lại trạng thái để trở về màn hình chính
    };

    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (value === '' || /^[0-9]*$/.test(value)) {
            setConfigurationValue((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <Container maxWidth="xs">
            <CsPaperCenter sx={{ p: 2 }}>
                {showSettings ? (
                    <CsPaperCenter sx={{ mt: 2, p: 2, borderRadius: "8px", border: `1px solid ${theme.palette.primary.main}` }}>
                        <Typography variant="h6">Cài đặt thông số</Typography>
                        <TextField
                            name="min"
                            label="Mực nước tối thiểu"
                            type="number"
                            placeholder={configurationValue?.min}
                            value={configurationValue?.min}
                            onChange={handleChangeValue}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            inputProps={{ min: 0 }}
                        />
                        <TextField
                            name="middle"
                            label="Mực nước trung bình"
                            type="number"
                            placeholder={configurationValue?.middle}
                            value={configurationValue?.middle}
                            onChange={handleChangeValue}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="max"
                            label="Mực nước tối đa:"
                            type="number"
                            placeholder={configurationValue?.max}
                            value={configurationValue?.max}
                            onChange={handleChangeValue}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveSettings}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Lưu cài đặt
                        </Button>
                    </CsPaperCenter>
                ) : (
                    <>
                        <CsPaperCenter sx={{ p: 2, backgroundColor: theme.palette.primary.dark }}>
                            <Typography pb={1} variant="h5" textTransform={"uppercase"} color={theme.palette.text.secondary}>Cài đặt thông số bể nuôi</Typography>
                            <CsFlexAlwayStart>
                                <Typography variant="body1" color={theme.palette.text.secondary}>Mực nước:</Typography>
                            </CsFlexAlwayStart>
                            <CsFlexAlwayStart>
                                <Typography variant="body1" color={theme.palette.text.secondary}>
                                    Van vào: {dataFromBE?.find(item => item.id === 1)?.configuration?.status}
                                </Typography>
                            </CsFlexAlwayStart>
                            <CsFlexAlwayStart>
                                <Typography variant="body1" color={theme.palette.text.secondary}>
                                    Van ra: {dataFromBE?.find(item => item.id === 2)?.configuration?.status}
                                </Typography>
                            </CsFlexAlwayStart>
                            <CsFlexAlwayStart>
                                <Typography variant="body1" color={theme.palette.text.secondary}>
                                    Tự động: {dataFromBE?.find(item => item.id === 1)?.automation === 1 ? "ON" : "OFF"}
                                </Typography>
                            </CsFlexAlwayStart>
                        </CsPaperCenter>

                        <CsFlexAlwaysBetween gap={2} py={1}>
                            <Button
                                startIcon={isLoadingStatus && <CircularProgress sx={{ color: theme.palette.text.secondary }} size={"24px"} />}
                                sx={{
                                    backgroundColor:
                                        (message?.configuration?.status === "on" && message?.id === 1) ||
                                            dataFromBE?.find(item => item.id === 1)?.configuration?.status === "on"
                                            ? "green"
                                            : "red"
                                }}
                                size="large"
                                fullWidth
                                variant="contained"
                                onClick={() => handleClickToggle(1)}
                            >
                                Van vào
                            </Button>
                            <Button
                                startIcon={isLoadingStatus && <CircularProgress sx={{ color: theme.palette.text.secondary }} size={"24px"} />}
                                sx={{
                                    backgroundColor:
                                        (message?.configuration?.status === "on" && message?.id === 2) ||
                                            dataFromBE?.find(item => item.id === 2)?.configuration?.status === "on"
                                            ? "green"
                                            : "red"
                                }}
                                size="large"
                                fullWidth
                                variant="contained"
                                onClick={() => handleClickToggle(2)}
                            >
                                Van ra
                            </Button>
                        </CsFlexAlwaysBetween>

                        <CsFlexAlwaysBetween gap={2} py={1}>
                            <Button
                                startIcon={isLoadingStatusAuto && <CircularProgress sx={{ color: theme.palette.text.secondary }} size={"24px"} />}
                                sx={{
                                    backgroundColor:
                                        dataFromBE?.find(item => item.id === 1)?.automation === 1 ? "green" : "red"
                                }}
                                size="large"
                                fullWidth
                                variant="contained"
                                onClick={() => handleClickAuto([1, 2], dataFromBE?.find(item => item.id === 1)?.automation)}
                            >
                                Tự động
                            </Button>
                            <Button size="large" fullWidth variant="contained" onClick={toggleSettings}>
                                Cài đặt
                            </Button>
                        </CsFlexAlwaysBetween>

                        {/* cac nut dieu huong */}
                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: "-10px", marginLeft: "100px" }}>
                            {/* Nút lên */}
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: theme.palette.primary.main
                                    }}
                                >
                                    ↑
                                </Button>
                            </Grid>
                            <Grid item xs={3}></Grid>
                            {/* Nút trái, OK, phải */}
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: theme.palette.primary.main
                                    }}
                                >
                                    ←
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: theme.palette.primary.main
                                    }}
                                >
                                    OK
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: theme.palette.primary.main
                                    }}
                                >
                                    →
                                </Button>
                            </Grid>

                            {/* Nút xuống */}
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: theme.palette.primary.main
                                    }}
                                >
                                    ↓
                                </Button>
                            </Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
                    </>
                )}
            </CsPaperCenter>
        </Container>
    );
}

export default FarmPage;
