import axiosInstance from "./axiosInstance.js";

export const submitContactForm = async (formData) => {
    const response = await axiosInstance.post("/contact",formData)

    return response.data
}