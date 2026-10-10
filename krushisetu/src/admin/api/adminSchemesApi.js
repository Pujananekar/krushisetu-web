import axiosInstance from "../../api/axiosInstance"

export const getAdminSchemes = async () => {
    const response = await axiosInstance.get("/admin/schemes")

    return response.data
}

export const getAdminSchemeById = async (id) => {
    const response = await axiosInstance.get(`/admin/schemes/${id}`)

    return response.data
}

export const createAdminScheme = async (data) => {
    const response = await axiosInstance.post(
        "/admin/schemes",
        data
    )

    return response.data
}

export const updateAdminScheme = async (id, data) => {
    const response = await axiosInstance.patch(
        `/admin/schemes/${id}`,
        data
    )

    return response.data
}

export const deleteAdminScheme = async (id) => {
    const response = await axiosInstance.delete(
        `/admin/schemes/${id}`
    )

    return response.data
}