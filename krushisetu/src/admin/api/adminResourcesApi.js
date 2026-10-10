import axiosInstance from "../../api/axiosInstance"

export const getAdminResources = async () => {
    const response = await axiosInstance.get("/admin/resources")
    return response.data
}

export const getAdminResourceById = async (id) => {
    const response = await axiosInstance.get(`/admin/resources/${id}`)
    return response.data
}

export const createAdminResource = async (data) => {
    const response = await axiosInstance.post("/admin/resources",data)
    return response.data
}

export const updateAdminResource = async (id,data) => {
    const response = await axiosInstance.patch(`/admin/resources/${id}`,data)
    return response.data
}

export const deleteAdminResource = async (id) => {
    const response = await axiosInstance.delete(`/admin/resources/${id}`)
    return response.data
}