import MapContainer from "./MapContainer";
import CustomMarker from "./CustomMarker";

function GoogleMap({ mapConfig, commonMarkers, handleSetZoom }) {

    return (
        <>
            {commonMarkers && mapConfig?.bounds && mapConfig?.zoom && mapConfig?.mapId && (
                <MapContainer
                    bounds={mapConfig?.bounds}
                    zoom={mapConfig?.zoom}
                    mapId={mapConfig?.mapId}
                    onZoomChanged={handleSetZoom}
                >
                    {commonMarkers?.map((marker, index) => (


                        <CustomMarker
                            key={index}
                            position={marker?.position}
                            content={marker?.content}
                            type={marker?.type}
                            icon={marker?.icon}
                        />

                    ))}
                </MapContainer>
            )}
        </>
    );
}
export default GoogleMap;
