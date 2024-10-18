import { Box, Breadcrumbs, Typography, styled, useTheme } from '@mui/material';
import { IconChevronRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface IBreadcrumsCustomProps {
    breadcumbs?: string[];
    isBreadcumbs?: boolean;
    link?: string[];
    title?: any;
}

export default function IBreadcrumsCustom({ title, breadcumbs, link, isBreadcumbs, ...props }: IBreadcrumsCustomProps) {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Container key={title} sx={{ display: "block", backgroundColor: "transparent" }}>
            {isBreadcumbs &&
                <Breadcrumbs separator={<IconChevronRight size={"18px"} color={theme.palette.text.primary} stroke={1.5} />} maxItems={3} aria-label="breadcrumb" sx={{
                    borderRadius: '12px',
                    color: theme.palette.grey[400]
                }}>

                    <Typography variant='body2'>{t("Hệ thống quan trắc")}</Typography>
                    {breadcumbs?.map((breadcumb, index) => (
                        <Link to={link?.[index]} style={{ textDecoration: "none" }}>
                            <Typography variant='body2' fontWeight={600}>{breadcumb}</Typography>
                        </Link>
                    ))}
                </Breadcrumbs>
            }
            {title &&
                <BreadcrumsHeader>
                    <Box>
                        <Typography variant="h4" sx={{ lineHeight: 1.75, pt: 1 }}>{t(title)}</Typography>
                    </Box>
                </BreadcrumsHeader>
            }
        </Container>
    );
}
const Container = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const BreadcrumsHeader = styled(Box)`
  display: flex;
`