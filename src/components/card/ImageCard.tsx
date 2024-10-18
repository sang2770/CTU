import 'react-photo-view/dist/react-photo-view.css';
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { IconZoomIn, IconZoomOut } from "@tabler/icons-react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import useConfig from "../../hooks/useConfig";
import CircleLoading from '../loading/CircleLoading';

interface ImageCardProps {
    id: number | string,
    photo: string,
    aspectRatio: string,
    title?: string,
    description?: string,
    limitDescription?: number,
    href?: string,
    isView?: boolean,
    isEffect?: boolean
    objectFit?: "contain" | "fill",
    isBorderRadius?: boolean,
}
const ImageCard: React.FC<ImageCardProps> = ({ id, isBorderRadius, objectFit, photo, title, isView, isEffect, href, description, limitDescription, aspectRatio }) => {
    const { borderRadius } = useConfig()
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const handleImageLoaded = () => {
        setLoading(false);
    };
    const openImageViewer = useCallback((index) => {
        if (href) navigate(href)
    }, []);

    return (
        <>
            <Paper sx={{
                aspectRatio: aspectRatio,
                overflow: 'hidden',
                position: 'relative',
                cursor: "pointer",
                borderRadius: `${!isBorderRadius ? 0 : borderRadius}px`,
                transition: "transform 0.3s, box-shadow 0.3s",
                ':hover': {
                    transform: isEffect ? "scale(1.02)" : "none",
                }
            }}
            >
                {loading && <div className="placeholder">
                    <CircleLoading />
                </div>}
                <PhotoProvider
                    speed={() => 900}
                    easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
                    toolbarRender={({ onScale, scale, onClose, }) => {
                        return (
                            <Box sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center"
                            }}>

                                <IconButton><IconZoomIn onClick={() => onScale(scale + 1)} /></IconButton>
                                <IconButton><IconZoomOut onClick={() => onScale(scale - 1)} /></IconButton>
                            </Box>
                        );
                    }}
                >
                    <div>
                        {isView ?
                            <PhotoView src={photo}>
                                <img
                                    src={photo}
                                    alt="Example"
                                    onClick={() => openImageViewer(0)}
                                    onLoad={handleImageLoaded}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: objectFit,
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        borderRadius: `${!isBorderRadius ? 0 : borderRadius}px`
                                    }}
                                />
                            </PhotoView>
                            :
                            <img
                                src={photo}
                                alt="Example"
                                onClick={() => openImageViewer(0)}
                                onLoad={handleImageLoaded}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: objectFit,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    borderRadius: `${!isBorderRadius ? 0 : borderRadius}px`
                                }}
                            />
                        }
                    </div>
                </PhotoProvider>
            </Paper>
            {title && <Typography pt={2} textAlign={description ? "left" : "center"} variant="h6" fontSize={"16px !important"}>{title}</Typography>}
            {description && <Typography py={2} textAlign={"center"} variant="body2">{description?.length > limitDescription! ? description?.slice(0, limitDescription!) : description}</Typography>}
        </>
    );
}

export default ImageCard