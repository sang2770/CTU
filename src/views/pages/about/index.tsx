import { Box, Grid, Typography } from "@mui/material";
import ImageCard from "../../../components/card/ImageCard";
import { CsPaperAspectRatioCenter, CsPaperCenter, CsPaperTop } from "../../../components/paper";
import { CsBoxCenter } from "../../../components/box";
import { CsFlexStart } from "../../../components/flex";
import IBreadcrumsCustom from "../../../components/breadcrums";
import { useTranslation } from "react-i18next";

function AboutPage() {
    const { t } = useTranslation()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <IBreadcrumsCustom isBreadcumbs breadcumbs={[t("Giới thiệu")]} link={["/about",]} />
            </Grid>
            <Grid item xs={12}>
                <CsPaperCenter sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Box sx={{ width: "100%", height: "100%" }}>
                                <ImageCard objectFit="contain" id={1} photo={"images/CTU.png"} aspectRatio={"21/9"} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9}>
                            <CsBoxCenter sx={{ height: "100%" }}>
                                <Typography variant="body2" textAlign={"justify"}>
                                    Đại học Cần Thơ (ĐHCT), cơ sở đào tạo đại học và sau đại học trọng điểm của Nhà nước ở ĐBSCL, là trung tâm văn hóa - khoa học kỹ thuật của vùng. Trường đã không ngừng hoàn thiện và phát triển, từ một số ít ngành đào tạo ban đầu, Trường đã củng cố, phát triển thành một trường đa ngành đa lĩnh vực. Nhiệm vụ chính của Trường là đào tạo, nghiên cứu khoa học (NCKH), chuyển giao công nghệ phục vụ phát triển kinh tế - xã hội trong vùng. Song song với công tác đào tạo, ĐHCT đã tham gia tích cực các chương trình NCKH, ứng dụng những thành tựu khoa học kỹ thuật nhằm giải quyết các vấn đề về khoa học, công nghệ, kinh tế, văn hoá và xã hội của vùng.
                                </Typography>
                            </CsBoxCenter>
                        </Grid>
                    </Grid>
                </CsPaperCenter>
            </Grid>
            <Grid item xs={12}>
                <CsPaperCenter sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Box sx={{ width: "100%", height: "100%" }}>
                                <ImageCard objectFit="contain" id={1} photo={"images/CIT-LOGO.png"} aspectRatio={"21/9"} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9}>
                            <CsBoxCenter sx={{ height: "100%" }}>
                                <Typography variant="body2" textAlign={"justify"}>
                                Trường Công nghệ thông tin và truyền thông (CNTT-TT) vinh dự là một trong bảy khoa/trường đầu tiên ở Việt Nam, đảm trách đào tạo bậc kỹ sư từ năm 1990. Trải qua 33 năm xây dựng và phát triển, thương hiệu Trường CNTT-TT đã trở thành địa chỉ uy tín cung cấp nguồn nhân lực chất lượng cao cho thị trường lao động trong nước và ngoài nước. Trường có nhiệm vụ đào tạo bậc kỹ sư, thạc sĩ và tiến sĩ chuyên về lĩnh vực CNTT-TT và các lĩnh vực liên quan, góp phần tích cực vào sự phát triển của nền công nghiệp công nghệ thông tin Việt Nam; đồng thời thực hiện nghiên cứu khoa học và chuyển giao công nghệ tiên tiến, góp phần đẩy mạnh nghiệp công nghiệp hóa, hiện đại hóa đất nước.
                                </Typography>
                            </CsBoxCenter>
                        </Grid>
                    </Grid>
                </CsPaperCenter>
            </Grid>
        </Grid>
    );
}

export default AboutPage;