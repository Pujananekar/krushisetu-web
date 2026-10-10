import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance.js";


const getCurrentAdmin = async () => {
    const response = await axiosInstance.get(
        "/admin/me"
    );

    return response.data;
};


const useAdminPermissions = () => {

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-me"],
        queryFn: getCurrentAdmin,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });


    const admin = data?.admin || null;


    /*
     * Always keep permissions as an array.
     *
     * This prevents:
     *
     * Cannot read properties of null (reading 'map')
     */
    const permissions = Array.isArray(
        data?.permissions
    )
        ? data.permissions
        : [];


    /*
     * Convert permission objects into permission slugs.
     *
     * Example:
     *
     * {
     *     id: 1,
     *     name: "View Dashboard",
     *     slug: "dashboard.view"
     * }
     *
     * becomes:
     *
     * "dashboard.view"
     */
    const permissionSlugs = permissions
        .map((permission) => {

            if (
                typeof permission === "string"
            ) {
                return permission;
            }

            return permission?.slug;
        })
        .filter(Boolean);


    /*
     * Check one permission.
     *
     * Example:
     *
     * hasPermission("dashboard.view")
     */
    const hasPermission = (permission) => {

        if (!permission) {
            return false;
        }

        return permissionSlugs.includes(
            permission
        );
    };


    /*
     * Check whether the admin has
     * at least one of the permissions.
     *
     * Example:
     *
     * hasAnyPermission([
     *     "departments.view",
     *     "departments.create"
     * ])
     */
    const hasAnyPermission = (
        requiredPermissions = []
    ) => {

        if (
            !Array.isArray(
                requiredPermissions
            )
        ) {
            return false;
        }

        return requiredPermissions.some(
            (permission) =>
                permissionSlugs.includes(
                    permission
                )
        );
    };


    /*
     * Check whether the admin has
     * all of the permissions.
     *
     * Example:
     *
     * hasAllPermissions([
     *     "departments.view",
     *     "departments.edit"
     * ])
     */
    const hasAllPermissions = (
        requiredPermissions = []
    ) => {

        if (
            !Array.isArray(
                requiredPermissions
            )
        ) {
            return false;
        }

        return requiredPermissions.every(
            (permission) =>
                permissionSlugs.includes(
                    permission
                )
        );
    };


    return {
        admin,

        role:
            admin?.role || null,

        permissions,

        permissionSlugs,

        hasPermission,

        hasAnyPermission,

        hasAllPermissions,

        isLoading,

        isError,

        error,
    };
};


export default useAdminPermissions;