import axiosInstance from "./axiosInstance"

export const getDepartments = async () => {
    const response = await axiosInstance.get("/departments");

    return response.data
}

export const getDepartmentBySlug = async (slug) => {
    const response = await axiosInstance.get(`/departments/${slug}`)

    return response.data
}