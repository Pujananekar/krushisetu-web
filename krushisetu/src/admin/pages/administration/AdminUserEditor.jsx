import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

import {
    ArrowLeft,
    CheckCircle2,
    Eye,
    KeyRound,
    Loader2,
    LockKeyhole,
    Save,
    ShieldCheck,
    Smartphone,
    UserRound,
    X,
} from "lucide-react"

import {
    getAdminUserById,
    createAdminUser,
    updateAdminUser,
} from "../../../admin/api/adminUsersApi.js"


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
]


const AdminUserEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const isEdit = Boolean(id)

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "CONTENT_ADMIN",
        is_active: true,
        two_factor_enabled: false,
    })

    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")


    /*
    |--------------------------------------------------------------------------
    | Get Existing Admin User
    |--------------------------------------------------------------------------
    */

    const {
        data: response,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-user", id],
        queryFn: () => getAdminUserById(id),
        enabled: isEdit,
    })


    const adminUser = response?.data


    /*
    |--------------------------------------------------------------------------
    | Initialize Edit Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!isEdit || !adminUser) {
            return
        }

        setForm({
            name: adminUser.name || "",
            username: adminUser.username || "",
            email: adminUser.email || "",
            password: "",
            confirmPassword: "",
            role: adminUser.role || "CONTENT_ADMIN",
            is_active: Number(adminUser.is_active) === 1,
            two_factor_enabled:
                Number(adminUser.two_factor_enabled) === 1,
        })
    }, [isEdit, adminUser])


    /*
    |--------------------------------------------------------------------------
    | Update Form Field
    |--------------------------------------------------------------------------
    */

    const updateField = (key, value) => {
        setForm((current) => ({
            ...current,
            [key]: value,
        }))

        setErrors((current) => ({
            ...current,
            [key]: "",
        }))

        setGeneralError("")
        setSuccessMessage("")
    }


    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    const validate = () => {
        const nextErrors = {}

        const cleanName = form.name.trim()
        const cleanUsername = form.username.trim()
        const cleanEmail = form.email.trim()

        if (!cleanName) {
            nextErrors.name = "Full name is required."
        }

        if (!cleanUsername) {
            nextErrors.username = "Username is required."
        } else if (
            !/^[a-zA-Z0-9._-]{3,100}$/.test(cleanUsername)
        ) {
            nextErrors.username =
                "Username must be 3–100 characters and contain only letters, numbers, dots, underscores or hyphens."
        }

        if (!cleanEmail) {
            nextErrors.email = "Email address is required."
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
        ) {
            nextErrors.email = "Enter a valid email address."
        }

        if (!form.role) {
            nextErrors.role = "Select a role."
        }


        /*
        |--------------------------------------------------------------------------
        | Password Validation
        |--------------------------------------------------------------------------
        */

        if (!isEdit && !form.password) {
            nextErrors.password = "Password is required."
        }

        if (
            form.password &&
            form.password.length < 8
        ) {
            nextErrors.password =
                "Password must be at least 8 characters long."
        }

        if (
            form.password &&
            form.password !== form.confirmPassword
        ) {
            nextErrors.confirmPassword =
                "Passwords do not match."
        }

        if (
            !isEdit &&
            form.password &&
            !form.confirmPassword
        ) {
            nextErrors.confirmPassword =
                "Please confirm the password."
        }

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }


    /*
    |--------------------------------------------------------------------------
    | Create Admin User
    |--------------------------------------------------------------------------
    */

    const createMutation = useMutation({
        mutationFn: (payload) =>
            createAdminUser(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            })

            setSuccessMessage(
                "Admin user created successfully."
            )

            setTimeout(() => {
                navigate("/admin/administration/users")
            }, 700)
        },

        onError: (mutationError) => {
            setGeneralError(
                mutationError?.response?.data?.message ||
                mutationError?.message ||
                "Unable to create admin user."
            )
        },
    })


    /*
    |--------------------------------------------------------------------------
    | Update Admin User
    |--------------------------------------------------------------------------
    */

    const updateMutation = useMutation({
        mutationFn: (payload) =>
            updateAdminUser(id, payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            })

            await queryClient.invalidateQueries({
                queryKey: ["admin-user", id],
            })

            setSuccessMessage(
                "Admin user updated successfully."
            )

            setTimeout(() => {
                navigate(
                    `/admin/administration/users/${id}`
                )
            }, 700)
        },

        onError: (mutationError) => {
            setGeneralError(
                mutationError?.response?.data?.message ||
                mutationError?.message ||
                "Unable to update admin user."
            )
        },
    })


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (event) => {
        event.preventDefault()

        setGeneralError("")
        setSuccessMessage("")

        if (!validate()) {
            return
        }

        const payload = {
            name: form.name.trim(),
            username: form.username.trim(),
            email: form.email.trim().toLowerCase(),
            role: form.role,
            is_active: form.is_active,
            two_factor_enabled: form.two_factor_enabled,
        }


        /*
        |--------------------------------------------------------------------------
        | Password
        |--------------------------------------------------------------------------
        |
        | Create:
        | Password is required.
        |
        | Edit:
        | Password is only sent when a new password is entered.
        |
        */

        if (form.password) {
            payload.password = form.password
        }

        if (isEdit) {
            updateMutation.mutate(payload)
        } else {
            createMutation.mutate({
                ...payload,
                password: form.password,
            })
        }
    }


    const isSaving =
        createMutation.isPending ||
        updateMutation.isPending


    /*
    |--------------------------------------------------------------------------
    | Loading Existing User
    |--------------------------------------------------------------------------
    */

    if (isEdit && isLoading) {
        return (
            <div className="min-h-screen bg-[#F6FAF7]">
                <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center px-4">
                    <div className="w-full rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>

                        <h1 className="mt-5 text-lg font-bold text-gray-900">
                            Loading admin user
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Please wait while we load the administrator account.
                        </p>
                    </div>
                </div>
            </div>
        )
    }


    /*
    |--------------------------------------------------------------------------
    | User Loading Error
    |--------------------------------------------------------------------------
    */

    if (isEdit && isError) {
        return (
            <div className="min-h-screen bg-[#F6FAF7] px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <X className="h-6 w-6" />
                    </div>

                    <h1 className="mt-4 text-xl font-bold text-gray-900">
                        Unable to load admin user
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {error?.response?.data?.message ||
                            error?.message ||
                            "The requested administrator account could not be loaded."}
                    </p>

                    <Link
                        to="/admin/administration/users"
                        className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Admin Users
                    </Link>
                </div>
            </div>
        )
    }


    /*
    |--------------------------------------------------------------------------
    | Edit User Not Found
    |--------------------------------------------------------------------------
    */

    if (isEdit && !adminUser) {
        return (
            <div className="min-h-screen bg-[#F6FAF7] px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                        <UserRound className="h-6 w-6" />
                    </div>

                    <h1 className="mt-4 text-xl font-bold text-gray-900">
                        Admin user not found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        The requested administrator account does not exist.
                    </p>

                    <Link
                        to="/admin/administration/users"
                        className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Admin Users
                    </Link>
                </div>
            </div>
        )
    }


    /*
    |--------------------------------------------------------------------------
    | Main UI
    |--------------------------------------------------------------------------
    */

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1200px] px-4 py-6 pb-32 sm:px-6 lg:px-8">

                {/* Header */}

                <div className="mb-6">
                    <Link
                        to="/admin/administration/users"
                        className="kr-hover-link mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Admin Users
                    </Link>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                                <ShieldCheck className="h-4 w-4" />

                                Administration

                                <span className="text-gray-400">
                                    /
                                </span>

                                Admin Users

                                <span className="text-gray-400">
                                    /
                                </span>

                                {isEdit ? "Edit" : "Add"}
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {isEdit
                                    ? "Edit Admin User"
                                    : "Add Admin User"}
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                {isEdit
                                    ? "Update administrator account details, role and security settings."
                                    : "Create a new administrator account and assign the appropriate access role."}
                            </p>
                        </div>

                        {isEdit && (
                            <Link
                                to={`/admin/administration/users/${id}`}
                                className="inline-flex w-fit items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                <Eye className="h-4 w-4" />
                                View User
                            </Link>
                        )}
                    </div>
                </div>


                {/* Success Message */}

                {successMessage && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        {successMessage}
                    </div>
                )}


                {/* General Error */}

                {generalError && (
                    <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        <X className="mt-0.5 h-5 w-5 shrink-0" />

                        <div>
                            <p className="font-semibold">
                                Unable to save admin user
                            </p>

                            <p className="mt-1 font-normal">
                                {generalError}
                            </p>
                        </div>
                    </div>
                )}


                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">

                        {/* Account Information */}

                        <SettingsCard
                            icon={UserRound}
                            title="Account Information"
                            description="Basic details used to identify the administrator."
                        >
                            <div className="grid gap-5 sm:grid-cols-2">

                                <Field
                                    label="Full Name"
                                    value={form.name}
                                    onChange={(value) =>
                                        updateField("name", value)
                                    }
                                    placeholder="Enter full name"
                                    required
                                    error={errors.name}
                                />

                                <Field
                                    label="Username"
                                    value={form.username}
                                    onChange={(value) =>
                                        updateField("username", value)
                                    }
                                    placeholder="Enter username"
                                    required
                                    error={errors.username}
                                />

                                <Field
                                    label="Email Address"
                                    type="email"
                                    value={form.email}
                                    onChange={(value) =>
                                        updateField("email", value)
                                    }
                                    placeholder="admin@example.org"
                                    required
                                    error={errors.email}
                                />

                            </div>
                        </SettingsCard>


                        {/* Access & Role */}

                        <SettingsCard
                            icon={ShieldCheck}
                            title="Access & Role"
                            description="Define which administration role is assigned to this account."
                        >
                            <div className="grid gap-5 sm:grid-cols-2">

                                <SelectField
                                    label="Role"
                                    value={form.role}
                                    onChange={(value) =>
                                        updateField("role", value)
                                    }
                                    options={ROLE_OPTIONS}
                                    required
                                    error={errors.role}
                                />

                                <div>
                                    <label className="block">
                                        <span className="mb-2 block text-sm font-semibold text-gray-700">
                                            Account Status
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateField(
                                                    "is_active",
                                                    !form.is_active
                                                )
                                            }
                                            className={`flex h-11 w-full items-center justify-between rounded-2xl border px-4 text-left transition ${
                                                form.is_active
                                                    ? "border-green-200 bg-green-50"
                                                    : "border-gray-200 bg-gray-50"
                                            }`}
                                        >
                                            <span
                                                className={`text-sm font-semibold ${
                                                    form.is_active
                                                        ? "text-green-700"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {form.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                            <span
                                                className={`relative h-6 w-11 rounded-full transition ${
                                                    form.is_active
                                                        ? "bg-green-600"
                                                        : "bg-gray-300"
                                                }`}
                                            >
                                                <span
                                                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                                                        form.is_active
                                                            ? "left-6"
                                                            : "left-1"
                                                    }`}
                                                />
                                            </span>
                                        </button>
                                    </label>
                                </div>

                            </div>


                            <div className="mt-6 rounded-2xl border border-green-100 bg-green-50/60 p-4">
                                <div className="flex items-start gap-3">
                                    <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />

                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            Assigned role
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-600">
                                            {
                                                ROLE_OPTIONS.find(
                                                    (role) =>
                                                        role.value === form.role
                                                )?.label
                                            }{" "}
                                            determines the administrator's
                                            available access and permissions.
                                        </p>

                                        <Link
                                            to="/admin/administration/roles"
                                            className="mt-2 inline-flex text-xs font-semibold text-green-700 hover:text-green-800"
                                        >
                                            Review role permissions
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </SettingsCard>


                        {/* Security */}

                        <SettingsCard
                            icon={LockKeyhole}
                            title="Security"
                            description={
                                isEdit
                                    ? "Manage the administrator's password and authentication settings."
                                    : "Set the initial password and authentication settings for this account."
                            }
                        >
                            <div className="grid gap-5 sm:grid-cols-2">

                                <Field
                                    label={
                                        isEdit
                                            ? "New Password"
                                            : "Password"
                                    }
                                    type="password"
                                    value={form.password}
                                    onChange={(value) =>
                                        updateField("password", value)
                                    }
                                    placeholder={
                                        isEdit
                                            ? "Leave blank to keep current password"
                                            : "Minimum 8 characters"
                                    }
                                    required={!isEdit}
                                    error={errors.password}
                                />

                                <Field
                                    label="Confirm Password"
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={(value) =>
                                        updateField(
                                            "confirmPassword",
                                            value
                                        )
                                    }
                                    placeholder="Re-enter password"
                                    required={
                                        !isEdit &&
                                        Boolean(form.password)
                                    }
                                    error={errors.confirmPassword}
                                />

                            </div>


                            <div className="mt-5">
                                <ToggleRow
                                    icon={Smartphone}
                                    label="Two-Factor Authentication"
                                    description="Require an additional verification step when signing in."
                                    enabled={form.two_factor_enabled}
                                    onToggle={() =>
                                        updateField(
                                            "two_factor_enabled",
                                            !form.two_factor_enabled
                                        )
                                    }
                                />
                            </div>

                        </SettingsCard>


                        {/* System Information */}

                        {isEdit && adminUser && (
                            <SettingsCard
                                icon={KeyRound}
                                title="System Information"
                                description="System information for this administrator account."
                            >
                                <div className="grid gap-4 sm:grid-cols-2">

                                    <InfoItem
                                        label="Admin ID"
                                        value={adminUser.id}
                                    />

                                    <InfoItem
                                        label="Username"
                                        value={adminUser.username}
                                    />

                                    <InfoItem
                                        label="Last Login"
                                        value={formatDate(
                                            adminUser.last_login_at
                                        )}
                                    />

                                    <InfoItem
                                        label="Failed Login Attempts"
                                        value={
                                            adminUser.failed_login_attempts ?? 0
                                        }
                                    />

                                    <InfoItem
                                        label="Locked Until"
                                        value={formatDate(
                                            adminUser.locked_until
                                        )}
                                    />

                                    <InfoItem
                                        label="Created"
                                        value={formatDate(
                                            adminUser.created_at
                                        )}
                                    />

                                    <InfoItem
                                        label="Updated"
                                        value={formatDate(
                                            adminUser.updated_at
                                        )}
                                    />

                                </div>
                            </SettingsCard>
                        )}


                        {/* Account Checklist */}

                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-900">
                                        Account checklist
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Review these items before saving.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-2 sm:grid-cols-2">

                                <ChecklistItem
                                    checked={Boolean(form.name.trim())}
                                    label="Name provided"
                                />

                                <ChecklistItem
                                    checked={Boolean(form.username.trim())}
                                    label="Username provided"
                                />

                                <ChecklistItem
                                    checked={Boolean(form.email.trim())}
                                    label="Email provided"
                                />

                                <ChecklistItem
                                    checked={Boolean(form.role)}
                                    label="Role assigned"
                                />

                                <ChecklistItem
                                    checked={
                                        isEdit ||
                                        form.password.length >= 8
                                    }
                                    label="Authentication configured"
                                />

                                <ChecklistItem
                                    checked={form.is_active}
                                    label={
                                        form.is_active
                                            ? "Account enabled"
                                            : "Account disabled"
                                    }
                                />

                                <ChecklistItem
                                    checked={form.two_factor_enabled}
                                    label={
                                        form.two_factor_enabled
                                            ? "2FA enabled"
                                            : "2FA disabled"
                                    }
                                />

                            </div>
                        </div>


                        {/* Bottom Actions */}

                        <div className="sticky bottom-4 z-20 rounded-3xl border border-gray-200 bg-white/95 p-4 shadow-xl shadow-gray-900/10 backdrop-blur-sm">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                <Link
                                    to={
                                        isEdit
                                            ? `/admin/administration/users/${id}`
                                            : "/admin/administration/users"
                                    }
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
                                >
                                    <ArrowLeft className="h-4 w-4" />

                                    {isEdit
                                        ? "Back to User"
                                        : "Back to Admin Users"}
                                </Link>


                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />

                                            {isEdit
                                                ? "Saving..."
                                                : "Creating..."}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />

                                            {isEdit
                                                ? "Save Changes"
                                                : "Create Admin User"}
                                        </>
                                    )}
                                </button>

                            </div>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}


/*
|--------------------------------------------------------------------------
| Settings Card
|--------------------------------------------------------------------------
*/

const SettingsCard = ({
    icon: Icon,
    title,
    description,
    children,
}) => {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-start gap-3 border-b border-gray-100 pb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        {description}
                    </p>
                </div>
            </div>

            {children}
        </section>
    )
}


/*
|--------------------------------------------------------------------------
| Input Field
|--------------------------------------------------------------------------
*/

const Field = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    error,
}) => {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </span>

            <input
                type={type}
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                required={required}
                autoComplete={
                    type === "password"
                        ? "new-password"
                        : undefined
                }
                className={`h-11 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:bg-white focus:ring-4 ${
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                }`}
            />

            {error && (
                <span className="mt-1.5 block text-xs font-medium text-red-600">
                    {error}
                </span>
            )}
        </label>
    )
}


/*
|--------------------------------------------------------------------------
| Select Field
|--------------------------------------------------------------------------
*/

const SelectField = ({
    label,
    value,
    onChange,
    options,
    required = false,
    error,
}) => {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </span>

            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                required={required}
                className={`h-11 w-full rounded-2xl border bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:bg-white focus:ring-4 ${
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                }`}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <span className="mt-1.5 block text-xs font-medium text-red-600">
                    {error}
                </span>
            )}
        </label>
    )
}


/*
|--------------------------------------------------------------------------
| Toggle
|--------------------------------------------------------------------------
*/

const ToggleRow = ({
    icon: Icon,
    label,
    description,
    enabled,
    onToggle,
}) => {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
            <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                    <Icon className="h-4 w-4" />
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-800">
                        {label}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        {description}
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={onToggle}
                aria-label={`Toggle ${label}`}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    enabled
                        ? "bg-green-600"
                        : "bg-gray-300"
                }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        enabled
                            ? "left-6"
                            : "left-1"
                    }`}
                />
            </button>
        </div>
    )
}


/*
|--------------------------------------------------------------------------
| Information Item
|--------------------------------------------------------------------------
*/

const InfoItem = ({
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-semibold text-gray-700">
                {value || "—"}
            </p>
        </div>
    )
}


/*
|--------------------------------------------------------------------------
| Checklist Item
|--------------------------------------------------------------------------
*/

const ChecklistItem = ({
    checked,
    label,
}) => {
    return (
        <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
            <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    checked
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-400"
                }`}
            >
                {checked && (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                )}
            </div>

            <span
                className={`text-xs font-medium ${
                    checked
                        ? "text-gray-700"
                        : "text-gray-400"
                }`}
            >
                {label}
            </span>
        </div>
    )
}


/*
|--------------------------------------------------------------------------
| Date Formatter
|--------------------------------------------------------------------------
*/

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


export default AdminUserEditor