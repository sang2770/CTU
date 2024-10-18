import { FormControl, FormHelperText, OutlinedInput, styled, Typography } from "@mui/material";
import CustomInput from "./CustomInput";

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  minWidth: "280px",
  backgroundColor: 'transparent',
  '& input': {
    fontWeight: 300,
    color: theme.palette.mode == "dark" ? theme.palette.text.primary : theme.palette.grey[600], // Màu sắc của text nhập vào
    backgroundColor: 'transparent', // Background trong suốt cho input
    '&::placeholder': {
      fontWeight: 300,
      color: theme.palette.mode == "dark" ? theme.palette.text.primary : theme.palette.grey[600], // Màu sắc placeholder
    },
  },
  '& textarea': {
    margin: "12px",
    fontWeight: 300,
    color: theme.palette.mode == "dark" ? theme.palette.text.primary : theme.palette.grey[600], // Màu sắc của text nhập vào
    backgroundColor: 'transparent', // Background trong suốt cho input
    '&::placeholder': {
      fontWeight: 300,
      color: theme.palette.mode == "dark" ? theme.palette.text.primary : theme.palette.grey[600], // Màu sắc placeholder
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[300], // Màu sắc viền khi không focus
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[300], // Màu sắc viền khi hover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[300], // Màu sắc viền khi focus
  },
  '&.Mui-focused input': {
    fontWeight: 300,
    color: theme.palette.mode == "dark" ? theme.palette.text.primary : theme.palette.grey[600], // Màu sắc text khi focus
  },
  // Điều chỉnh màu nền cho khi focus (nếu có)
  '&:focus-within': {
    backgroundColor: 'transparent', // Màu nền khi focus
  },
}));

export default function FormikCustomInput({ ...props }) {
  return (
    <FormControl fullWidth error={Boolean(props.touched && props.errors)}>
      <CustomOutlinedInput
        inputProps={{ autoComplete: 'off' }}
        notched={false}
        type={props.type}
        value={props.value} // Đảm bảo rằng giá trị được truyền đúng
        name={props.name}
        onChange={props.onChange} // Truyền onChange
        onBlur={props.onBlur} // Truyền onBlur nếu cần
        {...props}
      />
      {props.touched && props.errors && (
        <FormHelperText error>
          <Typography variant="body2" color={"red"}>
            {props.errors.toString()}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
}