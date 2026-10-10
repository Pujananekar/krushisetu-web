import axiosInstance from "../../api/axiosInstance.js"

export const getAdminProjects = async () => {
    const response = await axiosInstance.get("/admin/projects")

    return response.data
}

export const getAdminProjectById = async (id) => {
    const response = await axiosInstance.get(`/admin/projects/${id}`)

    return response.data
}

export const createAdminProject = async (data) => {
    const response = await axiosInstance.post(
        "/admin/projects",
        data
    )

    return response.data
}

export const updateAdminProject = async (id, data) => {
    const response = await axiosInstance.patch(
        `/admin/projects/${id}`,
        data
    )

    return response.data
}

export const deleteAdminProject = async (id) => {
    const response = await axiosInstance.delete(
        `/admin/projects/${id}`
    )

    return response.data
}