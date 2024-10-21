import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormHelperText, Grid } from '@mui/material';
import { Formik } from 'formik';
import { IconLock, IconUser } from '@tabler/icons-react';
import * as CryptoJS from 'crypto-js'

import { CsFlexBetween } from '../../../components/flex';
import { MuiEffectButton } from '../../../components/button';
import useAuth from '../../../hooks/useAuth';
import useScriptRef from '../../../hooks/useScriptRef';
import FormikCustomInputBlur from '../../../components/input/FormikCustomInputBlur';

const FormLogin = ({ ...others }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const { login } = useAuth()
    const scriptedRef = useScriptRef()
    const timeCountdown = localStorage.getItem('timeCountdown')

    // useState
    const [loginCount, setLoginCount] = useState(0);
    const [isCountdown, setCountdown] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    const secretKey: string = process.env.TOKEN_AUTH || 'oda_dev'

    // useEffect
    useEffect(() => {
        setTimeLeft(Number(timeCountdown))
        if (Number(timeCountdown) !== 0) setCountdown(true)
    }, [timeCountdown]);

    useEffect(() => {
        if (timeLeft === 0) {
            localStorage.setItem('timeCountdown', '0');
            setLoginCount(0)
            setCountdown(false)
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prevTime => timeLeft - 1);
            localStorage.setItem('timeCountdown', timeLeft.toString());
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const onSubmit = async (values: any, { setErrors, setStatus, setSubmitting, resetForm }: any) => {
        try {
            const loginRequest = {
                username: values.username,
                password: CryptoJS.AES.encrypt(values.password || '', secretKey).toString()
            }
            const rs = await login(loginRequest);

            /* Hiển thị thông báo */
            if (rs?.success) toast.success(rs.message)
            else toast.error(rs.message)

            if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
            }
        } catch (err: any) {
            const errMessage = err
            if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: errMessage });
                setSubmitting(false);
            }
        }
    };

    const handleLogin = () => {
        setLoginCount(prevCount => prevCount + 1);
        if (loginCount === 3) {
            localStorage.setItem('timeCountdown', '30');
            setCountdown(true)
        }
    };

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
                submit: null
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().max(255).required(t('Tài khoản không trống')),
                password: Yup.string().max(255).required(t('Mật khẩu không trống')),
            })}
            onSubmit={onSubmit}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others} style={{ width: '100%' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <FormikCustomInputBlur
                                name="username"
                                type="text"
                                label={t("Username")}
                                value={values.username}
                                onChange={(e) => setFieldValue("username", e.target.value)}

                                onBlur={handleBlur}
                                touched={touched.username}
                                errors={errors.username}
                                startAdornment={
                                    <div style={{ width: "40px", paddingRight: "12px", borderRight: `2px solid ${theme.palette.grey[300]}` }}>
                                        <IconUser color={theme.palette.text.secondary} />
                                    </div>
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormikCustomInputBlur
                                name="password"
                                label={"Password"}
                                value={values.password}
                                onChange={(e) => setFieldValue("password", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.password}
                                errors={errors.password}
                                startAdornment={
                                    <div style={{ width: "40px", paddingRight: "12px", borderRight: `2px solid ${theme.palette.grey[300]}` }}>
                                        <IconLock color={theme.palette.text.secondary} />
                                    </div>
                                }
                            />
                        </Grid>
                    </Grid>

                    {isCountdown &&
                        <>
                            <FormHelperText error>{t(`Bạn đã nhập sai quá nhiều lần`)} </FormHelperText>
                            <FormHelperText error>{t(`Hãy thử lại sau ${timeLeft} giây`)} </FormHelperText>
                        </>
                    }

                    <Box sx={{ mt: 3 }}>
                        {!isCountdown ?
                            <CsFlexBetween>
                                <MuiEffectButton
                                    variant="contained"
                                    sx={{ backgroundColor: theme.palette.primary.main, boxShadow: 0, textTransform: "uppercase", p: "12px" }}
                                    size="large"
                                    onClick={handleLogin}
                                    disabled={isSubmitting}
                                    type="submit"
                                    fullWidth
                                >
                                    {t("Đăng nhập")}
                                </MuiEffectButton>
                            </CsFlexBetween>
                            :
                            <Button sx={{ backgroundColor: theme.palette.primary.main }} onClick={handleLogin} disabled fullWidth size="large" type="submit" variant="contained">
                                {timeLeft}
                            </Button>
                        }
                    </Box>
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit.toString()}</FormHelperText>
                        </Box>
                    )}
                </form>
            )}
        </Formik >
    )
}
export default FormLogin