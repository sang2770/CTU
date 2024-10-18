import { Grid } from "@mui/material";
import MapSection from "./SectionMap";
import StationSection from "./SectionStation";
import IBreadcrumsCustom from "../../../components/breadcrums";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
    const { t } = useTranslation()
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <IBreadcrumsCustom isBreadcumbs breadcumbs={[t("Trang chủ")]} link={["/dashboard",]} />
            </Grid>
            <Grid item xs={12}>
                <MapSection />
            </Grid>
            <Grid item xs={12}>
                <StationSection />
            </Grid>
        </Grid>
    );
}

export default HomePage;