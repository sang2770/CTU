import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Box, FormHelperText, Grid, Typography } from '@mui/material';
import { Formik } from 'formik';

import { MuiEffectButton } from '../../../components/button';
import FormikCustomInput from '../../../components/input/FormikCustomInput';
import { useEffect } from 'react';


const FormStation = ({ ...others }) => {
    const theme = useTheme()
    const { t } = useTranslation()



    const onSubmit = async (values: any, { setErrors, setStatus, setSubmitting, resetForm }: any) => {
        try {
            console.log(values);


            /* Hiển thị thông báo */
            // if (rs?.success) toast.success(rs.message)       
        } catch (err: any) {
            if (err) {
                setStatus({ success: false });
                setErrors({ submit: err });
                setSubmitting(false);
                toast.error(err);
            }
        }
    };



    return (
        <Formik
            initialValues={{
                description: "",
                historicalStations: [],
                multiDataStreamDTOs: [],
                name: "",
                node: "",
                taskingCapabilities: []
            }}
            validationSchema={Yup.object().shape({
                description: Yup.string(),
                name: Yup.string().max(255).required(t('Tên trạm không được trống')),
                node: Yup.string().max(255),

            })}
            onSubmit={onSubmit}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others} style={{ width: '100%' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='body1' pb={1}>Tên trạm</Typography>
                            <FormikCustomInput
                                name="name"
                                type="text"
                                value={values.name}
                                onChange={(e) => setFieldValue("name", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.name}
                                errors={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='body1' pb={1}>Mô tả</Typography>
                            <FormikCustomInput
                                multiline
                                minRows={6}
                                name="description"
                                type="text"
                                value={values.description}
                                onChange={(e) => setFieldValue("description", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.description}
                                errors={errors.description}
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
            )}
        </Formik >
    )
}
export default FormStation