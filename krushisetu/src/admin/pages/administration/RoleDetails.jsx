import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Edit3,
    KeyRound,
    Loader2,
    ShieldCheck,
    Users,
    XCircle,
} from "lucide-react"

import {
    getRolePermissionMatrix,
} from "../../api/permissionsApi.js"

import {
    getAdminUsers,
} from "../../api/adminUsersApi.js"

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

const formatRoleName = (role) => {
    if (roleMeta[role]) {
        return roleMeta[role].name
    }

    return role
        .split("_")
        .map(
            (word) =>
                word.charAt(0) + word.slice(1).toLowerCase()
        )
        .join(" ")
}

const RoleDetails = () => {
    const { role } = useParams()

    const decodedRole = decodeURIComponent(role || "")

    const {
        data: permissionResponse,
        isLoading: permissionsLoading,
        isError: permissionsError,
    } = useQuery({
        queryKey: [
            "admin-role-permission-matrix",
            decodedRole,
        ],
        queryFn: () =>
            getRolePermissionMatrix(decodedRole),
        enabled: Boolean(decodedRole),
    })

    const {
        data: usersResponse,
        isLoading: usersLoading,
        isError: usersError,
    } = useQuery({
        queryKey: ["admin-users"],
        queryFn: getAdminUsers,
    })

    const permissions =
        permissionResponse?.data?.permissions || []

    const users = usersResponse?.data || []

    const roleUsers = useMemo(() => {
        return users.filter(
            (user) => user.role === decodedRole
        )
    }, [users, decodedRole])

    const assignedPermissions = useMemo(() => {
        return permissions.filter(
            (permission) => permission.assigned
        )
    }, [permissions])

    const groupedPermissions = useMemo(() => {
        return assignedPermissions.reduce(
            (groups, permission) => {
                if (!groups[permission.module]) {
                    groups[permission.module] = []
                }

                groups[permission.module].push(
                    permission
                )

                return groups
            },
            {}
        )
    }, [assignedPermissions])

    const roleName = formatRoleName(decodedRole)

    const isSuperAdmin = decodedRole === "SUPER_ADMIN"

    const isLoading =
        permissionsLoading || usersLoading

    const isError =
        permissionsError || usersError

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F6FAF7]">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-28 rounded-3xl bg-gray-200" />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[1, 2, 3, 4].map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="h-32 rounded-3xl bg-gray-200"
                                    />
                                )
                            )}
                        </div>

                        <div className="h-[500px] rounded-3xl bg-gray-200" />
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-[#F6FAF7]">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-red-600">
                                <AlertCircle className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-red-800">
                                    Unable to load role
                                    details
                                </h2>

                                <p className="mt-1 text-sm text-red-700">
                                    Something went wrong while
                                    loading the permissions for
                                    this role.
                                </p>

                                <Link
                                    to="/admin/administration/roles"
                                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Roles
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!permissionResponse?.success) {
        return (
            <div className="min-h-screen bg-[#F6FAF7]">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                            <ShieldCheck className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Role not found
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            The requested administrator role
                            could not be found.
                        </p>

                        <Link
                            to="/admin/administration/roles"
                            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-green-700 px-4 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Roles
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                        <ShieldCheck className="h-4 w-4" />

                        Administration

                        <span className="text-gray-400">
                            /
                        </span>

                        <Link
                            to="/admin/administration/roles"
                            className="transition hover:text-green-800"
                        >
                            Roles & Permissions
                        </Link>

                        <span className="text-gray-400">
                            /
                        </span>

                        <span className="text-gray-500">
                            {roleName}
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-green-100 text-green-700">
                                <ShieldCheck className="h-7 w-7" />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                        {roleName}
                                    </h1>

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                        System Role
                                    </span>
                                </div>

                                <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-500">
                                    {roleMeta[
                                        decodedRole
                                    ]?.description ||
                                        "Administrator access role."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={Users}
                        label="Assigned Users"
                        value={roleUsers.length}
                        description="Administrators using this role"
                    />

                    <SummaryCard
                        icon={KeyRound}
                        label="Permissions"
                        value={
                            assignedPermissions.length
                        }
                        description={`Of ${permissions.length} available permissions`}
                    />

                    <SummaryCard
                        icon={ShieldCheck}
                        label="Role Type"
                        value="System"
                        description="Predefined administrator role"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Access Status"
                        value="Active"
                        description="Available for assignment"
                    />
                </div>

                {/* System Role Notice */}
                {isSuperAdmin && (
                    <div className="mb-6 rounded-3xl border border-green-100 bg-green-50/70 p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-gray-900">
                                    Full system access
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Super Admin currently has all
                                    available permissions. This role
                                    is protected from having its
                                    permissions completely removed.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Assigned Users */}
                <div className="mb-6 rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Assigned Administrators
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Administrators currently assigned
                                    to this role.
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    {roleUsers.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {roleUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-sm font-bold text-green-700">
                                            {user.name
                                                ?.charAt(0)
                                                ?.toUpperCase() ||
                                                "A"}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {user.name}
                                            </p>

                                            <p className="mt-0.5 text-xs text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                Number(
                                                    user.is_active
                                                ) === 1
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                    Number(
                                                        user.is_active
                                                    ) === 1
                                                        ? "bg-green-600"
                                                        : "bg-gray-400"
                                                }`}
                                            />

                                            {Number(
                                                user.is_active
                                            ) === 1
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                        <Link
                                            to={`/admin/administration/users/${user.id}`}
                                            className="inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-10 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                <Users className="h-5 w-5" />
                            </div>

                            <p className="mt-3 text-sm font-semibold text-gray-900">
                                No administrators assigned
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                No admin user is currently using
                                this role.
                            </p>
                        </div>
                    )}
                </div>

                {/* Permissions */}
                <div className="mb-6 rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Assigned Permissions
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Permissions currently granted to
                                    this administrator role.
                                </p>
                            </div>

                            <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                                <CheckCircle2 className="h-4 w-4" />

                                {assignedPermissions.length} assigned
                            </div>
                        </div>
                    </div>

                    {assignedPermissions.length > 0 ? (
                        <div className="p-6">
                            <div className="space-y-4">
                                {Object.entries(
                                    groupedPermissions
                                ).map(
                                    ([
                                        module,
                                        modulePermissions,
                                    ]) => (
                                        <div
                                            key={module}
                                            className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4"
                                        >
                                            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <h3 className="text-sm font-bold text-gray-900">
                                                    {module}
                                                </h3>

                                                <span className="text-xs font-semibold text-gray-400">
                                                    {
                                                        modulePermissions.length
                                                    }{" "}
                                                    permission
                                                    {modulePermissions.length !==
                                                    1
                                                        ? "s"
                                                        : ""}
                                                </span>
                                            </div>

                                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                                {modulePermissions.map(
                                                    (
                                                        permission
                                                    ) => (
                                                        <div
                                                            key={
                                                                permission.id
                                                            }
                                                            className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3"
                                                        >
                                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />

                                                            <div className="min-w-0">
                                                                <p className="text-xs font-semibold text-gray-700">
                                                                    {
                                                                        permission.name
                                                                    }
                                                                </p>

                                                                <p className="mt-1 break-all text-[10px] text-gray-400">
                                                                    {
                                                                        permission.slug
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="px-6 py-14 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                <XCircle className="h-6 w-6" />
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-gray-900">
                                No permissions assigned
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                This role currently has no
                                permissions.
                            </p>
                        </div>
                    )}
                </div>

                {/* Permission Summary */}
                <div className="mb-6 rounded-3xl border border-green-100 bg-green-50/60 p-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <KeyRound className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-900">
                                Permission Summary
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This role currently has{" "}
                                <span className="font-bold text-gray-800">
                                    {
                                        assignedPermissions.length
                                    }
                                </span>{" "}
                                of{" "}
                                <span className="font-bold text-gray-800">
                                    {permissions.length}
                                </span>{" "}
                                available permissions assigned.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="sticky bottom-4 z-20 rounded-3xl border border-gray-200 bg-white/95 p-4 shadow-xl shadow-gray-900/10 backdrop-blur-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            to="/admin/administration/roles"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
                        >
                            <ArrowLeft size={17} />
                            Back to Roles
                        </Link>

                        <Link
                            to={`/admin/administration/roles/${encodeURIComponent(
                                decodedRole
                            )}/edit`}
                            className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10"
                        >
                            <Edit3 size={17} />
                            Edit Permissions
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SummaryCard = ({
    icon: Icon,
    label,
    value,
    description,
}) => {
    return (
        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        {description}
                    </p>
                </div>

                <div className="kr-hover-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    )
}

export default RoleDetails