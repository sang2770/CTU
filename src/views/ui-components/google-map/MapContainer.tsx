import { Box } from "@mui/material";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

function MapContainer({ children, bounds, zoom, mapId, onZoomChanged }) {
    // Kiểm tra các giá trị đầu vào trước khi render
    const isBoundsValid = bounds;
    const isZoomValid = typeof zoom === 'number' && zoom > 0;
    const isMapIdValid = typeof mapId === 'string' && mapId.length > 0;

    // Chỉ render Map khi tất cả giá trị đều hợp lệ
    if (!isBoundsValid || !isZoomValid || !isMapIdValid) {
        console.error("Invalid map configuration:", { bounds, zoom, mapId });
        return <Box>Map configuration is invalid. Please check the input values.</Box>;
    }

    return (
        <Box pb={2}>
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
                <Map
                    style={{ width: '100%', height: '80vh' }}
                    defaultBounds={bounds}
                    zoom={zoom}
                    mapId={mapId}
                    onZoomChanged={onZoomChanged}
                >
                    {children}
                </Map>
            </APIProvider>
        </Box>
    );
}

export default MapContainer;
