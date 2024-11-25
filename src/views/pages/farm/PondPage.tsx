import React, { useEffect, useState } from "react";
import axios from 'axios';
import { SelectChangeEvent } from "@mui/material";
import { thingApi } from "../../../services/global-axios";
import {
    Container,
    Grid,
    Button,
    Typography,
    Box,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import { useParams } from "react-router-dom";
import useThingsByFarmId from "../../../hooks/useThingsByFarmId";

const PondPage: React.FC = () => {
    const { farmId } = useParams();
    const { things, isLoading, fetchData } = useThingsByFarmId(farmId);
    const [open, setOpen] = useState(false);
    const [ponds, setPonds] = useState<any[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [pondData, setPondData] = useState({
        name: "",
        shape: "",
        length: "",
        width: "",
        depth: "",
        radius: "",
        area: 0,
        volume: 0,
        bottomType: "",
        location: "",
        image: null
    });


    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState<number>(null);

    const handleOpen = (index: number | null = null) => {
        setOpen(true);

        if (index !== null && index >= 0 && index < things.length) {
            const pondData = {
                name: things[index].nameThing,
                shape: things[index].geoParameters?.shape,
                length: "",
                width: "",
                depth: things[index].geoParameters?.depth.split("m")[0],
                radius: things[index].geoParameters?.radius.split("m")[0],
                area: 0,
                volume: 0,
                bottomType: things[index].geoParameters?.pondBottomType,
                location: things[index].geoParameters.coordinates,
                image: things[index].imageUrl
            }
            setPondData(pondData);
            setEditIndex(index);
        } else {
            resetPondData();
            setEditIndex(null);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetPondData = () => {
        setPondData({
            name: "",
            shape: "rectangle",
            length: "",
            width: "",
            depth: "",
            radius: "",
            area: 0,
            volume: 0,
            bottomType: "",
            location: "",
            image: null,

        });
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newPondData = { ...pondData };

        if (name === "length" || name === "width" || name === "depth" || name === "radius") {
            const numValue = Number(value);
            if (numValue >= 0 || value === "") {
                newPondData[name] = value;
            }
        } else {
            newPondData[name] = value;
        }

        // Tính lại diện tích và thể tích mỗi khi có sự thay đổi trong các thông số
        newPondData.area = calculateArea(newPondData);
        newPondData.volume = calculateVolume(newPondData);

        // Cập nhật lại state
        setPondData(newPondData);
    };


    const handleShapeChange = (e: SelectChangeEvent<string>) => {
        const shape = e.target.value;
        setPondData({ ...pondData, shape });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setPondData({ ...pondData, image: URL.createObjectURL(file) });
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setPondData({ ...pondData, location: `Lat: ${latitude}, Lng: ${longitude}` });
            }, (error) => {
                console.error("Error obtaining location:", error);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const openDeleteConfirmation = (index: number) => {
        setDeleteIndex(index); // Lưu lại index của trang trại được yêu cầu xóa
        setOpenDeleteDialog(true); // Mở dialog
    };

    const closeDeleteConfirmation = () => {
        setOpenDeleteDialog(false); // Đóng dialog
        setDeleteIndex(null); // Xóa index đang lưu
    };
    const confirmDeletePond = async () => {
        if (deleteIndex !== null) { // Kiểm tra nếu có chỉ mục hợp lệ
            try {
                const deleteId = things[deleteIndex].thingId; // Lấy ID của trang trại
                await axios.delete(`http://103.221.220.183:8026/things/${deleteId}`);
                console.log("Xóa ao nuôi  thành công!");
                fetchData(); // Làm mới dữ liệu
                closeDeleteConfirmation(); // Đóng dialog sau khi xóa
            } catch (error) {
                console.error("Lỗi khi xóa ao nuôi.", error);
            }
        }
    };

    //Thêm ao mới và Chỉnh sửa thông tin ao đã có
    const savePond = async () => {
        try {
            const data = {
                geoParameters: {
                    pondBottomType: pondData.bottomType,
                    depth: pondData.depth,
                    shape: pondData.shape,
                    coordinates: pondData.location,
                    radius: pondData.radius,
                },
                imageUrl: pondData.image,
                thingName: pondData.name,
                agriAreaId: farmId,
            };

            if (editIndex !== null) {
                const thingId = things[editIndex].thingId;
                await thingApi.patch(`http://103.221.220.183:8026/things/${thingId}`, data);
                console.log("Cập nhật ao nuôi thành công");
            } else {
                await thingApi.post(`http://103.221.220.183:8026/things/`, data);
                console.log("Thêm ao nuôi mới thành công!");
            }

            fetchData();
            handleClose();
        } catch (error) {
            console.error("Lỗi khi lưu thông tin ao nuôi!", error);
        }
    };

    //tinh dien tich
    const calculateArea = (pond_area) => {
        if (!pond_area || !pond_area.geoParameters) {
            return 0; // Trả về giá trị mặc định nếu dữ liệu không hợp lệ
        }

        if (pond_area.geoParameters.shape === "circle") {
            const radius = parseFloat(pond_area.geoParameters.radius);
            if (isNaN(radius) || radius <= 0) {
                return 0; // Trả về giá trị mặc định nếu `radius` không hợp lệ
            }
            const area = Math.PI * Math.pow(radius, 2); // A = πr^2
            return parseFloat(area.toFixed(2));
        }

        if (pond_area.geoParameters.shape === "rectangle") {
            const length = parseFloat(pond_area.geoParameters.length);
            const width = parseFloat(pond_area.geoParameters.width);
            if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
                return 0; // Trả về giá trị mặc định nếu `length` hoặc `width` không hợp lệ
            }
            const area = length * width; // A = l*w
            return parseFloat(area.toFixed(2));
        }

        return 0; // Trả về giá trị mặc định nếu hình dạng không hợp lệ
    };

    //tinh the tich
    const calculateVolume = (pond_area) => {
        if (!pond_area || !pond_area.geoParameters) {
            return 0; // Trả về giá trị mặc định nếu dữ liệu không hợp lệ
        }

        const depth = parseFloat(pond_area.geoParameters.depth);
        if (isNaN(depth) || depth <= 0) {
            return 0; // Trả về giá trị mặc định nếu `depth` không hợp lệ
        }

        if (pond_area.geoParameters.shape === "circle") {
            const radius = parseFloat(pond_area.geoParameters.radius);
            if (isNaN(radius) || radius <= 0) {
                return 0; // Trả về giá trị mặc định nếu `radius` không hợp lệ
            }
            const volume = Math.PI * Math.pow(radius, 2) * depth; // V = πr^2h
            return parseFloat(volume.toFixed(2));
        }

        if (pond_area.geoParameters.shape === "rectangle") {
            const length = parseFloat(pond_area.geoParameters.length);
            const width = parseFloat(pond_area.geoParameters.width);
            if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
                return 0; // Trả về giá trị mặc định nếu `length` hoặc `width` không hợp lệ
            }
            const volume = length * width * depth; // V = l*w*h
            return parseFloat(volume.toFixed(2));
        }

        return 0; // Trả về giá trị mặc định nếu hình dạng không hợp lệ
    };


    useEffect(() => {
        const setAuthApiHeader = (apiInstance) => {
            apiInstance.interceptors.request.use((config) => {
                const accessToken = JSON.parse(localStorage.getItem('_authenticatedUser'))?.accessToken;
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => {
                return Promise.reject(error);
            });
        };
        setAuthApiHeader(thingApi)
    }, [])

    return (
        <Container>
            <Box display="flex" justifyContent="flex-end" mb={3}>
                <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                    ➕ Thêm ao nuôi
                </Button>
            </Box>

            {/* Hien thi cac Pond */}
            <Grid container spacing={3}>
                {things.map((pond, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                            sx={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        ></Box>

                        {pond.nameThing && (
                            <>
                                <img
                                    src={pond.imageUrl}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                />

                                <Typography variant="body2">Tên ao: {pond.nameThing}</Typography>
                                <Typography variant="body2">Diện tích ao nuôi: {calculateArea(pond)} m²</Typography>
                                <Typography variant="body2">Thể tích ao: {calculateVolume(pond)}m³</Typography>
                                <Typography variant="body2">Hình dạng ao: {pond.geoParameters.shape}</Typography>
                            </>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleOpen(index)}
                                sx={{ mr: 1 }}
                            >
                                Chỉnh sửa
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => openDeleteConfirmation(index)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'red',
                                        color: 'white',
                                    }
                                }}
                            >
                                Xóa
                            </Button>
                        </Box>

                    </Grid>
                ))}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>{editIndex !== null ? "Chỉnh sửa Ao/Ruộng" : "Thêm ao nuôi"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Tên Ao"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={pondData.name}
                            onChange={handleChange}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Chọn hình dạng</InputLabel>
                            <Select
                                name="shape"
                                value={pondData.shape}
                                onChange={handleShapeChange}
                            >
                                <MenuItem value="rectangle">Hình chữ nhật</MenuItem>
                                <MenuItem value="circle">Hình tròn</MenuItem>
                            </Select>
                        </FormControl>

                        {pondData.shape === "rectangle" ? (
                            <>
                                <TextField
                                    label="Chiều dài (m)"
                                    fullWidth
                                    margin="normal"
                                    name="length"
                                    type="number"
                                    value={pondData.length || ""}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Chiều rộng (m)"
                                    fullWidth
                                    margin="normal"
                                    name="width"
                                    type="number"
                                    value={pondData.width || ""}
                                    onChange={handleChange}
                                />

                            </>
                        ) : (
                            <TextField
                                label="Bán kính (m)"
                                fullWidth
                                margin="normal"
                                name="radius"
                                type="number"
                                value={pondData.radius || ""}
                                onChange={handleChange}
                            />
                        )}

                        <TextField
                            label="Chiều sâu (m)"
                            fullWidth
                            margin="normal"
                            name="depth"
                            type="number"
                            value={pondData.depth || ""}
                            onChange={handleChange}
                        />

                        <Box marginTop={2}>
                            <Typography variant="body2">Tọa độ:</Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                name="location"
                                value={pondData.location}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <Button variant="outlined" onClick={getLocation}>
                                Lấy tọa độ
                            </Button>
                        </Box>

                        <TextField
                            label="Loại nền đáy"
                            fullWidth
                            margin="normal"
                            name="bottomType"
                            value={pondData.bottomType}
                            onChange={handleChange}
                        />

                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="outlined" component="span" sx={{ mt: 2 }}>
                                Tải ảnh lên
                            </Button>
                        </label>

                        {pondData.image && (
                            <Box mt={2} display="flex" justifyContent="center">
                                <img
                                    src={pondData.image}
                                    alt="Image preview"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </Box>
                        )}
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={handleClose} color="secondary">
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={savePond}
                        >
                            {editIndex !== null ? "Cập nhật" : "Thêm"}
                        </Button>
                    </DialogActions>

                </Dialog>

            </Grid>

            <Grid container spacing={3}>
                {ponds.map((pond, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                            sx={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            {pond.image && (
                                <img
                                    src={pond.image}
                                    alt={pond.name}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            )}
                            <Typography variant="h6" mt={1}>{pond.name}</Typography>
                            <Typography variant="body2">Diện tích: {pond.area.toFixed(2)} m²</Typography>
                            <Typography variant="body2">Thể tích: {pond.volume.toFixed(2)} m³</Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleOpen(index)}
                                    sx={{ mr: 1 }}
                                >
                                    Chỉnh sửa
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => openDeleteConfirmation(index)} // Mở dialog xác nhận
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'red',
                                            color: 'white',
                                        }
                                    }}
                                >
                                    Xóa
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {/* Xac nhan delteFarm */}
            <Dialog
                open={openDeleteDialog} // Hiển thị dựa vào trạng thái
                onClose={closeDeleteConfirmation} // Đóng dialog
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Xác nhận xóa ao nuôi</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa ao nuôi này không?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteConfirmation} color="secondary">
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={confirmDeletePond}
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

        </Container >
    );
};

export default PondPage;
