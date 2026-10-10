import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    FileCheck2,
    FileText,
    Image as ImageIcon,
    Info,
    Save,
    Upload,
    X,
} from "lucide-react"

import Loader from "../../../components/common/Loader"

import axiosInstance from "../../../api/axiosInstance.js"

import {
    createAdminNews,
    getAdminNewsById,
    updateAdminNews,
} from "../../api/adminNewsApi.js"


const categories = [
    "Announcement",
    "Training",
    "Schemes",
    "Community",
    "Resources",
    "Events",
    "Partnerships",
    "Campaign",
    "Updates",
]


const statusOptions = [
    {
        value: "DRAFT",
        label: "Draft",
    },
    {
        value: "PUBLISHED",
        label: "Published",
    },
]


const emptyForm = {
    title: "",
    slug: "",
    category: "Announcement",
    author: "",
    summary: "",
    content: "",
    image_url: "",
    publicationDate: "",
    publishTime: "09:00",
    status: "DRAFT",
}


const createSlug = (value) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
}


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
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
    const day = String(parsedDate.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}


const formatTimeForInput = (date) => {
    if (!date) {
        return "09:00"
    }

    if (typeof date === "string") {
        const timeMatch = date.match(/(\d{2}):(\d{2})/)

        if (timeMatch) {
            return `${timeMatch[1]}:${timeMatch[2]}`
        }
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return "09:00"
    }

    const hours = String(parsedDate.getHours()).padStart(2, "0")
    const minutes = String(parsedDate.getMinutes()).padStart(2, "0")

    return `${hours}:${minutes}`
}


const getStatusLabel = (status) => {
    const found = statusOptions.find(
        (item) => item.value === status
    )

    return found?.label || status || "—"
}


const getStatusClasses = (status) => {
    switch (status) {
        case "PUBLISHED":
            return "border-green-200 bg-green-50 text-green-700"

        case "DRAFT":
            return "border-amber-200 bg-amber-50 text-amber-700"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}


const getApiOrigin = () => {
    const baseURL =
        axiosInstance.defaults.baseURL ||
        ""

    return baseURL.replace(/\/api\/?$/, "")
}


const resolveMediaUrl = (url) => {
    if (!url) {
        return ""
    }

    if (
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("data:")
    ) {
        return url
    }

    if (url.startsWith("/uploads/")) {
        return `${getApiOrigin()}${url}`
    }

    return url
}


const uploadImage = async (file) => {
    const formData = new FormData()

    formData.append("file", file)

    const response = await axiosInstance.post(
        "/admin/gallery/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )

    return response.data
}


const NewsEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const isEditMode = Boolean(id)

    const [form, setForm] = useState(emptyForm)

    const [validationErrors, setValidationErrors] = useState({})

    const [successMessage, setSuccessMessage] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const [uploadingImage, setUploadingImage] = useState(false)

    const [imagePreview, setImagePreview] = useState("")


    /*
     * ---------------------------------------------------------
     * Load existing news
     * ---------------------------------------------------------
     */

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-news", id],
        queryFn: () => getAdminNewsById(id),
        enabled: isEditMode,
    })


    const news =
        data?.news ||
        data?.data ||
        null


    /*
     * ---------------------------------------------------------
     * Populate form
     * ---------------------------------------------------------
     */

    useEffect(() => {
        if (!news) {
            return
        }

        const imageUrl = news.image_url || ""

        setForm({
            title: news.title || "",
            slug: news.slug || "",
            category: news.category || "Announcement",
            author: news.author || "",
            summary: news.summary || "",
            content: news.content || "",
            image_url: imageUrl,
            publicationDate: formatDateForInput(
                news.published_date
            ),
            publishTime: formatTimeForInput(
                news.published_date
            ),
            status: news.status || "DRAFT",
        })

        setImagePreview(
            resolveMediaUrl(imageUrl)
        )
    }, [news])


    /*
     * ---------------------------------------------------------
     * Form handlers
     * ---------------------------------------------------------
     */

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


    /*
     * ---------------------------------------------------------
     * Image upload
     * ---------------------------------------------------------
     */

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0]

        if (!file) {
            return
        }

        setSuccessMessage("")
        setErrorMessage("")

        if (!file.type.startsWith("image/")) {
            setErrorMessage(
                "Please select a valid image file."
            )

            event.target.value = ""

            return
        }

        const maxSize = 5 * 1024 * 1024

        if (file.size > maxSize) {
            setErrorMessage(
                "Image size must be 5 MB or less."
            )

            event.target.value = ""

            return
        }

        const localPreview = URL.createObjectURL(file)

        setImagePreview(localPreview)

        setUploadingImage(true)

        try {
            const response = await uploadImage(file)

            const uploadedFile =
                response?.file ||
                response?.uploadedFile ||
                response?.data ||
                response?.media

            const fileUrl =
                uploadedFile?.fileUrl ||
                uploadedFile?.url ||
                uploadedFile?.file_url ||
                response?.fileUrl ||
                response?.url

            if (!fileUrl) {
                throw new Error(
                    "Upload response did not contain a file URL."
                )
            }

            setForm((previous) => ({
                ...previous,
                image_url: fileUrl,
            }))

            setImagePreview(
                resolveMediaUrl(fileUrl)
            )

            setValidationErrors((previous) => {
                const updated = {
                    ...previous,
                }

                delete updated.image_url

                return updated
            })
        } catch (uploadError) {
            setImagePreview("")
            setForm((previous) => ({
                ...previous,
                image_url: "",
            }))

            setErrorMessage(
                uploadError?.response?.data?.message ||
                    uploadError?.message ||
                    "Failed to upload image."
            )
        } finally {
            setUploadingImage(false)

            event.target.value = ""
        }
    }


    const removeImage = () => {
        setForm((previous) => ({
            ...previous,
            image_url: "",
        }))

        setImagePreview("")

        setSuccessMessage("")
        setErrorMessage("")
    }


    /*
     * ---------------------------------------------------------
     * Validation
     * ---------------------------------------------------------
     */

    const validateForm = (statusOverride = null) => {
        const finalStatus =
            statusOverride || form.status

        const errors = {}

        if (!form.title.trim()) {
            errors.title = "News title is required."
        }

        if (!form.slug.trim()) {
            errors.slug = "News slug is required."
        }

        if (!form.category) {
            errors.category =
                "News category is required."
        }

        if (!form.author.trim()) {
            errors.author =
                "Author name is required."
        }

        if (!form.summary.trim()) {
            errors.summary =
                "News summary is required."
        }

        if (!form.content.trim()) {
            errors.content =
                "News content is required."
        }

        if (
            finalStatus === "PUBLISHED" &&
            !form.publicationDate
        ) {
            errors.publicationDate =
                "Publication date is required when publishing."
        }

        setValidationErrors(errors)

        return Object.keys(errors).length === 0
    }


    /*
     * ---------------------------------------------------------
     * Build API payload
     * ---------------------------------------------------------
     */

    const buildPayload = (statusOverride = null) => {
        const finalStatus =
            statusOverride || form.status

        let publishedDate = null

        if (
            finalStatus === "PUBLISHED" &&
            form.publicationDate
        ) {
            publishedDate = `${form.publicationDate} ${
                form.publishTime || "09:00"
            }:00`
        }

        return {
            title: form.title.trim(),

            slug: form.slug.trim(),

            summary: form.summary.trim(),

            content: form.content.trim(),

            category: form.category,

            author: form.author.trim(),

            image_url:
                form.image_url.trim() || null,

            published_date: publishedDate,

            status: finalStatus,
        }
    }


    /*
     * ---------------------------------------------------------
     * Save mutation
     * ---------------------------------------------------------
     */

    const saveMutation = useMutation({
        mutationFn: (payload) => {
            if (isEditMode) {
                return updateAdminNews(
                    id,
                    payload
                )
            }

            return createAdminNews(payload)
        },

        onSuccess: async (response) => {
            setSuccessMessage(
                response?.message ||
                    (isEditMode
                        ? "News updated successfully."
                        : "News created successfully.")
            )

            setErrorMessage("")
            setValidationErrors({})

            await queryClient.invalidateQueries({
                queryKey: ["admin-news"],
            })

            if (isEditMode) {
                await queryClient.invalidateQueries({
                    queryKey: ["admin-news", id],
                })

                return
            }

            const createdNews =
                response?.news ||
                response?.data

            if (createdNews?.id) {
                navigate(
                    `/admin/content/news/${createdNews.id}/edit`
                )

                return
            }

            navigate("/admin/content/news")
        },

        onError: (mutationError) => {
            setSuccessMessage("")

            setErrorMessage(
                mutationError?.response?.data?.message ||
                    (isEditMode
                        ? "Failed to update news."
                        : "Failed to create news.")
            )
        },
    })


    /*
     * ---------------------------------------------------------
     * Save handler
     * ---------------------------------------------------------
     */

    const handleSave = (statusOverride = null) => {
        setSuccessMessage("")
        setErrorMessage("")

        if (uploadingImage) {
            setErrorMessage(
                "Please wait for the image upload to finish."
            )

            return
        }

        const finalStatus =
            statusOverride || form.status

        if (!validateForm(finalStatus)) {
            return
        }

        const payload =
            buildPayload(finalStatus)

        saveMutation.mutate(payload)
    }


    const saving =
        saveMutation.isPending


    /*
     * ---------------------------------------------------------
     * Loading state
     * ---------------------------------------------------------
     */

    if (isEditMode && isLoading) {
        return (
            <Loader text="Loading news..." />
        )
    }


    /*
     * ---------------------------------------------------------
     * Error state
     * ---------------------------------------------------------
     */

    if (isEditMode && isError) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">

                <div className="mx-auto flex min-h-[60vh] max-w-[1400px] items-center justify-center">

                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">

                            <FileText className="h-6 w-6" />

                        </div>


                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load news
                        </h2>


                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                "Something went wrong while fetching the news article."}
                        </p>


                        <Link
                            to="/admin/content/news"
                            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <ArrowLeft className="h-4 w-4" />

                            Back to News
                        </Link>

                    </div>

                </div>

            </section>
        )
    }


    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* HEADER */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-start gap-3">

                        <Link
                            to="/admin/content/news"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>


                        <div>

                            <div className="mb-1 flex flex-wrap items-center gap-2 text-sm font-medium text-green-700">

                                <FileText className="h-4 w-4" />

                                <span>
                                    Content Management
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    News
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
                                    ? "Edit News"
                                    : "Create News"}
                            </h1>


                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Manage news information and
                                publishing details.
                            </p>

                        </div>

                    </div>


                    <div className="flex items-center gap-3">

                        <Link
                            to="/admin/content/news"
                            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            Cancel
                        </Link>


                        <button
                            type="button"
                            onClick={() => handleSave()}
                            disabled={
                                saving ||
                                uploadingImage
                            }
                            className="inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {saving ? (
                                <Loader
                                    variant="button"
                                    text="Saving..."
                                />
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />

                                    {isEditMode
                                        ? "Save Changes"
                                        : "Create News"}
                                </>
                            )}

                        </button>

                    </div>

                </div>


                {/* ALERTS */}

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


                {/* STATUS INFORMATION */}

                <div className="flex flex-col gap-4 rounded-3xl border border-green-100 bg-green-50/60 p-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <Info className="h-5 w-5" />
                        </div>


                        <div>

                            <h2 className="text-sm font-bold text-green-900">
                                News status
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-green-800/80">
                                The status is stored directly in
                                the news record.
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


                {/* MAIN LAYOUT */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

                    {/* MAIN CONTENT */}

                    <div className="space-y-6">

                        {/* BASIC INFORMATION */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                            <div className="mb-6">

                                <h2 className="text-base font-bold text-gray-900">
                                    Basic Information
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Core information stored in the
                                    news record.
                                </p>

                            </div>


                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* TITLE */}

                                <div className="md:col-span-2">

                                    <label
                                        htmlFor="title"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        News Title
                                    </label>


                                    <input
                                        id="title"
                                        type="text"
                                        value={form.title}
                                        onChange={(event) =>
                                            handleTitleChange(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter news title"
                                        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-50 ${
                                            validationErrors.title
                                                ? "border-red-300"
                                                : "border-gray-200"
                                        }`}
                                    />


                                    {validationErrors.title && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {validationErrors.title}
                                        </p>
                                    )}

                                </div>


                                {/* SLUG */}

                                <div className="md:col-span-2">

                                    <label
                                        htmlFor="slug"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Slug
                                    </label>


                                    <input
                                        id="slug"
                                        type="text"
                                        value={form.slug}
                                        onChange={(event) =>
                                            updateField(
                                                "slug",
                                                event.target.value
                                            )
                                        }
                                        placeholder="news-article-slug"
                                        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-50 ${
                                            validationErrors.slug
                                                ? "border-red-300"
                                                : "border-gray-200"
                                        }`}
                                    />


                                    <p className="mt-2 text-xs text-gray-400">
                                        Use lowercase letters,
                                        numbers and hyphens.
                                    </p>


                                    {validationErrors.slug && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {validationErrors.slug}
                                        </p>
                                    )}

                                </div>


                                {/* CATEGORY */}

                                <div>

                                    <label
                                        htmlFor="category"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Category
                                    </label>


                                    <select
                                        id="category"
                                        value={form.category}
                                        onChange={(event) =>
                                            updateField(
                                                "category",
                                                event.target.value
                                            )
                                        }
                                        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-50 ${
                                            validationErrors.category
                                                ? "border-red-300"
                                                : "border-gray-200"
                                        }`}
                                    >

                                        {categories.map(
                                            (category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            )
                                        )}

                                    </select>


                                    {validationErrors.category && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {validationErrors.category}
                                        </p>
                                    )}

                                </div>


                                {/* AUTHOR */}

                                <div>

                                    <label
                                        htmlFor="author"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Author
                                    </label>


                                    <input
                                        id="author"
                                        type="text"
                                        value={form.author}
                                        onChange={(event) =>
                                            updateField(
                                                "author",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter author name"
                                        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-50 ${
                                            validationErrors.author
                                                ? "border-red-300"
                                                : "border-gray-200"
                                        }`}
                                    />


                                    {validationErrors.author && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {validationErrors.author}
                                        </p>
                                    )}

                                </div>


                                {/* SUMMARY */}

                                <div className="md:col-span-2">

                                    <label
                                        htmlFor="summary"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Summary
                                    </label>


                                    <textarea
                                        id="summary"
                                        rows={4}
                                        value={form.summary}
                                        onChange={(event) =>
                                            updateField(
                                                "summary",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Write a short summary of the news article..."
                                        className={`w-full resize-y rounded-2xl border bg-white px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-50 ${
                                            validationErrors.summary
                                                ? "border-red-300"
                                                : "border-gray-200"
                                        }`}
                                    />


                                    <p className="mt-2 text-xs text-gray-400">
                                        Keep the summary short and
                                        useful for cards and previews.
                                    </p>


                                    {validationErrors.summary && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {validationErrors.summary}
                                        </p>
                                    )}

                                </div>

                            </div>

                        </section>


                        {/* ARTICLE CONTENT */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                            <div className="mb-6">

                                <h2 className="text-base font-bold text-gray-900">
                                    Article Content
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Write the complete content of the
                                    news article.
                                </p>

                            </div>


                            <label
                                htmlFor="content"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Content
                            </label>


                            <textarea
                                id="content"
                                rows={18}
                                value={form.content}
                                onChange={(event) =>
                                    updateField(
                                        "content",
                                        event.target.value
                                    )
                                }
                                placeholder="Write your news article here..."
                                className={`w-full resize-y rounded-2xl border bg-white px-4 py-4 text-sm leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-50 ${
                                    validationErrors.content
                                        ? "border-red-300"
                                        : "border-gray-200"
                                }`}
                            />


                            {validationErrors.content && (
                                <p className="mt-2 text-xs font-medium text-red-600">
                                    {validationErrors.content}
                                </p>
                            )}


                            <div className="mt-3 flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-500">

                                <FileCheck2 className="h-4 w-4" />

                                <span>
                                    Content is currently stored as
                                    plain text.
                                </span>

                            </div>

                        </section>


                        {/* FEATURED IMAGE */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                            <div className="mb-6">

                                <h2 className="text-base font-bold text-gray-900">
                                    Featured Image
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Upload a featured image for the
                                    news article.
                                </p>

                            </div>


                            <div className="flex flex-col gap-4">

                                {!imagePreview ? (
                                    <label
                                        htmlFor="news-image"
                                        className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 text-center transition hover:border-green-300 hover:bg-green-50/50"
                                    >

                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">

                                            <Upload
                                                className="h-6 w-6"
                                                strokeWidth={1.8}
                                            />

                                        </div>


                                        <p className="text-sm font-semibold text-gray-700">
                                            {uploadingImage
                                                ? "Uploading image..."
                                                : "Upload featured image"}
                                        </p>


                                        <p className="mt-1 text-xs text-gray-400">
                                            JPG, PNG, WEBP up to 5 MB
                                        </p>


                                        <input
                                            id="news-image"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            onChange={
                                                handleImageUpload
                                            }
                                            disabled={
                                                uploadingImage
                                            }
                                            className="hidden"
                                        />

                                    </label>
                                ) : (
                                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">

                                        <div className="relative">

                                            <img
                                                src={imagePreview}
                                                alt="News preview"
                                                className="h-72 w-full object-cover"
                                                onError={() => {
                                                    setImagePreview("")
                                                }}
                                            />


                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                disabled={
                                                    uploadingImage
                                                }
                                                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-black/70 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                                                aria-label="Remove image"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>

                                        </div>


                                        <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-white px-4 py-3">

                                            <div className="flex min-w-0 items-center gap-2">

                                                <ImageIcon className="h-4 w-4 shrink-0 text-green-700" />

                                                <span className="truncate text-xs text-gray-500">
                                                    Image uploaded
                                                </span>

                                            </div>


                                            <label
                                                htmlFor="news-image-replace"
                                                className="cursor-pointer text-xs font-semibold text-green-700 hover:text-green-800"
                                            >
                                                Replace

                                                <input
                                                    id="news-image-replace"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                                    onChange={
                                                        handleImageUpload
                                                    }
                                                    disabled={
                                                        uploadingImage
                                                    }
                                                    className="hidden"
                                                />

                                            </label>

                                        </div>

                                    </div>
                                )}

                            </div>

                        </section>

                    </div>


                    {/* SIDEBAR */}

                    <aside className="space-y-6">

                        {/* PUBLISHING */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">

                                    <CalendarDays className="h-5 w-5" />

                                </div>


                                <div>

                                    <h2 className="font-bold text-gray-900">
                                        Publishing
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Manage publication settings
                                    </p>

                                </div>

                            </div>


                            <div className="space-y-5">

                                {/* STATUS */}

                                <div>

                                    <label
                                        htmlFor="status"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Status
                                    </label>


                                    <select
                                        id="status"
                                        value={form.status}
                                        onChange={(event) =>
                                            updateField(
                                                "status",
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-50"
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
                                                    {status.label}
                                                </option>
                                            )
                                        )}

                                    </select>

                                </div>


                                {/* PUBLICATION DATE */}

                                <div>

                                    <label
                                        htmlFor="publicationDate"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Publication Date
                                    </label>


                                    <input
                                        id="publicationDate"
                                        type="date"
                                        value={
                                            form.publicationDate
                                        }
                                        onChange={(event) =>
                                            updateField(
                                                "publicationDate",
                                                event.target.value
                                            )
                                        }
                                        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-50 ${
                                            validationErrors.publicationDate
                                                ? "border-red-300"
                                                : "border-gray-200"
                                        }`}
                                    />


                                    {validationErrors.publicationDate && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            {
                                                validationErrors.publicationDate
                                            }
                                        </p>
                                    )}

                                </div>


                                {/* PUBLICATION TIME */}

                                <div>

                                    <label
                                        htmlFor="publishTime"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Publication Time
                                    </label>


                                    <input
                                        id="publishTime"
                                        type="time"
                                        value={
                                            form.publishTime
                                        }
                                        onChange={(event) =>
                                            updateField(
                                                "publishTime",
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-50"
                                    />

                                </div>


                                {/* STATUS INDICATOR */}

                                <div
                                    className={`rounded-2xl border px-4 py-3 ${
                                        form.status ===
                                        "PUBLISHED"
                                            ? "border-green-200 bg-green-50"
                                            : "border-amber-200 bg-amber-50"
                                    }`}
                                >

                                    <div className="flex items-start gap-3">

                                        <CheckCircle2
                                            className={`mt-0.5 h-[18px] w-[18px] ${
                                                form.status ===
                                                "PUBLISHED"
                                                    ? "text-green-600"
                                                    : "text-amber-600"
                                            }`}
                                        />


                                        <div>

                                            <p
                                                className={`text-sm font-semibold ${
                                                    form.status ===
                                                    "PUBLISHED"
                                                        ? "text-green-800"
                                                        : "text-amber-800"
                                                }`}
                                            >
                                                {form.status ===
                                                "PUBLISHED"
                                                    ? "Ready to publish"
                                                    : "Saved as draft"}
                                            </p>


                                            <p
                                                className={`mt-1 text-xs leading-5 ${
                                                    form.status ===
                                                    "PUBLISHED"
                                                        ? "text-green-700"
                                                        : "text-amber-700"
                                                }`}
                                            >
                                                {form.status ===
                                                "PUBLISHED"
                                                    ? "This article will be visible as published."
                                                    : "This article will remain a draft until published."}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* PUBLISHING CHECKLIST */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-4 text-sm font-bold text-gray-900">
                                Publishing Checklist
                            </h2>


                            <div className="space-y-3">

                                <ChecklistItem
                                    label="Title added"
                                    complete={Boolean(
                                        form.title.trim()
                                    )}
                                />


                                <ChecklistItem
                                    label="Slug added"
                                    complete={Boolean(
                                        form.slug.trim()
                                    )}
                                />


                                <ChecklistItem
                                    label="Summary added"
                                    complete={Boolean(
                                        form.summary.trim()
                                    )}
                                />


                                <ChecklistItem
                                    label="Content added"
                                    complete={Boolean(
                                        form.content.trim()
                                    )}
                                />


                                <ChecklistItem
                                    label="Author added"
                                    complete={Boolean(
                                        form.author.trim()
                                    )}
                                />


                                <ChecklistItem
                                    label="Featured image"
                                    complete={Boolean(
                                        form.image_url
                                    )}
                                />


                                <ChecklistItem
                                    label="Publication date"
                                    complete={
                                        form.status !==
                                            "PUBLISHED" ||
                                        Boolean(
                                            form.publicationDate
                                        )
                                    }
                                />

                            </div>

                        </section>


                        {/* CONTENT TIP */}

                        <section className="rounded-3xl bg-[#edf7ed] p-5">

                            <h2 className="text-sm font-bold text-green-900">
                                Content Tip
                            </h2>


                            <p className="mt-2 text-xs leading-5 text-green-800">
                                Use a clear title, short summary and
                                well-structured content so visitors can
                                quickly understand the news.
                            </p>

                        </section>

                    </aside>

                </div>


                {/* BOTTOM ACTIONS */}

                <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <Link
                            to="/admin/content/news"
                            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </Link>


                        <div className="flex flex-col gap-3 sm:flex-row">

                            {/* SAVE DRAFT */}

                            <button
                                type="button"
                                disabled={
                                    saving ||
                                    uploadingImage
                                }
                                onClick={() =>
                                    handleSave("DRAFT")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {saving ? (
                                    <Loader
                                        variant="button"
                                        text="Saving..."
                                    />
                                ) : (
                                    <>
                                        <Save className="h-[17px] w-[17px]" />

                                        Save Draft
                                    </>
                                )}

                            </button>


                            {/* PUBLISH */}

                            <button
                                type="button"
                                disabled={
                                    saving ||
                                    uploadingImage
                                }
                                onClick={() =>
                                    handleSave(
                                        "PUBLISHED"
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {saving ? (
                                    <Loader
                                        variant="button"
                                        text="Publishing..."
                                    />
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-[17px] w-[17px]" />

                                        {isEditMode
                                            ? "Update & Publish"
                                            : "Publish News"}
                                    </>
                                )}

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}


const ChecklistItem = ({
    label,
    complete,
}) => {
    return (
        <div className="flex items-center gap-3">

            <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    complete
                        ? "bg-green-600 text-white"
                        : "border border-gray-300 bg-white"
                }`}
            >

                {complete && (
                    <CheckCircle2 className="h-[14px] w-[14px]" />
                )}

            </div>


            <span
                className={`text-sm ${
                    complete
                        ? "font-medium text-gray-700"
                        : "text-gray-400"
                }`}
            >
                {label}
            </span>

        </div>
    )
}


export default NewsEditor