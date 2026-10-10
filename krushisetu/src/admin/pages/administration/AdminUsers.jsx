import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    CheckCircle2,
    ChevronDown,
    Edit3,
    Eye,
    Filter,
    KeyRound,
    MoreHorizontal,
    RefreshCw,
    Search,
    ShieldCheck,
    UserCheck,
    UserPlus,
    UserRound,
    UserX,
    X,
} from "lucide-react";

import {
    getAdminUsers,
    toggleAdminUserStatus,
    deleteAdminUser,
} from "../../../admin/api/adminUsersApi.js";

import { getCurrentAdmin } from "../../../admin/api/adminAuthApi.js";


const ROLE_OPTIONS = [
    {
        value: "SUPER_ADMIN",
        label: "Super Admin",
    },
    {
        value: "CONTENT_ADMIN",
        label: "Website Content Admin",
    },
    {
        value: "SCHEME_MANAGER",
        label: "Scheme Manager",
    },
    {
        value: "TRAINING_MANAGER",
        label: "Training Manager",
    },
    {
        value: "PROGRAM_MANAGER",
        label: "Department / Program Manager",
    },
    {
        value: "CRM_SUPPORT",
        label: "CRM / Support Executive",
    },
    {
        value: "MEDIA_MANAGER",
        label: "Media Manager",
    },
    {
        value: "REPORT_VIEWER",
        label: "Report Viewer",
    },
];


const ROLE_LABELS = ROLE_OPTIONS.reduce(
    (accumulator, role) => {
        accumulator[role.value] = role.label;

        return accumulator;
    },
    {}
);


const AdminUsers = () => {
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [menuPosition, setMenuPosition] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | Current logged-in admin
    |--------------------------------------------------------------------------
    */

    const {
        data: currentAdminResponse,
    } = useQuery({
        queryKey: ["current-admin"],
        queryFn: getCurrentAdmin,
        staleTime: 5 * 60 * 1000,
    });


    const currentAdminId =
        currentAdminResponse?.admin?.id;


    /*
    |--------------------------------------------------------------------------
    | Close menu
    |--------------------------------------------------------------------------
    */

    const closeMenu = () => {
        setOpenMenu(null);
        setMenuPosition(null);
    };


    /*
    |--------------------------------------------------------------------------
    | Admin users query
    |--------------------------------------------------------------------------
    */

    const {
        data: response,
        isLoading,
        isError,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["admin-users"],
        queryFn: getAdminUsers,
    });


    const users = response?.data ?? [];


    /*
    |--------------------------------------------------------------------------
    | Toggle status mutation
    |--------------------------------------------------------------------------
    */

    const toggleStatusMutation = useMutation({
        mutationFn: (id) =>
            toggleAdminUserStatus(id),

        onSuccess: async () => {
            closeMenu();

            await queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
        },

        onError: (error) => {
            console.error(
                "Failed to update admin status:",
                error
            );
        },
    });


    /*
    |--------------------------------------------------------------------------
    | Delete mutation
    |--------------------------------------------------------------------------
    */

    const deleteMutation = useMutation({
        mutationFn: (id) =>
            deleteAdminUser(id),

        onSuccess: async (_, deletedId) => {
            closeMenu();

            setSelectedUsers((current) =>
                current.filter(
                    (userId) => userId !== deletedId
                )
            );

            await queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
        },

        onError: (error) => {
            console.error(
                "Failed to delete admin user:",
                error
            );
        },
    });


    /*
    |--------------------------------------------------------------------------
    | Filter users
    |--------------------------------------------------------------------------
    */

    const filteredUsers = useMemo(() => {
        const query = search
            .trim()
            .toLowerCase();

        return users.filter((user) => {
            const matchesSearch =
                !query ||
                user?.name
                    ?.toLowerCase()
                    .includes(query) ||
                user?.username
                    ?.toLowerCase()
                    .includes(query) ||
                user?.email
                    ?.toLowerCase()
                    .includes(query) ||
                user?.role
                    ?.toLowerCase()
                    .includes(query);

            const matchesRole =
                roleFilter === "ALL" ||
                user?.role === roleFilter;

            const matchesStatus =
                statusFilter === "ALL" ||
                (
                    statusFilter === "ACTIVE"
                        ? Number(user?.is_active) === 1
                        : Number(user?.is_active) === 0
                );

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });
    }, [
        users,
        search,
        roleFilter,
        statusFilter,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Summary counts
    |--------------------------------------------------------------------------
    */

    const activeCount = users.filter(
        (user) =>
            Number(user?.is_active) === 1
    ).length;


    const inactiveCount = users.filter(
        (user) =>
            Number(user?.is_active) === 0
    ).length;


    /*
    |--------------------------------------------------------------------------
    | Selection
    |--------------------------------------------------------------------------
    */

    const allFilteredSelected =
        filteredUsers.length > 0 &&
        filteredUsers.every((user) =>
            selectedUsers.includes(user.id)
        );


    const toggleUser = (id) => {
        setSelectedUsers((current) =>
            current.includes(id)
                ? current.filter(
                      (userId) => userId !== id
                  )
                : [...current, id]
        );
    };


    const toggleAll = () => {
        if (allFilteredSelected) {
            setSelectedUsers((current) =>
                current.filter(
                    (id) =>
                        !filteredUsers.some(
                            (user) =>
                                user.id === id
                        )
                )
            );

            return;
        }

        setSelectedUsers((current) => [
            ...new Set([
                ...current,
                ...filteredUsers.map(
                    (user) => user.id
                ),
            ]),
        ]);
    };


    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const clearFilters = () => {
        setSearch("");
        setRoleFilter("ALL");
        setStatusFilter("ALL");
    };


    const hasFilters =
        Boolean(search) ||
        roleFilter !== "ALL" ||
        statusFilter !== "ALL";


    /*
    |--------------------------------------------------------------------------
    | Actions menu positioning
    |--------------------------------------------------------------------------
    */

    const handleOpenMenu = (
        event,
        userId
    ) => {
        if (openMenu === userId) {
            closeMenu();

            return;
        }

        event.stopPropagation();

        const rect =
            event.currentTarget.getBoundingClientRect();

        const menuWidth = 224;

        /*
         * Keep enough space for the complete menu.
         */
        const menuHeight = 235;

        const gap = 8;

        const viewportPadding = 12;

        let left =
            rect.right - menuWidth;

        let top =
            rect.bottom + gap;


        if (left < viewportPadding) {
            left = viewportPadding;
        }


        if (
            left + menuWidth >
            window.innerWidth -
                viewportPadding
        ) {
            left =
                window.innerWidth -
                menuWidth -
                viewportPadding;
        }


        if (
            top + menuHeight >
            window.innerHeight -
                viewportPadding
        ) {
            top =
                rect.top -
                menuHeight -
                gap;
        }


        if (top < viewportPadding) {
            top = viewportPadding;
        }


        setOpenMenu(userId);

        setMenuPosition({
            top,
            left,
        });
    };


    /*
    |--------------------------------------------------------------------------
    | Close actions menu on outside click / Escape
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!openMenu) {
            return;
        }

        const handleOutsideClick = () => {
            closeMenu();
        };


        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };


        document.addEventListener(
            "click",
            handleOutsideClick
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );


        return () => {
            document.removeEventListener(
                "click",
                handleOutsideClick
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [openMenu]);


    /*
    |--------------------------------------------------------------------------
    | Toggle status
    |--------------------------------------------------------------------------
    */

    const handleToggleStatus = (user) => {
        /*
         * A logged-in admin cannot deactivate or
         * activate their own account.
         */
        if (
            Number(user.id) ===
            Number(currentAdminId)
        ) {
            return;
        }

        toggleStatusMutation.mutate(
            user.id
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Delete user
    |--------------------------------------------------------------------------
    */

    const handleDeleteUser = (user) => {
        /*
         * Frontend protection.
         *
         * Backend protection must also remain in place.
         */
        if (
            Number(user.id) ===
            Number(currentAdminId)
        ) {
            return;
        }


        const confirmed = window.confirm(
            `Are you sure you want to remove "${user.name}"?`
        );


        if (!confirmed) {
            return;
        }


        deleteMutation.mutate(
            user.id
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Date formatting
    |--------------------------------------------------------------------------
    */

    const formatDate = (value) => {
        if (!value) {
            return "Never";
        }

        const date = new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "—";
        }

        return date.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };


    const formatCreatedDate = (
        value
    ) => {
        if (!value) {
            return "—";
        }

        const date = new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "—";
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

                {/* Header */}

                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <ShieldCheck className="h-4 w-4" />

                            Administration

                            <span className="text-gray-400">
                                /
                            </span>

                            Admin Users
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Admin Users
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage administrator accounts,
                            access roles and account status.
                        </p>
                    </div>


                    <Link
                        to="/admin/administration/users/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                    >
                        <UserPlus className="h-4 w-4" />

                        Add Admin User
                    </Link>
                </div>


                {/* Summary */}

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <SummaryCard
                        icon={UserRound}
                        label="Total Users"
                        value={users.length}
                        description="Registered admin accounts"
                    />

                    <SummaryCard
                        icon={UserCheck}
                        label="Active Users"
                        value={activeCount}
                        description="Currently enabled"
                    />

                    <SummaryCard
                        icon={UserX}
                        label="Inactive Users"
                        value={inactiveCount}
                        description="Currently disabled"
                    />

                    <SummaryCard
                        icon={KeyRound}
                        label="Roles"
                        value={ROLE_OPTIONS.length}
                        description="Configured access roles"
                    />

                </div>


                {/* Access Notice */}

                <div className="mb-6 rounded-3xl border border-green-100 bg-green-50/70 p-4">
                    <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <ShieldCheck className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-gray-900">
                                Access management
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Assign each administrator an
                                appropriate role and keep inactive
                                accounts disabled. Permission changes
                                should be reviewed before they are
                                applied.
                            </p>
                        </div>

                    </div>
                </div>


                {/* Filters */}

                <div className="mb-5 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4">

                        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">

                            {/* Search */}

                            <div className="relative min-w-0 flex-1">
                                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Search users by name, username, email or role..."
                                    className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                                />
                            </div>


                            {/* Filter label */}

                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                <Filter className="h-4 w-4" />

                                Filters
                            </div>


                            {/* Role */}

                            <FilterSelect
                                value={roleFilter}
                                onChange={setRoleFilter}
                                options={[
                                    {
                                        value: "ALL",
                                        label: "All Roles",
                                    },
                                    ...ROLE_OPTIONS,
                                ]}
                            />


                            {/* Status */}

                            <FilterSelect
                                value={statusFilter}
                                onChange={setStatusFilter}
                                options={[
                                    {
                                        value: "ALL",
                                        label: "All Status",
                                    },
                                    {
                                        value: "ACTIVE",
                                        label: "Active",
                                    },
                                    {
                                        value: "INACTIVE",
                                        label: "Inactive",
                                    },
                                ]}
                            />


                            {/* Refresh */}

                            <button
                                type="button"
                                onClick={() =>
                                    refetch()
                                }
                                disabled={isFetching}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <RefreshCw
                                    className={`h-4 w-4 ${
                                        isFetching
                                            ? "animate-spin"
                                            : ""
                                    }`}
                                />

                                Refresh
                            </button>


                            {/* Clear */}

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={
                                        clearFilters
                                    }
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                >
                                    <X className="h-4 w-4" />

                                    Clear
                                </button>
                            )}

                        </div>


                        {/* Selected users */}

                        {selectedUsers.length > 0 && (
                            <div className="flex flex-col gap-3 rounded-2xl border border-green-100 bg-green-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-sm font-medium text-green-800">
                                    {selectedUsers.length} user
                                    {selectedUsers.length !== 1
                                        ? "s"
                                        : ""}{" "}
                                    selected
                                </p>


                                <div className="flex flex-wrap gap-2">

                                    <button
                                        type="button"
                                        disabled
                                        className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-400 shadow-sm"
                                    >
                                        Activate
                                    </button>


                                    <button
                                        type="button"
                                        disabled
                                        className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-400 shadow-sm"
                                    >
                                        Deactivate
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedUsers(
                                                []
                                            )
                                        }
                                        className="rounded-xl px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                                    >
                                        Clear Selection
                                    </button>

                                </div>
                            </div>
                        )}

                    </div>
                </div>


                {/* Loading */}

                {isLoading && (
                    <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <RefreshCw className="h-5 w-5 animate-spin" />
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-gray-900">
                            Loading admin users
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Please wait while we load
                            administrator accounts.
                        </p>

                    </div>
                )}


                {/* Error */}

                {!isLoading && isError && (
                    <div className="rounded-3xl border border-red-100 bg-white p-12 text-center shadow-sm">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <X className="h-5 w-5" />
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-gray-900">
                            Unable to load admin users
                        </h3>

                        <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong while loading administrator accounts."}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                refetch()
                            }
                            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <RefreshCw className="h-4 w-4" />

                            Try Again
                        </button>

                    </div>
                )}


                {/* Users table / empty state */}

                {!isLoading &&
                    !isError &&
                    (
                        filteredUsers.length >
                        0
                    ? (

                        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[1100px] text-left">

                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50/80">

                                            <th className="w-12 px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        allFilteredSelected
                                                    }
                                                    onChange={
                                                        toggleAll
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                            </th>


                                            <TableHead>
                                                User
                                            </TableHead>


                                            <TableHead>
                                                Username
                                            </TableHead>


                                            <TableHead>
                                                Role
                                            </TableHead>


                                            <TableHead>
                                                Status
                                            </TableHead>


                                            <TableHead>
                                                2FA
                                            </TableHead>


                                            <TableHead>
                                                Last Login
                                            </TableHead>


                                            <TableHead>
                                                Created
                                            </TableHead>


                                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>

                                        </tr>
                                    </thead>


                                    <tbody className="divide-y divide-gray-100">

                                        {filteredUsers.map(
                                            (user) => {
                                                const isActive =
                                                    Number(
                                                        user?.is_active
                                                    ) === 1;

                                                const isTwoFactorEnabled =
                                                    Number(
                                                        user?.two_factor_enabled
                                                    ) === 1;

                                                const isCurrentUser =
                                                    Number(
                                                        user?.id
                                                    ) ===
                                                    Number(
                                                        currentAdminId
                                                    );


                                                return (
                                                    <tr
                                                        key={
                                                            user.id
                                                        }
                                                        className="transition hover:bg-green-50/30"
                                                    >

                                                        {/* Checkbox */}

                                                        <td className="px-4 py-4">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedUsers.includes(
                                                                    user.id
                                                                )}
                                                                onChange={() =>
                                                                    toggleUser(
                                                                        user.id
                                                                    )
                                                                }
                                                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                            />
                                                        </td>


                                                        {/* User */}

                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-3">

                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-100 font-bold text-green-700">
                                                                    {getInitials(
                                                                        user?.name
                                                                    )}
                                                                </div>

                                                                <div className="min-w-0">

                                                                    <p className="truncate text-sm font-semibold text-gray-900">
                                                                        {
                                                                            user?.name
                                                                        }
                                                                    </p>

                                                                    <p className="truncate text-xs text-gray-500">
                                                                        {
                                                                            user?.email
                                                                        }
                                                                    </p>

                                                                </div>

                                                            </div>
                                                        </td>


                                                        {/* Username */}

                                                        <td className="px-5 py-4">
                                                            <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                                                                {user?.username ||
                                                                    "—"}
                                                            </span>
                                                        </td>


                                                        {/* Role */}

                                                        <td className="px-5 py-4">
                                                            <span className="inline-flex max-w-[230px] whitespace-nowrap rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
                                                                {ROLE_LABELS[
                                                                    user?.role
                                                                ] ||
                                                                    user?.role}
                                                            </span>
                                                        </td>


                                                        {/* Status */}

                                                        <td className="px-5 py-4">
                                                            <StatusBadge
                                                                status={
                                                                    isActive
                                                                        ? "Active"
                                                                        : "Inactive"
                                                                }
                                                            />
                                                        </td>


                                                        {/* 2FA */}

                                                        <td className="px-5 py-4">

                                                            {isTwoFactorEnabled ? (
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">

                                                                    <CheckCircle2 className="h-3.5 w-3.5" />

                                                                    Enabled

                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                                                                    Disabled
                                                                </span>
                                                            )}

                                                        </td>


                                                        {/* Last Login */}

                                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                                                            {formatDate(
                                                                user?.last_login_at
                                                            )}
                                                        </td>


                                                        {/* Created */}

                                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                                                            {formatCreatedDate(
                                                                user?.created_at
                                                            )}
                                                        </td>


                                                        {/* Actions */}

                                                        <td className="px-5 py-4 text-right">

                                                            <div className="flex items-center justify-end gap-1">

                                                                <Link
                                                                    to={`/admin/administration/users/${user.id}`}
                                                                    className="inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                                    title="View user"
                                                                >
                                                                    <Eye className="h-4 w-4" />

                                                                    <span>
                                                                        View
                                                                    </span>
                                                                </Link>


                                                                <Link
                                                                    to={`/admin/administration/users/${user.id}/edit`}
                                                                    className="inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                                    title="Edit user"
                                                                >
                                                                    <Edit3 className="h-4 w-4" />

                                                                    <span>
                                                                        Edit
                                                                    </span>
                                                                </Link>


                                                                <button
                                                                    type="button"
                                                                    title="More actions"
                                                                    onClick={(
                                                                        event
                                                                    ) => {
                                                                        handleOpenMenu(
                                                                            event,
                                                                            user.id
                                                                        );
                                                                    }}
                                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>
                                                );
                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>


                            {/* Table footer */}

                            <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-sm text-gray-500">
                                    Showing{" "}

                                    <span className="font-semibold text-gray-700">
                                        {
                                            filteredUsers.length
                                        }
                                    </span>{" "}

                                    of{" "}

                                    <span className="font-semibold text-gray-700">
                                        {
                                            users.length
                                        }
                                    </span>{" "}

                                    users
                                </p>


                                <div className="flex items-center gap-2 text-xs text-gray-400">

                                    {isFetching && (
                                        <>
                                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />

                                            Updating...
                                        </>
                                    )}

                                </div>

                            </div>

                        </div>

                    ) : (

                        /* Empty state */

                        <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">

                            <div className="mx-auto flex max-w-sm flex-col items-center">

                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                    <UserRound className="h-6 w-6" />
                                </div>

                                <h3 className="text-sm font-bold text-gray-900">
                                    No users found
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {hasFilters
                                        ? "Try changing your search or filter criteria."
                                        : "There are no administrator accounts yet."}
                                </p>


                                {hasFilters && (
                                    <button
                                        type="button"
                                        onClick={
                                            clearFilters
                                        }
                                        className="mt-4 text-sm font-semibold text-green-700 hover:text-green-800"
                                    >
                                        Clear filters
                                    </button>
                                )}

                            </div>

                        </div>
                    )
                )}


                {/* Fixed More Actions Menu */}

                {openMenu &&
                    menuPosition &&
                    (() => {
                        const user =
                            users.find(
                                (item) =>
                                    item.id ===
                                    openMenu
                            );

                        if (!user) {
                            return null;
                        }


                        const isActive =
                            Number(
                                user?.is_active
                            ) === 1;


                        const isCurrentUser =
                            Number(
                                user?.id
                            ) ===
                            Number(
                                currentAdminId
                            );


                        return (
                            <div
                                className="fixed z-[100] w-56 rounded-2xl border border-gray-200 bg-white p-1.5 text-left shadow-2xl shadow-gray-900/15"
                                style={{
                                    top: menuPosition.top,
                                    left: menuPosition.left,
                                }}
                                onClick={(event) =>
                                    event.stopPropagation()
                                }
                            >

                                {/* Menu header */}

                                <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2">

                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Actions
                                    </span>

                                    <button
                                        type="button"
                                        onClick={
                                            closeMenu
                                        }
                                        title="Close"
                                        aria-label="Close actions menu"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>

                                </div>


                                {/* View */}

                                <Link
                                    to={`/admin/administration/users/${user.id}`}
                                    onClick={
                                        closeMenu
                                    }
                                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                >
                                    <Eye className="h-4 w-4" />

                                    View Details
                                </Link>


                                {/* Edit */}

                                <Link
                                    to={`/admin/administration/users/${user.id}/edit`}
                                    onClick={
                                        closeMenu
                                    }
                                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                >
                                    <Edit3 className="h-4 w-4" />

                                    Edit User
                                </Link>


                                {/* Activate / Deactivate */}

                                <button
                                    type="button"
                                    disabled={
                                        isCurrentUser ||
                                        toggleStatusMutation.isPending
                                    }
                                    onClick={() =>
                                        handleToggleStatus(
                                            user
                                        )
                                    }
                                    title={
                                        isCurrentUser
                                            ? "You cannot change your own account status."
                                            : isActive
                                              ? "Deactivate user"
                                              : "Activate user"
                                    }
                                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                                        isCurrentUser
                                            ? "cursor-not-allowed text-gray-400"
                                            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    } disabled:cursor-not-allowed disabled:opacity-50`}
                                >

                                    {isActive ? (
                                        <>
                                            <UserX className="h-4 w-4" />

                                            {isCurrentUser
                                                ? "Cannot Deactivate Yourself"
                                                : "Deactivate"}
                                        </>
                                    ) : (
                                        <>
                                            <UserCheck className="h-4 w-4" />

                                            Activate
                                        </>
                                    )}

                                </button>


                                {/* Remove */}

                                {!isCurrentUser && (
                                    <>
                                        <div className="my-1 border-t border-gray-100" />

                                        <button
                                            type="button"
                                            disabled={
                                                deleteMutation.isPending
                                            }
                                            onClick={() =>
                                                handleDeleteUser(
                                                    user
                                                )
                                            }
                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <UserX className="h-4 w-4" />

                                            Remove User
                                        </button>
                                    </>
                                )}

                            </div>
                        );
                    })()}

            </div>
        </div>
    );
};


/*
|--------------------------------------------------------------------------
| Summary Card
|--------------------------------------------------------------------------
*/

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
    );
};


/*
|--------------------------------------------------------------------------
| Filter Select
|--------------------------------------------------------------------------
*/

const FilterSelect = ({
    value,
    onChange,
    options,
}) => {
    return (
        <div className="relative">

            <select
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                className="h-11 min-w-[170px] appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            >

                {options.map(
                    (option) => (
                        <option
                            key={
                                option.value
                            }
                            value={
                                option.value
                            }
                        >
                            {option.label}
                        </option>
                    )
                )}

            </select>


            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        </div>
    );
};


/*
|--------------------------------------------------------------------------
| Table Head
|--------------------------------------------------------------------------
*/

const TableHead = ({
    children,
}) => {
    return (
        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {children}
        </th>
    );
};


/*
|--------------------------------------------------------------------------
| Status Badge
|--------------------------------------------------------------------------
*/

const StatusBadge = ({
    status,
}) => {
    const active =
        status === "Active";

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                active
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
            }`}
        >

            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    active
                        ? "bg-green-600"
                        : "bg-gray-400"
                }`}
            />

            {status}

        </span>
    );
};


/*
|--------------------------------------------------------------------------
| Get Initials
|--------------------------------------------------------------------------
*/

const getInitials = (
    name = ""
) => {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
};


export default AdminUsers;