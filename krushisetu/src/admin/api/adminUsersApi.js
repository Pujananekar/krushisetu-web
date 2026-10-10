import axiosInstance from "../../api/axiosInstance.js"

export const getAdminUsers = async () => {
    const response = await axiosInstance.get("/admin/users")
    return response.data
}

export const getAdminUserById = async (id) =>{
    const response = await axiosInstance.get(`/admin/users/${id}`)
    return response.data
}

export const createAdminUser = async(data) => {
    const response = await axiosInstance.post("/admin/users",data)
    return response.data
}

export const updateAdminUser = async(id,data) => {
    const response = await axiosInstance.patch(`/admin/users/${id}`,data)
    return response.data
}

export const toggleAdminUserStatus = async(id) => {
    const response = await axiosInstance.patch(`/admin/users/${id}/status`)
    return response.data
}

export const deleteAdminUser = async (id) => {
    const response = await axiosInstance.delete(`/admin/users/${id}`)
    return response.data
}

