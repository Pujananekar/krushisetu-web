import axiosInstance from "../../api/axiosInstance.js";

export const adminLogin = async (formData) => {
    const response = await axiosInstance.post("/admin/login",formData)

    return response.data
}

export const getCurrentAdmin = async () => {
    const response = await axiosInstance.get("/admin/me");
    return response.data
}

export const adminLogout = async () => {
    const response = await axiosInstance.post("/admin/logout")
    return response
}