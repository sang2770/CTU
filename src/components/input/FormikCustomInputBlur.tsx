import { FormControl, FormHelperText, OutlinedInput, styled, Typography } from "@mui/material";

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  
  backgroundColor: 'transparent',
  '& input': {
    color: theme.palette.text.secondary, // Màu sắc của text nhập vào
    backgroundColor: 'transparent', // Background trong suốt cho input
    '&::placeholder': {
      color: '#999', // Màu sắc placeholder
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.secondary, // Màu sắc viền khi không focus
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.secondary, // Màu sắc viền khi hover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.secondary, // Màu sắc viền khi focus
  },
  '&.Mui-focused input': {
    color: theme.palette.text.secondary, // Màu sắc text khi focus
  },
  // Điều chỉnh màu nền cho khi focus (nếu có)
  '&:focus-within': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền khi focus
  },
}));

export default function FormikCustomInputBlur({ ...props }) {
  return (
    <FormControl fullWidth error={Boolean(props.touched && props.errors)}>
      <CustomOutlinedInput
        inputProps={{ autoComplete: 'off' }}
        notched={false}
        type={props.type}
        value={props.value}
        name={props.name}
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