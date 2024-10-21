import { toast } from "react-toastify";
import { Button, CircularProgress, Container, Grid, Typography, useTheme, TextField, SelectChangeEvent, Select, MenuItem } from "@mui/material"; // Thêm Snackbar vào import
import { ChangeEvent, useEffect, useState } from "react";

import useMQTTSubscribe from "../../../hooks/useMQTTSubscribe";
import useDevice from "../../../hooks/useDevice";
import { CsFlexAlwaysBetween, CsFlexAlwayStart } from "../../../components/flex";
import { CsPaperCenter } from "../../../components/paper";
import useThings from "../../../hooks/useThings";
import useStation from "../../../hooks/useStation";
import useObservation from "../../../hooks/useObservation";

// import useObservation from "../../../hooks/useObservation";
// import useStation from "../../../hooks/useStation";
// import useThings from "../../../hooks/useThings";

function FarmPage() {
    const [currentPond, setCurrentPond] = useState(1);  // Mặc định là ao 1
    const theme = useTheme();
    const { dataFromBE, fetchData, changeStatus, changeStatusAuto, isLoadingStatus, isLoadingStatusAuto, updateConfiguration, showSettings, toggleSettings, messageDevice } = useDevice();

    const { station } = useStation(1)
    const { observationLatest } = useObservation(null, station)
    const waterLevel = observationLatest?.observations?.find(item => item?.dataStreamId == currentPond)?.result

    // Sử dụng một đối tượng để lưu trữ cấu hình cho từng ao
    const [configurationValue, setConfigurationValue] = useState({
        1: { min: "0", middle: "0", max: "0" },
        2: { min: "0", middle: "0", max: "0" },
        3: { min: "0", middle: "0", max: "0" },
    });

    const [isConfigurationChanged, setIsConfigurationChanged] = useState(false); // Theo dõi sự thay đổi thông số

    const { message } = useMQTTSubscribe();

    // useEffect(() => {
    //     const pondData = dataFromBE?.find(item => item.id === currentPond)?.autoConfig;
    //     setConfigurationValue(prev => ({
    //         ...prev,
    //         [currentPond]: {
    //             min: pondData?.min || "0",
    //             middle: pondData?.middle || "0",
    //             max: pondData?.max || "0"
    //         }
    //     }));
    //     setIsConfigurationChanged(false); // Reset trạng thái khi nhận được dữ liệu mới
    // }, [dataFromBE, currentPond]);
    useEffect(() => {
        // Khi `dataFromBE` hoặc `currentPond` thay đổi, cập nhật lại configurationValue cho ao hiện tại
        const pondData = dataFromBE?.find(item => item.id === getValveIds().inputValveId)?.autoConfig;
        console.log("pondData", currentPond, pondData);

        if (pondData) {
            setConfigurationValue(prev => ({
                ...prev,  // Giữ nguyên các cấu hình của các ao khác
                [currentPond]: {  // Chỉ cập nhật cấu hình cho ao hiện tại
                    min: pondData.min || "0",
                    middle: pondData.middle || "0",
                    max: pondData.max || "0"
                }
            }));
        }

        setIsConfigurationChanged(false); // Reset trạng thái thay đổi cấu hình
    }, [dataFromBE, currentPond]);  // Lắng nghe thay đổi của `dataFromBE` và `currentPond`



    useEffect(() => {
        // Fetch dữ liệu từ server khi trang load hoặc khi có thay đổi (từ MQTT)
        fetchData();
    }, [message]);  // Khi nhận được message từ MQTT, fetch lại dữ liệu


    // Xác định van vào và van ra theo ao hiện tại
    const getValveIds = () => {
        switch (currentPond) {
            case 1:
                return { inputValveId: 1, outputValveId: 2 };  // Ao 1
            case 2:
                return { inputValveId: 3, outputValveId: 4 };  // Ao 2
            case 3:
                return { inputValveId: 5, outputValveId: 6 };  // Ao 3
            default:
                return { inputValveId: 1, outputValveId: 2 };
        }
    };

    const { inputValveId, outputValveId } = getValveIds();

    const handleClickToggle = (id: number) => {
        const currentStatus = dataFromBE?.find(dt => dt?.id === id)?.configuration?.status;
        changeStatus(id, currentStatus === "on" ? "off" : "on");
    };

    const handleClickAuto = (ids: number[], status: number) => {
        changeStatusAuto(ids, status);
    };

    // const handleSaveSettings = async () => {
    //     const { min, middle, max } = configurationValue[currentPond];
    //     await updateConfiguration([inputValveId, outputValveId], { min, middle, max });
    //     toast.success("Lưu cài đặt thành công");
    //     toggleSettings();
    //     setIsConfigurationChanged(false); // Reset trạng thái khi lưu thành công
    // };
    const handleSaveSettings = async () => {
        const { min, middle, max } = configurationValue[currentPond];  // Chỉ lấy cấu hình của ao hiện tại
        await updateConfiguration([inputValveId, outputValveId], { min, middle, max });
        toast.success("Lưu cài đặt thành công");

        // Gọi lại fetchData sau khi lưu để đảm bảo dữ liệu từ server được đồng bộ
        fetchData();

        toggleSettings();
        setIsConfigurationChanged(false);  // Reset lại trạng thái khi lưu thành công
    };



    // const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;

    //     if (value === '' || /^[0-9]*$/.test(value)) {
    //         setConfigurationValue(prev => ({
    //             ...prev,
    //             [currentPond]: {
    //                 ...prev[currentPond],
    //                 [name]: value
    //             }
    //         }));

    //         // Kiểm tra xem có sự thay đổi nào không
    //         const originalConfig = dataFromBE?.find(item => item.id === currentPond)?.autoConfig;
    //         if (originalConfig) {
    //             if (
    //                 value !== originalConfig[name] // Kiểm tra từng giá trị
    //             ) {
    //                 setIsConfigurationChanged(true);
    //             } else {
    //                 setIsConfigurationChanged(false);
    //             }
    //         }
    //     }
    // };

    // Định nghĩa hàm xử lý sự kiện onChange đúng kiểu
    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (value === '' || /^[0-9]*$/.test(value)) {  // Chỉ chấp nhận số
            setConfigurationValue(prev => ({
                ...prev,  // Giữ nguyên các cấu hình của các ao khác
                [currentPond]: {  // Chỉ cập nhật ao hiện tại
                    ...prev[currentPond],
                    [name]: value
                }
            }));

            // Kiểm tra xem có sự thay đổi nào so với dữ liệu ban đầu không
            const originalConfig = dataFromBE?.find(item => item.id === currentPond)?.autoConfig;
            if (originalConfig) {
                if (value !== originalConfig[name]) {
                    setIsConfigurationChanged(true);  // Có thay đổi thì bật nút lưu
                } else {
                    setIsConfigurationChanged(false); // Không thay đổi
                }
            }
        }
    };

    const handlePondChange = (event: SelectChangeEvent<number>) => {
        setCurrentPond(Number(event.target.value));  // Chuyển đổi giá trị thành số
    };

    // Kiểm tra trạng thái auto để quyết định có cho phép bật/tắt van thủ công không
    const isAutoModeOn = dataFromBE?.find(item => item.id === inputValveId)?.automation === 1;

    // Hàm xử lý sự kiện cho nút Quay lại
    const handleBack = () => {
        toggleSettings();
    };

    return (
        <Container maxWidth="xs">
            <CsPaperCenter sx={{ p: 2 }}>

                <Select value={currentPond} onChange={handlePondChange} fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <MenuItem value={1}>Ell Pond 1 in Soc Trang</MenuItem>
                    <MenuItem value={2}>Ell Pond 2 in Soc Trang</MenuItem>
                    <MenuItem value={3}>Ell Pond 3 in Soc Trang</MenuItem>
                </Select>

                {showSettings ? (
                    <CsPaperCenter sx={{ mt: 2, p: 2, borderRadius: "8px", border: `1px solid ${theme.palette.primary.main}` }}>
                        <Typography variant="h6">Cài đặt thông số</Typography>

                        <TextField
                            name="min"
                            label="Mực nước tối thiểu"
                            type="number"
                            placeholder={configurationValue[currentPond]?.min}
                            value={configurationValue[currentPond]?.min}
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
                            placeholder={configurationValue[currentPond]?.middle}
                            value={configurationValue[currentPond]?.middle}
                            onChange={handleChangeValue}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            name="max"
                            label="Mực nước tối đa"
                            type="number"
                            placeholder={configurationValue[currentPond]?.max}
                            value={configurationValue[currentPond]?.max}
                            onChange={handleChangeValue}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        <CsFlexAlwaysBetween gap={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveSettings}
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={!isConfigurationChanged}
                            >
                                Lưu cài đặt
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleBack}
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Quay lại
                            </Button>
                        </CsFlexAlwaysBetween>
                    </CsPaperCenter>
                ) : (
                    <>
                        <CsPaperCenter sx={{ p: 2, backgroundColor: theme.palette.primary.dark }}>
                            <Typography pb={1} variant="h5" textTransform={"uppercase"} color={theme.palette.text.secondary}>
                                Cài đặt thông số bể nuôi
                            </Typography>
                            <CsFlexAlwayStart>
                                <Typography variant="body1" color={theme.palette.text.secondary}>Mực nước: {waterLevel}</Typography>
                            </CsFlexAlwayStart>
                            <CsFlexAlwayStart>
                                <Typography variant="body1" color={theme.palette.text.secondary}>
                                    Van vào: {dataFromBE?.find(item => item.id === inputValveId)?.configuration?.status?.toUpperCase()}
                                </Typography>
                            </CsFlexAlwayStart>
                            <CsFlexAlwayStart>
                                <Typography variant="body1" color={theme.palette.text.secondary}>
                                    Van ra: {dataFromBE?.find(item => item.id === outputValveId)?.configuration?.status?.toUpperCase()}
                                </Typography>
                            </CsFlexAlwayStart>
                            <CsFlexAlwayStart>
                                <Typography variant="body1" color={theme.palette.text.secondary}>
                                    Tự động: {dataFromBE?.find(item => item.id === inputValveId)?.automation === 1 ? "ON" : "OFF"}
                                </Typography>
                            </CsFlexAlwayStart>
                        </CsPaperCenter>

                        <CsFlexAlwaysBetween gap={2} py={1}>
                            <Button
                                startIcon={isLoadingStatus && <CircularProgress sx={{ color: theme.palette.text.secondary }} size={"24px"} />}
                                sx={{
                                    backgroundColor:
                                        (message?.configuration?.status === "on" && message?.id === inputValveId) ||
                                            dataFromBE?.find(item => item.id === inputValveId)?.configuration?.status === "on"
                                            ? "green"
                                            : "red"
                                }}
                                size="large"
                                fullWidth
                                variant="contained"
                                onClick={() => handleClickToggle(inputValveId)}
                                disabled={isAutoModeOn}
                            >
                                Van vào
                            </Button>
                            <Button
                                startIcon={isLoadingStatus && <CircularProgress sx={{ color: theme.palette.text.secondary }} size={"24px"} />}
                                sx={{
                                    backgroundColor:
                                        (message?.configuration?.status === "on" && message?.id === outputValveId) ||
                                            dataFromBE?.find(item => item.id === outputValveId)?.configuration?.status === "on"
                                            ? "green"
                                            : "red"
                                }}
                                size="large"
                                fullWidth
                                variant="contained"
                                onClick={() => handleClickToggle(outputValveId)}
                                disabled={isAutoModeOn}
                            >
                                Van ra
                            </Button>
                        </CsFlexAlwaysBetween>

                        <CsFlexAlwaysBetween gap={2} py={1}>
                            <Button
                                startIcon={isLoadingStatusAuto && <CircularProgress sx={{ color: theme.palette.text.secondary }} size={"24px"} />}
                                sx={{
                                    backgroundColor:
                                        dataFromBE?.find(item => item.id === inputValveId)?.automation === 1 ? "green" : "red"
                                }}
                                size="large"
                                fullWidth
                                variant="contained"
                                onClick={() => handleClickAuto([inputValveId, outputValveId], dataFromBE?.find(item => item.id === inputValveId)?.automation)}
                            >
                                Tự động
                            </Button>
                            <Button size="large" fullWidth variant="contained" onClick={toggleSettings}>
                                Cài đặt
                            </Button>
                        </CsFlexAlwaysBetween>
                    </>
                )}
            </CsPaperCenter>
        </Container>
    );
}

export default FarmPage;
