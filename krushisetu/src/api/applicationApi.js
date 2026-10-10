import axiosInstance from "./axiosInstance";

export const submitFarmerApplication = async (formData) => {
    const response = await axiosInstance.post("/applications/farmer",formData)

    return response.data
}

export const submitTrainingApplication = async (formData) => {
    const response = await axiosInstance.post("/applications/training",formData)

    return response.data
}

export const submitServiceApplication = async (formData) => {
    const response = await axiosInstance.post("/applications/service",formData)

    return response.data
}

export const submitInternshipApplication = async (formData) => {
    const response = await axiosInstance.post("/applications/internship",formData)

    return response.data
}

export const submitFpoApplication = async (formData) => {
    const response = await axiosInstance.post("/applications/fpo",formData)

    return response.data
}

export const submitPartnershipApplication = async (formData) => {
    const response = await axiosInstance.post("/applications/partnership",formData)

    return response.data
}

export const submitVolunteerApplication = async (formData) => {
    const response = await axiosInstance.post("/applications/volunteer",formData)

    return response.data
}