import axiosInstance from "./axiosInstance.js"

export const getTrainingEvents = async () => {
    const response = await axiosInstance.get(
        "/training-events"
    )

    return response.data
}

export const getTrainingEventBySlug = async (slug) => {
    const response = await axiosInstance.get(
        `/training-events/${slug}`
    )

    return response.data
}