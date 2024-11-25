import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { fromLonLat, toLonLat } from "ol/proj";
import { Icon, Style, Stroke, Fill, Text } from "ol/style";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Button } from "@mui/material";
import Draw from "ol/interaction/Draw";
import Polygon from "ol/geom/Polygon";
import axios from "axios";
import Alert from '@mui/material/Alert';

interface Props {
    id: string | number;
}

interface FarmPolygonInfo{
    name: string
    coordinates: any[]
}
const DrawFarmComponent: React.FC<Props> = (props: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [locationLayer, setLocationLayer] =
    useState<VectorLayer<VectorSource> | null>(null);
  const [drawInteraction, setDrawInteraction] = useState<Draw | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [farmCount, setFarmCount] = useState(1);
  const [farms, setFarms] = useState<string[]>([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {

    // Define the async function inside useEffect
    let mapObject: any = null;
    const initializeMap = async () => {
      console.log(props.id);
  
      if (!mapRef.current) return;
  
      mapObject = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([105.7859, 10.0312]),
          zoom: 12,
        }),
      });
  
      const userLocationLayer = new VectorLayer({
        source: new VectorSource(),
      });
      mapObject.addLayer(userLocationLayer);
  
      try {
        // Fetch data from the API
        let response: any = {};
        try {
          response = await axios.get(`http://localhost:8080/api/farms/${props.id}`);
        }catch (error) {
          console.error("Error fetching data:", error);
        }
        console.log(response);
        
        const storedShapes: FarmPolygonInfo[] = JSON.parse(response?.data?.coordinates ?? "[]");
        localStorage.setItem("shapes_"+props.id, JSON.stringify(storedShapes));
        const source = new VectorSource();
  
        // Add shapes to the map
        storedShapes.forEach(({ name, coordinates }) => {
          if (!coordinates) return;
          const transformedCoords = coordinates.map((coord: any) => fromLonLat(coord));
          const polygon = new Polygon([transformedCoords]);
          const feature = new Feature(polygon);
  
          feature.setStyle(getStylePolygon(name));
          source.addFeature(feature);
        });
  
        const savedShapesLayer = new VectorLayer({ source });
        mapObject.addLayer(savedShapesLayer);
  
        setMap(mapObject);
        setLocationLayer(userLocationLayer);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };
  
    initializeMap(); // Call the async function
  
    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapObject.setTarget(undefined);
      }
    };
  }, [props.id]); // Added dependency for `props.id`
  
  

  const getStylePolygon = (farmName: string) => {
    return new Style({
        stroke: new Stroke({
          color: "#ff6600",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(255, 102, 0, 0.3)",
        }),
        text: new Text({
          text: farmName,
          font: "bold 14px sans-serif",
          fill: new Fill({
            color: "#000",
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 2,
          }),
        }),
      })
    }

  const handleGetCurrentLocation = () => {
    if (!map || !locationLayer) return;

    const geolocationSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const userCoords = fromLonLat([longitude, latitude]);

      const userIconStyle = new Style({
        image: new Icon({
          src:
            "data:image/svg+xml;base64," +
            btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#00c6ff;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#0072ff;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <path d="M12 2C9.243 2 7 5 7 8c0 3.866 3 6.5 5 10 2-3.5 5-6.134 5-10 0-3-2.243-6-5-6z" fill="url(#grad1)" />
                        </svg>
                    `),
          scale: 1.0,
          anchor: [0.5, 0.5],
        }),
      });

      const userFeature = new Feature({
        geometry: new Point(userCoords),
      });
      userFeature.setStyle(userIconStyle);

      locationLayer.getSource()?.clear();
      locationLayer.getSource()?.addFeature(userFeature);

      map.getView().setCenter(userCoords);
      map.getView().setZoom(10);
    };

    const geolocationError = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", error.message);
    };

    navigator.geolocation.getCurrentPosition(
      geolocationSuccess,
      geolocationError
    );
  };

  const handleDrawFarmShape = () => {
    if (map && !isDrawing) {
      const source = new VectorSource();
      const vectorLayer = new VectorLayer({
        source,
      });
      map.addLayer(vectorLayer);

      const draw = new Draw({
        source,
        type: "Polygon",
      });

      map.addInteraction(draw);
      setDrawInteraction(draw);
      setIsDrawing(true);

      draw.on("drawend", (event) => {
        const feature = event.feature;
        const geometry = feature.getGeometry();
        const farmName = `Farm ${farmCount}`;
        // Kiểm tra xem geometry có phải là Polygon không
        if (geometry instanceof Polygon) {
          const coordinates = geometry.getCoordinates(); // Lấy tọa độ của polygon

          // Chuyển đổi tọa độ từ EPSG:3857 sang WGS84 và log
          const coordinatesInWGS84 = coordinates[0].map((coordinate: any) =>
            toLonLat(coordinate)
          );

          console.log("Tọa độ của farm đã vẽ:", coordinatesInWGS84);

          // Lưu tọa độ vào local storage
          const storedShapes = JSON.parse(
            localStorage.getItem("shapes_"+props.id) || "[]"
          );
          storedShapes.push({name : farmName, coordinates : coordinatesInWGS84});
          localStorage.setItem("shapes_"+props.id, JSON.stringify(storedShapes));

          console.log("Tọa độ của farm đã lưu:", coordinatesInWGS84);
        } else {
          console.error("Đối tượng vẽ không phải là Polygon!");
        }

        feature.set("name", farmName);

        feature.setStyle(
            getStylePolygon(farmName)
        );

        map.removeInteraction(draw);
        setIsDrawing(false);
        setFarmCount((prevCount) => prevCount + 1);
        setFarms((prevFarms) => [...prevFarms, farmName]);
      });
    } else if (map && isDrawing && drawInteraction) {
      map.removeInteraction(drawInteraction);
      setIsDrawing(false);
    }
  };

  const handleSaveMap = () => {
    if (farms.length === 0 || props.id === undefined) return;
    axios.post("http://localhost:8080/api/farms/"+props.id, {
      name: 'Chart_' + props.id,
      coordinates: localStorage.getItem("shapes_"+props.id) ?? '[]'
    }, {
      headers: {
        'Content-Type': 'application/json', // Make sure the content type is JSON
      }
    }).then(res => {
      if (!res){
        throw new Error('Save failed');
      }
      setSuccess("Save successfully");
    }).catch(res => {
      setError(res);
    }).finally(() => {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    })
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <div ref={mapRef} style={{ width: "100%", height: "90%" }} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGetCurrentLocation}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        Vị trí hiện tại
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDrawFarmShape}
        style={{
          position: "absolute",
          top: "60px",
          left: "10px",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        Vẽ Farm
      </Button>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveMap}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Lưu bản đồ
        </Button>
      </div>
      <div style={{position: "absolute", top: "0", left: "0", width: "100%" , zIndex: 1000}}>
      {!!success && <Alert severity="success">{success}</Alert>}
      {!!error && <Alert severity="error">{error.message || JSON.stringify(error)}</Alert>}
      </div>
    </div>
  );
};

export default DrawFarmComponent;
