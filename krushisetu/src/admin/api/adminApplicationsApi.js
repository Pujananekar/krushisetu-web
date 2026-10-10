import axiosInstance from "../../api/axiosInstance.js"

export const getApplicatons = async () =>{
    const response = await axiosInstance.get("/admin/applications")

    return response.data
}

export const getApplicatonById = async (id) => {
    const response = await axiosInstance.get(`/admin/applications/${id}`)

    return response.data
}

export const updateApplication = async (id, data) => {
    const response = await axiosInstance.patch(`/admin/applications/${id}`,data)

    return response.data
}