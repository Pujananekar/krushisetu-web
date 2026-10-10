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
    Lock,
    ShieldCheck,
    User,
} from "lucide-react"

import { getAdminUserById } from "../../api/adminUsersApi.js"
import { getRolePermissionMatrix } from "../../api/permissionsApi.js"

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

    if (!role) {
        return "Unknown Role"
    }

    return role
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase()
        )
        .join(" ")
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

const formatDate = (value) => {
    if (!value) {
        return "Never"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "—"
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

const formatDateOnly = (value) => {
    if (!value) {
        return "—"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "—"
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const AdminUserDetails = () => {
    const { id } = useParams()

    const {
        data: userResponse,
        isLoading: userLoading,
        isError: userError,
        error: userErrorObject,
    } = useQuery({
        queryKey: ["admin-user", id],
        queryFn: () => getAdminUserById(id),
        enabled: Boolean(id),
    })

    const user = userResponse?.data

    const userRole = user?.role

    const {
        data: permissionResponse,
        isLoading: permissionsLoading,
        isError: permissionsError,
        error: permissionsErrorObject,
    } = useQuery({
        queryKey: ["admin-user-permissions", id, userRole],
        queryFn: () => getRolePermissionMatrix(userRole),
        enabled: Boolean(userRole),
    })

    const permissions = permissionResponse?.data?.permissions || []

    /*
     * These are the permissions actually available to this user
     * because the user inherits permissions from their assigned role.
     */
    const assignedPermissions = useMemo(() => {
        return permissions.filter((permission) => permission.assigned)
    }, [permissions])

    const groupedPermissions = useMemo(() => {
        return assignedPermissions.reduce((groups, permission) => {
            const moduleName = permission.module || "other"

            if (!groups[moduleName]) {
                groups[moduleName] = []
            }

            groups[moduleName].push(permission)

            return groups
        }, {})
    }, [assignedPermissions])

    const isLoading = userLoading

    const isError = userError

    if (isLoading) {
        return (
            <div className="min-h-full bg-[#F6FAF7] p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="space-y-6">
                        <div className="animate-pulse rounded-3xl bg-gray-200 p-8">
                            <div className="h-8 w-1/3 rounded bg-gray-300" />
                            <div className="mt-4 h-4 w-2/3 rounded bg-gray-300" />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="h-32 animate-pulse rounded-3xl bg-gray-200"
                                />
                            ))}
                        </div>

                        <div className="h-[400px] animate-pulse rounded-3xl bg-gray-200" />
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-full bg-[#F6FAF7] p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-red-600">
                                <AlertCircle size={20} />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-red-800">
                                    Unable to load administrator
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-red-700">
                                    {userErrorObject?.response?.data
                                        ?.message ||
                                        userErrorObject?.message ||
                                        "Something went wrong while loading this administrator."}
                                </p>

                                <Link
                                    to="/admin/administration/users"
                                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Admin Users
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-full bg-[#F6FAF7] p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                            <User size={25} />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Administrator not found
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            The requested administrator could not be found.
                        </p>

                        <Link
                            to="/admin/administration/users"
                            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-green-700 px-4 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <ArrowLeft size={16} />
                            Back to Admin Users
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const isActive = Number(user.is_active) === 1
    const isLocked = user.locked_until
        ? new Date(user.locked_until).getTime() > Date.now()
        : false

    const isTwoFactorEnabled = Number(user.two_factor_enabled) === 1

    return (
        <div className="min-h-full bg-[#F6FAF7] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6 pb-28">
                {/* Header */}
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                        <ShieldCheck size={16} />

                        <span>Administration</span>

                        <span className="text-gray-400">/</span>

                        <Link
                            to="/admin/administration/users"
                            className="transition hover:text-green-800"
                        >
                            Admin Users
                        </Link>

                        <span className="text-gray-400">/</span>

                        <span className="text-gray-500">{user.name}</span>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-green-100 text-green-700">
                                <User size={27} />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                        {user.name}
                                    </h1>

                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                            isActive
                                                ? "bg-green-50 text-green-700"
                                                : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                                isActive
                                                    ? "bg-green-600"
                                                    : "bg-gray-400"
                                            }`}
                                        />

                                        {isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <Link
                            to={`/admin/administration/users/${user.id}/edit`}
                            className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10"
                        >
                            <Edit3 size={17} />
                            Edit User
                        </Link>
                    </div>
                </div>

                {/* Overview */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={ShieldCheck}
                        label="Role"
                        value={formatRoleName(user.role)}
                        description={user.role}
                    />

                    <SummaryCard
                        icon={KeyRound}
                        label="Permissions"
                        value={
                            permissionsLoading
                                ? "..."
                                : assignedPermissions.length
                        }
                        description={
                            permissionsLoading
                                ? "Loading permissions"
                                : `Of ${permissions.length} available permissions`
                        }
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Account Status"
                        value={isActive ? "Active" : "Inactive"}
                        description={
                            isActive
                                ? "Account can be used"
                                : "Account is disabled"
                        }
                    />

                    <SummaryCard
                        icon={Lock}
                        label="Two-Factor Authentication"
                        value={isTwoFactorEnabled ? "Enabled" : "Disabled"}
                        description="Account security setting"
                    />
                </div>

                {/* Account Information */}
                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <User size={19} />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Account Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Basic information about this administrator.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                        <InfoItem
                            label="Full Name"
                            value={user.name}
                        />

                        <InfoItem
                            label="Username"
                            value={user.username}
                        />

                        <InfoItem
                            label="Email Address"
                            value={user.email}
                        />

                        <InfoItem
                            label="Assigned Role"
                            value={formatRoleName(user.role)}
                        />

                        <InfoItem
                            label="Role Code"
                            value={user.role}
                        />

                        <InfoItem
                            label="Account Status"
                            value={isActive ? "Active" : "Inactive"}
                        />

                        <InfoItem
                            label="Two-Factor Authentication"
                            value={
                                isTwoFactorEnabled
                                    ? "Enabled"
                                    : "Disabled"
                            }
                        />
                    </div>
                </div>

                {/* Role Information */}
                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <ShieldCheck size={19} />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Role & Access
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Permissions available to this user through
                                    their assigned role.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="rounded-2xl border border-green-100 bg-green-50/60 p-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {formatRoleName(user.role)}
                                        </h3>

                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-green-700">
                                            <ShieldCheck size={13} />
                                            System Role
                                        </span>
                                    </div>

                                    <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                                        {roleMeta[user.role]?.description ||
                                            "Administrator access role."}
                                    </p>
                                </div>

                                <div className="shrink-0 rounded-2xl bg-white px-4 py-3 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Access
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-green-700">
                                        {permissionsLoading
                                            ? "..."
                                            : `${assignedPermissions.length}/${permissions.length}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Permissions */}
                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    User Permissions
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Permissions currently available to{" "}
                                    <span className="font-semibold text-gray-700">
                                        {user.name}
                                    </span>{" "}
                                    through the{" "}
                                    <span className="font-semibold text-gray-700">
                                        {formatRoleName(user.role)}
                                    </span>{" "}
                                    role.
                                </p>
                            </div>

                            {!permissionsLoading &&
                                !permissionsError && (
                                    <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                                        <CheckCircle2 size={15} />
                                        {assignedPermissions.length} assigned
                                    </div>
                                )}
                        </div>
                    </div>

                    {permissionsLoading ? (
                        <div className="p-12 text-center">
                            <Loader2
                                size={28}
                                className="mx-auto animate-spin text-green-700"
                            />

                            <p className="mt-4 text-sm font-semibold text-gray-700">
                                Loading user permissions...
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Checking permissions inherited from the user's
                                role.
                            </p>
                        </div>
                    ) : permissionsError ? (
                        <div className="p-8">
                            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                                <div className="flex items-start gap-3">
                                    <AlertCircle
                                        size={19}
                                        className="mt-0.5 shrink-0 text-red-600"
                                    />

                                    <div>
                                        <h3 className="text-sm font-bold text-red-800">
                                            Unable to load permissions
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-red-700">
                                            {permissionsErrorObject?.response
                                                ?.data?.message ||
                                                permissionsErrorObject?.message ||
                                                "Unable to load the permissions assigned to this user's role."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : assignedPermissions.length > 0 ? (
                        <div className="p-6">
                            <div className="space-y-4">
                                {Object.entries(groupedPermissions)
                                    .sort(([moduleA], [moduleB]) =>
                                        formatModuleName(
                                            moduleA
                                        ).localeCompare(
                                            formatModuleName(moduleB)
                                        )
                                    )
                                    .map(
                                        ([
                                            moduleName,
                                            modulePermissions,
                                        ]) => (
                                            <div
                                                key={moduleName}
                                                className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4"
                                            >
                                                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                    <h3 className="text-sm font-bold text-gray-900">
                                                        {formatModuleName(
                                                            moduleName
                                                        )}
                                                    </h3>

                                                    <span className="text-xs font-semibold text-gray-400">
                                                        {
                                                            modulePermissions.length
                                                        }{" "}
                                                        {modulePermissions.length ===
                                                        1
                                                            ? "permission"
                                                            : "permissions"}
                                                    </span>
                                                </div>

                                                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                                    {modulePermissions.map(
                                                        (permission) => (
                                                            <div
                                                                key={
                                                                    permission.id
                                                                }
                                                                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3"
                                                            >
                                                                <CheckCircle2
                                                                    size={16}
                                                                    className="mt-0.5 shrink-0 text-green-600"
                                                                />

                                                                <div className="min-w-0">
                                                                    <p className="text-xs font-semibold text-gray-700">
                                                                        {
                                                                            permission.name
                                                                        }
                                                                    </p>

                                                                    {permission.action && (
                                                                        <span className="mt-1 inline-flex rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                                                                            {permission.action
                                                                                .replace(
                                                                                    /[_-]+/g,
                                                                                    " "
                                                                                )
                                                                                .replace(
                                                                                    /\b\w/g,
                                                                                    (
                                                                                        char
                                                                                    ) =>
                                                                                        char.toUpperCase()
                                                                                )}
                                                                        </span>
                                                                    )}
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
                                <KeyRound size={24} />
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-gray-900">
                                No permissions assigned
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                This user's current role does not have any
                                permissions assigned.
                            </p>
                        </div>
                    )}
                </div>

                {/* Security */}
                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <Lock size={19} />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Security & Login
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Authentication and account security
                                    information.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                        <InfoItem
                            label="Two-Factor Authentication"
                            value={
                                isTwoFactorEnabled
                                    ? "Enabled"
                                    : "Disabled"
                            }
                        />

                        <InfoItem
                            label="Failed Login Attempts"
                            value={String(
                                user.failed_login_attempts ?? 0
                            )}
                        />

                        <InfoItem
                            label="Last Login"
                            value={formatDate(user.last_login_at)}
                        />

                        <InfoItem
                            label="Account Lock"
                            value={
                                isLocked
                                    ? `Locked until ${formatDate(
                                          user.locked_until
                                      )}`
                                    : "Not locked"
                            }
                        />
                    </div>
                </div>

                {/* Record Information */}
                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <h2 className="text-base font-bold text-gray-900">
                            Record Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Administrative record details.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
                        <InfoItem
                            label="User ID"
                            value={String(user.id)}
                        />

                        <InfoItem
                            label="Created"
                            value={formatDateOnly(user.created_at)}
                        />

                        <InfoItem
                            label="Last Updated"
                            value={formatDateOnly(user.updated_at)}
                        />

                        <InfoItem
                            label="Last Login"
                            value={formatDate(user.last_login_at)}
                        />
                    </div>
                </div>

                {/* Permission Explanation */}
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <KeyRound size={19} />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-900">
                                How this user's permissions work
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This administrator inherits permissions from
                                the{" "}
                                <span className="font-bold text-gray-800">
                                    {formatRoleName(user.role)}
                                </span>{" "}
                                role. The permissions displayed above are the
                                permissions currently assigned to that role.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sticky Bottom Actions */}
                <div className="sticky bottom-4 z-20 rounded-3xl border border-gray-200 bg-white/95 p-4 shadow-xl shadow-gray-900/10 backdrop-blur-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            to="/admin/administration/users"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
                        >
                            <ArrowLeft size={17} />
                            Back to Admin Users
                        </Link>

                        <Link
                            to={`/admin/administration/users/${user.id}/edit`}
                            className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10"
                        >
                            <Edit3 size={17} />
                            Edit User
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
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-2 truncate text-2xl font-bold tracking-tight text-gray-900">
                        {value}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                        {description}
                    </p>
                </div>

                <div className="kr-hover-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Icon size={20} />
                </div>
            </div>
        </div>
    )
}

const InfoItem = ({ label, value }) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="mt-2 break-words text-sm font-semibold text-gray-800">
                {value || "—"}
            </p>
        </div>
    )
}

export default AdminUserDetails