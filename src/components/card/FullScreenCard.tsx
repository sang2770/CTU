import { Box } from "@mui/material";

function FullScreenCard({url}) {
    const styles = {
        backgroundImage: `url(${url})`, // Thay 'your-image-url.jpg' bằng URL hình ảnh của bạn
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1, // Đặt z-index để hình nền nằm dưới các thành phần khác
    };

    return <Box sx={styles} />;
}

export default FullScreenCard;