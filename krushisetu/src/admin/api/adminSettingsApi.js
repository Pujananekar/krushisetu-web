import axiosInstance from "../../api/axiosInstance.js";

export const getSettings = async () => {
    const response = await axiosInstance.get(
        "/admin/settings"
    );

    return response.data;
};

export const updateSettings = async (settings) => {
    const response = await axiosInstance.patch(
        "/admin/settings",
        settings
    );

    return response.data;
};