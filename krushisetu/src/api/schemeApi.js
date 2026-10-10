import axiosInstance from "./axiosInstance.js"


export const getSchemes = async() => {
    const response = await axiosInstance.get("/schemes")
    return response.data
}

export const getSchemeBySlug = async (slug) => {
    const response = await axiosInstance.get(`/schemes/${slug}`)
    return response.data
}