import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

import {
    ArrowLeft,
    CheckCircle2,
    FileCheck2,
    Image as ImageIcon,
    Info,
    Save,
    ShieldCheck,
    Upload,
    X,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import axiosInstance from "../../../api/axiosInstance.js"

import {
    createAdminSuccessStory,
    getAdminSuccessStoryById,
    updateAdminSuccessStory,
} from "../../api/adminSuccessStoriesApi.js"

const createEmptyForm = () => ({
    title: "",
    slug: "",
    beneficiary_name: "",
    location: "",
    story: "",
    outcomes: "",
    quote: "",
    media_url: "",
    consent_status: "PENDING",
    publish_permission: false,
    status: "DRAFT",
})

const slugify = (value) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
}

const normalizeBoolean = (value) => {
    return (
        value === true ||
        value === 1 ||
        value === "1"
    )
}

const getErrorMessage = (error, fallback) => {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        fallback
    )
}

/*
|--------------------------------------------------------------------------
| Backend media URL helpers
|--------------------------------------------------------------------------
|
| axiosInstance baseURL may be:
|
| http://localhost:3000/api
|
| But uploaded files are served from:
|
| http://localhost:3000/uploads/...
|
| Therefore we extract only the backend origin.
|
*/

const getApiOrigin = () => {
    const baseURL =
        axiosInstance?.defaults?.baseURL ||
        window.location.origin

    try {
        return new URL(
            baseURL,
            window.location.origin
        ).origin
    } catch {
        return window.location.origin
    }
}

const resolveMediaUrl = (url) => {
    if (!url) {
        return ""
    }

    if (
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("blob:")
    ) {
        return url
    }

    return `${getApiOrigin()}${
        url.startsWith("/") ? "" : "/"
    }${url}`
}

const SuccessStoryEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const isEditMode = Boolean(id)

    const fileInputRef = useRef(null)

    const [form, setForm] = useState(
        createEmptyForm
    )

    const [
        slugManuallyEdited,
        setSlugManuallyEdited,
    ] = useState(false)

    const [
        validationErrors,
        setValidationErrors,
    ] = useState({})

    const [savedStatus, setSavedStatus] =
        useState(
            isEditMode
                ? null
                : "DRAFT"
        )

    const [selectedFile, setSelectedFile] =
        useState(null)

    const [previewUrl, setPreviewUrl] =
        useState("")

    const [isUploading, setIsUploading] =
        useState(false)

    const [uploadMessage, setUploadMessage] =
        useState("")

    /*
    |--------------------------------------------------------------------------
    | Load existing success story
    |--------------------------------------------------------------------------
    */

    const {
        data,
        isLoading: isLoadingStory,
        isError: isStoryError,
        error: storyError,
        refetch,
    } = useQuery({
        queryKey: [
            "admin-success-story",
            id,
        ],

        queryFn: () =>
            getAdminSuccessStoryById(id),

        enabled: isEditMode,
    })

    /*
    |--------------------------------------------------------------------------
    | Populate edit form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!isEditMode) {
            const emptyForm =
                createEmptyForm()

            setForm(emptyForm)
            setSlugManuallyEdited(false)
            setSavedStatus("DRAFT")
            setPreviewUrl("")
            setSelectedFile(null)

            return
        }

        const story =
            data?.successStory ||
            data?.success_story ||
            null

        if (!story) {
            return
        }

        setForm({
            title:
                story.title ?? "",

            slug:
                story.slug ?? "",

            beneficiary_name:
                story.beneficiary_name ?? "",

            location:
                story.location ?? "",

            story:
                story.story ?? "",

            outcomes:
                story.outcomes ?? "",

            quote:
                story.quote ?? "",

            media_url:
                story.media_url ?? "",

            consent_status:
                story.consent_status ??
                "PENDING",

            publish_permission:
                normalizeBoolean(
                    story.publish_permission
                ),

            status:
                story.status ??
                "DRAFT",
        })

        setSavedStatus(
            story.status ?? "DRAFT"
        )

        setSlugManuallyEdited(true)

        setPreviewUrl(
            resolveMediaUrl(
                story.media_url
            )
        )
    }, [
        data,
        isEditMode,
    ])

    /*
    |--------------------------------------------------------------------------
    | Cleanup blob preview URLs
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        return () => {
            if (
                previewUrl &&
                previewUrl.startsWith("blob:")
            ) {
                URL.revokeObjectURL(
                    previewUrl
                )
            }
        }
    }, [previewUrl])

    /*
    |--------------------------------------------------------------------------
    | Form helpers
    |--------------------------------------------------------------------------
    */

    const updateField = (
        field,
        value
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }))

        setValidationErrors(
            (previous) => {
                if (!previous[field]) {
                    return previous
                }

                const next = {
                    ...previous,
                }

                delete next[field]

                return next
            }
        )
    }

    const handleTitleChange = (
        value
    ) => {
        setForm((previous) => ({
            ...previous,

            title: value,

            slug: slugManuallyEdited
                ? previous.slug
                : slugify(value),
        }))

        setValidationErrors(
            (previous) => {
                if (!previous.title) {
                    return previous
                }

                const next = {
                    ...previous,
                }

                delete next.title

                return next
            }
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Image upload
    |--------------------------------------------------------------------------
    */

    const uploadImage = async (
        file
    ) => {
        const formData = new FormData()

        formData.append(
            "file",
            file
        )

        const response =
            await axiosInstance.post(
                "/admin/gallery/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            )

        return response.data
    }

    const handleFileChange = async (
        event
    ) => {
        const file =
            event.target.files?.[0]

        event.target.value = ""

        if (!file) {
            return
        }

        /*
        |--------------------------------------------------------------------------
        | Validate image
        |--------------------------------------------------------------------------
        */

        if (
            !file.type.startsWith(
                "image/"
            )
        ) {
            setUploadMessage(
                "Please select an image file."
            )

            return
        }

        /*
        |--------------------------------------------------------------------------
        | Clear previous messages
        |--------------------------------------------------------------------------
        */

        setUploadMessage("")

        setValidationErrors(
            (previous) => {
                const next = {
                    ...previous,
                }

                delete next.media_url

                return next
            }
        )

        /*
        |--------------------------------------------------------------------------
        | Show local preview immediately
        |--------------------------------------------------------------------------
        */

        const localPreviewUrl =
            URL.createObjectURL(file)

        setSelectedFile(file)

        setPreviewUrl(
            localPreviewUrl
        )

        /*
        |--------------------------------------------------------------------------
        | Upload to backend
        |--------------------------------------------------------------------------
        */

        try {
            setIsUploading(true)

            setUploadMessage(
                "Uploading image..."
            )

            const uploadResponse =
                await uploadImage(file)

            const uploadedFile =
                uploadResponse?.file ||
                uploadResponse?.data?.file

            if (
                !uploadedFile?.fileUrl
            ) {
                throw new Error(
                    "The server did not return the uploaded image URL."
                )
            }

            /*
            |--------------------------------------------------------------------------
            | Save returned server path
            |--------------------------------------------------------------------------
            */

            setForm(
                (previous) => ({
                    ...previous,

                    media_url:
                        uploadedFile.fileUrl,
                })
            )

            /*
            |--------------------------------------------------------------------------
            | Replace blob preview with server preview
            |--------------------------------------------------------------------------
            */

            setPreviewUrl(
                resolveMediaUrl(
                    uploadedFile.fileUrl
                )
            )

            setUploadMessage(
                "Image uploaded successfully."
            )
        } catch (error) {
            setSelectedFile(null)

            setPreviewUrl("")

            setForm(
                (previous) => ({
                    ...previous,

                    media_url: "",
                })
            )

            setUploadMessage(
                getErrorMessage(
                    error,
                    "Unable to upload the image."
                )
            )
        } finally {
            setIsUploading(false)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Remove image
    |--------------------------------------------------------------------------
    */

    const removeImage = () => {
        setSelectedFile(null)

        setForm(
            (previous) => ({
                ...previous,

                media_url: "",
            })
        )

        setPreviewUrl("")

        setUploadMessage("")
    }

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    const validateForm = (
        status = form.status
    ) => {
        const errors = {}

        if (!form.title.trim()) {
            errors.title =
                "Title is required."
        }

        if (!form.slug.trim()) {
            errors.slug =
                "Slug is required."
        }

        if (!form.story.trim()) {
            errors.story =
                "Story is required."
        }

        if (
            status === "PUBLISHED" &&
            !form.publish_permission
        ) {
            errors.publish_permission =
                "Publishing permission is required before publishing."
        }

        if (
            status === "PUBLISHED" &&
            form.consent_status ===
                "PENDING"
        ) {
            errors.consent_status =
                "Consent must be received or marked not required before publishing."
        }

        setValidationErrors(
            errors
        )

        return (
            Object.keys(errors)
                .length === 0
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Save mutation
    |--------------------------------------------------------------------------
    */

    const saveMutation =
        useMutation({
            mutationFn:
                async (payload) => {
                    if (isEditMode) {
                        return updateAdminSuccessStory(
                            id,
                            payload
                        )
                    }

                    return createAdminSuccessStory(
                        payload
                    )
                },

            onSuccess:
                async (response) => {
                    await queryClient.invalidateQueries(
                        {
                            queryKey: [
                                "admin-success-stories",
                            ],
                        }
                    )

                    if (isEditMode) {
                        await queryClient.invalidateQueries(
                            {
                                queryKey: [
                                    "admin-success-story",
                                    id,
                                ],
                            }
                        )
                    }

                    const savedStory =
                        response?.successStory ||
                        response?.success_story

                    setSavedStatus(
                        savedStory?.status ||
                            form.status
                    )

                    /*
                    |--------------------------------------------------------------------------
                    | New record
                    |--------------------------------------------------------------------------
                    */

                    if (
                        !isEditMode &&
                        savedStory?.id
                    ) {
                        navigate(
                            `/admin/content/success-stories/${savedStory.id}/edit`
                        )

                        return
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | Existing record
                    |--------------------------------------------------------------------------
                    */

                    navigate(
                        "/admin/content/success-stories"
                    )
                },
        })

    /*
    |--------------------------------------------------------------------------
    | Save
    |--------------------------------------------------------------------------
    */

    const handleSave = (
        nextStatus
    ) => {
        const status =
            nextStatus ||
            form.status

        /*
        |--------------------------------------------------------------------------
        | Validate first
        |--------------------------------------------------------------------------
        */

        if (
            !validateForm(status)
        ) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })

            return
        }

        /*
        |--------------------------------------------------------------------------
        | Prepare payload
        |--------------------------------------------------------------------------
        */

        const payload = {
            title:
                form.title.trim(),

            slug:
                form.slug.trim(),

            beneficiary_name:
                form.beneficiary_name.trim() ||
                null,

            location:
                form.location.trim() ||
                null,

            story:
                form.story.trim(),

            outcomes:
                form.outcomes.trim() ||
                null,

            quote:
                form.quote.trim() ||
                null,

            media_url:
                form.media_url.trim() ||
                null,

            consent_status:
                form.consent_status,

            publish_permission:
                form.publish_permission
                    ? 1
                    : 0,

            status,
        }

        /*
        |--------------------------------------------------------------------------
        | Keep UI status synchronized
        |--------------------------------------------------------------------------
        */

        setForm(
            (previous) => ({
                ...previous,
                status,
            })
        )

        saveMutation.mutate(
            payload
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Loading state
    |--------------------------------------------------------------------------
    */

    if (
        isEditMode &&
        isLoadingStory
    ) {
        return (
            <Loader
                variant="page"
                text="Loading success story..."
            />
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Error state
    |--------------------------------------------------------------------------
    */

    if (
        isEditMode &&
        isStoryError
    ) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1400px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <FileCheck2 className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load success story
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {storyError?.response?.data?.message ||
                                "The requested success story could not be loaded."}
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <button
                                type="button"
                                onClick={() =>
                                    refetch()
                                }
                                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Try Again
                            </button>

                            <Link
                                to="/admin/content/success-stories"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Success Stories
                            </Link>
                        </div>
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
                            to="/admin/content/success-stories"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium text-green-700">
                                <span>
                                    Content Management
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    Success Stories
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    {isEditMode
                                        ? "Edit"
                                        : "New"}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {isEditMode
                                    ? "Edit Success Story"
                                    : "Add Success Story"}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Manage the success story content,
                                beneficiary information, media and
                                publishing permission.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5">
                        <CheckCircle2 className="h-4 w-4 text-green-700" />

                        <span className="text-xs font-semibold text-green-700">
                            {savedStatus ===
                            "PUBLISHED"
                                ? "Published"
                                : "Draft"}
                        </span>
                    </div>
                </div>

                {/* Validation */}

                {Object.keys(
                    validationErrors
                ).length > 0 && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
                        <div className="flex items-start gap-3">
                            <Info className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                            <div>
                                <p className="text-sm font-bold text-red-800">
                                    Please complete the highlighted fields.
                                </p>

                                <p className="mt-1 text-xs leading-5 text-red-700">
                                    Required information is highlighted below.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload message */}

                {uploadMessage && (
                    <div
                        className={`rounded-2xl border px-5 py-4 text-sm font-medium ${
                            uploadMessage
                                .toLowerCase()
                                .includes(
                                    "successfully"
                                )
                                ? "border-green-200 bg-green-50 text-green-800"
                                : "border-red-200 bg-red-50 text-red-700"
                        }`}
                    >
                        {uploadMessage}
                    </div>
                )}

                {/* Main Content */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Left */}

                    <div className="space-y-6">

                        {/* Story Information */}

                        <FormCard
                            title="Story Information"
                            description="Basic information stored in the success_stories table."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                <Field
                                    label="Story Title"
                                    required
                                    value={
                                        form.title
                                    }
                                    onChange={
                                        handleTitleChange
                                    }
                                    placeholder="Enter success story title"
                                    className="md:col-span-2"
                                    error={
                                        validationErrors.title
                                    }
                                />

                                <Field
                                    label="Slug"
                                    required
                                    value={
                                        form.slug
                                    }
                                    onChange={(
                                        value
                                    ) => {
                                        setSlugManuallyEdited(
                                            true
                                        )

                                        updateField(
                                            "slug",
                                            slugify(
                                                value
                                            )
                                        )
                                    }}
                                    placeholder="success-story-slug"
                                    error={
                                        validationErrors.slug
                                    }
                                />

                                <Field
                                    label="Beneficiary Name"
                                    value={
                                        form.beneficiary_name
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        updateField(
                                            "beneficiary_name",
                                            value
                                        )
                                    }
                                    placeholder="Enter beneficiary name"
                                />

                                <Field
                                    label="Location"
                                    value={
                                        form.location
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        updateField(
                                            "location",
                                            value
                                        )
                                    }
                                    placeholder="District, State"
                                />
                            </div>
                        </FormCard>

                        {/* Story Content */}

                        <FormCard
                            title="Story Content"
                            description="The main story, outcomes and beneficiary quote."
                        >
                            <div className="space-y-5">

                                <TextAreaField
                                    label="Story"
                                    required
                                    value={
                                        form.story
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        updateField(
                                            "story",
                                            value
                                        )
                                    }
                                    placeholder="Write the complete success story..."
                                    rows={12}
                                    error={
                                        validationErrors.story
                                    }
                                />

                                <TextAreaField
                                    label="Outcomes"
                                    value={
                                        form.outcomes
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        updateField(
                                            "outcomes",
                                            value
                                        )
                                    }
                                    placeholder="Describe the outcomes..."
                                    rows={7}
                                />

                                <TextAreaField
                                    label="Quote"
                                    value={
                                        form.quote
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        updateField(
                                            "quote",
                                            value
                                        )
                                    }
                                    placeholder="Enter the beneficiary quote..."
                                    rows={5}
                                />

                            </div>
                        </FormCard>

                        {/* Media */}

                        <FormCard
                            title="Media"
                            description="Upload an image for this success story."
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                                onChange={
                                    handleFileChange
                                }
                                className="hidden"
                            />

                            {!form.media_url ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={
                                        isUploading
                                    }
                                    className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 text-center transition hover:border-green-300 hover:bg-green-50/50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader
                                                variant="button"
                                                text="Uploading..."
                                            />

                                            <p className="mt-4 text-xs text-gray-500">
                                                Please wait while the image is being uploaded.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-green-700 shadow-sm">
                                                <Upload
                                                    size={28}
                                                />
                                            </div>

                                            <p className="mt-4 text-sm font-bold text-gray-800">
                                                Upload story image
                                            </p>

                                            <p className="mt-1 max-w-md text-xs leading-5 text-gray-500">
                                                Select an image from your computer.
                                                JPG, PNG, WEBP, GIF and SVG are supported.
                                            </p>

                                            <span className="mt-4 inline-flex rounded-xl bg-green-700 px-4 py-2.5 text-xs font-semibold text-white">
                                                Choose Image
                                            </span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="space-y-4">

                                    {/* Preview */}

                                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
                                        {previewUrl ? (
                                            <img
                                                src={
                                                    previewUrl
                                                }
                                                alt={
                                                    form.title ||
                                                    "Success story"
                                                }
                                                className="max-h-[520px] min-h-[280px] w-full object-contain"
                                                onError={() => {
                                                    setUploadMessage(
                                                        "The image could not be loaded from the server."
                                                    )
                                                }}
                                            />
                                        ) : (
                                            <div className="flex min-h-[280px] items-center justify-center">
                                                <ImageIcon
                                                    size={
                                                        48
                                                    }
                                                    className="text-gray-300"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Uploaded information */}

                                    <div className="rounded-2xl border border-green-100 bg-green-50/70 p-4">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-green-900">
                                                    {selectedFile?.name ||
                                                        "Uploaded story image"}
                                                </p>

                                                <p className="mt-1 break-all text-xs text-green-800/70">
                                                    {form.media_url}
                                                </p>

                                                {!selectedFile &&
                                                    form.media_url && (
                                                        <p className="mt-1 text-xs text-green-800/60">
                                                            Existing story image
                                                        </p>
                                                    )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={
                                                    removeImage
                                                }
                                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-red-600 shadow-sm ring-1 ring-red-100 transition hover:bg-red-50"
                                            >
                                                <X
                                                    size={14}
                                                />
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Replace */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        disabled={
                                            isUploading
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Upload
                                            size={14}
                                        />
                                        Replace Image
                                    </button>

                                </div>
                            )}

                            {validationErrors.media_url && (
                                <p className="mt-2 text-xs font-medium text-red-600">
                                    {
                                        validationErrors.media_url
                                    }
                                </p>
                            )}
                        </FormCard>
                    </div>

                    {/* Sidebar */}

                    <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">

                        {/* Status */}

                        <FormCard
                            title="Status"
                            description="Publication status from the database."
                        >
                            <SelectField
                                label="Status"
                                required
                                value={
                                    form.status
                                }
                                onChange={(
                                    value
                                ) =>
                                    updateField(
                                        "status",
                                        value
                                    )
                                }
                                options={[
                                    "DRAFT",
                                    "PUBLISHED",
                                ]}
                            />
                        </FormCard>

                        {/* Consent */}

                        <FormCard
                            title="Consent & Permissions"
                            description="Manage consent and publishing permission for this story."
                        >
                            <div className="space-y-5">

                                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

                                        <div>
                                            <p className="text-xs font-bold text-amber-950">
                                                Publishing check
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-amber-900/70">
                                                Published stories must have publishing permission and valid consent.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <SelectField
                                    label="Consent Status"
                                    required
                                    value={
                                        form.consent_status
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        updateField(
                                            "consent_status",
                                            value
                                        )
                                    }
                                    options={[
                                        "PENDING",
                                        "RECEIVED",
                                        "NOT_REQUIRED",
                                    ]}
                                    error={
                                        validationErrors.consent_status
                                    }
                                />

                                <ToggleRow
                                    label="Publishing Permission"
                                    description="Allow this story to be published publicly."
                                    checked={
                                        form.publish_permission
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        updateField(
                                            "publish_permission",
                                            value
                                        )
                                    }
                                />

                                {validationErrors.publish_permission && (
                                    <p className="-mt-3 text-xs font-medium text-red-600">
                                        {
                                            validationErrors.publish_permission
                                        }
                                    </p>
                                )}
                            </div>
                        </FormCard>

                        {/* Checklist */}

                        <FormCard
                            title="Checklist"
                            description="Review the important fields before saving."
                        >
                            <div className="space-y-3">

                                <ChecklistItem
                                    label="Title and slug"
                                    checked={
                                        Boolean(
                                            form.title.trim() &&
                                            form.slug.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Story"
                                    checked={
                                        Boolean(
                                            form.story.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Beneficiary"
                                    checked={
                                        Boolean(
                                            form.beneficiary_name.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Outcomes"
                                    checked={
                                        Boolean(
                                            form.outcomes.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Story image"
                                    checked={
                                        Boolean(
                                            form.media_url.trim()
                                        )
                                    }
                                />

                                <ChecklistItem
                                    label="Consent"
                                    checked={
                                        form.consent_status ===
                                            "RECEIVED" ||
                                        form.consent_status ===
                                            "NOT_REQUIRED"
                                    }
                                />

                                <ChecklistItem
                                    label="Publishing permission"
                                    checked={
                                        form.publish_permission
                                    }
                                />

                            </div>
                        </FormCard>

                    </aside>
                </div>

                {/* Bottom Actions */}

                <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                    <Link
                        to="/admin/content/success-stories"
                        className="inline-flex items-center gap-3 rounded-2xl px-5 py-3 text-lg font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                    >
                        <ArrowLeft
                            size={22}
                        />
                        Back to Success Stories
                    </Link>

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <button
                            type="button"
                            disabled={
                                saveMutation.isPending ||
                                isUploading
                            }
                            onClick={() =>
                                handleSave(
                                    "DRAFT"
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save
                                className="h-4 w-4"
                            />

                            {saveMutation.isPending
                                ? "Saving..."
                                : "Save Draft"}
                        </button>

                        <button
                            type="button"
                            disabled={
                                saveMutation.isPending ||
                                isUploading
                            }
                            onClick={() =>
                                handleSave(
                                    "PUBLISHED"
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-green-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <CheckCircle2
                                className="h-4 w-4"
                            />

                            {saveMutation.isPending
                                ? "Saving..."
                                : "Publish Story"}
                        </button>

                    </div>
                </div>

                {/* Save Error */}

                {saveMutation.isError && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
                        {getErrorMessage(
                            saveMutation.error,
                            "Unable to save the success story. Please try again."
                        )}
                    </div>
                )}

            </div>
        </section>
    )
}

/*
|--------------------------------------------------------------------------
| Form Card
|--------------------------------------------------------------------------
*/

const FormCard = ({
    title,
    description,
    children,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                <h2 className="text-base font-bold text-gray-900">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500">
                        {description}
                    </p>
                )}
            </div>

            <div className="p-5 sm:p-6">
                {children}
            </div>

        </div>
    )
}

/*
|--------------------------------------------------------------------------
| Input Field
|--------------------------------------------------------------------------
*/

const Field = ({
    label,
    required = false,
    value,
    onChange,
    placeholder,
    className = "",
    error,
}) => {
    return (
        <div className={className}>

            <label className="mb-2 block text-sm font-semibold text-gray-800">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <input
                type="text"
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                placeholder={placeholder}
                className={`h-11 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                    error
                        ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                        : "border-gray-200 focus:border-green-300 focus:ring-green-50"
                }`}
            />

            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                    {error}
                </p>
            )}

        </div>
    )
}

/*
|--------------------------------------------------------------------------
| Textarea
|--------------------------------------------------------------------------
*/

const TextAreaField = ({
    label,
    required = false,
    value,
    onChange,
    placeholder,
    rows = 5,
    error,
}) => {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-gray-800">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <textarea
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                placeholder={placeholder}
                rows={rows}
                className={`w-full resize-y rounded-2xl border bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                    error
                        ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                        : "border-gray-200 focus:border-green-300 focus:ring-green-50"
                }`}
            />

            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                    {error}
                </p>
            )}

        </div>
    )
}

/*
|--------------------------------------------------------------------------
| Select
|--------------------------------------------------------------------------
*/

const SelectField = ({
    label,
    required = false,
    value,
    onChange,
    options,
    error,
}) => {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-gray-800">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <select
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                className={`h-11 w-full rounded-2xl border bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:bg-white focus:ring-4 ${
                    error
                        ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                        : "border-gray-200 focus:border-green-300 focus:ring-green-50"
                }`}
            >
                {options.map(
                    (option) => (
                        <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    )
                )}
            </select>

            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                    {error}
                </p>
            )}

        </div>
    )
}

/*
|--------------------------------------------------------------------------
| Toggle
|--------------------------------------------------------------------------
*/

const ToggleRow = ({
    label,
    description,
    checked,
    onChange,
}) => {
    return (
        <div className="flex items-center justify-between gap-4">

            <div>
                <p className="text-sm font-semibold text-gray-800">
                    {label}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                    {description}
                </p>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() =>
                    onChange(!checked)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    checked
                        ? "bg-green-700"
                        : "bg-gray-300"
                }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        checked
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
| Checklist
|--------------------------------------------------------------------------
*/

const ChecklistItem = ({
    label,
    checked,
}) => {
    return (
        <div className="flex items-center gap-3">

            <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    checked
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-400"
                }`}
            >
                <CheckCircle2 className="h-3.5 w-3.5" />
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

export default SuccessStoryEditor