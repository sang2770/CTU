import { useTheme } from '@mui/material/styles';
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';


// ==============================|| SEARCH INPUT ||============================== //
interface PropSearch {
  contentSearch: string,
  fullwidth?: boolean,
  size?: "medium" | "small",
  handleContentSearch: (e: any) => void
}
const SearchNoButtonSection = ({ contentSearch, handleContentSearch, fullwidth, size }: PropSearch) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ width: "100%" }} >
        <Box display='flex' justifyContent='space-between' alignItems='center' width="100%">
          <FormControl sx={{ minWidth: fullwidth ? 0 : 380 }} size="small" fullWidth={fullwidth}>
            <OutlinedInput
              size={size}
              placeholder={t("Search")}
              value={contentSearch}
              onChange={(e) => handleContentSearch(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default SearchNoButtonSection;
