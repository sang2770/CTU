import React, { useState } from "react";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material";
import useFarms from "../../../hooks/useFarms";
import { farmApi } from "../../../services/global-axios";

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
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import DrawFarmComponent from "./FarmDraw";
import IconButton from "@mui/material/IconButton";

const FarmPage: React.FC = () => {
  const { farms, fetchData } = useFarms();
  console.log("Du lieu trang trại:", farms);

  const [open, setOpen] = useState(false);
  const [localFarms, setLocalFarms] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [farmData, setFarmData] = useState({
    agriAreaId: 0,
    userId: "",
    displayedId: "",
    deputy: "",
    areaName: "",
    phone: "",
    email: "",
    productionUnitCode: "",
    productionType: "",
    cropsNumberPerYear: 0,
    acreage: 0,
    locationId: "",
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Trạng thái mở/đóng dialog
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null); // Lưu chỉ mục hoặc ID của trang trại cần xóa

  const openDeleteConfirmation = (index: number) => {
    setDeleteIndex(index); // Lưu lại index của trang trại được yêu cầu xóa
    setOpenDeleteDialog(true); // Mở dialog
  };

  const closeDeleteConfirmation = () => {
    setOpenDeleteDialog(false); // Đóng dialog
    setDeleteIndex(null); // Xóa index đang lưu
  };
  const confirmDeleteFarm = async () => {
    if (deleteIndex !== null) {
      // Kiểm tra nếu có chỉ mục hợp lệ
      try {
        const deleteId = farms[deleteIndex].agriAreaId; // Lấy ID của trang trại
        await axios.delete(
          `http://103.221.220.183:8026/agri-areas/${deleteId}`
        );
        fetchData(); // Làm mới dữ liệu
        closeDeleteConfirmation(); // Đóng dialog sau khi xóa
      } catch (error) {
        console.error("Lỗi khi xóa trang trại:", error);
      }
    }
  };

  const handleOpen = (index: number | null = null) => {
    setOpen(true);

    if (index !== null && index >= 0 && index < farms.length) {
      setFarmData(farms[index]); // Điền dữ liệu trang trại vào form để chỉnh sửa
      setEditIndex(index); // Đánh dấu trạng thái chỉnh sửa
    } else {
      resetFarmsData(); // Reset form cho thêm mới
      setEditIndex(null); // Đặt trạng thái về thêm mới
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetFarmsData = () => {
    setFarmData({
      agriAreaId: 0,
      userId: "",
      displayedId: "",
      deputy: "",
      areaName: "",
      phone: "",
      email: "",
      productionUnitCode: "",
      productionType: "",
      cropsNumberPerYear: 0,
      acreage: 0,
      locationId: "",
    });
  };
  const setAuthApiHeader = (apiInstance) => {
    apiInstance.interceptors.request.use(
      (config) => {
        const accessToken = JSON.parse(
          localStorage.getItem("_authenticatedUser")
        )?.accessToken;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };
  setAuthApiHeader(farmApi);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarmData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFarmData({
            ...farmData,
            locationId: `Lat: ${latitude}, Lng: ${longitude}`,
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  //delete farm
  // const deleteFarm = async (deleteId) => {
  //     try {
  //         await axios.delete(`http://103.221.220.183:8026/agri-areas/${deleteId}`);
  //         fetchData();

  //     } catch (error) {
  //         console.error("Lỗi khi xóa ao:", error);
  //     }
  // };
  //add and edit => save farm
  const saveFarm = async () => {
    if (!validateForm()) return; // Dừng nếu form không hợp lệ

    try {
      const data = {
        userId: farmData.userId,
        displayedId: farmData.displayedId,
        deputy: farmData.deputy,
        areaName: farmData.areaName,
        phone: farmData.phone,
        email: farmData.email,
        productionUnitCode: farmData.productionUnitCode,
        productionType: farmData.productionType,
        cropsNumberPerYear: farmData.cropsNumberPerYear,
        acreage: farmData.acreage,
        locationId: farmData.locationId,
      };

      if (editIndex !== null) {
        const agriAreaId = farms[editIndex].agriAreaId;
        await farmApi.patch(
          `http://103.221.220.183:8026/agri-areas/${agriAreaId}`,
          data
        );
        console.log("Cập nhật trang trại thành công");
      } else {
        await farmApi.post(`http://103.221.220.183:8026/agri-areas/`, data);
        console.log("Thêm trang trại thành công");
      }

      fetchData();
      handleClose();
    } catch (error) {
      console.error("Lỗi khi lưu thông tin trang trại:", error);
    }
  };

  //rang buoc phone
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };
  //rang buoc dinh dang email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  //kiem tra loi truoc khi goi ham o giao dien
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    cropsNumberPerYear: "",
  });

  const validateForm = (): boolean => {
    let isValid = true;
    let newErrors = {
      phone: "",
      email: "",
      cropsNumberPerYear: "",
      acreage: "",
    };

    // Kiểm tra số điện thoại có đúng 10 chữ số không
    if (!validatePhone(farmData.phone)) {
      newErrors.phone = "Số điện thoại phải đúng 10 chữ số.";
      isValid = false;
    }

    // Kiểm tra định dạng email
    if (!validateEmail(farmData.email)) {
      newErrors.email = "Email không đúng định dạng.";
      isValid = false;
    }

    // Kiểm tra số vụ canh tác không được âm
    if (farmData.cropsNumberPerYear < 0) {
      newErrors.cropsNumberPerYear = "Số vụ canh tác không được âm.";
      isValid = false;
    }

    // Kiểm tra diện tích không được âm
    if (farmData.acreage < 0) {
      newErrors.acreage = "Diện tích không được âm.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const [fieldErrors, setFieldErrors] = useState({
    userId: "",
    displayedId: "",
    deputy: "",
    areaName: "",
    phone: "",
    email: "",
    productionUnitCode: "",
    cropsNumberPerYear: "",
    acreage: "",
    locationId: "",
  });
  const validateField = (fieldName: string, value: string | number): string => {
    switch (fieldName) {
      case "phone":
        return validatePhone(value as string)
          ? ""
          : "Số điện thoại phải đúng 10 chữ số.";
      case "email":
        return validateEmail(value as string)
          ? ""
          : "Email không đúng định dạng.";
      case "cropsNumberPerYear":
        return Number(value) >= 0 ? "" : "Số vụ canh tác không được âm.";
      case "acreage":
        return Number(value) >= 0 ? "" : "Diện tích không được âm.";
      case "userId":
      case "displayedId":
      case "deputy":
      case "areaName":
      case "productionUnitCode":
        return value ? "" : "Trường này không được để trống.";
      default:
        return "";
    }
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  //map
  const [drawModalOpen, setDrawModalOpen] = useState(false);

  // Hàm để mở đóng modal vẽ trang trại
  const handleOpenDrawModal = () => {
    console.log("Mở modal vẽ trang trại");
    setDrawModalOpen(true);
  };

  const handleCloseDrawModal = () => {
    setDrawModalOpen(false);
    resetFarmsData();
  };
  const handleDrawFarm = (index: number) => {
    if (index !== null && index >= 0 && index < farms.length) {
        setFarmData(farms[index]);
    }
    handleOpenDrawModal();
  };

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          ➕ Thêm trang trại nuôi
        </Button>
      </Box>

      {/* hien thi farm */}
      <Grid container spacing={3}>
        {farms?.map((localFarms, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></Box>

            {localFarms.areaName && (
              <>
                <Link to={`/farm/${localFarms.agriAreaId}/thing`}>
                  <img
                    src="https://www.thiennhien.net/wp-content/uploads/2022/01/1201_thuysan.jpg"
                    alt={localFarms.areaName}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Link>
                <Typography variant="body2">
                  Tên trang trại: {localFarms.areaName}
                </Typography>
                <Typography variant="body2">
                  Người đại diện quản lý: {localFarms.deputy}
                </Typography>
              </>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mt: 1,
              }}
            >
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
                  "&:hover": {
                    backgroundColor: "red",
                    color: "white",
                  },
                }}
              >
                Xóa
              </Button>
              {/* Nút Vẽ trang trại */}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleDrawFarm(index)} // Mở form vẽ trang trại
                sx={{
                  "&:hover": {
                    backgroundColor: "blue",
                    color: "white",
                  },
                }}
              >
                Vẽ trang trại
              </Button>
            </Box>
          </Grid>
        ))}
        {/* Form them trang trai moi */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editIndex !== null ? "Chỉnh sửa Trang trại" : "Thêm trang trại"}
          </DialogTitle>

          <DialogContent>
            <TextField
              label="User ID"
              fullWidth
              margin="normal"
              name="userId"
              value={farmData.userId}
              onChange={handleChange}
            />
            <TextField
              label="Mã ID hiển thị"
              fullWidth
              margin="normal"
              name="displayedId"
              value={farmData.displayedId}
              onChange={handleChange}
            />
            <TextField
              label="Người quản lý trang trại nuôi"
              fullWidth
              margin="normal"
              name="deputy"
              value={farmData.deputy}
              onChange={handleChange}
            />
            <TextField
              label="Tên khu vực của trang trại nuôi"
              fullWidth
              margin="normal"
              name="areaName"
              value={farmData.areaName}
              onChange={handleChange}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              margin="normal"
              name="phone"
              value={farmData.phone}
              onChange={handleChange}
              onBlur={handleBlur} // Thêm sự kiện này
              error={!!fieldErrors.phone} // Đánh dấu trường có lỗi
              helperText={fieldErrors.phone} // Hiển thị thông báo lỗi
            />

            <TextField
              label="Địa chỉ Email người quản lý trang trại"
              fullWidth
              margin="normal"
              name="email"
              value={farmData.email}
              onChange={handleChange}
              onBlur={handleBlur} // Thêm sự kiện này
              error={!!fieldErrors.email} // Đánh dấu trường có lỗi
              helperText={fieldErrors.email} // Hiển thị thông báo lỗi
            />
            <TextField
              label="Mã đơn vị sản xuất"
              fullWidth
              margin="normal"
              name="productionUnitCode"
              value={farmData.productionUnitCode}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Loại hình sản xuất</InputLabel>
              <Select
                name="productionType"
                value={farmData.productionType}
                onChange={(e: SelectChangeEvent) =>
                  setFarmData({ ...farmData, productionType: e.target.value })
                }
              >
                <MenuItem value="Trồng lúa">Trồng lúa</MenuItem>
                <MenuItem value="Nuôi thủy sản">Nuôi thủy sản</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Số vụ canh tác mỗi năm"
              fullWidth
              margin="normal"
              name="cropsNumberPerYear"
              type="number"
              value={farmData.cropsNumberPerYear || ""}
              onChange={handleChange}
              onBlur={handleBlur} // Thêm sự kiện này
              error={!!fieldErrors.cropsNumberPerYear}
              helperText={fieldErrors.cropsNumberPerYear}
            />

            <TextField
              label="Diện tích trang trại nuôi (m2)"
              fullWidth
              margin="normal"
              name="acreage"
              type="number"
              value={farmData.acreage || ""}
              onChange={handleChange}
              onBlur={handleBlur} // Thêm sự kiện này
              error={!!fieldErrors.acreage}
              helperText={fieldErrors.acreage}
            />
            <Box marginTop={2}>
              <Typography variant="body2">Tọa độ trang trại nuôi:</Typography>
              <TextField
                fullWidth
                margin="normal"
                name="locationId"
                value={farmData.locationId}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button variant="outlined" onClick={getLocation}>
                Lấy tọa độ
              </Button>
            </Box>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button onClick={handleClose} color="secondary">
              Hủy
            </Button>
            <Button variant="contained" color="primary" onClick={saveFarm}>
              {editIndex !== null ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Xac nhan delteFarm */}
        <Dialog
          open={openDeleteDialog} // Hiển thị dựa vào trạng thái
          onClose={closeDeleteConfirmation} // Đóng dialog
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Xác nhận xóa trang trại nuôi</DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn xóa trang trại này không?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteConfirmation} color="secondary">
              Hủy
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={confirmDeleteFarm}
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={drawModalOpen}
          onClose={handleCloseDrawModal}
          maxWidth="md"
          fullWidth
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseDrawModal}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <img src="icons/close.svg" alt="close"  style={{width: 20, height: 20}}/>
          </IconButton>
          <DialogTitle>Vẽ Trang Trại</DialogTitle>
          <DialogContent>
            <DrawFarmComponent id = {farmData?.agriAreaId} name={farmData?.areaName}/>
          </DialogContent>
        </Dialog>
      </Grid>
    </Container>
  );
};

export default FarmPage;
