import axiosInstance from "./axiosInstance"


export const getPublicSiteSettings = async () => {
    const response = await axiosInstance.get("/site-settings")
    return response.data
}
