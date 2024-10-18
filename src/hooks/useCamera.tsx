import { useEffect, useState } from "react";
import { createCamera, getAllCamera } from "../services/camera-services";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { CAMERAS_GET_ALL } from "../store/camera/action";

function useCamera() {
    const { cameras, filterCameras } = useAppSelector(state => state.camera)
    const dispath = useAppDispatch()

    const [isLoadingCameras, setLoadingCameras] = useState(false)

    useEffect(() => {
        const fetchDataCamera = async () => {
            try {
                setLoadingCameras(true)
                const response = await getAllCamera("CAMERA", 0, 6);
                dispath(CAMERAS_GET_ALL({ cameras: response.data }))
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingCameras(false)
            }
        };
        fetchDataCamera();
    }, []);

    const fetchDataCamera = async () => {
        try {
            setLoadingCameras(true)
            const response = await getAllCamera("CAMERA", 0, 6);
            dispath(CAMERAS_GET_ALL({ cameras: response.data }))
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingCameras(false)
        }
    };

    const addCamera = async (camera) => {
        try {
            setLoadingCameras(true)
            const response = await createCamera(camera);
            fetchDataCamera()
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingCameras(false)
        }
    };
    return {
        cameras,
        isLoadingCameras,
        addCamera
    }
}

export default useCamera;