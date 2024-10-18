import {
  OutlinedInput,
  styled,
  useTheme,
} from "@mui/material";


const InputRoot = styled(OutlinedInput)(({ theme}) => ({
  width: '100%',
  color: theme.palette.grey[400],
  '& .MuiOutlinedInput-notchedOutline': {
    border:`2px solid ${theme.palette.grey[300]}`,
    color: `${theme.palette.grey[400]} !important`
  },

  '&:hover $notchedOutline': {
    borderColor: theme.palette.primary.light,
  },
  '&.MuiInputBase-multiline': {
    padding: 1,
  }
}))
const CustomInput = ({ ...props }) => {
  const theme = useTheme()
  return <InputRoot notched={false} theme={theme} {...props} />
}
export default CustomInput
