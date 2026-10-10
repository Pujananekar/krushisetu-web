import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    FileText,
    Info,
    MapPin,
    Save,
    ShieldCheck,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import {
    createAdminImpactIndicator,
    getAdminImpactIndicatorById,
    updateAdminImpactIndicator,
} from "../../api/adminImpactApi.js"
import { getAdminProjects } from "../../api/adminProjectsApi.js"

const approvalStatuses = [
    {
        value: "DRAFT",
        label: "Draft",
    },
    {
        value: "PENDING",
        label: "Pending",
    },
    {
        value: "APPROVED",
        label: "Approved",
    },
    {
        value: "REJECTED",
        label: "Rejected",
    },
]

const createEmptyForm = () => ({
    project_id: "",
    department_id: "",
    indicator_name: "",
    value: "",
    unit: "",
    period_from: "",
    period_to: "",
    location: "",
    evidence_note: "",
    approval_status: "DRAFT",
    notes: "",
})

const formatDateForInput = (date) => {
    if (!date) {
        return ""
    }

    const value = String(date)

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value
    }

    const parsedDate = new Date(value)

    if (Number.isNaN(parsedDate.getTime())) {
        return ""
    }

    const year = parsedDate.getFullYear()
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
    const day = String(parsedDate.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

const formatDate = (date) => {
    if (!date) {
        return "Not set"
    }

    const value = formatDateForInput(date)

    if (!value) {
        return "Not set"
    }

    return new Date(`${value}T00:00:00`).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    )
}

const getProjectName = (project) => {
    return (
        project?.title ||
        project?.project_name ||
        project?.name ||
        `Project #${project?.id}`
    )
}

const getDepartmentName = (project) => {
    return (
        project?.department_name ||
        project?.department ||
        "No department"
    )
}

const ImpactEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const isEditMode = Boolean(id)

    const [formData, setFormData] = useState(createEmptyForm)
    const [validationErrors, setValidationErrors] = useState({})

    const {
        data: indicatorData,
        isLoading: isIndicatorLoading,
        isError: isIndicatorError,
        error: indicatorError,
        refetch: refetchIndicator,
    } = useQuery({
        queryKey: ["admin-impact-indicator", id],
        queryFn: () => getAdminImpactIndicatorById(id),
        enabled: isEditMode,
    })

    const {
        data: projectsData,
        isLoading: isProjectsLoading,
        isError: isProjectsError,
    } = useQuery({
        queryKey: ["admin-projects"],
        queryFn: getAdminProjects,
    })

    const projects = projectsData?.projects ?? []

    useEffect(() => {
        if (!isEditMode) {
            setFormData(createEmptyForm())
            return
        }

        const indicator =
            indicatorData?.impactIndicator ||
            indicatorData?.impact_indicator ||
            indicatorData?.indicator

        if (!indicator) {
            return
        }

        setFormData({
            project_id: indicator.project_id ?? "",
            department_id: indicator.department_id ?? "",
            indicator_name: indicator.indicator_name ?? "",
            value:
                indicator.value !== null &&
                indicator.value !== undefined
                    ? String(indicator.value)
                    : "",
            unit: indicator.unit ?? "",
            period_from: formatDateForInput(
                indicator.period_from
            ),
            period_to: formatDateForInput(
                indicator.period_to
            ),
            location: indicator.location ?? "",
            evidence_note: indicator.evidence_note ?? "",
            approval_status:
                indicator.approval_status ?? "DRAFT",
            notes: indicator.notes ?? "",
        })
    }, [isEditMode, indicatorData])

    const saveMutation = useMutation({
        mutationFn: async (payload) => {
            if (isEditMode) {
                return updateAdminImpactIndicator(id, payload)
            }

            return createAdminImpactIndicator(payload)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin-impact"],
            })

            if (isEditMode) {
                await queryClient.invalidateQueries({
                    queryKey: [
                        "admin-impact-indicator",
                        id,
                    ],
                })
            }

            navigate("/admin/content/impact")
        },
    })

    const updateField = (field, value) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }))

        setValidationErrors((previous) => ({
            ...previous,
            [field]: "",
        }))
    }

    const validateForm = () => {
        const errors = {}

        if (!formData.indicator_name.trim()) {
            errors.indicator_name =
                "Indicator name is required."
        }

        if (
            formData.value === "" ||
            formData.value === null ||
            Number.isNaN(Number(formData.value))
        ) {
            errors.value = "Value is required."
        }

        if (!formData.unit.trim()) {
            errors.unit = "Unit is required."
        }

        if (
            formData.period_from &&
            formData.period_to &&
            formData.period_from > formData.period_to
        ) {
            errors.period_to =
                "Period To cannot be before Period From."
        }

        if (
            !formData.project_id &&
            !formData.department_id
        ) {
            errors.project_id =
                "Select a project or department."
        }

        setValidationErrors(errors)

        return Object.keys(errors).length === 0
    }

    const handleSave = () => {
        if (!validateForm()) {
            return
        }

        const payload = {
            project_id: formData.project_id
                ? Number(formData.project_id)
                : null,
            department_id: formData.department_id
                ? Number(formData.department_id)
                : null,
            indicator_name: formData.indicator_name.trim(),
            value: Number(formData.value),
            unit: formData.unit.trim(),
            period_from: formData.period_from || null,
            period_to: formData.period_to || null,
            location: formData.location.trim() || null,
            evidence_note:
                formData.evidence_note.trim() || null,
            approval_status: formData.approval_status,
            notes: formData.notes.trim() || null,
        }

        saveMutation.mutate(payload)
    }

    if (isEditMode && isIndicatorLoading) {
        return <Loader text="Loading impact indicator..." />
    }

    if (isEditMode && isIndicatorError) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1200px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <BarChart3 className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load impact indicator
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {indicatorError?.response?.data
                                ?.message ||
                                "Something went wrong while loading this indicator."}
                        </p>

                        <button
                            type="button"
                            onClick={() => refetchIndicator()}
                            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    if (isProjectsLoading) {
        return <Loader text="Loading projects..." />
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1200px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/impact"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-green-700">
                                <BarChart3 className="h-4 w-4" />

                                <span>
                                    Projects & Impact
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    {isEditMode
                                        ? "Edit Indicator"
                                        : "New Indicator"}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {isEditMode
                                    ? "Edit Impact Indicator"
                                    : "Add Impact Indicator"}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Record a measurable project outcome
                                with its reporting period, location
                                and evidence.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/content/impact"
                                )
                            }
                            className="rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saveMutation.isPending}
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
                                        : "Save Indicator"}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Error */}
                {saveMutation.isError && (
                    <div className="rounded-3xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
                        {saveMutation.error?.response?.data
                            ?.message ||
                            "Unable to save the impact indicator."}
                    </div>
                )}

                {/* Information banner */}
                <div className="flex flex-col gap-4 rounded-3xl border border-green-100 bg-green-50/60 p-5 sm:flex-row sm:items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                        <Info className="h-5 w-5" />
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-green-900">
                            Evidence-based reporting
                        </h2>

                        <p className="mt-1 max-w-3xl text-xs leading-5 text-green-800/80">
                            Add the measurement exactly as supported by
                            the relevant project records. Evidence and
                            approval information should be kept with
                            the indicator.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">

                    {/* Main form */}
                    <div className="space-y-6">

                        {/* Project association */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900">
                                    Project Association
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Connect this measurement with the
                                    project and department responsible
                                    for it.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <SelectField
                                        label="Project"
                                        value={
                                            formData.project_id
                                        }
                                        onChange={(value) => {
                                            const project =
                                                projects.find(
                                                    (item) =>
                                                        String(
                                                            item.id
                                                        ) ===
                                                        String(
                                                            value
                                                        )
                                                )

                                            updateField(
                                                "project_id",
                                                value
                                            )

                                            if (
                                                project?.department_id
                                            ) {
                                                updateField(
                                                    "department_id",
                                                    String(
                                                        project.department_id
                                                    )
                                                )
                                            }
                                        }}
                                        options={projects.map(
                                            (project) => ({
                                                value: String(
                                                    project.id
                                                ),
                                                label: getProjectName(
                                                    project
                                                ),
                                            })
                                        )}
                                        placeholder="Select project"
                                    />

                                    {validationErrors.project_id && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {
                                                validationErrors.project_id
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Department
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            projects.find(
                                                (project) =>
                                                    String(
                                                        project.id
                                                    ) ===
                                                    String(
                                                        formData.project_id
                                                    )
                                            )?.department_name ||
                                            "—"
                                        }
                                        readOnly
                                        className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 text-sm text-gray-600 outline-none"
                                    />

                                    <p className="mt-2 text-xs text-gray-400">
                                        Department is taken from the
                                        selected project.
                                    </p>
                                </div>
                            </div>

                            {isProjectsError && (
                                <p className="mt-4 text-sm text-red-600">
                                    Unable to load projects.
                                </p>
                            )}
                        </div>

                        {/* Measurement */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900">
                                    Measurement
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Define what is being measured and
                                    record the corresponding value and
                                    unit.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Indicator Name
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            formData.indicator_name
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "indicator_name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. Farmers trained"
                                        className={`h-11 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                                            validationErrors.indicator_name
                                                ? "border-red-300 focus:border-red-300 focus:ring-red-50"
                                                : "border-gray-200 focus:border-green-300 focus:ring-green-50"
                                        }`}
                                    />

                                    {validationErrors.indicator_name && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {
                                                validationErrors.indicator_name
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Value
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.value}
                                        onChange={(e) =>
                                            updateField(
                                                "value",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter measured value"
                                        className={`h-11 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                                            validationErrors.value
                                                ? "border-red-300 focus:border-red-300 focus:ring-red-50"
                                                : "border-gray-200 focus:border-green-300 focus:ring-green-50"
                                        }`}
                                    />

                                    {validationErrors.value && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {
                                                validationErrors.value
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Unit
                                    </label>

                                    <input
                                        type="text"
                                        value={formData.unit}
                                        onChange={(e) =>
                                            updateField(
                                                "unit",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. Farmers, Acres, Percentage"
                                        className={`h-11 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                                            validationErrors.unit
                                                ? "border-red-300 focus:border-red-300 focus:ring-red-50"
                                                : "border-gray-200 focus:border-green-300 focus:ring-green-50"
                                        }`}
                                    />

                                    {validationErrors.unit && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {validationErrors.unit}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Reporting period */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900">
                                    Reporting Period
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Specify the period covered by this
                                    measurement.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <DateField
                                    label="Period From"
                                    value={
                                        formData.period_from
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "period_from",
                                            value
                                        )
                                    }
                                />

                                <div>
                                    <DateField
                                        label="Period To"
                                        value={
                                            formData.period_to
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "period_to",
                                                value
                                            )
                                        }
                                    />

                                    {validationErrors.period_to && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {
                                                validationErrors.period_to
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900">
                                    Location
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Record the geographic area associated
                                    with this measurement.
                                </p>
                            </div>

                            <div className="relative">
                                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) =>
                                        updateField(
                                            "location",
                                            e.target.value
                                        )
                                    }
                                    placeholder="City, District, State or Region"
                                    className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>
                        </div>

                        {/* Evidence */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <FileText className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Evidence & Notes
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Document the source or supporting
                                        evidence for the reported value.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Evidence Note
                                    </label>

                                    <textarea
                                        value={
                                            formData.evidence_note
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "evidence_note",
                                                e.target.value
                                            )
                                        }
                                        rows="5"
                                        placeholder="Describe the evidence supporting this indicator..."
                                        className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Internal Notes
                                    </label>

                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) =>
                                            updateField(
                                                "notes",
                                                e.target.value
                                            )
                                        }
                                        rows="4"
                                        placeholder="Add internal review notes..."
                                        className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* Approval */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Approval
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Set the review state of this
                                        indicator.
                                    </p>
                                </div>
                            </div>

                            <SelectField
                                label="Approval Status"
                                value={
                                    formData.approval_status
                                }
                                onChange={(value) =>
                                    updateField(
                                        "approval_status",
                                        value
                                    )
                                }
                                options={approvalStatuses}
                                placeholder="Select status"
                            />

                            <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                                <div className="flex items-start gap-2">
                                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                    <p className="text-xs leading-5 text-gray-500">
                                        Approved indicators can be used
                                        in public impact reporting.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Measurement summary */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900">
                                Measurement Summary
                            </h2>

                            <div className="mt-5 space-y-3">
                                <SummaryRow
                                    label="Indicator"
                                    value={
                                        formData.indicator_name ||
                                        "Not set"
                                    }
                                />

                                <SummaryRow
                                    label="Value"
                                    value={
                                        formData.value
                                            ? `${Number(
                                                  formData.value
                                              ).toLocaleString(
                                                  "en-IN"
                                              )} ${
                                                  formData.unit ||
                                                  ""
                                              }`
                                            : "Not set"
                                    }
                                />

                                <SummaryRow
                                    label="Period"
                                    value={
                                        formData.period_from ||
                                        formData.period_to
                                            ? `${formatDate(
                                                  formData.period_from
                                              )} - ${formatDate(
                                                  formData.period_to
                                              )}`
                                            : "Not set"
                                    }
                                />

                                <SummaryRow
                                    label="Location"
                                    value={
                                        formData.location ||
                                        "Not set"
                                    }
                                />
                            </div>
                        </div>

                        {/* Quality checklist */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900">
                                Quality Checklist
                            </h2>

                            <div className="mt-5 space-y-3">
                                <ChecklistItem
                                    label="Project or department selected"
                                    complete={
                                        Boolean(
                                            formData.project_id
                                        ) ||
                                        Boolean(
                                            formData.department_id
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Indicator defined"
                                    complete={Boolean(
                                        formData.indicator_name
                                    )}
                                />

                                <ChecklistItem
                                    label="Value and unit entered"
                                    complete={
                                        Boolean(
                                            formData.value
                                        ) &&
                                        Boolean(formData.unit)
                                    }
                                />

                                <ChecklistItem
                                    label="Reporting period entered"
                                    complete={
                                        Boolean(
                                            formData.period_from
                                        ) &&
                                        Boolean(
                                            formData.period_to
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Location entered"
                                    complete={Boolean(
                                        formData.location
                                    )}
                                />

                                <ChecklistItem
                                    label="Evidence note added"
                                    complete={Boolean(
                                        formData.evidence_note
                                    )}
                                />
                            </div>
                        </div>

                        {/* Save */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={
                                    saveMutation.isPending
                                }
                                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
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
                                            : "Save Indicator"}
                                    </>
                                )}
                            </button>

                            <Link
                                to="/admin/content/impact"
                                className="mt-3 flex h-11 w-full items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Cancel
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}

const SelectField = ({
    label,
    value,
    onChange,
    options,
    placeholder,
}) => {
    return (
        <div>
            {label && (
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-800 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                >
                    <option value="">
                        {placeholder || "Select option"}
                    </option>

                    {options.map((option) => {
                        const normalized =
                            typeof option === "string"
                                ? {
                                      value: option,
                                      label: option,
                                  }
                                : option

                        return (
                            <option
                                key={normalized.value}
                                value={normalized.value}
                            >
                                {normalized.label}
                            </option>
                        )
                    })}
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    )
}

const DateField = ({
    label,
    value,
    onChange,
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
                {label}
            </label>

            <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    type="date"
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                />
            </div>
        </div>
    )
}

const SummaryRow = ({
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl bg-gray-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold leading-5 text-gray-800">
                {value}
            </p>
        </div>
    )
}

const ChecklistItem = ({
    label,
    complete,
}) => {
    return (
        <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
            <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    complete
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-400"
                }`}
            >
                <CheckCircle2 className="h-4 w-4" />
            </div>

            <span
                className={`text-xs font-medium ${
                    complete
                        ? "text-gray-700"
                        : "text-gray-400"
                }`}
            >
                {label}
            </span>
        </div>
    )
}

export default ImpactEditor