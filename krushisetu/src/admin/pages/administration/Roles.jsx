import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    CheckCircle2,
    Edit3,
    Eye,
    Filter,
    KeyRound,
    Search,
    ShieldCheck,
    Users,
    X,
} from "lucide-react"

import {
    getRoles,
    getRolePermissionMatrix,
} from "../../api/permissionsApi.js"

import { getAdminUsers } from "../../api/adminUsersApi.js"

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

const Roles = () => {
    const [search, setSearch] = useState("")

    const {
        data: rolesResponse,
        isLoading: rolesLoading,
        isError: rolesError,
    } = useQuery({
        queryKey: ["admin-roles"],
        queryFn: getRoles,
    })

    const {
        data: usersResponse,
        isLoading: usersLoading,
        isError: usersError,
    } = useQuery({
        queryKey: ["admin-users"],
        queryFn: getAdminUsers,
    })

    const roles = useMemo(() => {
        const roleList = rolesResponse?.data || []
        const users = usersResponse?.data || []

        return roleList.map((role) => {
            const roleUsers = users.filter(
                (user) => user.role === role
            )

            return {
                role,
                name: formatRoleName(role),
                description:
                    roleMeta[role]?.description ||
                    "Administrator access role.",
                users: roleUsers.length,
                systemRole: true,
            }
        })
    }, [rolesResponse, usersResponse])

    const filteredRoles = useMemo(() => {
        const query = search.trim().toLowerCase()

        if (!query) {
            return roles
        }

        return roles.filter(
            (role) =>
                role.name.toLowerCase().includes(query) ||
                role.role.toLowerCase().includes(query) ||
                role.description.toLowerCase().includes(query)
        )
    }, [roles, search])

    const totalUsers = useMemo(() => {
        return roles.reduce(
            (total, role) => total + role.users,
            0
        )
    }, [roles])

    const activeRoleCount = roles.length

    if (rolesLoading || usersLoading) {
        return (
            <div className="min-h-screen bg-[#F6FAF7]">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-24 rounded-3xl bg-gray-200" />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="h-32 rounded-3xl bg-gray-200"
                                />
                            ))}
                        </div>

                        <div className="h-20 rounded-3xl bg-gray-200" />

                        <div className="h-[500px] rounded-3xl bg-gray-200" />
                    </div>
                </div>
            </div>
        )
    }

    if (rolesError || usersError) {
        return (
            <div className="min-h-screen bg-[#F6FAF7]">
                <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-red-600">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-red-800">
                                    Unable to load roles
                                </h2>

                                <p className="mt-1 text-sm text-red-700">
                                    Something went wrong while loading the
                                    administrator roles and users.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <ShieldCheck className="h-4 w-4" />

                            Administration

                            <span className="text-gray-400">
                                /
                            </span>

                            Roles & Permissions
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Roles & Permissions
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage administrator roles and control access to
                            Krushisetu administration modules.
                        </p>
                    </div>
                </div>

                {/* Summary */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={ShieldCheck}
                        label="Total Roles"
                        value={roles.length}
                        description="Configured access roles"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Active Roles"
                        value={activeRoleCount}
                        description="Available system roles"
                    />

                    <SummaryCard
                        icon={KeyRound}
                        label="System Roles"
                        value={roles.length}
                        description="Built-in administrator roles"
                    />

                    <SummaryCard
                        icon={Users}
                        label="Assigned Users"
                        value={totalUsers}
                        description="Administrators assigned to roles"
                    />
                </div>

                {/* RBAC Notice */}
                <div className="mb-6 rounded-3xl border border-green-100 bg-green-50/70 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <ShieldCheck className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-gray-900">
                                Role-based access control
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Permissions are assigned to administrator
                                roles. Users inherit the permissions of the
                                role assigned to their account.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-5 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                        <div className="relative min-w-0 flex-1">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search roles..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                            />
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <Filter className="h-4 w-4" />

                            Filters
                        </div>

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                <X className="h-4 w-4" />
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Roles */}
                {filteredRoles.length > 0 ? (
                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] text-left">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50/80">
                                        <TableHead>
                                            Role
                                        </TableHead>

                                        <TableHead>
                                            Type
                                        </TableHead>

                                        <TableHead>
                                            Users
                                        </TableHead>

                                        <TableHead>
                                            Permissions
                                        </TableHead>

                                        <TableHead>
                                            Access
                                        </TableHead>

                                        <TableHead>
                                            Actions
                                        </TableHead>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {filteredRoles.map((role) => (
                                        <RoleRow
                                            key={role.role}
                                            role={role}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-500">
                                Showing{" "}
                                <span className="font-semibold text-gray-700">
                                    {filteredRoles.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-gray-700">
                                    {roles.length}
                                </span>{" "}
                                roles
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto flex max-w-sm flex-col items-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                <ShieldCheck className="h-6 w-6" />
                            </div>

                            <h3 className="text-sm font-bold text-gray-900">
                                No roles found
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Try changing your search criteria.
                            </p>

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="mt-4 text-sm font-semibold text-green-700 hover:text-green-800"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const RoleRow = ({ role }) => {
    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: [
            "admin-role-permission-matrix",
            role.role,
        ],
        queryFn: () =>
            getRolePermissionMatrix(role.role),
    })

    const permissions =
        data?.data?.permissions || []

    const assignedPermissions = permissions.filter(
        (permission) => permission.assigned
    )

    const modules = [
        ...new Set(
            assignedPermissions.map(
                (permission) => permission.module
            )
        ),
    ]

    const rolePath = encodeURIComponent(role.role)

    return (
        <tr className="transition hover:bg-green-50/30">
            {/* Role */}
            <td className="px-5 py-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                        <ShieldCheck className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                            {role.name}
                        </p>

                        <p className="mt-1 max-w-[330px] text-xs leading-5 text-gray-500">
                            {role.description}
                        </p>
                    </div>
                </div>
            </td>

            {/* Type */}
            <td className="px-5 py-4">
                <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    System
                </span>
            </td>

            {/* Users */}
            <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Users className="h-4 w-4 text-gray-400" />

                    {role.users}
                </div>
            </td>

            {/* Permissions */}
            <td className="px-5 py-4">
                <span className="text-sm font-semibold text-gray-700">
                    {isLoading
                        ? "—"
                        : assignedPermissions.length}
                </span>

                <span className="ml-1 text-xs text-gray-400">
                    permissions
                </span>
            </td>

            {/* Access */}
            <td className="px-5 py-4">
                <div className="flex max-w-[280px] flex-wrap gap-1.5">
                    {modules
                        .slice(0, 3)
                        .map((module) => (
                            <span
                                key={module}
                                className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-600"
                            >
                                {module}
                            </span>
                        ))}

                    {modules.length > 3 && (
                        <span className="rounded-lg bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-500">
                            +{modules.length - 3}
                        </span>
                    )}

                    {!isLoading && modules.length === 0 && (
                        <span className="text-xs text-gray-400">
                            No access assigned
                        </span>
                    )}
                </div>
            </td>

            {/* Actions */}
            <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-1">
                    <Link
                        to={`/admin/administration/roles/${rolePath}`}
                        title="View role"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                    >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                    </Link>

                    <Link
                        to={`/admin/administration/roles/${rolePath}/edit`}
                        title="Edit permissions"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                    >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit</span>
                    </Link>
                </div>
            </td>
        </tr>
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

const TableHead = ({ children }) => {
    return (
        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {children}
        </th>
    )
}

export default Roles