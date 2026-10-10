import axiosInstance from "../../api/axiosInstance.js"


export const getAdminNews = async () => {
    const response = await axiosInstance.get("/admin/news")
    return response.data
}

export const getAdminNewsById = async (id) => {
    const response = await axiosInstance.get(`/admin/news/${id}`)
    return response.data
}

export const createAdminNews = async (data) => {
    const response = await axiosInstance.post("/admin/news", data)
    return response.data
}

export const updateAdminNews = async (id, data) => {
    const response = await axiosInstance.patch(
        `/admin/news/${id}`,
        data
    )
    return response.data
}

export const deleteAdminNews = async (id) => {
    const response = await axiosInstance.delete(`/admin/news/${id}`)
    return response.data
}