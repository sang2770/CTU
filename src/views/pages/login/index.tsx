import { useTranslation } from "react-i18next";
import { Box, Grid, Typography, useTheme } from "@mui/material";

import { CsBoxCenter } from "../../../components/box";
import { CsPaperCenter } from "../../../components/paper";
import FormLogin from "../../ui-components/forms/FormLogin";
import FullScreenCard from "../../../components/card/FullScreenCard";
import Logo from "../../../components/logo";

function LoginPage() {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <Box sx={{ position: 'relative' }}>
            <FullScreenCard url={'images/login-background.png'} />
            <Box sx={{
                zIndex: 1,
                position: "absolute",
                right: 0,
                top: 0,
                width: "100%",
                px: { xs: 2, sm: 4, lg: 14 },
                py: { xs: 4, sm: 6, lg: 8 },
                m: 0,
                height: "100vh",

            }}>
                <Grid container spacing={3} sx={{ height: "100%" }}>
                    <Grid item xs={12} md={6} lg={7} xl={8} sx={{ height: { xs: "10%", md: "100%" } }}>
                        <Box sx={{
                            width: '100%',
                            display: "grid",
                            placeItems: "center",
                            height: "80%"
                        }}>
                            <CsBoxCenter>
                                   <Logo size="xl"/>
                                <Typography
                                    textAlign={'center'}
                                    variant="body2"
                                    sx={{
                                        fontSize: { xs: "13px", sm: "16", md: "18px", lg: "24px" },
                                        color: theme.palette.text.secondary,
                                        fontWeight: 300
                                    }}
                                >
                                    Hệ thống quan trắc do Khoa Công nghệ phần mềm, <br />Trường CNTT&TT, Đại học Cần Thơ thực hiện
                                </Typography>
                            </CsBoxCenter>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={5} xl={4} sx={{ width: "100%", height: { xs: "60%", md: "100%" } }}>
                        <Box style={{ margin: 0, padding: 0, height: "100%", width: "100%", }}>
                            <CsPaperCenter
                                sx={{
                                    px: { xs: 3, sm: 4, lg: 6 },
                                    py: { xs: 4, sm: 6 },
                                    height: "100%",
                                    width: "100%",
                                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                                    backdropFilter: "blur(40px)",
                                }}>
                                <Grid container spacing={3} >
                                    <Grid item xs={12}>
                                        <Typography variant="h2" pb={1} color={theme.palette.text.secondary} textTransform={"uppercase"}>
                                            {t("Đăng nhập")}
                                        </Typography>
                                        <Typography variant="body1" color={theme.palette.text.secondary}>
                                            {t("Chào mừng bạn trở lại ...")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormLogin />
                                    </Grid>
                                </Grid>
                            </CsPaperCenter>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default LoginPage;