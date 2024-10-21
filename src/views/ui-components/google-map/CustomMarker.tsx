import { InfoWindow, Marker, useMarkerRef } from "@vis.gl/react-google-maps"
import React, { useEffect, useState } from "react"

const CustomMarker = ({ position, content, type, icon }) => {
  const [markerRef, marker] = useMarkerRef();
  const [isShowInfo, setIsShowInfo] = useState(false)

  useEffect(() => {
    if (!marker) {
      return;
    }
  }, [marker]);

  // Kiểm tra giá trị position trước khi render
  if (!position || typeof position?.latitude !== 'number' || typeof position?.longitude !== 'number') {
    return null; // Không render nếu position không hợp lệ
  }

  // Custom icon style 
  const defaultIcon = {
    url: icon,
    scaledSize: new google.maps.Size(50, 50),
  };

  const hoverIcon = {
    url: icon,
    scaledSize: new google.maps.Size(60, 60), // Tăng kích thước khi hover
  };
  
  return <>
    <Marker
      ref={markerRef}
      position={{ lat: position?.latitude, lng: position?.longitude }}
      onClick={() => setIsShowInfo(!isShowInfo)}
      icon={defaultIcon}
      onMouseOver={() => marker.setIcon(hoverIcon)}
      onMouseOut={() => marker.setIcon(defaultIcon)}
    />
    {
      isShowInfo && <InfoWindow
        anchor={marker}
        onClose={() => setIsShowInfo(false)}
      >
        {content}
      </InfoWindow>
    }
  </>
}

export default CustomMarker