import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import useThings from "../../../hooks/useThings";
import {
    Container,
    Grid,
    Button,
    Typography,
    Box,
    Modal,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Backdrop,
    Fade
} from "@mui/material";




const PondPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [ponds, setPonds] = useState<any[]>([]);
    const [pondData, setPondData] = useState({
        name: "",
        shape: "rectangle",
        length: "",
        width: "",
        depth: "",
        radius: "",
        area: 0,
        bottomType: "",
        location: "",
        image: null
    });

    const handleOpen = () => {
        setOpen(true);
        resetPondData(); // Thay đổi này sẽ được bỏ qua
    };

    const handleClose = () => {
        setOpen(false);
        // Không reset dữ liệu khi đóng modal
    };

    const resetPondData = () => {
        // Chỉ gọi khi cần reset dữ liệu khi thêm mới
        setPondData({
            name: "",
            shape: "rectangle",
            length: "",
            width: "",
            depth: "",
            radius: "",
            area: 0,
            bottomType: "",
            location: "",
            image: null
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Chỉ cập nhật giá trị nếu nó là số dương hoặc trống
        if (name === "length" || name === "width" || name === "depth" || name === "radius") {
            const numValue = Number(value);
            if (numValue >= 0 || value === "") {
                setPondData({ ...pondData, [name]: value });
            }
        } else {
            setPondData({ ...pondData, [name]: value });
        }
    };

    const handleShapeChange = (e: SelectChangeEvent<string>) => {
        setPondData({ ...pondData, shape: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setPondData({ ...pondData, image: file });
    };

    const calculateArea = () => {
        if (pondData.shape === "rectangle") {
            const length = Number(pondData.length);
            const width = Number(pondData.width);
            return length * width;
        } else if (pondData.shape === "circle") {
            const radius = Number(pondData.radius);
            return Math.PI * Math.pow(radius, 2);
        }
        return 0;
    };

    const handleSubmit = () => {
        const calculatedArea = calculateArea();
        const formData = {
            ...pondData,
            area: calculatedArea,
            image: pondData.image ? URL.createObjectURL(pondData.image) : null
        };

        setPonds([...ponds, formData]);
        handleClose(); // Đóng modal sau khi thêm
        resetPondData(); // Có thể gọi reset nếu bạn muốn xóa dữ liệu sau khi thêm mới
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

    return (
        <Container>
            <Box display="flex" justifyContent="flex-end" mb={3}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    ➕ Thêm ao/ruộng
                </Button>
            </Box>

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
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Modal for Add Pond */}
            <Modal
                open={open}
                onClose={handleClose} // Đóng modal nhưng không reset dữ liệu
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            overflowY: 'auto',
                            maxHeight: '80vh'
                        }}
                    >
                        <Typography variant="h6" mb={2}>
                            Thêm Ao/Ruộng
                        </Typography>

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
                                value={pondData.shape}
                                onChange={handleShapeChange}
                                name="shape"
                            >
                                <MenuItem value="rectangle">Hình chữ nhật</MenuItem>
                                <MenuItem value="circle">Hình tròn</MenuItem>
                            </Select>
                        </FormControl>

                        {pondData.shape === "rectangle" && (
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
                                <TextField
                                    label="Chiều sâu (m)"
                                    fullWidth
                                    margin="normal"
                                    name="depth"
                                    type="number"
                                    value={pondData.depth || ""}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        {pondData.shape === "circle" && (
                            <>
                                <TextField
                                    label="Bán kính (m)"
                                    fullWidth
                                    margin="normal"
                                    name="radius"
                                    type="number"
                                    value={pondData.radius || ""}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Chiều sâu (m)"
                                    fullWidth
                                    margin="normal"
                                    name="depth"
                                    type="number"
                                    value={pondData.depth || ""}
                                    onChange={handleChange}
                                />
                            </>
                        )}

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
                            id="image-upload"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="image-upload">
                            <Button variant="outlined" component="span" fullWidth sx={{ mt: 2 }}>
                                Tải lên ảnh
                            </Button>
                        </label>

                        {pondData.image && (
                            <Box mt={1} display="flex" flexDirection="column" alignItems="center">
                                <img
                                    src={URL.createObjectURL(pondData.image)}
                                    alt="Uploaded"
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <Typography variant="caption" color="textSecondary">
                                    {pondData.image.name}
                                </Typography>
                            </Box>
                        )}

                        <Box display="flex" justifyContent="flex-end" mt={3}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Thêm Ao
                            </Button>
                            <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}>
                                Hủy
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Container>
    );
};

export default PondPage;
