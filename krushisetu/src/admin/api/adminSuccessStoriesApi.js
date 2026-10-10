import axiosInstance from "../../api/axiosInstance.js"


export const getAdminSuccessStories = async () => {
    const response = await axiosInstance.get(
        "/admin/success-stories"
    )

    return response.data
}

export const getAdminSuccessStoryById = async (id) => {
    const response = await axiosInstance.get(
        `/admin/success-stories/${id}`
    )

    return response.data
}

export const createAdminSuccessStory = async (data) => {
    const response = await axiosInstance.post(
        "/admin/success-stories",
        data
    )

    return response.data
}

export const updateAdminSuccessStory = async (id, data) => {
    const response = await axiosInstance.patch(
        `/admin/success-stories/${id}`,
        data
    )

    return response.data
}

export const deleteAdminSuccessStory = async (id) => {
    const response = await axiosInstance.delete(
        `/admin/success-stories/${id}`
    )

    return response.data
}