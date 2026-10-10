import { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Info,
    KeyRound,
    Loader2,
    Lock,
    Save,
    ShieldCheck,
    Square,
    X,
} from "lucide-react"

import {
    getRolePermissionMatrix,
    updateRolePermissions,
} from "../../api/permissionsApi.js"

const roleMeta = {
    SUPER_ADMIN: {
        name: "Super Admin",
        description:
            "Full access to all administration modules, settings and system controls.",
    },

    CONTENT_ADMIN: {
        name: "Website Content Admin",
        description:
            "Manages website pages, departments, resources and public content.",
    },

    SCHEME_MANAGER: {
        name: "Scheme Manager",
        description:
            "Manages agricultural schemes, eligibility information and scheme applications.",
    },

    TRAINING_MANAGER: {
        name: "Training Manager",
        description:
            "Manages training programmes, events, registrations and certificates.",
    },

    PROGRAM_MANAGER: {
        name: "Department / Program Manager",
        description:
            "Manages assigned departments, programmes, projects and related applications.",
    },

    CRM_SUPPORT: {
        name: "CRM / Support Executive",
        description:
            "Handles enquiries, follow-ups, assignments and application communication.",
    },

    MEDIA_MANAGER: {
        name: "Media Manager",
        description:
            "Manages gallery, media assets, images, videos and related public content.",
    },

    REPORT_VIEWER: {
        name: "Report Viewer",
        description:
            "Read-only access to reports, analytics and operational information.",
    },
}

const formatModuleName = (module) => {
    if (!module) {
        return "Other"
    }

    return module
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

const formatActionName = (action) => {
    if (!action) {
        return "Permission"
    }

    return action
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

const RoleEditor = () => {
    const { role } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const decodedRole = decodeURIComponent(role || "")

    const isValidRole = Boolean(roleMeta[decodedRole])
    const isSuperAdmin = decodedRole === "SUPER_ADMIN"

    const [selectedPermissions, setSelectedPermissions] = useState([])
    const [expandedModules, setExpandedModules] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [message, setMessage] = useState(null)

    const {
        data: permissionResponse,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-role-permission-matrix", decodedRole],
        queryFn: () => getRolePermissionMatrix(decodedRole),
        enabled: isValidRole,
    })

    const permissions = permissionResponse?.data?.permissions || []

    const groupedPermissions = useMemo(() => {
        return permissions.reduce((groups, permission) => {
            const moduleName = permission.module || "other"

            if (!groups[moduleName]) {
                groups[moduleName] = []
            }

            groups[moduleName].push(permission)

            return groups
        }, {})
    }, [permissions])

    const moduleEntries = useMemo(() => {
        return Object.entries(groupedPermissions).sort(
            ([moduleA], [moduleB]) =>
                formatModuleName(moduleA).localeCompare(
                    formatModuleName(moduleB)
                )
        )
    }, [groupedPermissions])

    const totalPermissions = permissions.length
    const assignedCount = selectedPermissions.length

    const allSelected =
        totalPermissions > 0 && assignedCount === totalPermissions

    const accessPercentage =
        totalPermissions > 0
            ? Math.round((assignedCount / totalPermissions) * 100)
            : 0

    /*
     * Initialize the editor using the permissions already assigned
     * to the role from the backend.
     *
     * permission.assigned === true
     * means the checkbox starts checked.
     */
    useEffect(() => {
        if (initialized || permissions.length === 0) {
            return
        }

        const assignedIds = permissions
            .filter((permission) => permission.assigned)
            .map((permission) => Number(permission.id))

        setSelectedPermissions(assignedIds)

        const initialExpandedModules = {}

        Object.keys(groupedPermissions).forEach((moduleName) => {
            initialExpandedModules[moduleName] = true
        })

        setExpandedModules(initialExpandedModules)
        setInitialized(true)
    }, [permissions, groupedPermissions, initialized])

    /*
     * Reset local state when navigating between roles.
     */
    useEffect(() => {
        setSelectedPermissions([])
        setExpandedModules({})
        setInitialized(false)
        setMessage(null)
    }, [decodedRole])

    const updateMutation = useMutation({
        mutationFn: () =>
            updateRolePermissions(decodedRole, selectedPermissions),

        onSuccess: async () => {
            setMessage({
                type: "success",
                text: "Role permissions updated successfully.",
            })

            await queryClient.invalidateQueries({
                queryKey: ["admin-role-permission-matrix", decodedRole],
            })

            await queryClient.invalidateQueries({
                queryKey: ["admin-role-permissions", decodedRole],
            })

            await queryClient.invalidateQueries({
                queryKey: ["roles"],
            })
        },

        onError: (mutationError) => {
            setMessage({
                type: "error",
                text:
                    mutationError?.response?.data?.message ||
                    "Failed to update role permissions.",
            })
        },
    })

    const isPermissionSelected = (permissionId) => {
        return selectedPermissions.includes(Number(permissionId))
    }

    const togglePermission = (permissionId) => {
        if (isSuperAdmin || updateMutation.isPending) {
            return
        }

        const numericId = Number(permissionId)

        setSelectedPermissions((current) => {
            if (current.includes(numericId)) {
                return current.filter((id) => id !== numericId)
            }

            return [...current, numericId]
        })

        setMessage(null)
    }

    const toggleModule = (moduleName) => {
        setExpandedModules((current) => ({
            ...current,
            [moduleName]: !current[moduleName],
        }))
    }

    const getModulePermissionIds = (moduleName) => {
        return (groupedPermissions[moduleName] || []).map((permission) =>
            Number(permission.id)
        )
    }

    const isModuleFullySelected = (moduleName) => {
        const ids = getModulePermissionIds(moduleName)

        return (
            ids.length > 0 &&
            ids.every((id) => selectedPermissions.includes(id))
        )
    }

    const isModulePartiallySelected = (moduleName) => {
        const ids = getModulePermissionIds(moduleName)

        const selected = ids.filter((id) =>
            selectedPermissions.includes(id)
        ).length

        return selected > 0 && selected < ids.length
    }

    const toggleModulePermissions = (moduleName) => {
        if (isSuperAdmin || updateMutation.isPending) {
            return
        }

        const ids = getModulePermissionIds(moduleName)
        const moduleFullySelected = isModuleFullySelected(moduleName)

        setSelectedPermissions((current) => {
            if (moduleFullySelected) {
                return current.filter((id) => !ids.includes(id))
            }

            return [
                ...current,
                ...ids.filter((id) => !current.includes(id)),
            ]
        })

        setMessage(null)
    }

    const selectAll = () => {
        if (isSuperAdmin || updateMutation.isPending) {
            return
        }

        setSelectedPermissions(
            permissions.map((permission) => Number(permission.id))
        )

        setMessage(null)
    }

    const clearAll = () => {
        if (isSuperAdmin || updateMutation.isPending) {
            return
        }

        setSelectedPermissions([])
        setMessage(null)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (isSuperAdmin) {
            setMessage({
                type: "error",
                text: "SUPER_ADMIN permissions cannot be changed.",
            })

            return
        }

        updateMutation.mutate()
    }

    if (!isValidRole) {
        return (
            <div className="min-h-full bg-[#F6FAF7] p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <X size={25} />
                        </div>

                        <h1 className="mt-4 text-xl font-bold text-gray-900">
                            Role Not Found
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            The requested administrator role does not exist.
                        </p>

                        <Link
                            to="/admin/administration/roles"
                            className="kr-hover-button mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10"
                        >
                            <ArrowLeft size={17} />
                            Back to Roles
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-full bg-[#F6FAF7] p-4 sm:p-6 lg:p-8">
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-7xl space-y-6 pb-28"
            >
                {/* Header */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <Link
                                to={`/admin/administration/roles/${encodeURIComponent(
                                    decodedRole
                                )}`}
                                className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 transition-all duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                title="Back to role details"
                            >
                                <ArrowLeft size={19} />
                            </Link>

                            <div>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                                        <KeyRound size={14} />
                                        Role Permissions
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                                        <ShieldCheck size={13} />
                                        System Role
                                    </span>

                                    {isSuperAdmin && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                                            <Lock size={13} />
                                            Protected
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    {roleMeta[decodedRole].name}
                                </h1>

                                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                                    {roleMeta[decodedRole].description}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Role
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-800">
                                {decodedRole}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <Loader2
                            size={30}
                            className="mx-auto animate-spin text-green-700"
                        />

                        <p className="mt-4 text-sm font-semibold text-gray-700">
                            Loading role permissions...
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Loading the current permissions assigned to this
                            role.
                        </p>
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-red-600">
                                <X size={19} />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-red-800">
                                    Unable to load permissions
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-red-700">
                                    {error?.response?.data?.message ||
                                        error?.message ||
                                        "Something went wrong while loading the permissions for this role."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                {!isLoading && !isError && (
                    <>
                        {/* Permission Overview */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Total Permissions
                                        </p>

                                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                            {totalPermissions}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Available in the system
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-600">
                                        <ShieldCheck size={21} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Currently Assigned
                                        </p>

                                        <p className="mt-2 text-3xl font-bold tracking-tight text-green-700">
                                            {assignedCount}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Permissions assigned to this role
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <CheckCircle2 size={21} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Access Coverage
                                        </p>

                                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                                            {accessPercentage}%
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Current permission coverage
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <KeyRound size={21} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Current Permissions Notice */}
                        <div className="rounded-3xl border border-green-100 bg-green-50/70 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                    <CheckCircle2 size={19} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-900">
                                        Current permissions are shown below
                                    </h2>

                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Permissions that are already assigned
                                        to{" "}
                                        <span className="font-bold text-gray-800">
                                            {roleMeta[decodedRole].name}
                                        </span>{" "}
                                        are checked. You can select or remove
                                        permissions before saving.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Super Admin */}
                        {isSuperAdmin && (
                            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                                        <Lock size={19} />
                                    </div>

                                    <div>
                                        <h2 className="text-sm font-bold text-amber-900">
                                            SUPER_ADMIN permissions are locked
                                        </h2>

                                        <p className="mt-1 text-sm leading-6 text-amber-800">
                                            SUPER_ADMIN must retain all
                                            available permissions. Its
                                            permission assignments cannot be
                                            changed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Permission Matrix */}
                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-200 p-5 sm:p-6">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Permission Matrix
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Manage permissions for this
                                            existing administrator role.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={selectAll}
                                            disabled={
                                                isSuperAdmin ||
                                                updateMutation.isPending ||
                                                allSelected
                                            }
                                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-600 transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <Check size={16} />
                                            Select All
                                        </button>

                                        <button
                                            type="button"
                                            onClick={clearAll}
                                            disabled={
                                                isSuperAdmin ||
                                                updateMutation.isPending ||
                                                assignedCount === 0
                                            }
                                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <X size={16} />
                                            Clear All
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {permissions.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                        <KeyRound size={25} />
                                    </div>

                                    <h3 className="mt-4 text-base font-bold text-gray-900">
                                        No permissions available
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        No permissions are currently
                                        configured in the system.
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {moduleEntries.map(
                                        ([moduleName, modulePermissions]) => {
                                            const fullySelected =
                                                isModuleFullySelected(
                                                    moduleName
                                                )

                                            const partiallySelected =
                                                isModulePartiallySelected(
                                                    moduleName
                                                )

                                            const expanded =
                                                expandedModules[moduleName] !==
                                                false

                                            return (
                                                <div
                                                    key={moduleName}
                                                    className="p-4 sm:p-5"
                                                >
                                                    {/* Module Header */}
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                        <div className="flex min-w-0 items-center gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleModule(
                                                                        moduleName
                                                                    )
                                                                }
                                                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                                                                title={
                                                                    expanded
                                                                        ? "Collapse module"
                                                                        : "Expand module"
                                                                }
                                                            >
                                                                {expanded ? (
                                                                    <ChevronDown
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <ChevronRight
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                )}
                                                            </button>

                                                            <div className="min-w-0">
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <h3 className="text-sm font-bold text-gray-900">
                                                                        {formatModuleName(
                                                                            moduleName
                                                                        )}
                                                                    </h3>

                                                                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                                                                        {
                                                                            modulePermissions.length
                                                                        }{" "}
                                                                        {modulePermissions.length ===
                                                                        1
                                                                            ? "permission"
                                                                            : "permissions"}
                                                                    </span>
                                                                </div>

                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    {
                                                                        modulePermissions.filter(
                                                                            (
                                                                                permission
                                                                            ) =>
                                                                                isPermissionSelected(
                                                                                    permission.id
                                                                                )
                                                                        ).length
                                                                    }{" "}
                                                                    of{" "}
                                                                    {
                                                                        modulePermissions.length
                                                                    }{" "}
                                                                    currently
                                                                    assigned
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                toggleModulePermissions(
                                                                    moduleName
                                                                )
                                                            }
                                                            disabled={
                                                                isSuperAdmin ||
                                                                updateMutation.isPending
                                                            }
                                                            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-600 transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {fullySelected ? (
                                                                <>
                                                                    <X
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    Clear Module
                                                                </>
                                                            ) : partiallySelected ? (
                                                                <>
                                                                    <Check
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    Select
                                                                    Remaining
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Check
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    Select Module
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>

                                                    {/* Permissions */}
                                                    {expanded && (
                                                        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
                                                            {modulePermissions.map(
                                                                (
                                                                    permission
                                                                ) => {
                                                                    const selected =
                                                                        isPermissionSelected(
                                                                            permission.id
                                                                        )

                                                                    return (
                                                                        <button
                                                                            type="button"
                                                                            key={
                                                                                permission.id
                                                                            }
                                                                            onClick={() =>
                                                                                togglePermission(
                                                                                    permission.id
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                isSuperAdmin ||
                                                                                updateMutation.isPending
                                                                            }
                                                                            className={`group flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                                                                                selected
                                                                                    ? "border-green-200 bg-green-50/70"
                                                                                    : "border-gray-200 bg-white hover:border-green-200 hover:bg-gray-50"
                                                                            } ${
                                                                                isSuperAdmin
                                                                                    ? "cursor-not-allowed"
                                                                                    : ""
                                                                            }`}
                                                                        >
                                                                            <div
                                                                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                                                                    selected
                                                                                        ? "border-green-700 bg-green-700 text-white"
                                                                                        : "border-gray-300 bg-white text-transparent"
                                                                                }`}
                                                                            >
                                                                                {selected ? (
                                                                                    <Check
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                        strokeWidth={
                                                                                            3
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    <Square
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                    />
                                                                                )}
                                                                            </div>

                                                                            <div className="min-w-0 flex-1">
                                                                                <div className="flex flex-wrap items-center gap-2">
                                                                                    <p
                                                                                        className={`text-sm font-bold ${
                                                                                            selected
                                                                                                ? "text-green-800"
                                                                                                : "text-gray-800"
                                                                                        }`}
                                                                                    >
                                                                                        {
                                                                                            permission.name
                                                                                        }
                                                                                    </p>

                                                                                    <span
                                                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                                                                                            selected
                                                                                                ? "bg-green-100 text-green-700"
                                                                                                : "bg-gray-100 text-gray-500"
                                                                                        }`}
                                                                                    >
                                                                                        {formatActionName(
                                                                                            permission.action
                                                                                        )}
                                                                                    </span>
                                                                                </div>

                                                                                {permission.description && (
                                                                                    <p className="mt-1.5 text-xs leading-5 text-gray-500">
                                                                                        {
                                                                                            permission.description
                                                                                        }
                                                                                    </p>
                                                                                )}

                                                                                {permission.slug && (
                                                                                    <p className="mt-2 break-all font-mono text-[11px] text-gray-400">
                                                                                        {
                                                                                            permission.slug
                                                                                        }
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </button>
                                                                    )
                                                                }
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Information */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Info size={19} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Permission management
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        These permissions belong to the
                                        selected system role. Any administrator
                                        assigned to this role receives the
                                        permissions selected above. Changes
                                        will affect all administrators using
                                        this role.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Save Message */}
                        {message && (
                            <div
                                className={`rounded-2xl border p-4 ${
                                    message.type === "success"
                                        ? "border-green-200 bg-green-50 text-green-800"
                                        : "border-red-200 bg-red-50 text-red-800"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    {message.type === "success" ? (
                                        <CheckCircle2
                                            size={19}
                                            className="mt-0.5 shrink-0 text-green-700"
                                        />
                                    ) : (
                                        <X
                                            size={19}
                                            className="mt-0.5 shrink-0 text-red-700"
                                        />
                                    )}

                                    <p className="text-sm font-semibold">
                                        {message.text}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Sticky Bottom Actions */}
                        <div className="sticky bottom-4 z-20 rounded-3xl border border-gray-200 bg-white/95 p-4 shadow-xl shadow-gray-900/10 backdrop-blur-sm">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <Link
                                    to={`/admin/administration/roles/${encodeURIComponent(
                                        decodedRole
                                    )}`}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
                                >
                                    <ArrowLeft size={17} />
                                    Back to Role
                                </Link>

                                <button
                                    type="submit"
                                    disabled={
                                        isSuperAdmin ||
                                        updateMutation.isPending
                                    }
                                    className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {updateMutation.isPending ? (
                                        <>
                                            <Loader2
                                                size={17}
                                                className="animate-spin"
                                            />
                                            Saving...
                                        </>
                                    ) : isSuperAdmin ? (
                                        <>
                                            <Lock size={17} />
                                            Permissions Locked
                                        </>
                                    ) : (
                                        <>
                                            <Save size={17} />
                                            Save Permissions
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}

export default RoleEditor