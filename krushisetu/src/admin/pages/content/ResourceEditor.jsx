import { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"

import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    FileText,
    Globe2,
    Link2,
    Save,
    UserRound,
    Video,
} from "lucide-react"

import {
    createAdminResource,
    getAdminResourceById,
    updateAdminResource,
} from "../../api/adminResourcesApi.js"

import Loader from "../../../components/common/Loader"

const resourceTypes = [
    "ARTICLE",
    "PDF",
    "INFOGRAPHIC",
    "VIDEO",
    "FAQ",
    "OFFICIAL_LINK",
    "DOWNLOADABLE_FORM",
]

const languages = [
    "English",
    "Marathi",
    "Hindi",
]

const createEmptyForm = () => ({
    title: "",
    slug: "",
    resource_type: "ARTICLE",
    category: "",
    crop: "",
    season: "",
    language: "English",
    body: "",
    file_url: "",
    video_url: "",
    external_url: "",
    author: "",
    reviewer: "",
    publication_date: "",
    last_updated_date: "",
    region: "",
    crop_applicability: "",
    tags: "",
    disclaimer: "",
})

const slugify = (value) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
}

const formatDateForInput = (value) => {
    if (!value) return ""

    if (typeof value === "string") {
        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return value
        }

        const match = value.match(/^(\d{4}-\d{2}-\d{2})/)
        if (match) {
            return match[1]
        }
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return ""
    }

    return date.toISOString().slice(0, 10)
}

const normalizeResource = (resource) => {
    return {
        title: resource?.title ?? "",
        slug: resource?.slug ?? "",
        resource_type: resource?.resource_type ?? "ARTICLE",
        category: resource?.category ?? "",
        crop: resource?.crop ?? "",
        season: resource?.season ?? "",
        language: resource?.language ?? "English",
        body: resource?.body ?? "",
        file_url: resource?.file_url ?? "",
        video_url: resource?.video_url ?? "",
        external_url: resource?.external_url ?? "",
        author: resource?.author ?? "",
        reviewer: resource?.reviewer ?? "",
        publication_date: formatDateForInput(
            resource?.publication_date
        ),
        last_updated_date: formatDateForInput(
            resource?.last_updated_date
        ),
        region: resource?.region ?? "",
        crop_applicability:
            resource?.crop_applicability ?? "",
        tags: resource?.tags ?? "",
        disclaimer: resource?.disclaimer ?? "",
    }
}

const ResourceEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const isEditMode = Boolean(id)

    const [form, setForm] = useState(createEmptyForm)
    const [errors, setErrors] = useState({})
    const [saveMessage, setSaveMessage] = useState("")

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["admin-resource", id],
        queryFn: () => getAdminResourceById(id),
        enabled: isEditMode,
    })

    useEffect(() => {
        if (!isEditMode) {
            setForm(createEmptyForm())
            return
        }

        if (data?.resource) {
            setForm(normalizeResource(data.resource))
        }
    }, [data, isEditMode])

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }))

        setErrors((previous) => {
            if (!previous[field]) {
                return previous
            }

            const next = {
                ...previous,
            }

            delete next[field]

            return next
        })
    }

    const handleTitleChange = (value) => {
        setForm((previous) => ({
            ...previous,
            title: value,
            ...(!isEditMode && !previous.slug
                ? {
                    slug: slugify(value),
                }
                : {}),
        }))

        setErrors((previous) => {
            if (!previous.title) {
                return previous
            }

            const next = {
                ...previous,
            }

            delete next.title

            return next
        })
    }

    const validate = () => {
        const nextErrors = {}

        if (!form.title.trim()) {
            nextErrors.title = "Resource title is required."
        }

        if (!form.slug.trim()) {
            nextErrors.slug = "Slug is required."
        }

        if (!form.resource_type) {
            nextErrors.resource_type =
                "Resource type is required."
        }

        if (!form.category.trim()) {
            nextErrors.category = "Category is required."
        }

        if (!form.language.trim()) {
            nextErrors.language = "Language is required."
        }

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }

    const payload = useMemo(
        () => ({
            title: form.title.trim(),
            slug: form.slug.trim(),
            resource_type: form.resource_type,
            category: form.category.trim(),
            crop: form.crop.trim() || null,
            season: form.season.trim() || null,
            language: form.language.trim(),
            body: form.body.trim() || null,
            file_url: form.file_url.trim() || null,
            video_url: form.video_url.trim() || null,
            external_url:
                form.external_url.trim() || null,
            author: form.author.trim() || null,
            reviewer: form.reviewer.trim() || null,
            publication_date:
                form.publication_date || null,
            last_updated_date:
                form.last_updated_date || null,
            region: form.region.trim() || null,
            crop_applicability:
                form.crop_applicability.trim() || null,
            tags: form.tags.trim() || null,
            disclaimer: form.disclaimer.trim() || null,
        }),
        [form]
    )

    const saveMutation = useMutation({
        mutationFn: async () => {
            if (!validate()) {
                throw new Error(
                    "Please complete the required fields."
                )
            }

            if (isEditMode) {
                return updateAdminResource(id, payload)
            }

            return createAdminResource(payload)
        },

        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: ["admin-resources"],
            })

            if (isEditMode) {
                await queryClient.invalidateQueries({
                    queryKey: ["admin-resource", id],
                })

                setSaveMessage(
                    response?.message ||
                    "Resource updated successfully."
                )

                return
            }

            const createdResource =
                response?.resource

            if (createdResource?.id) {
                navigate(
                    `/admin/content/resources/${createdResource.id}/edit`,
                    {
                        replace: true,
                    }
                )

                return
            }

            navigate("/admin/content/resources")
        },

        onError: (error) => {
            if (
                error?.message ===
                "Please complete the required fields."
            ) {
                return
            }

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to save resource."

            setSaveMessage(message)
        },
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!validate()) {
            return
        }

        setSaveMessage("")
        saveMutation.mutate()
    }

    const getInputClass = (field) => {
        return `h-12 w-full rounded-2xl border ${errors[field]
            ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 bg-gray-50 focus:border-green-300 focus:bg-white focus:ring-green-50"
            } px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-4`
    }

    const getTextareaClass = (field) => {
        return `w-full resize-y rounded-2xl border ${errors[field]
            ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 bg-gray-50 focus:border-green-300 focus:bg-white focus:ring-green-50"
            } px-4 py-3 text-sm leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-4`
    }

    if (isEditMode && isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading resource..."
            />
        )
    }

    if (isEditMode && isError) {
        return (
            <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#F6FAF7] px-6">
                <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl shadow-gray-900/10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <FileText size={26} />
                    </div>

                    <h1 className="mt-5 text-xl font-bold text-gray-900">
                        Unable to load resource
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        The requested resource could not be
                        loaded from the server.
                    </p>

                    <Link
                        to="/admin/content/resources"
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        <ArrowLeft size={17} />
                        Back to Resources
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1500px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/resources"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft
                                size={17}
                            />
                        </Link>

                        <div>
                            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-green-700">
                                <BookOpen size={16} />
                                <span>Resources</span>
                                <span className="text-gray-400">
                                    /
                                </span>
                                <span className="text-gray-500">
                                    {isEditMode
                                        ? "Edit"
                                        : "Create"}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {isEditMode
                                    ? "Edit Resource"
                                    : "Add Resource"}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Create and manage
                                agricultural resources
                                for the Krushisetu
                                website.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={
                            saveMutation.isPending
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saveMutation.isPending ? (
                            <Loader
                                variant="button"
                                text="Saving..."
                            />
                        ) : (
                            <>
                                <Save size={17} />
                                {isEditMode
                                    ? "Save Changes"
                                    : "Create Resource"}
                            </>
                        )}
                    </button>
                </div>

                {/* Message */}
                {saveMessage && (
                    <div
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium ${saveMutation.isError
                            ? "border-red-200 bg-red-50 text-red-700"
                            : "border-green-200 bg-green-50 text-green-800"
                            }`}
                    >
                        {saveMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

                        {/* Main Content */}
                        <div className="space-y-6">

                            {/* Basic Information */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <BookOpen
                                            size={20}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Basic Information
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Define the core
                                            details of the
                                            resource.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    {/* Title */}
                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Resource Title
                                        </label>

                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={(event) =>
                                                handleTitleChange(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Enter resource title"
                                            className={getInputClass(
                                                "title"
                                            )}
                                        />

                                        {errors.title && (
                                            <p className="mt-1.5 text-xs font-medium text-red-600">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Resource Type */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Resource Type
                                        </label>

                                        <select
                                            value={
                                                form.resource_type
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "resource_type",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            className={getInputClass(
                                                "resource_type"
                                            )}
                                        >
                                            {resourceTypes.map(
                                                (type) => (
                                                    <option
                                                        key={
                                                            type
                                                        }
                                                        value={
                                                            type
                                                        }
                                                    >
                                                        {type
                                                            .toLowerCase()
                                                            .replaceAll(
                                                                "_",
                                                                " "
                                                            )
                                                            .replace(
                                                                /\b\w/g,
                                                                (
                                                                    character
                                                                ) =>
                                                                    character.toUpperCase()
                                                            )}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        {errors.resource_type && (
                                            <p className="mt-1.5 text-xs font-medium text-red-600">
                                                {
                                                    errors.resource_type
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Category
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.category
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "category",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Sustainable Agriculture"
                                            className={getInputClass(
                                                "category"
                                            )}
                                        />

                                        {errors.category && (
                                            <p className="mt-1.5 text-xs font-medium text-red-600">
                                                {
                                                    errors.category
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
                                            onChange={(event) =>
                                                updateField(
                                                    "slug",
                                                    slugify(
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                )
                                            }
                                            placeholder="resource-url-slug"
                                            className={getInputClass(
                                                "slug"
                                            )}
                                        />

                                        {errors.slug && (
                                            <p className="mt-1.5 text-xs font-medium text-red-600">
                                                {errors.slug}
                                            </p>
                                        )}
                                    </div>

                                    {/* Language */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Language
                                        </label>

                                        <select
                                            value={
                                                form.language
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "language",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            className={getInputClass(
                                                "language"
                                            )}
                                        >
                                            {languages.map(
                                                (language) => (
                                                    <option
                                                        key={
                                                            language
                                                        }
                                                        value={
                                                            language
                                                        }
                                                    >
                                                        {language}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        {errors.language && (
                                            <p className="mt-1.5 text-xs font-medium text-red-600">
                                                {
                                                    errors.language
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* Crop */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Crop
                                        </label>

                                        <input
                                            type="text"
                                            value={form.crop}
                                            onChange={(event) =>
                                                updateField(
                                                    "crop",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Sugarcane, Wheat"
                                            className={getInputClass(
                                                "crop"
                                            )}
                                        />
                                    </div>

                                    {/* Season */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Season
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.season
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "season",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Kharif, Rabi"
                                            className={getInputClass(
                                                "season"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Resource Content */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <FileText
                                            size={20}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Resource Content
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Add the main
                                            educational
                                            content for this
                                            resource.
                                        </p>
                                    </div>
                                </div>

                                <textarea
                                    value={form.body}
                                    onChange={(event) =>
                                        updateField(
                                            "body",
                                            event.target.value
                                        )
                                    }
                                    rows={14}
                                    placeholder="Write the resource content here..."
                                    className={getTextareaClass(
                                        "body"
                                    )}
                                />
                            </div>

                            {/* Resource Links */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <Link2
                                            size={20}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Resource Links
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Add the file,
                                            video, or
                                            external source
                                            associated with
                                            this resource.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">

                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <FileText
                                                size={15}
                                                className="text-green-700"
                                            />
                                            File URL
                                        </label>

                                        <input
                                            type="url"
                                            value={
                                                form.file_url
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "file_url",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="https://..."
                                            className={getInputClass(
                                                "file_url"
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <Video
                                                size={15}
                                                className="text-green-700"
                                            />
                                            Video URL
                                        </label>

                                        <input
                                            type="url"
                                            value={
                                                form.video_url
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "video_url",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="https://..."
                                            className={getInputClass(
                                                "video_url"
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <Globe2
                                                size={15}
                                                className="text-green-700"
                                            />
                                            External URL
                                        </label>

                                        <input
                                            type="url"
                                            value={
                                                form.external_url
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "external_url",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="https://..."
                                            className={getInputClass(
                                                "external_url"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Author & Reviewer */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <UserRound
                                            size={20}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Author & Reviewer
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Identify who
                                            prepared and
                                            reviewed the
                                            resource.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Author
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.author
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "author",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Author name / team"
                                            className={getInputClass(
                                                "author"
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Reviewer
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.reviewer
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "reviewer",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Reviewer name / team"
                                            className={getInputClass(
                                                "reviewer"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Region & Crop Applicability */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <Globe2
                                            size={20}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Region & Crop
                                            Applicability
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Specify where and
                                            for which crops
                                            this resource is
                                            applicable.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Region /
                                            Geography
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.region
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "region",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Maharashtra, Western Maharashtra"
                                            className={getInputClass(
                                                "region"
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Crop
                                            Applicability
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.crop_applicability
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "crop_applicability",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Sugarcane, Vegetables, Multiple Crops"
                                            className={getInputClass(
                                                "crop_applicability"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Publication Metadata */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <CalendarDays
                                            size={20}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Publication
                                            Metadata
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Maintain
                                            publication and
                                            update information.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Publication Date
                                        </label>

                                        <input
                                            type="date"
                                            value={
                                                form.publication_date
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "publication_date",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            className={getInputClass(
                                                "publication_date"
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Last Updated
                                        </label>

                                        <input
                                            type="date"
                                            value={
                                                form.last_updated_date
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "last_updated_date",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            className={getInputClass(
                                                "last_updated_date"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-5">
                                    <h2 className="text-base font-bold text-gray-900">
                                        Tags
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Add comma-separated
                                        tags to help organize
                                        the resource.
                                    </p>
                                </div>

                                <input
                                    type="text"
                                    value={form.tags}
                                    onChange={(event) =>
                                        updateField(
                                            "tags",
                                            event.target.value
                                        )
                                    }
                                    placeholder="sustainable farming, soil, irrigation"
                                    className={getInputClass(
                                        "tags"
                                    )}
                                />
                            </div>

                            {/* Disclaimer */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-5">
                                    <h2 className="text-base font-bold text-gray-900">
                                        Disclaimer
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Add any applicable
                                        disclaimer that should
                                        appear with the
                                        resource.
                                    </p>
                                </div>

                                <textarea
                                    value={form.disclaimer}
                                    onChange={(event) =>
                                        updateField(
                                            "disclaimer",
                                            event.target.value
                                        )
                                    }
                                    rows={5}
                                    placeholder="Enter resource disclaimer..."
                                    className={getTextareaClass(
                                        "disclaimer"
                                    )}
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6">

                            {/* Resource Summary */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="text-base font-bold text-gray-900">
                                    Resource Summary
                                </h2>

                                <div className="mt-5 space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Type
                                        </span>

                                        <span className="text-right text-sm font-semibold text-gray-800">
                                            {form.resource_type
                                                ?.toLowerCase()
                                                .replaceAll(
                                                    "_",
                                                    " "
                                                )
                                                .replace(
                                                    /\b\w/g,
                                                    (
                                                        character
                                                    ) =>
                                                        character.toUpperCase()
                                                )}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Category
                                        </span>

                                        <span className="max-w-[180px] text-right text-sm font-semibold text-gray-800">
                                            {form.category ||
                                                "Not set"}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Language
                                        </span>

                                        <span className="text-right text-sm font-semibold text-gray-800">
                                            {form.language}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Region
                                        </span>

                                        <span className="max-w-[180px] text-right text-sm font-semibold text-gray-800">
                                            {form.region ||
                                                "Not set"}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Crop
                                        </span>

                                        <span className="max-w-[180px] text-right text-sm font-semibold text-gray-800">
                                            {form.crop ||
                                                "Not set"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Checklist */}
                            <div className="rounded-3xl border border-green-100 bg-green-50/70 p-5">
                                <h2 className="text-sm font-bold text-green-900">
                                    Resource Checklist
                                </h2>

                                <div className="mt-4 space-y-3">
                                    {[
                                        [
                                            "Title",
                                            Boolean(
                                                form.title.trim()
                                            ),
                                        ],
                                        [
                                            "Slug",
                                            Boolean(
                                                form.slug.trim()
                                            ),
                                        ],
                                        [
                                            "Resource Type",
                                            Boolean(
                                                form.resource_type
                                            ),
                                        ],
                                        [
                                            "Category",
                                            Boolean(
                                                form.category.trim()
                                            ),
                                        ],
                                        [
                                            "Language",
                                            Boolean(
                                                form.language.trim()
                                            ),
                                        ],
                                        [
                                            "Content",
                                            Boolean(
                                                form.body.trim()
                                            ),
                                        ],
                                        [
                                            "Author",
                                            Boolean(
                                                form.author.trim()
                                            ),
                                        ],
                                        [
                                            "Reviewer",
                                            Boolean(
                                                form.reviewer.trim()
                                            ),
                                        ],
                                        [
                                            "Region / Crop",
                                            Boolean(
                                                form.region.trim() &&
                                                form.crop_applicability.trim()
                                            ),
                                        ],
                                        [
                                            "Disclaimer",
                                            Boolean(
                                                form.disclaimer.trim()
                                            ),
                                        ],
                                    ].map(
                                        ([
                                            label,
                                            complete,
                                        ]) => (
                                            <div
                                                key={label}
                                                className="flex items-center gap-3"
                                            >
                                                <div
                                                    className={`flex h-6 w-6 items-center justify-center rounded-full ${complete
                                                        ? "bg-green-700 text-white"
                                                        : "bg-white text-gray-300"
                                                        }`}
                                                >
                                                    {complete && (
                                                        <CheckCircle2
                                                            size={
                                                                14
                                                            }
                                                        />
                                                    )}
                                                </div>

                                                <span
                                                    className={`text-sm ${complete
                                                        ? "font-medium text-green-900"
                                                        : "text-green-800/60"
                                                        }`}
                                                >
                                                    {label}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>


                        </aside>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            to="/admin/content/resources"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ArrowLeft size={16} />
                            Back to Resources
                        </Link>

                        <button
                            type="submit"
                            disabled={saveMutation.isPending}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {saveMutation.isPending ? (
                                <Loader
                                    variant="button"
                                    text="Saving..."
                                />
                            ) : (
                                <>
                                    <Save size={17} />
                                    {isEditMode
                                        ? "Save Changes"
                                        : "Create Resource"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ResourceEditor