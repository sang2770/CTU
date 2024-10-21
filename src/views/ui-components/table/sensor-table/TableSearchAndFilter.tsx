import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import SearchNoButtonSection from "../../../../components/search/SearchNoButton";
import useSensor from "../../../../hooks/useSensor";

export function SearchAndFilter() {
    const { searchSensorsByName } = useSensor()

    const [contentSearch, setContentSearch] = useState<string>()
    const [value, setValue] = useState(null)
    
    useEffect(() => {
        searchSensorsByName(contentSearch)
    }, [contentSearch]);
    
    return (
        <Grid container pb={2} >
            <Grid item xs={12} sm={6} md={3} lg={2}>
                <SearchNoButtonSection fullwidth contentSearch={contentSearch} handleContentSearch={setContentSearch} />
            </Grid>
            <Grid item xs={12} sm={6} md={9} lg={10}>
                <Box sx={{
                    display: "flex",
                    justifyContent: { xs: "space-between", sm: "flex-end" },
                    alignItems: "center",
                    gap: 1
                }}>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                name='date'
                                sx={{ width: '100%' }}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                slotProps={{ textField: { size: 'small' } }}
                                disableFuture={true}
                                format="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}