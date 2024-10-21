import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    Box,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    Grid,
    InputAdornment,
    FormHelperText
} from "@mui/material";

const FarmPage = () => {
    const [form, setForm] = useState({
        id: "",
        farmName: "",
        representative: "",
        province: "",
        district: "",
        ward: "",
        phone: "",
        email: "",
        regionCode: "",
        annualCrops: "",
        productionType: "", // Thêm trường loại hình sản xuất
        area: "" // Thêm trường diện tích
    });

    const [cities, setCities] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
                setCities(response.data);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };

        fetchLocationData();
    }, []);

    useEffect(() => {
        if (form.province) {
            const selectedCity = cities.find(city => city.Id === form.province);
            setDistricts(selectedCity ? selectedCity.Districts : []);
            setWards([]);
        }
    }, [form.province, cities]);

    useEffect(() => {
        if (form.district) {
            const selectedCity = cities.find(city => city.Id === form.province);
            const selectedDistrict = selectedCity ? selectedCity.Districts.find(district => district.Id === form.district) : null;
            setWards(selectedDistrict ? selectedDistrict.Wards : []);
        }
    }, [form.district, form.province, cities]);

    const validateForm = () => {
        const newErrors: any = {};
        if (!form.id) newErrors.id = "ID là bắt buộc.";
        if (!form.farmName) newErrors.farmName = "Tên trang trại là bắt buộc.";
        if (!form.representative) newErrors.representative = "Người đại diện là bắt buộc.";
        if (!form.phone) newErrors.phone = "Điện thoại là bắt buộc.";
        else if (form.phone.length !== 10) newErrors.phone = "Số điện thoại phải có 10 chữ số.";
        if (!form.email) newErrors.email = "Email là bắt buộc.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email không hợp lệ.";
        if (!form.province) newErrors.province = "Tỉnh/Thành phố là bắt buộc.";
        if (!form.district) newErrors.district = "Quận/Huyện là bắt buộc.";
        if (!form.ward) newErrors.ward = "Xã/Phường là bắt buộc.";
        if (!form.regionCode) newErrors.regionCode = "Mã vùng trồng là bắt buộc.";
        if (!form.productionType) newErrors.productionType = "Loại hình sản xuất là bắt buộc.";
        if (!form.area) newErrors.area = "Diện tích là bắt buộc.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(form);
            // Thực hiện gửi form
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Container maxWidth="md">
            <Box display="flex" justifyContent="center" mb={4}>
                <Typography variant="h2" component="h1">
                    Quản lý Trang Trại
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.id}>
                            <TextField
                                label="ID"
                                name="id"
                                value={form.id}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                            />
                            {errors.id && <FormHelperText>{errors.id}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.farmName}>
                            <TextField
                                label="Tên Trang Trại"
                                name="farmName"
                                value={form.farmName}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                            />
                            {errors.farmName && <FormHelperText>{errors.farmName}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.representative}>
                            <TextField
                                label="Người Đại Diện"
                                name="representative"
                                value={form.representative}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                            />
                            {errors.representative && <FormHelperText>{errors.representative}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.phone}>
                            <TextField
                                label="Điện Thoại"
                                name="phone"
                                value={form.phone}
                                onChange={handleInputChange}
                                required
                                type="tel"
                                variant="outlined"
                            />
                            {errors.phone && <FormHelperText>{errors.phone}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.email}>
                            <TextField
                                label="Email"
                                name="email"
                                value={form.email}
                                onChange={handleInputChange}
                                required
                                type="email"
                                variant="outlined"
                            />
                            {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.regionCode}>
                            <TextField
                                label="Mã Vùng Trồng"
                                name="regionCode"
                                value={form.regionCode}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                            />
                            {errors.regionCode && <FormHelperText>{errors.regionCode}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.productionType}>
                            <TextField
                                label="Loại Hình Sản Xuất"
                                name="productionType"
                                value={form.productionType}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                            />
                            {errors.productionType && <FormHelperText>{errors.productionType}</FormHelperText>}
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.productionType}>
                            <InputLabel>Loại Hình Sản Xuất</InputLabel>
                            <Select
                                label="Loại Hình Sản Xuất"
                                name="productionType"
                                value={form.productionType}
                                onChange={handleSelectChange}
                                required
                                variant="outlined"
                            >
                                <MenuItem value="Chọn sau">Chọn sau</MenuItem>
                                <MenuItem value="Trồng Lúa">Trồng Lúa</MenuItem>
                                <MenuItem value="Nuôi thủy sản">Nuôi thủy sản</MenuItem>
                                <MenuItem value="Trồng lúa và Nuôi thủy sản">Trồng lúa và Nuôi thủy sản</MenuItem>
                            </Select>
                            {errors.productionType && <FormHelperText>{errors.productionType}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                label="Số Vụ Canh Tác Trong Năm"
                                name="annualCrops"
                                value={form.annualCrops}
                                onChange={handleInputChange}
                                required
                                type="number"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    {/* Thêm loại hình sản xuất và diện tích */}

                    {/* <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.area}>
                            <TextField
                                label="Diện Tích"
                                name="area"
                                value={form.area}
                                onChange={handleInputChange}
                                required
                                type="number"
                                variant="outlined"
                            />
                            {errors.area && <FormHelperText>{errors.area}</FormHelperText>}
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={!!errors.area}>
                            <TextField
                                label="Diện Tích"
                                name="area"
                                value={form.area}
                                onChange={handleInputChange}
                                required
                                type="number"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                                    inputProps: { min: 0 }, // Ngăn người dùng nhập giá trị âm, không có tăng giảm
                                }}
                            />
                            {errors.area && <FormHelperText>{errors.area}</FormHelperText>}
                        </FormControl>
                    </Grid>


                    {/* Đặt các trường địa chỉ trên một dòng */}
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth error={!!errors.province}>
                                    <InputLabel>Tỉnh/Thành Phố</InputLabel>
                                    <Select
                                        name="province"
                                        value={form.province}
                                        onChange={handleSelectChange}
                                        required
                                        variant="outlined"
                                    >
                                        <MenuItem value="">Chọn Tỉnh/Thành Phố</MenuItem>
                                        {cities.map(city => (
                                            <MenuItem key={city.Id} value={city.Id}>
                                                {city.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.province && <FormHelperText>{errors.province}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth error={!!errors.district}>
                                    <InputLabel>Quận/Huyện</InputLabel>
                                    <Select
                                        name="district"
                                        value={form.district}
                                        onChange={handleSelectChange}
                                        required
                                        variant="outlined"
                                    >
                                        <MenuItem value="">Chọn Quận/Huyện</MenuItem>
                                        {districts.map(district => (
                                            <MenuItem key={district.Id} value={district.Id}>
                                                {district.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.district && <FormHelperText>{errors.district}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth error={!!errors.ward}>
                                    <InputLabel>Xã/Phường</InputLabel>
                                    <Select
                                        name="ward"
                                        value={form.ward}
                                        onChange={handleSelectChange}
                                        required
                                        variant="outlined"
                                    >
                                        <MenuItem value="">Chọn Xã/Phường</MenuItem>
                                        {wards.map(ward => (
                                            <MenuItem key={ward.Id} value={ward.Id}>
                                                {ward.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.ward && <FormHelperText>{errors.ward}</FormHelperText>}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box mt={4} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" type="submit">
                        Lưu Thông Tin
                    </Button>
                    <Button variant="contained" color="primary" href="/farm/pond">
                        Quản Lý Ao Nuôi
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default FarmPage;
