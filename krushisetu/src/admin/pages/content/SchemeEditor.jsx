import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"
import {
    AlertCircle,
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    FileCheck2,
    FileText,
    Globe2,
    Landmark,
    Link2,
    Plus,
    Save,
    ShieldCheck,
    Trash2,
} from "lucide-react"

import {
    createAdminScheme,
    getAdminSchemeById,
    updateAdminScheme,
} from "../../api/adminSchemesApi"

import Loader from "../../../components/common/Loader"

const categories = [
    "Financial Support",
    "Crop Insurance",
    "Credit & Finance",
    "Infrastructure",
    "Irrigation",
    "Farm Machinery",
    "FPO Support",
    "Soil Health",
    "Horticulture",
    "Other",
]

const createEmptyForm = () => ({
    name: "",
    slug: "",
    authority: "",
    level: "CENTRAL",
    category: "Financial Support",
    beneficiary: "",
    overview: "",
    eligibility: "",
    benefits: "",
    documents: [""],
    steps: [""],
    official_url: "",
    deadline: "",
    status: "ACTIVE",
    last_verified: "",
    geography: "",
    disclaimer: "",
})

const inputClass =
    "h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-100"

const textareaClass =
    "w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-7 text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-100"

const selectClass =
    "h-12 w-full cursor-pointer appearance-none rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-all duration-200 hover:border-gray-300 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-100"

const normalizeArray = (value) => {
    if (Array.isArray(value)) {
        return value.length > 0 ? value : [""]
    }

    if (typeof value === "string") {
        const items = value
            .split(/\r?\n/)
            .map((item) => item.trim())
            .filter(Boolean)

        return items.length > 0 ? items : [""]
    }

    return [""]
}

const normalizeDate = (value) => {
    if (!value) {
        return ""
    }

    if (typeof value === "string") {
        return value.slice(0, 10)
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return ""
    }

    return date.toISOString().slice(0, 10)
}

const schemeToForm = (scheme) => {
    if (!scheme) {
        return createEmptyForm()
    }

    return {
        name: scheme.name ?? "",
        slug: scheme.slug ?? "",
        authority: scheme.authority ?? "",
        level: scheme.level ?? "CENTRAL",
        category: scheme.category ?? "Financial Support",
        beneficiary: scheme.beneficiary ?? "",
        overview: scheme.overview ?? "",
        eligibility: scheme.eligibility ?? "",
        benefits: scheme.benefits ?? "",
        documents: normalizeArray(scheme.documents),
        steps: normalizeArray(scheme.steps),
        official_url: scheme.official_url ?? "",
        deadline: normalizeDate(scheme.deadline),
        status: scheme.status ?? "ACTIVE",
        last_verified: normalizeDate(scheme.last_verified),
        geography: scheme.geography ?? "",
        disclaimer: scheme.disclaimer ?? "",
    }
}

const formToPayload = (form) => {
    const documents = form.documents
        .map((item) => item.trim())
        .filter(Boolean)

    const steps = form.steps
        .map((item) => item.trim())
        .filter(Boolean)

    return {
        name: form.name.trim(),
        slug: form.slug.trim(),
        authority: form.authority.trim(),
        level: form.level,
        category: form.category.trim(),
        beneficiary: form.beneficiary.trim(),
        overview: form.overview.trim(),
        eligibility: form.eligibility.trim(),
        benefits: form.benefits.trim(),
        documents: documents.join("\n"),
        steps: steps.join("\n"),
        official_url: form.official_url.trim(),
        deadline: form.deadline || null,
        status: form.status,
        last_verified: form.last_verified,
        geography: form.geography.trim() || null,
        disclaimer: form.disclaimer.trim() || null,
    }
}

const EditorCard = ({
    icon,
    title,
    description,
    children,
    compact = false,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div
                className={`border-b border-gray-100 ${
                    compact ? "px-5 py-4" : "px-5 py-5 sm:px-6"
                }`}
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                        {icon}
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-900">
                            {title}
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            <div className={compact ? "p-5" : "p-5 sm:p-6"}>
                {children}
            </div>
        </div>
    )
}

const FieldLabel = ({ children, required = false }) => {
    return (
        <label className="mb-2 block text-sm font-semibold text-gray-700">
            {children}

            {required && (
                <span className="ml-1 text-red-500">*</span>
            )}
        </label>
    )
}

const FieldError = ({ children }) => {
    return (
        <p className="mt-1.5 text-xs font-medium text-red-600">
            {children}
        </p>
    )
}

const TextAreaField = ({
    label,
    value,
    onChange,
    placeholder,
    rows = 4,
    required = false,
    error,
}) => {
    return (
        <div>
            <FieldLabel required={required}>
                {label}
            </FieldLabel>

            <textarea
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                rows={rows}
                placeholder={placeholder}
                className={`${textareaClass} ${
                    error
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : ""
                }`}
            />

            {error && <FieldError>{error}</FieldError>}
        </div>
    )
}

const SchemeEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const isEditMode = Boolean(id)

    const [form, setForm] = useState(createEmptyForm)
    const [savedMessage, setSavedMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [initialized, setInitialized] = useState(!isEditMode)

    const {
        data,
        isLoading: isSchemeLoading,
        isError: isSchemeError,
        error: schemeError,
    } = useQuery({
        queryKey: ["admin-scheme", id],
        queryFn: () => getAdminSchemeById(id),
        enabled: isEditMode,
    })

    const scheme = data?.scheme

    useEffect(() => {
        if (isEditMode && scheme) {
            setForm(schemeToForm(scheme))
            setInitialized(true)
        }
    }, [isEditMode, scheme])

    const saveMutation = useMutation({
        mutationFn: async (payload) => {
            if (isEditMode) {
                return updateAdminScheme(id, payload)
            }

            return createAdminScheme(payload)
        },

        onSuccess: async (response) => {
            setErrorMessage("")

            await queryClient.invalidateQueries({
                queryKey: ["admin-schemes"],
            })

            if (isEditMode) {
                await queryClient.invalidateQueries({
                    queryKey: ["admin-scheme", id],
                })

                setSavedMessage(
                    response?.message ||
                        "Scheme saved successfully."
                )

                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })

                return
            }

            const createdId = response?.scheme?.id

            if (createdId) {
                navigate(
                    `/admin/content/schemes/${createdId}/edit`,
                    {
                        replace: true,
                    }
                )

                return
            }

            navigate("/admin/content/schemes")
        },

        onError: (error) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong while saving the scheme."

            setErrorMessage(message)
            setSavedMessage("")

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        },
    })

    const updateField = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }))

        setSavedMessage("")
        setErrorMessage("")
    }

    const updateArrayItem = (field, index, value) => {
        setForm((current) => ({
            ...current,
            [field]: current[field].map(
                (item, itemIndex) =>
                    itemIndex === index ? value : item
            ),
        }))

        setSavedMessage("")
        setErrorMessage("")
    }

    const addArrayItem = (field) => {
        setForm((current) => ({
            ...current,
            [field]: [...current[field], ""],
        }))

        setSavedMessage("")
        setErrorMessage("")
    }

    const removeArrayItem = (field, index) => {
        setForm((current) => {
            const updated = current[field].filter(
                (_, itemIndex) => itemIndex !== index
            )

            return {
                ...current,
                [field]:
                    updated.length > 0 ? updated : [""],
            }
        })

        setSavedMessage("")
        setErrorMessage("")
    }

    const generateSlug = () => {
        const slug = form.name
            .toLowerCase()
            .trim()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")

        updateField("slug", slug)
    }

    const validationErrors = useMemo(() => {
        const errors = {}

        if (!form.name.trim()) {
            errors.name = "Scheme name is required."
        }

        if (!form.slug.trim()) {
            errors.slug = "URL slug is required."
        }

        if (!form.authority.trim()) {
            errors.authority =
                "Scheme authority is required."
        }

        if (!form.level) {
            errors.level = "Scheme level is required."
        }

        if (!form.category.trim()) {
            errors.category =
                "Scheme category is required."
        }

        if (!form.beneficiary.trim()) {
            errors.beneficiary =
                "Beneficiary is required."
        }

        if (!form.overview.trim()) {
            errors.overview = "Overview is required."
        }

        if (!form.eligibility.trim()) {
            errors.eligibility =
                "Eligibility is required."
        }

        if (!form.benefits.trim()) {
            errors.benefits = "Benefits are required."
        }

        if (
            !form.documents.some((item) =>
                item.trim()
            )
        ) {
            errors.documents =
                "At least one document is required."
        }

        if (
            !form.steps.some((item) =>
                item.trim()
            )
        ) {
            errors.steps =
                "At least one application step is required."
        }

        if (!form.official_url.trim()) {
            errors.official_url =
                "Official scheme URL is required."
        }

        if (!form.last_verified) {
            errors.last_verified =
                "Last verified date is required."
        }

        return errors
    }, [form])

    const handleSave = () => {
        if (Object.keys(validationErrors).length > 0) {
            setErrorMessage(
                "Please complete all required scheme fields before saving."
            )
            setSavedMessage("")

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })

            return
        }

        setErrorMessage("")
        setSavedMessage("")

        saveMutation.mutate(formToPayload(form))
    }

    if (
        isEditMode &&
        (isSchemeLoading || !initialized)
    ) {
        return <Loader text="Loading scheme..." />
    }

    if (isEditMode && isSchemeError) {
        return (
            <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-375">
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle
                                size={20}
                                className="mt-0.5 shrink-0 text-red-600"
                            />

                            <div>
                                <h2 className="font-semibold text-red-900">
                                    Unable to load scheme
                                </h2>

                                <p className="mt-1 text-sm text-red-700">
                                    {schemeError?.response
                                        ?.data?.message ||
                                        schemeError?.message ||
                                        "The requested scheme could not be loaded."}
                                </p>

                                <Link
                                    to="/admin/content/schemes"
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Schemes
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const isSaving = saveMutation.isPending

    return (
        <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-375 space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/schemes"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft size={18} />
                        </Link>

                        <div>
                            <div className="mb-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                <span>Content</span>
                                <span>/</span>
                                <span>Schemes</span>
                                <span>/</span>
                                <span className="font-medium text-green-700">
                                    {isEditMode
                                        ? "Edit"
                                        : "New"}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {isEditMode
                                    ? "Edit Government Scheme"
                                    : "Create Government Scheme"}
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Manage scheme information,
                                verification details and
                                application guidance.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        {isEditMode && (
                            <Link
                                to={`/admin/content/schemes/${id}`}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                <FileCheck2 size={17} />
                                Preview
                            </Link>
                        )}

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? (
                                <Loader
                                    variant="button"
                                    text="Saving..."
                                />
                            ) : (
                                <>
                                    <Save size={17} />
                                    Save Scheme
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {savedMessage && (
                    <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                        <CheckCircle2 size={18} />
                        {savedMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                        <AlertCircle
                            size={18}
                            className="mt-0.5 shrink-0"
                        />

                        <span>{errorMessage}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <EditorCard
                            icon={<Landmark size={19} />}
                            title="Basic Information"
                            description="Core information about the government scheme."
                        >
                            <div className="space-y-5">
                                <div>
                                    <FieldLabel required>
                                        Scheme Name
                                    </FieldLabel>

                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(event) =>
                                            updateField(
                                                "name",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. PM-KISAN"
                                        className={`${inputClass} ${
                                            validationErrors.name
                                                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                                : ""
                                        }`}
                                    />

                                    {validationErrors.name && (
                                        <FieldError>
                                            {
                                                validationErrors.name
                                            }
                                        </FieldError>
                                    )}
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <FieldLabel required>
                                            Scheme Authority
                                        </FieldLabel>

                                        <input
                                            type="text"
                                            value={form.authority}
                                            onChange={(event) =>
                                                updateField(
                                                    "authority",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="e.g. Government of India"
                                            className={`${inputClass} ${
                                                validationErrors.authority
                                                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                                    : ""
                                            }`}
                                        />

                                        {validationErrors.authority && (
                                            <FieldError>
                                                {
                                                    validationErrors.authority
                                                }
                                            </FieldError>
                                        )}
                                    </div>

                                    <div>
                                        <FieldLabel required>
                                            Central / State
                                        </FieldLabel>

                                        <select
                                            value={form.level}
                                            onChange={(event) =>
                                                updateField(
                                                    "level",
                                                    event.target.value
                                                )
                                            }
                                            className={selectClass}
                                        >
                                            <option value="CENTRAL">
                                                Central
                                            </option>

                                            <option value="STATE">
                                                State
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <FieldLabel required>
                                            Scheme Category
                                        </FieldLabel>

                                        <select
                                            value={form.category}
                                            onChange={(event) =>
                                                updateField(
                                                    "category",
                                                    event.target.value
                                                )
                                            }
                                            className={selectClass}
                                        >
                                            {categories.map(
                                                (category) => (
                                                    <option
                                                        key={
                                                            category
                                                        }
                                                        value={
                                                            category
                                                        }
                                                    >
                                                        {category}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div>
                                        <FieldLabel required>
                                            Beneficiary
                                        </FieldLabel>

                                        <input
                                            type="text"
                                            value={
                                                form.beneficiary
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "beneficiary",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="e.g. Eligible Farmers"
                                            className={`${inputClass} ${
                                                validationErrors.beneficiary
                                                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                                    : ""
                                            }`}
                                        />

                                        {validationErrors.beneficiary && (
                                            <FieldError>
                                                {
                                                    validationErrors.beneficiary
                                                }
                                            </FieldError>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <FieldLabel required>
                                            URL Slug
                                        </FieldLabel>

                                        <button
                                            type="button"
                                            onClick={generateSlug}
                                            className="text-xs font-semibold text-green-700 transition hover:text-green-800"
                                        >
                                            Generate from name
                                        </button>
                                    </div>

                                    <div
                                        className={`flex overflow-hidden rounded-2xl border bg-white transition-all duration-200 focus-within:ring-4 ${
                                            validationErrors.slug
                                                ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100"
                                                : "border-gray-200 focus-within:border-green-400 focus-within:ring-green-100"
                                        }`}
                                    >
                                        <span className="flex items-center bg-gray-50 px-4 text-sm text-gray-400">
                                            /schemes/
                                        </span>

                                        <input
                                            type="text"
                                            value={form.slug}
                                            onChange={(event) =>
                                                updateField(
                                                    "slug",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="scheme-slug"
                                            className="h-12 min-w-0 flex-1 bg-white px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                        />
                                    </div>

                                    {validationErrors.slug && (
                                        <FieldError>
                                            {
                                                validationErrors.slug
                                            }
                                        </FieldError>
                                    )}
                                </div>
                            </div>
                        </EditorCard>

                        {/* Scheme Information */}
                        <EditorCard
                            icon={<FileText size={19} />}
                            title="Scheme Information"
                            description="Public-facing information that helps beneficiaries understand the scheme."
                        >
                            <div className="space-y-6">
                                <TextAreaField
                                    label="Overview"
                                    required
                                    value={form.overview}
                                    onChange={(value) =>
                                        updateField(
                                            "overview",
                                            value
                                        )
                                    }
                                    placeholder="Provide a clear overview of the scheme..."
                                    rows={5}
                                    error={
                                        validationErrors.overview
                                    }
                                />

                                <TextAreaField
                                    label="Eligibility"
                                    required
                                    value={form.eligibility}
                                    onChange={(value) =>
                                        updateField(
                                            "eligibility",
                                            value
                                        )
                                    }
                                    placeholder="Explain who is eligible..."
                                    rows={5}
                                    error={
                                        validationErrors.eligibility
                                    }
                                />

                                <TextAreaField
                                    label="Benefits"
                                    required
                                    value={form.benefits}
                                    onChange={(value) =>
                                        updateField(
                                            "benefits",
                                            value
                                        )
                                    }
                                    placeholder="Describe the benefits available under the scheme..."
                                    rows={5}
                                    error={
                                        validationErrors.benefits
                                    }
                                />
                            </div>
                        </EditorCard>

                        {/* Required Documents */}
                        <EditorCard
                            icon={<FileCheck2 size={19} />}
                            title="Required Documents"
                            description="Documents beneficiaries may need when applying."
                        >
                            <div className="space-y-3">
                                {form.documents.map(
                                    (document, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-sm font-semibold text-green-700">
                                                {index + 1}
                                            </div>

                                            <input
                                                type="text"
                                                value={document}
                                                onChange={(event) =>
                                                    updateArrayItem(
                                                        "documents",
                                                        index,
                                                        event.target
                                                            .value
                                                    )
                                                }
                                                placeholder="Required document"
                                                className={inputClass}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeArrayItem(
                                                        "documents",
                                                        index
                                                    )
                                                }
                                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                title="Remove document"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )
                                )}

                                {validationErrors.documents && (
                                    <FieldError>
                                        {
                                            validationErrors.documents
                                        }
                                    </FieldError>
                                )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        addArrayItem("documents")
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                                >
                                    <Plus size={16} />
                                    Add Document
                                </button>
                            </div>
                        </EditorCard>

                        {/* Application Steps */}
                        <EditorCard
                            icon={<FileCheck2 size={19} />}
                            title="Application Steps"
                            description="Explain the application process in a simple sequence."
                        >
                            <div className="space-y-3">
                                {form.steps.map(
                                    (step, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-2"
                                        >
                                            <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-sm font-bold text-white">
                                                {index + 1}
                                            </div>

                                            <textarea
                                                value={step}
                                                onChange={(event) =>
                                                    updateArrayItem(
                                                        "steps",
                                                        index,
                                                        event.target
                                                            .value
                                                    )
                                                }
                                                rows={2}
                                                placeholder={`Step ${
                                                    index + 1
                                                }...`}
                                                className={`${textareaClass} min-h-11`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeArrayItem(
                                                        "steps",
                                                        index
                                                    )
                                                }
                                                className="mt-0 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                title="Remove step"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )
                                )}

                                {validationErrors.steps && (
                                    <FieldError>
                                        {validationErrors.steps}
                                    </FieldError>
                                )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        addArrayItem("steps")
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                                >
                                    <Plus size={16} />
                                    Add Step
                                </button>
                            </div>
                        </EditorCard>

                        {/* Official Source & Geography */}
                        <EditorCard
                            icon={<Link2 size={19} />}
                            title="Official Source & Geography"
                            description="Reference information for applicants."
                        >
                            <div className="space-y-5">
                                <div>
                                    <FieldLabel required>
                                        Official Scheme URL
                                    </FieldLabel>

                                    <div className="relative">
                                        <Link2
                                            size={17}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="url"
                                            value={
                                                form.official_url
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "official_url",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="https://official-government-website.gov.in/..."
                                            className={`${inputClass} pl-11 ${
                                                validationErrors.official_url
                                                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                                    : ""
                                            }`}
                                        />
                                    </div>

                                    {validationErrors.official_url && (
                                        <FieldError>
                                            {
                                                validationErrors.official_url
                                            }
                                        </FieldError>
                                    )}

                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Link users to the official
                                        source for verification and
                                        application.
                                    </p>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <FieldLabel>
                                            Application Deadline
                                        </FieldLabel>

                                        <div className="relative">
                                            <CalendarDays
                                                size={17}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                            />

                                            <input
                                                type="date"
                                                value={
                                                    form.deadline
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "deadline",
                                                        event.target
                                                            .value
                                                    )
                                                }
                                                className={`${inputClass} pl-11`}
                                            />
                                        </div>

                                        <p className="mt-1.5 text-xs text-gray-400">
                                            Leave empty if there is
                                            no specific deadline.
                                        </p>
                                    </div>

                                    <div>
                                        <FieldLabel>
                                            Geography
                                        </FieldLabel>

                                        <input
                                            type="text"
                                            value={
                                                form.geography
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "geography",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="India / Maharashtra / District..."
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                            </div>
                        </EditorCard>

                        {/* Disclaimer */}
                        <EditorCard
                            icon={<AlertCircle size={19} />}
                            title="Disclaimer"
                            description="Important guidance shown alongside scheme information."
                        >
                            <TextAreaField
                                label="Public Disclaimer"
                                value={form.disclaimer}
                                onChange={(value) =>
                                    updateField(
                                        "disclaimer",
                                        value
                                    )
                                }
                                placeholder="Add a disclaimer reminding users to verify current information..."
                                rows={5}
                            />
                        </EditorCard>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Status */}
                        <EditorCard
                            icon={<ShieldCheck size={18} />}
                            title="Scheme Status"
                            description="Set the current status of the scheme."
                            compact
                        >
                            <div className="space-y-4">
                                <div>
                                    <FieldLabel required>
                                        Status
                                    </FieldLabel>

                                    <select
                                        value={form.status}
                                        onChange={(event) =>
                                            updateField(
                                                "status",
                                                event.target.value
                                            )
                                        }
                                        className={selectClass}
                                    >
                                        <option value="ACTIVE">
                                            Active
                                        </option>

                                        <option value="UPCOMING">
                                            Upcoming
                                        </option>

                                        <option value="CLOSED">
                                            Closed
                                        </option>

                                        <option value="INACTIVE">
                                            Inactive
                                        </option>
                                    </select>
                                </div>

                                <div className="rounded-2xl bg-[#F6FAF7] p-4">
                                    <p className="text-xs leading-5 text-gray-500">
                                        This status controls the
                                        current state of the scheme
                                        in the database.
                                    </p>
                                </div>
                            </div>
                        </EditorCard>

                        {/* Verification */}
                        <EditorCard
                            icon={<ShieldCheck size={18} />}
                            title="Verification"
                            description="Keep public scheme information current."
                            compact
                        >
                            <div className="space-y-4">
                                <div>
                                    <FieldLabel required>
                                        Last Verified
                                    </FieldLabel>

                                    <div className="relative">
                                        <CalendarDays
                                            size={17}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="date"
                                            value={
                                                form.last_verified
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "last_verified",
                                                    event.target.value
                                                )
                                            }
                                            className={`${inputClass} pl-11 ${
                                                validationErrors.last_verified
                                                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                                    : ""
                                            }`}
                                        />
                                    </div>

                                    {validationErrors.last_verified && (
                                        <FieldError>
                                            {
                                                validationErrors.last_verified
                                            }
                                        </FieldError>
                                    )}
                                </div>

                                <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                                    <div className="flex gap-3">
                                        <ShieldCheck
                                            size={17}
                                            className="mt-0.5 shrink-0 text-green-700"
                                        />

                                        <p className="text-xs leading-5 text-green-800/80">
                                            Display the verification
                                            date so users know when
                                            the scheme information
                                            was last checked.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </EditorCard>

                        {/* Public URL */}
                        <EditorCard
                            icon={<Globe2 size={18} />}
                            title="Public URL"
                            description="Where this scheme will appear."
                            compact
                        >
                            <div className="space-y-4">
                                <div className="rounded-2xl bg-[#F6FAF7] p-4">
                                    <p className="break-all text-xs leading-5 text-gray-600">
                                        /schemes/
                                        {form.slug ||
                                            "scheme-slug"}
                                    </p>
                                </div>

                                {isEditMode && (
                                    <Link
                                        to={`/admin/content/schemes/${id}`}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                    >
                                        <Globe2 size={16} />
                                        View Scheme Details
                                    </Link>
                                )}
                            </div>
                        </EditorCard>

                        {/* Checklist */}
                        <EditorCard
                            icon={<CheckCircle2 size={18} />}
                            title="Content Checklist"
                            description="Review the required information before saving."
                            compact
                        >
                            <div className="space-y-3">
                                <ChecklistItem
                                    label="Scheme name"
                                    completed={
                                        Boolean(
                                            form.name.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Authority"
                                    completed={
                                        Boolean(
                                            form.authority.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Beneficiary"
                                    completed={
                                        Boolean(
                                            form.beneficiary.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Overview"
                                    completed={
                                        Boolean(
                                            form.overview.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Eligibility"
                                    completed={
                                        Boolean(
                                            form.eligibility.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Benefits"
                                    completed={
                                        Boolean(
                                            form.benefits.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Required documents"
                                    completed={form.documents.some(
                                        (item) =>
                                            item.trim()
                                    )}
                                />

                                <ChecklistItem
                                    label="Application steps"
                                    completed={form.steps.some(
                                        (item) =>
                                            item.trim()
                                    )}
                                />

                                <ChecklistItem
                                    label="Official URL"
                                    completed={
                                        Boolean(
                                            form.official_url.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Last verified"
                                    completed={
                                        Boolean(
                                            form.last_verified
                                        )
                                    }
                                />
                            </div>
                        </EditorCard>
                    </aside>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            {isEditMode
                                ? "Update this scheme"
                                : "Create this scheme"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Make sure all required information is
                            complete before saving.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                            to="/admin/content/schemes"
                            className="inline-flex h-11 items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? (
                                <Loader
                                    variant="button"
                                    text="Saving..."
                                />
                            ) : (
                                <>
                                    <Save size={17} />
                                    Save Scheme
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

const ChecklistItem = ({ label, completed }) => {
    return (
        <div className="flex items-center gap-3">
            <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    completed
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-400"
                }`}
            >
                <CheckCircle2 size={15} />
            </div>

            <span
                className={`text-sm ${
                    completed
                        ? "text-gray-700"
                        : "text-gray-400"
                }`}
            >
                {label}
            </span>
        </div>
    )
}

export default SchemeEditor