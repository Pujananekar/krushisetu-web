import axiosInstance from "../../api/axiosInstance.js";


export const getAdminGallery = async () => {
    const response = await axiosInstance.get("/admin/gallery");
    return response.data;
};

export const getAdminGalleryById = async (id) => {
    const response = await axiosInstance.get(`/admin/gallery/${id}`);
    return response.data;
};

export const createAdminGallery = async (data) => {
    const response = await axiosInstance.post("/admin/gallery", data);
    return response.data;
};

export const updateAdminGallery = async (id, data) => {
    const response = await axiosInstance.patch(
        `/admin/gallery/${id}`,
        data
    );

    return response.data;
};

export const deleteAdminGallery = async (id) => {
    const response = await axiosInstance.delete(`/admin/gallery/${id}`);
    return response.data;
};