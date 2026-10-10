import axiosInstance from "../../api/axiosInstance"


export const getAdminTrainingEvents = async () => {
    const response = await axiosInstance.get("/admin/training-events")
    return response.data
}

export const getAdminTrainingEventById = async (id) => {
    const response = await axiosInstance.get(`/admin/training-events/${id}`)
    return response.data
}

export const createAdminTrainingEvent = async (data) => {
    const response = await axiosInstance.post("/admin/training-events",data)
    return response.data
}

export const updateAdminTrainingEvent = async (id,data) => {
    const response = await axiosInstance.patch(`/admin/training-events/${id}`,data)
    return response.data
}

export const deleteAdminTrainingEvent = async (id) => {
    const response = await axiosInstance.delete(`/admin/training-events/${id}`)
    return response.data
}

