import axiosInstance from "../../api/axiosInstance"

/* =========================================================
   DEPARTMENTS
========================================================= */

export const getAdminDepartments = async () => {
    const response = await axiosInstance.get("/admin/departments")

    return response.data
}

export const getAdminDepartmentById = async (id) => {
    const response = await axiosInstance.get(
        `/admin/departments/${id}`
    )

    return response.data
}

export const updateAdminDepartment = async ({ id, data }) => {
    const response = await axiosInstance.patch(
        `/admin/departments/${id}`,
        data
    )

    return response.data
}

/* =========================================================
   BENEFICIARIES
========================================================= */

export const addBeneficiary = async ({ id, beneficiary }) => {
    const response = await axiosInstance.post(
        `/admin/departments/${id}/beneficiaries`,
        { beneficiary }
    )

    return response.data
}

export const updateBeneficiary = async ({
    id,
    beneficiaryId,
    beneficiary,
}) => {
    const response = await axiosInstance.patch(
        `/admin/departments/${id}/beneficiaries/${beneficiaryId}`,
        { beneficiary }
    )

    return response.data
}

export const deleteBeneficiary = async ({
    id,
    beneficiaryId,
}) => {
    const response = await axiosInstance.delete(
        `/admin/departments/${id}/beneficiaries/${beneficiaryId}`
    )

    return response.data
}

/* =========================================================
   SERVICES
========================================================= */

export const addService = async ({ id, service }) => {
    const response = await axiosInstance.post(
        `/admin/departments/${id}/services`,
        { service }
    )

    return response.data
}

export const updateService = async ({
    id,
    serviceId,
    service,
}) => {
    const response = await axiosInstance.patch(
        `/admin/departments/${id}/services/${serviceId}`,
        { service }
    )

    return response.data
}

export const deleteService = async ({
    id,
    serviceId,
}) => {
    const response = await axiosInstance.delete(
        `/admin/departments/${id}/services/${serviceId}`
    )

    return response.data
}

/* =========================================================
   PROCESS
========================================================= */

export const addProcessStep = async ({ id, step }) => {
    const response = await axiosInstance.post(
        `/admin/departments/${id}/process`,
        { step }
    )

    return response.data
}

export const updateProcessStep = async ({
    id,
    processId,
    step,
}) => {
    const response = await axiosInstance.patch(
        `/admin/departments/${id}/process/${processId}`,
        { step }
    )

    return response.data
}

export const deleteProcessStep = async ({
    id,
    processId,
}) => {
    const response = await axiosInstance.delete(
        `/admin/departments/${id}/process/${processId}`
    )

    return response.data
}

/* =========================================================
   FAQs
========================================================= */

export const addFaq = async ({
    id,
    question,
    answer,
}) => {
    const response = await axiosInstance.post(
        `/admin/departments/${id}/faqs`,
        {
            question,
            answer,
        }
    )

    return response.data
}

export const updateFaq = async ({
    id,
    faqId,
    question,
    answer,
}) => {
    const response = await axiosInstance.patch(
        `/admin/departments/${id}/faqs/${faqId}`,
        {
            question,
            answer,
        }
    )

    return response.data
}

export const deleteFaq = async ({
    id,
    faqId,
}) => {
    const response = await axiosInstance.delete(
        `/admin/departments/${id}/faqs/${faqId}`
    )

    return response.data
}

/* =========================================================
   DOWNLOADS
========================================================= */

export const addDownload = async ({
    id,
    title,
    url,
}) => {
    const response = await axiosInstance.post(
        `/admin/departments/${id}/downloads`,
        {
            title,
            url,
        }
    )

    return response.data
}

export const updateDownload = async ({
    id,
    downloadId,
    title,
    url,
}) => {
    const response = await axiosInstance.patch(
        `/admin/departments/${id}/downloads/${downloadId}`,
        {
            title,
            url,
        }
    )

    return response.data
}

export const deleteDownload = async ({
    id,
    downloadId,
}) => {
    const response = await axiosInstance.delete(
        `/admin/departments/${id}/downloads/${downloadId}`
    )

    return response.data
}

/* =========================================================
   SUCCESS STORIES
========================================================= */

export const addSuccessStory = async ({
    id,
    title,
    description,
}) => {
    const response = await axiosInstance.post(
        `/admin/departments/${id}/success-stories`,
        {
            title,
            description,
        }
    )

    return response.data
}

export const updateSuccessStory = async ({
    id,
    storyId,
    title,
    description,
}) => {
    const response = await axiosInstance.patch(
        `/admin/departments/${id}/success-stories/${storyId}`,
        {
            title,
            description,
        }
    )

    return response.data
}

export const deleteSuccessStory = async ({
    id,
    storyId,
}) => {
    const response = await axiosInstance.delete(
        `/admin/departments/${id}/success-stories/${storyId}`
    )

    return response.data
}

/* =========================================================
   RELATED SCHEMES
========================================================= */

export const addRelatedScheme = async ({
    id,
    scheme,
}) => {
    const response = await axiosInstance.post(
        `/admin/departments/${id}/related-schemes`,
        {
            scheme,
        }
    )

    return response.data
}

export const updateRelatedScheme = async ({
    id,
    schemeId,
    scheme,
}) => {
    const response = await axiosInstance.patch(
        `/admin/departments/${id}/related-schemes/${schemeId}`,
        {
            scheme,
        }
    )

    return response.data
}

export const deleteRelatedScheme = async ({
    id,
    schemeId,
}) => {
    const response = await axiosInstance.delete(
        `/admin/departments/${id}/related-schemes/${schemeId}`
    )

    return response.data
}

/* =========================================================
   RELATED TRAINING
========================================================= */

export const addRelatedTraining = async ({
    id,
    training,
}) => {
    const response = await axiosInstance.post(
        `/admin/departments/${id}/related-training`,
        {
            training,
        }
    )

    return response.data
}

export const updateRelatedTraining = async ({
    id,
    trainingId,
    training,
}) => {
    const response = await axiosInstance.patch(
        `/admin/departments/${id}/related-training/${trainingId}`,
        {
            training,
        }
    )

    return response.data
}

export const deleteRelatedTraining = async ({
    id,
    trainingId,
}) => {
    const response = await axiosInstance.delete(
        `/admin/departments/${id}/related-training/${trainingId}`
    )

    return response.data
}