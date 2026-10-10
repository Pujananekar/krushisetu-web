import axiosInstance from "../../api/axiosInstance.js"


export const getAuditLogs = async (params = {}) => {
    const response = await axiosInstance.get(
        "/admin/audit-logs",
        {
            params,
        }
    )

    return response.data
}


export const getAuditLogStats = async (params = {}) => {
    const response = await axiosInstance.get(
        "/admin/audit-logs/stats",
        {
            params,
        }
    )

    return response.data
}


export const getAuditLogById = async (id) => {
    const response = await axiosInstance.get(
        `/admin/audit-logs/${id}`
    )

    return response.data
}


export const exportAuditLogs = async (params = {}) => {
    const response = await axiosInstance.get(
        "/admin/audit-logs/export",
        {
            params,
            responseType: "blob",
        }
    )

    return response
}