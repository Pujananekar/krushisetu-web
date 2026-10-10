import axiosInstance from "../../api/axiosInstance.js"

export const getRoles = async () => {
    const response = await axiosInstance.get("/admin/roles")
    return response.data
}

export const getPermissions = async () => {
    const response = await axiosInstance.get("/admin/permissions")
    return response.data
}

export const getRolePermissions = async (role) => {
    const response = await axiosInstance.get(
        `/admin/roles/${role}/permissions`
    )
    return response.data
}

export const getRolePermissionMatrix = async (role) => {
    const response = await axiosInstance.get(
        `/admin/roles/${role}/permissions/matrix`
    )
    return response.data
}

export const updateRolePermissions = async (role, permissionIds) => {
    const response = await axiosInstance.patch(
        `/admin/roles/${role}/permissions`,
        {
            permission_ids: permissionIds,
        }
    )

    return response.data
}