import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Box, FormHelperText, Grid, Typography } from '@mui/material';
import { Formik } from 'formik';

import { MuiEffectButton } from '../../../components/button';
import FormikCustomInput from '../../../components/input/FormikCustomInput';
import { useEffect, useState } from 'react';
import { Sensor } from '../../../types/sensor';
import useSensor from '../../../hooks/useSensor';

interface FormProps {
    id?: number,
    handleOpen: (e) => void,
}

const FormSensor = ({ id,handleOpen }: FormProps) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [initialValues, setInitialValues] = useState<Sensor>()

    const { sensors, isLoadingSensor } = useSensor()

    useEffect(() => {
        setInitialValues(sensors?.find(item => item?.id == id))
    }, [id, sensors]);

    const onSubmit = async (values: any, { setErrors, setStatus, setSubmitting, resetForm }: any) => {
        try {
            /* Hiển thị thông báo */
            handleOpen(false)
            toast.success("Thành công")       
        } catch (err: any) {
            if (err) {
                setStatus({ success: false });
                setErrors({ submit: err });
                setSubmitting(false);
                toast.error(err);
            }
        }
    };

    if (isLoadingSensor) {
        return <div>Loading...</div>;
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                sensorDescription: Yup.string(),
                sensorName: Yup.string().max(255).required(t('Tên cảm biến không được trống')),
            })}
            onSubmit={onSubmit}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) =>
                <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='body1' pb={1}>Tên cảm biến</Typography>
                            <FormikCustomInput
                                name="sensorName"
                                type="text"
                                value={values?.sensorName}
                                onChange={(e) => setFieldValue("sensorName", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched?.sensorName}
                                errors={errors?.sensorName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='body1' pb={1}>Mô tả</Typography>
                            <FormikCustomInput
                                multiline
                                minRows={6}
                                name="sensorDescription"
                                type="text"
                                value={values?.sensorDescription}
                                onChange={(e) => setFieldValue("sensorDescription", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched?.sensorDescription}
                                errors={errors?.sensorDescription}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <MuiEffectButton
                                variant="contained"
                                sx={{ backgroundColor: theme.palette.primary.main, boxShadow: 0, textTransform: "uppercase", p: "12px" }}
                                size="large"
                                // onClick={handleLogin}
                                disabled={isSubmitting}
                                type="submit"
                                fullWidth
                            >
                                {t("Lưu")}
                            </MuiEffectButton>
                        </Grid>
                    </Grid>
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit.toString()}</FormHelperText>
                        </Box>
                    )}
                </form>
            }
        </Formik >
    )
}
export default FormSensor