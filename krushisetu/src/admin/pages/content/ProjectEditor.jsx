import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

import {
    ArrowLeft,
    BriefcaseBusiness,
    CalendarDays,
    ChevronDown,
    FileText,
    Info,
    MapPin,
    Save,
} from "lucide-react"

import Loader from "../../../components/common/Loader"

import {
    createAdminProject,
    getAdminProjectById,
    updateAdminProject,
} from "../../api/adminProjectsApi.js"

import axiosInstance from "../../../api/axiosInstance.js"

const emptyForm = {
    title: "",
    slug: "",
    theme: "",
    department_id: "",
    status: "PLANNING",
    geography: "",
    start_date: "",
    end_date: "",
    target_group: "",
    partners: "",
    summary: "",
    problem_statement: "",
    activities: "",
    outcomes: "",
    media_url: "",
    documents: "",
}

const statusOptions = [
    {
        value: "PLANNING",
        label: "Planning",
    },
    {
        value: "ACTIVE",
        label: "Active",
    },
    {
        value: "COMPLETED",
        label: "Completed",
    },
    {
        value: "ON_HOLD",
        label: "On Hold",
    },
]

const formatDateForInput = (date) => {
    if (!date) {
        return ""
    }

    if (typeof date === "string") {
        const match = date.match(/^\d{4}-\d{2}-\d{2}/)

        if (match) {
            return match[0]
        }
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return ""
    }

    const year = parsedDate.getFullYear()
    const month = String(
        parsedDate.getMonth() + 1
    ).padStart(2, "0")
    const day = String(
        parsedDate.getDate()
    ).padStart(2, "0")

    return `${year}-${month}-${day}`
}

const createSlug = (value) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
}

const getStatusLabel = (status) => {
    const found = statusOptions.find(
        (item) => item.value === status
    )

    return found?.label || status || "—"
}

const getStatusClasses = (status) => {
    switch (status) {
        case "ACTIVE":
            return "border-green-200 bg-green-50 text-green-700"

        case "PLANNING":
            return "border-amber-200 bg-amber-50 text-amber-700"

        case "COMPLETED":
            return "border-blue-200 bg-blue-50 text-blue-700"

        case "ON_HOLD":
            return "border-orange-200 bg-orange-50 text-orange-700"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}

const getDepartments = async () => {
    const response = await axiosInstance.get(
        "/admin/departments"
    )

    return response.data
}

const ProjectEditor = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const isEditMode = Boolean(id)

    const [form, setForm] = useState(emptyForm)

    const [validationErrors, setValidationErrors] =
        useState({})

    const [successMessage, setSuccessMessage] =
        useState("")

    const [errorMessage, setErrorMessage] =
        useState("")

    /* -----------------------------
       Existing Project
    ----------------------------- */

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-project", id],
        queryFn: () => getAdminProjectById(id),
        enabled: isEditMode,
    })

    /* -----------------------------
       Departments
    ----------------------------- */

    const {
        data: departmentsData,
        isLoading: departmentsLoading,
    } = useQuery({
        queryKey: ["admin-departments"],
        queryFn: getDepartments,
    })

    const project =
        data?.project ||
        data?.data ||
        null

    const departments =
        departmentsData?.departments ||
        departmentsData?.data ||
        []

    /* -----------------------------
       Populate Edit Form
    ----------------------------- */

    useEffect(() => {
        if (!project) {
            return
        }

        setForm({
            title: project.title || "",

            slug: project.slug || "",

            theme: project.theme || "",

            department_id:
                project.department_id !== null &&
                project.department_id !== undefined
                    ? String(project.department_id)
                    : "",

            status:
                project.status ||
                "PLANNING",

            geography:
                project.geography || "",

            start_date:
                formatDateForInput(
                    project.start_date
                ),

            end_date:
                formatDateForInput(
                    project.end_date
                ),

            target_group:
                project.target_group || "",

            partners:
                project.partners || "",

            summary:
                project.summary || "",

            problem_statement:
                project.problem_statement || "",

            activities:
                project.activities || "",

            outcomes:
                project.outcomes || "",

            media_url:
                project.media_url || "",

            documents:
                project.documents || "",
        })
    }, [project])

    /* -----------------------------
       Field Update
    ----------------------------- */

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }))

        setValidationErrors((previous) => {
            if (!previous[field]) {
                return previous
            }

            const updated = {
                ...previous,
            }

            delete updated[field]

            return updated
        })

        setSuccessMessage("")
        setErrorMessage("")
    }

    /* -----------------------------
       Title + Auto Slug
    ----------------------------- */

    const handleTitleChange = (value) => {
        setForm((previous) => ({
            ...previous,

            title: value,

            ...(isEditMode
                ? {}
                : {
                      slug: createSlug(value),
                  }),
        }))

        setValidationErrors((previous) => {
            const updated = {
                ...previous,
            }

            delete updated.title
            delete updated.slug

            return updated
        })

        setSuccessMessage("")
        setErrorMessage("")
    }

    /* -----------------------------
       Validation
    ----------------------------- */

    const validateForm = () => {
        const errors = {}

        if (!form.title.trim()) {
            errors.title =
                "Project title is required."
        }

        if (!form.slug.trim()) {
            errors.slug =
                "Project slug is required."
        }

        if (!form.status) {
            errors.status =
                "Project status is required."
        }

        if (
            form.start_date &&
            form.end_date &&
            form.end_date < form.start_date
        ) {
            errors.end_date =
                "End date cannot be earlier than start date."
        }

        setValidationErrors(errors)

        return Object.keys(errors).length === 0
    }

    /* -----------------------------
       Save Mutation
    ----------------------------- */

    const saveMutation = useMutation({
        mutationFn: (payload) => {
            if (isEditMode) {
                return updateAdminProject(
                    id,
                    payload
                )
            }

            return createAdminProject(payload)
        },

        onSuccess: async (response) => {
            setSuccessMessage(
                response?.message ||
                    (isEditMode
                        ? "Project updated successfully."
                        : "Project created successfully.")
            )

            setErrorMessage("")
            setValidationErrors({})

            await queryClient.invalidateQueries({
                queryKey: ["admin-projects"],
            })

            if (isEditMode) {
                await queryClient.invalidateQueries({
                    queryKey: [
                        "admin-project",
                        id,
                    ],
                })

                return
            }

            const createdProject =
                response?.project ||
                response?.data

            if (createdProject?.id) {
                navigate(
                    `/admin/content/projects/${createdProject.id}/edit`
                )

                return
            }

            navigate(
                "/admin/content/projects"
            )
        },

        onError: (mutationError) => {
            setSuccessMessage("")

            setErrorMessage(
                mutationError?.response?.data
                    ?.message ||
                    (isEditMode
                        ? "Failed to update project."
                        : "Failed to create project.")
            )
        },
    })

    /* -----------------------------
       Save
    ----------------------------- */

    const handleSave = () => {
        setSuccessMessage("")
        setErrorMessage("")

        if (!validateForm()) {
            return
        }

        const payload = {
            title: form.title.trim(),

            slug: form.slug.trim(),

            theme:
                form.theme.trim() || null,

            department_id: form.department_id
                ? Number(form.department_id)
                : null,

            status: form.status,

            geography:
                form.geography.trim() || null,

            start_date:
                form.start_date || null,

            end_date:
                form.end_date || null,

            target_group:
                form.target_group.trim() || null,

            partners:
                form.partners.trim() || null,

            summary:
                form.summary.trim() || null,

            problem_statement:
                form.problem_statement.trim() ||
                null,

            activities:
                form.activities.trim() || null,

            outcomes:
                form.outcomes.trim() || null,

            media_url:
                form.media_url.trim() || null,

            documents:
                form.documents.trim() || null,
        }

        saveMutation.mutate(payload)
    }

    /* -----------------------------
       Loading
    ----------------------------- */

    if (isEditMode && isLoading) {
        return (
            <Loader text="Loading project..." />
        )
    }

    /* -----------------------------
       Error
    ----------------------------- */

    if (isEditMode && isError) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1400px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <BriefcaseBusiness className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load project
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data
                                ?.message ||
                                "Something went wrong while fetching the project."}
                        </p>

                        <Link
                            to="/admin/content/projects"
                            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/projects"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-1 flex flex-wrap items-center gap-2 text-sm font-medium text-green-700">
                                <BriefcaseBusiness className="h-4 w-4" />

                                <span>
                                    Content Management
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    Projects
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-green-700">
                                    {isEditMode
                                        ? "Edit"
                                        : "New"}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {isEditMode
                                    ? "Edit Project"
                                    : "Create Project"}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Manage project information and
                                implementation details.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/admin/content/projects"
                            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            Cancel
                        </Link>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={
                                saveMutation.isPending
                            }
                            className="inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saveMutation.isPending ? (
                                <Loader
                                    variant="button"
                                    text="Saving..."
                                />
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />

                                    {isEditMode
                                        ? "Save Changes"
                                        : "Create Project"}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Messages */}

                {(successMessage ||
                    errorMessage) && (
                    <div
                        className={`rounded-2xl border px-4 py-3 text-sm ${
                            errorMessage
                                ? "border-red-100 bg-red-50 text-red-700"
                                : "border-green-100 bg-green-50 text-green-700"
                        }`}
                    >
                        {errorMessage ||
                            successMessage}
                    </div>
                )}

                {/* Status */}

                <div className="flex flex-col gap-4 rounded-3xl border border-green-100 bg-green-50/60 p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <Info className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-green-900">
                                Project status
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-green-800/80">
                                The status is stored directly in
                                the project record.
                            </p>
                        </div>
                    </div>

                    <span
                        className={`w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                            form.status
                        )}`}
                    >
                        {getStatusLabel(
                            form.status
                        )}
                    </span>
                </div>

                {/* Form */}

                <div className="space-y-6">

                    {/* Basic Information */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-6">
                            <h2 className="text-base font-bold text-gray-900">
                                Basic Information
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Core information stored in the
                                project record.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Title */}

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Project Title
                                </label>

                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) =>
                                        handleTitleChange(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter project title"
                                    className={`h-11 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                        validationErrors.title
                                            ? "border-red-300 focus:border-red-300"
                                            : "border-gray-200 focus:border-green-300"
                                    }`}
                                />

                                {validationErrors.title && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {
                                            validationErrors.title
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Slug */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    URL Slug
                                </label>

                                <input
                                    type="text"
                                    value={form.slug}
                                    onChange={(e) =>
                                        updateField(
                                            "slug",
                                            e.target.value
                                        )
                                    }
                                    placeholder="project-url-slug"
                                    className={`h-11 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                        validationErrors.slug
                                            ? "border-red-300 focus:border-red-300"
                                            : "border-gray-200 focus:border-green-300"
                                    }`}
                                />

                                {validationErrors.slug ? (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {
                                            validationErrors.slug
                                        }
                                    </p>
                                ) : (
                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Used in the public project URL.
                                    </p>
                                )}
                            </div>

                            {/* Theme */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Theme
                                </label>

                                <input
                                    type="text"
                                    value={form.theme}
                                    onChange={(e) =>
                                        updateField(
                                            "theme",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Project theme"
                                    className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>

                            {/* Department */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Department
                                </label>

                                <div className="relative">
                                    <select
                                        value={
                                            form.department_id
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "department_id",
                                                e.target.value
                                            )
                                        }
                                        disabled={
                                            departmentsLoading
                                        }
                                        className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-800 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <option value="">
                                            {departmentsLoading
                                                ? "Loading departments..."
                                                : "Select department"}
                                        </option>

                                        {departments.map(
                                            (department) => (
                                                <option
                                                    key={
                                                        department.id
                                                    }
                                                    value={
                                                        department.id
                                                    }
                                                >
                                                    {
                                                        department.title
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Status */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Project Status
                                </label>

                                <div className="relative">
                                    <select
                                        value={
                                            form.status
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "status",
                                                e.target.value
                                            )
                                        }
                                        className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-800 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                    >
                                        {statusOptions.map(
                                            (status) => (
                                                <option
                                                    key={
                                                        status.value
                                                    }
                                                    value={
                                                        status.value
                                                    }
                                                >
                                                    {
                                                        status.label
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>

                                {validationErrors.status && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {
                                            validationErrors.status
                                        }
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Timeline & Location */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-6">
                            <h2 className="text-base font-bold text-gray-900">
                                Timeline & Location
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Define when and where the project is
                                being implemented.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Start Date */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Start Date
                                </label>

                                <div className="relative">
                                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="date"
                                        value={
                                            form.start_date
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "start_date",
                                                e.target.value
                                            )
                                        }
                                        className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                    />
                                </div>
                            </div>

                            {/* End Date */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    End Date
                                </label>

                                <div className="relative">
                                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="date"
                                        value={
                                            form.end_date
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "end_date",
                                                e.target.value
                                            )
                                        }
                                        className={`h-11 w-full rounded-2xl border bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                            validationErrors.end_date
                                                ? "border-red-300 focus:border-red-300"
                                                : "border-gray-200 focus:border-green-300"
                                        }`}
                                    />
                                </div>

                                {validationErrors.end_date && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {
                                            validationErrors.end_date
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Geography */}

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Geography
                                </label>

                                <div className="relative">
                                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        value={
                                            form.geography
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "geography",
                                                e.target.value
                                            )
                                        }
                                        placeholder="District, State or project area"
                                        className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                    />
                                </div>
                            </div>

                            {/* Target Group */}

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Target Group
                                </label>

                                <input
                                    type="text"
                                    value={
                                        form.target_group
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "target_group",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Farmers, FPOs, rural communities, etc."
                                    className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Project Content */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-6">
                            <h2 className="text-base font-bold text-gray-900">
                                Project Content
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Add the project information stored in
                                the database.
                            </p>
                        </div>

                        <div className="space-y-5">

                            {/* Summary */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Summary
                                </label>

                                <textarea
                                    value={
                                        form.summary
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "summary",
                                            e.target.value
                                        )
                                    }
                                    rows={4}
                                    placeholder="Write a short project summary..."
                                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>

                            {/* Problem Statement */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Problem Statement
                                </label>

                                <textarea
                                    value={
                                        form.problem_statement
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "problem_statement",
                                            e.target.value
                                        )
                                    }
                                    rows={5}
                                    placeholder="Describe the problem this project addresses..."
                                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>

                            {/* Activities */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Activities
                                </label>

                                <textarea
                                    value={
                                        form.activities
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "activities",
                                            e.target.value
                                        )
                                    }
                                    rows={6}
                                    placeholder="Describe the main project activities..."
                                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>

                            {/* Outcomes */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Outcomes
                                </label>

                                <textarea
                                    value={
                                        form.outcomes
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "outcomes",
                                            e.target.value
                                        )
                                    }
                                    rows={6}
                                    placeholder="Describe the expected or achieved project outcomes..."
                                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>

                            {/* Partners */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Partners
                                </label>

                                <textarea
                                    value={
                                        form.partners
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "partners",
                                            e.target.value
                                        )
                                    }
                                    rows={4}
                                    placeholder="Project partners or collaborating organisations..."
                                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media & Documents */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-6">
                            <h2 className="text-base font-bold text-gray-900">
                                Media & Documents
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Store the approved media and document
                                URLs associated with this project.
                            </p>
                        </div>

                        <div className="space-y-5">

                            {/* Media URL */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Media URL
                                </label>

                                <div className="relative">
                                    <FileText className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-gray-400" />

                                    <textarea
                                        value={
                                            form.media_url
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "media_url",
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                        placeholder="https://..."
                                        className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                    />
                                </div>
                            </div>

                            {/* Documents */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Documents
                                </label>

                                <textarea
                                    value={
                                        form.documents
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "documents",
                                            e.target.value
                                        )
                                    }
                                    rows={5}
                                    placeholder="Document URL(s) or document information..."
                                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}

                    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white px-3 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            to="/admin/content/projects"
                            className="inline-flex items-center justify-center gap-3 rounded-2xl px-4 py-2 text-md font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ArrowLeft size={18} />
                            Back to Projects
                        </Link>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={
                                saveMutation.isPending
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-3 text-md font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saveMutation.isPending ? (
                                <Loader
                                    variant="button"
                                    text="Saving..."
                                />
                            ) : (
                                <>
                                    <Save size={21} />

                                    {isEditMode
                                        ? "Save Changes"
                                        : "Create Project"}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectEditor