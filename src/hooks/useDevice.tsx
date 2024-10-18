import { useEffect, useState } from "react";
import { deviceControlApi } from "../services/global-axios";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { DEVICES_GET_ALL } from "../store/device/action";

function useDevice() {
    const { devices } = useAppSelector((state) => state.device);
    const dispatch = useAppDispatch();

    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const [isLoadingStatusAuto, setIsLoadingStatusAuto] = useState(false);
    const [message, setMessage] = useState('')

    // State để mở/đóng giao diện cài đặt min, middle, max
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await deviceControlApi.get("/", {
                    timeout: 5000
                });
                dispatch(DEVICES_GET_ALL({ devices: response?.data }));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await deviceControlApi.get("/", {
                timeout: 5000
            });
            dispatch(DEVICES_GET_ALL({ devices: response?.data }));
        } catch (error) {
            console.log(error);
        }
    };

    const changeStatus = async (id: number, status: string) => {
        try {
            setIsLoadingStatus(true);
            const response = await deviceControlApi.patch("/configure", {
                id: id,
                configuration: { status: status }
            });
            fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingStatus(false);
        }
    };

    const changeStatusAuto = async (ids: number[], status: number) => {
        try {
            setIsLoadingStatusAuto(true);
            const response = await deviceControlApi.patch("/automation", {
                automation: status == 1 ? 0 : 1,
                taskingCapabilityIds: ids
            });
            fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingStatusAuto(false);
        }
    };


    const updateConfiguration = async (ids: number[], configurationValue: any) => {
        try {
            const dataUpdate = {
                "taskingCapabilityIds": ids,
                "autoConfig": configurationValue
            }
            await deviceControlApi.patch("/automation", dataUpdate);
            setMessage("Lưu cài đặt thành công")
        } catch (error) {
            console.log("Error updating configuration", error);
            setMessage("Lỗi cập nhật cài đặt")
        }
    };

    //mở giao diện cài đặt min, middle, max
    const toggleSettings = () => {
        setShowSettings((prev) => !prev);
    };

    return {
        dataFromBE: devices,
        isLoadingStatus,
        isLoadingStatusAuto,
        showSettings,
        messageDevice:message,
        fetchData,
        changeStatus,
        changeStatusAuto,
        updateConfiguration,
        toggleSettings
    };
}

export default useDevice;