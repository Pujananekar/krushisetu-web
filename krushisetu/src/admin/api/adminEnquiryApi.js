import axiosInstance from "../../api/axiosInstance.js"

export const getEnquiries = async () => {
    const response = await axiosInstance.get(
        "/admin/enquiries"
    )

    return response.data
}

export const getEnquiryById = async (id) => {
    const response = await axiosInstance.get(
        `/admin/enquiries/${id}`
    )

    return response.data
}

export const updateEnquiryStatus = async (
    id,
    status
) => {
    const response = await axiosInstance.patch(
        `/admin/enquiries/${id}/status`,
        {
            status,
        }
    )

    return response.data
}