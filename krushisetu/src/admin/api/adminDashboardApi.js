import axiosInstance from "../../api/axiosInstance.js";

export const getDashboard = async () => {
    const response = await axiosInstance.get("/admin/dashboard")

    return response.data
}