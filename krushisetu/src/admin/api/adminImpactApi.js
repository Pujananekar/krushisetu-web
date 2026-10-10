import axiosInstance from "../../api/axiosInstance.js"


export const getAdminImpactIndicators = async () => {
    const response = await axiosInstance.get("/admin/impact")
    return response.data
}

export const getAdminImpactIndicatorById = async (id) => {
    const response = await axiosInstance.get(`/admin/impact/${id}`)
    return response.data
}

export const createAdminImpactIndicator = async (data) => {
    const response = await axiosInstance.post(
        "/admin/impact",
        data
    )
    return response.data
}

export const updateAdminImpactIndicator = async (id, data) => {
    const response = await axiosInstance.patch(
        `/admin/impact/${id}`,
        data
    )
    return response.data
}

export const deleteAdminImpactIndicator = async (id) => {
    const response = await axiosInstance.delete(
        `/admin/impact/${id}`
    )
    return response.data
}