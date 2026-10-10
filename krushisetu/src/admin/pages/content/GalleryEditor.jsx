import { useEffect, useMemo, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"

import {
    ArrowLeft,
    CheckCircle2,
    FileImage,
    Image as ImageIcon,
    Info,
    Save,
    ShieldCheck,
    Upload,
    Video,
    X,
} from "lucide-react"

import axiosInstance from "../../../api/axiosInstance.js"
import Loader from "../../../components/common/Loader"

const languages = ["English", "Marathi", "Hindi"]

const consentStatuses = [
    "PENDING",
    "APPROVED",
    "NOT_REQUIRED",
]

const publishingStatuses = [
    "DRAFT",
    "PUBLISHED",
    "IN_REVIEW",
    "ARCHIVED",
]

const createEmptyForm = () => ({
    title: "",
    slug: "",
    media_type: "IMAGE",

    file_url: "",
    thumbnail_url: "",

    alt_text: "",
    caption: "",
    credit: "",

    consent_status: "PENDING",
    album: "",
    language: "English",

    width: "",
    height: "",
    file_size: "",

    status: "DRAFT",
    featured: false,
})

const slugify = (value) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
}

const getMediaFromResponse = (response) => {
    return (
        response?.media ||
        response?.data?.media ||
        response?.data ||
        null
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

const normalizeMedia = (media) => {
    return {
        title: media?.title ?? "",
        slug: media?.slug ?? "",
        media_type: media?.media_type ?? "IMAGE",

        file_url: media?.file_url ?? "",
        thumbnail_url: media?.thumbnail_url ?? "",

        alt_text: media?.alt_text ?? "",
        caption: media?.caption ?? "",
        credit: media?.credit ?? "",

        consent_status:
            media?.consent_status ?? "PENDING",

        album: media?.album ?? "",
        language: media?.language ?? "English",

        width:
            media?.width !== null &&
            media?.width !== undefined
                ? String(media.width)
                : "",

        height:
            media?.height !== null &&
            media?.height !== undefined
                ? String(media.height)
                : "",

        file_size:
            media?.file_size !== null &&
            media?.file_size !== undefined
                ? String(media.file_size)
                : "",

        status: media?.status ?? "DRAFT",

        featured:
            media?.featured === true ||
            media?.featured === 1 ||
            media?.featured === "1",

    }
}

const formatValue = (value) => {
    if (!value) {
        return "Not set"
    }

    return value
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        )
}

const formatFileSize = (value) => {
    const bytes = Number(value)

    if (!Number.isFinite(bytes) || bytes <= 0) {
        return "Not set"
    }

    if (bytes < 1024) {
        return `${bytes} bytes`
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`
    }

    if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    return `${(
        bytes /
        (1024 * 1024 * 1024)
    ).toFixed(1)} GB`
}

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

    return `${getApiOrigin()}${url.startsWith("/") ? "" : "/"}${url}`
}

const getMediaDimensions = (file) => {
    return new Promise((resolve) => {
        if (file.type.startsWith("image/")) {
            const objectUrl = URL.createObjectURL(file)
            const image = new window.Image()

            image.onload = () => {
                resolve({
                    width: image.naturalWidth || 0,
                    height: image.naturalHeight || 0,
                })

                URL.revokeObjectURL(objectUrl)
            }

            image.onerror = () => {
                resolve({
                    width: 0,
                    height: 0,
                })

                URL.revokeObjectURL(objectUrl)
            }

            image.src = objectUrl

            return
        }

        if (file.type.startsWith("video/")) {
            const objectUrl = URL.createObjectURL(file)
            const video =
                document.createElement("video")

            video.preload = "metadata"

            video.onloadedmetadata = () => {
                resolve({
                    width: video.videoWidth || 0,
                    height: video.videoHeight || 0,
                })

                URL.revokeObjectURL(objectUrl)
            }

            video.onerror = () => {
                resolve({
                    width: 0,
                    height: 0,
                })

                URL.revokeObjectURL(objectUrl)
            }

            video.src = objectUrl

            return
        }

        resolve({
            width: 0,
            height: 0,
        })
    })
}

const GalleryEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const isEditMode = Boolean(id)

    const fileInputRef = useRef(null)
    const thumbnailInputRef = useRef(null)

    const [form, setForm] = useState(createEmptyForm)
    const [initialForm, setInitialForm] = useState(
        createEmptyForm
    )

    const [selectedFile, setSelectedFile] =
        useState(null)

    const [selectedThumbnail, setSelectedThumbnail] =
        useState(null)

    const [previewUrl, setPreviewUrl] = useState("")
    const [thumbnailPreviewUrl, setThumbnailPreviewUrl] =
        useState("")

    const [errors, setErrors] = useState({})
    const [saveMessage, setSaveMessage] = useState("")
    const [uploadMessage, setUploadMessage] = useState("")

    const [isUploading, setIsUploading] = useState(false)
    const [isUploadingThumbnail, setIsUploadingThumbnail] =
        useState(false)

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["admin-gallery-item", id],

        queryFn: async () => {
            const response =
                await axiosInstance.get(
                    `/admin/gallery/${id}`
                )

            return response.data
        },

        enabled: isEditMode,
    })

    useEffect(() => {
        if (!isEditMode) {
            const emptyForm = createEmptyForm()

            setForm(emptyForm)
            setInitialForm(emptyForm)

            return
        }

        const media = getMediaFromResponse(data)

        if (!media) {
            return
        }

        const normalized = normalizeMedia(media)

        setForm(normalized)
        setInitialForm(normalized)

        setPreviewUrl(
            resolveMediaUrl(normalized.file_url)
        )

        setThumbnailPreviewUrl(
            resolveMediaUrl(
                normalized.thumbnail_url
            )
        )
    }, [data, isEditMode])

    useEffect(() => {
        return () => {
            if (
                previewUrl &&
                previewUrl.startsWith("blob:")
            ) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    useEffect(() => {
        return () => {
            if (
                thumbnailPreviewUrl &&
                thumbnailPreviewUrl.startsWith(
                    "blob:"
                )
            ) {
                URL.revokeObjectURL(
                    thumbnailPreviewUrl
                )
            }
        }
    }, [thumbnailPreviewUrl])

    const isDirty = useMemo(() => {
        return (
            JSON.stringify(form) !==
            JSON.stringify(initialForm)
        )
    }, [form, initialForm])

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

        setSaveMessage("")
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

        setSaveMessage("")
    }

    const validate = () => {
        const nextErrors = {}

        if (!form.title.trim()) {
            nextErrors.title =
                "Media title is required."
        }

        if (!form.slug.trim()) {
            nextErrors.slug =
                "URL slug is required."
        }

        if (!form.file_url.trim()) {
            nextErrors.file_url =
                "Please select and upload a media file."
        }

        if (!form.alt_text.trim()) {
            nextErrors.alt_text =
                "Please describe what is shown in the media."
        }

        if (!form.album.trim()) {
            nextErrors.album =
                "Album name is required."
        }

        if (!form.language.trim()) {
            nextErrors.language =
                "Please select a language."
        }

        setErrors(nextErrors)

        return (
            Object.keys(nextErrors).length === 0
        )
    }

    const uploadFile = async (file) => {
        const formData = new FormData()

        formData.append("file", file)

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

    const handleFileChange = async (event) => {
        const file =
            event.target.files?.[0]

        event.target.value = ""

        if (!file) {
            return
        }

        setErrors((previous) => {
            const next = {
                ...previous,
            }

            delete next.file_url

            return next
        })

        setSaveMessage("")
        setUploadMessage("")

        setSelectedFile(file)

        const localPreviewUrl =
            URL.createObjectURL(file)

        setPreviewUrl(localPreviewUrl)

        try {
            setIsUploading(true)

            setUploadMessage(
                "Uploading media file..."
            )

            const [
                uploadResponse,
                dimensions,
            ] = await Promise.all([
                uploadFile(file),
                getMediaDimensions(file),
            ])

            const uploadedFile =
                uploadResponse?.file ||
                uploadResponse?.data?.file

            if (!uploadedFile?.fileUrl) {
                throw new Error(
                    "The server did not return the uploaded file URL."
                )
            }

            const mediaType =
                uploadedFile.mediaType ||
                (
                    file.type.startsWith("video/")
                        ? "VIDEO"
                        : "IMAGE"
                )

            setForm((previous) => ({
                ...previous,

                media_type: mediaType,

                file_url:
                    uploadedFile.fileUrl,

                width:
                    dimensions.width
                        ? String(
                              dimensions.width
                          )
                        : "",

                height:
                    dimensions.height
                        ? String(
                              dimensions.height
                          )
                        : "",

                file_size:
                    uploadedFile.fileSize
                        ? String(
                              uploadedFile.fileSize
                          )
                        : String(file.size),
            }))

            setPreviewUrl(
                resolveMediaUrl(
                    uploadedFile.fileUrl
                )
            )

            setUploadMessage(
                "Media uploaded successfully."
            )
        } catch (error) {
            setSelectedFile(null)

            setPreviewUrl("")

            setForm((previous) => ({
                ...previous,
                file_url: "",
                width: "",
                height: "",
                file_size: "",
            }))

            setUploadMessage(
                getErrorMessage(
                    error,
                    "Unable to upload the selected file."
                )
            )
        } finally {
            setIsUploading(false)
        }
    }

    const handleThumbnailChange = async (
        event
    ) => {
        const file =
            event.target.files?.[0]

        event.target.value = ""

        if (!file) {
            return
        }

        if (!file.type.startsWith("image/")) {
            setUploadMessage(
                "Thumbnail must be an image file."
            )

            return
        }

        setSelectedThumbnail(file)

        setUploadMessage("")

        const localPreviewUrl =
            URL.createObjectURL(file)

        setThumbnailPreviewUrl(
            localPreviewUrl
        )

        try {
            setIsUploadingThumbnail(true)

            const uploadResponse =
                await uploadFile(file)

            const uploadedFile =
                uploadResponse?.file ||
                uploadResponse?.data?.file

            if (!uploadedFile?.fileUrl) {
                throw new Error(
                    "The server did not return the thumbnail URL."
                )
            }

            setForm((previous) => ({
                ...previous,

                thumbnail_url:
                    uploadedFile.fileUrl,
            }))

            setThumbnailPreviewUrl(
                resolveMediaUrl(
                    uploadedFile.fileUrl
                )
            )
        } catch (error) {
            setSelectedThumbnail(null)

            setThumbnailPreviewUrl("")

            setForm((previous) => ({
                ...previous,
                thumbnail_url: "",
            }))

            setUploadMessage(
                getErrorMessage(
                    error,
                    "Unable to upload the thumbnail."
                )
            )
        } finally {
            setIsUploadingThumbnail(false)
        }
    }

    const removeSelectedFile = () => {
        setSelectedFile(null)

        setForm((previous) => ({
            ...previous,
            file_url: "",
            width: "",
            height: "",
            file_size: "",
        }))

        setPreviewUrl("")

        setUploadMessage("")
    }

    const removeThumbnail = () => {
        setSelectedThumbnail(null)

        setForm((previous) => ({
            ...previous,
            thumbnail_url: "",
        }))

        setThumbnailPreviewUrl("")
    }

    const payload = useMemo(() => {
        return {
            title: form.title.trim(),

            slug: form.slug.trim(),

            media_type:
                form.media_type,

            file_url:
                form.file_url.trim(),

            thumbnail_url:
                form.thumbnail_url.trim() ||
                null,

            alt_text:
                form.alt_text.trim(),

            caption:
                form.caption.trim() ||
                null,

            credit:
                form.credit.trim() ||
                null,

            consent_status:
                form.consent_status,

            album:
                form.album.trim(),

            language:
                form.language.trim(),

            width:
                form.width === ""
                    ? null
                    : Number(form.width),

            height:
                form.height === ""
                    ? null
                    : Number(form.height),

            file_size:
                form.file_size === ""
                    ? null
                    : Number(form.file_size),

            status:
                form.status,

            featured:
                form.featured ? 1 : 0,

        }
    }, [form])

    const saveMutation = useMutation({
        mutationFn: async () => {
            if (!validate()) {
                throw new Error(
                    "Please complete the required fields."
                )
            }

            if (isEditMode) {
                const response =
                    await axiosInstance.patch(
                        `/admin/gallery/${id}`,
                        payload
                    )

                return response.data
            }

            const response =
                await axiosInstance.post(
                    "/admin/gallery",
                    payload
                )

            return response.data
        },

        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: ["admin-gallery"],
            })

            if (isEditMode) {
                await queryClient.invalidateQueries({
                    queryKey: [
                        "admin-gallery-item",
                        id,
                    ],
                })

                const updatedMedia =
                    getMediaFromResponse(
                        response
                    )

                if (updatedMedia) {
                    const normalized =
                        normalizeMedia(
                            updatedMedia
                        )

                    setForm(normalized)

                    setInitialForm(
                        normalized
                    )

                    setPreviewUrl(
                        resolveMediaUrl(
                            normalized.file_url
                        )
                    )

                    setThumbnailPreviewUrl(
                        resolveMediaUrl(
                            normalized.thumbnail_url
                        )
                    )
                } else {
                    setInitialForm(form)
                }

                setSaveMessage(
                    response?.message ||
                        "Media updated successfully."
                )

                return
            }

            const createdMedia =
                getMediaFromResponse(
                    response
                )

            if (createdMedia?.id) {
                navigate(
                    `/admin/content/gallery/${createdMedia.id}/edit`,
                    {
                        replace: true,
                    }
                )

                return
            }

            navigate(
                "/admin/content/gallery"
            )
        },

        onError: (error) => {
            if (
                error?.message ===
                "Please complete the required fields."
            ) {
                return
            }

            setSaveMessage(
                getErrorMessage(
                    error,
                    "Unable to save media."
                )
            )
        },
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        if (
            saveMutation.isPending ||
            isUploading ||
            isUploadingThumbnail
        ) {
            return
        }

        if (!validate()) {
            setSaveMessage(
                "Please fix the highlighted fields before saving."
            )

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })

            return
        }

        setSaveMessage("")

        saveMutation.mutate()
    }

    const handleBack = () => {
        if (isDirty) {
            const shouldLeave =
                window.confirm(
                    "You have unsaved changes. Are you sure you want to leave?"
                )

            if (!shouldLeave) {
                return
            }
        }

        navigate(
            "/admin/content/gallery"
        )
    }

    const getInputClass = (field) => {
        return `h-12 w-full rounded-2xl border ${
            errors[field]
                ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 bg-gray-50 focus:border-green-300 focus:bg-white focus:ring-green-50"
        } px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-4`
    }

    const getTextareaClass = (field) => {
        return `w-full resize-y rounded-2xl border ${
            errors[field]
                ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 bg-gray-50 focus:border-green-300 focus:bg-white focus:ring-green-50"
        } px-4 py-3 text-sm leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-4`
    }

    const completionItems = [
        [
            "Media title",
            Boolean(form.title.trim()),
        ],
        [
            "Media file",
            Boolean(form.file_url.trim()),
        ],
        [
            "Media description",
            Boolean(form.alt_text.trim()),
        ],
        [
            "Album",
            Boolean(form.album.trim()),
        ],
        [
            "Language",
            Boolean(form.language.trim()),
        ],
        [
            "Consent status",
            Boolean(form.consent_status),
        ],
        [
            "Publishing status",
            Boolean(form.status),
        ],
    ]

    const completedCount =
        completionItems.filter(
            ([, complete]) => complete
        ).length

    if (isEditMode && isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading gallery media..."
            />
        )
    }

    if (isEditMode && isError) {
        return (
            <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#F6FAF7] px-6">
                <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl shadow-gray-900/10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <FileImage size={26} />
                    </div>

                    <h1 className="mt-5 text-xl font-bold text-gray-900">
                        Unable to load media
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        The requested gallery media
                        could not be loaded from
                        the server.
                    </p>

                    <button
                        type="button"
                        onClick={handleBack}
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        <ArrowLeft size={17} />
                        Back to Gallery
                    </button>
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
                        <button
                            type="button"
                            onClick={handleBack}
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft size={17} />
                        </button>

                        <div>
                            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-green-700">
                                <ImageIcon size={16} />

                                <span>
                                    Gallery
                                </span>

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
                                    ? "Edit Gallery Media"
                                    : "Add Gallery Media"}
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                Upload and manage
                                images or videos
                                that appear in
                                the Krushisetu
                                gallery.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {isDirty && (
                            <span className="hidden rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 sm:inline-flex">
                                Unsaved changes
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={
                                saveMutation.isPending ||
                                isUploading ||
                                isUploadingThumbnail
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
                                        : "Create Media"}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Messages */}
                {saveMessage && (
                    <div
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                            saveMutation.isError ||
                            Object.keys(errors)
                                .length > 0
                                ? "border-red-200 bg-red-50 text-red-700"
                                : "border-green-200 bg-green-50 text-green-800"
                        }`}
                    >
                        {saveMessage}
                    </div>
                )}

                {uploadMessage && (
                    <div
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                            uploadMessage.toLowerCase().includes(
                                "successfully"
                            )
                                ? "border-green-200 bg-green-50 text-green-800"
                                : "border-red-200 bg-red-50 text-red-700"
                        }`}
                    >
                        {uploadMessage}
                    </div>
                )}

                {Object.keys(errors).length > 0 && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                        <div className="flex items-start gap-3">
                            <Info
                                size={18}
                                className="mt-0.5 shrink-0 text-red-600"
                            />

                            <div>
                                <p className="text-sm font-bold text-red-800">
                                    Please complete the
                                    highlighted fields.
                                </p>

                                <p className="mt-1 text-xs leading-5 text-red-700">
                                    Required information
                                    is highlighted
                                    below.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                        {/* Main */}
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <ImageIcon size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Basic Information
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Enter the basic
                                            information for
                                            this gallery
                                            item.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    {/* Title */}
                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Media Title{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.title
                                            }
                                            onChange={(event) =>
                                                handleTitleChange(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Farmer Training Program in Maharashtra"
                                            className={getInputClass(
                                                "title"
                                            )}
                                        />

                                        <p className="mt-1.5 text-xs text-gray-500">
                                            Give the media
                                            a clear and
                                            recognizable
                                            name.
                                        </p>

                                        {errors.title && (
                                            <p className="mt-1.5 text-xs font-medium text-red-600">
                                                {
                                                    errors.title
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* Slug */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            URL Slug{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.slug
                                            }
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
                                            placeholder="farmer-training-maharashtra"
                                            className={getInputClass(
                                                "slug"
                                            )}
                                        />

                                        <p className="mt-1.5 text-xs text-gray-500">
                                            Automatically
                                            generated
                                            from the title
                                            when creating
                                            new media.
                                        </p>

                                        {errors.slug && (
                                            <p className="mt-1.5 text-xs font-medium text-red-600">
                                                {
                                                    errors.slug
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* Album */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Album{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.album
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "album",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Farmer Training Programs"
                                            className={getInputClass(
                                                "album"
                                            )}
                                        />

                                        {errors.album && (
                                            <p className="mt-1.5 text-xs font-medium text-red-600">
                                                {
                                                    errors.album
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* Language */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Language{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
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
                                                (
                                                    language
                                                ) => (
                                                    <option
                                                        key={
                                                            language
                                                        }
                                                        value={
                                                            language
                                                        }
                                                    >
                                                        {
                                                            language
                                                        }
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

                                </div>
                            </div>

                            {/* Media Upload */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <Upload size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Media File
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Select an image
                                            or video from
                                            your computer.
                                            File information
                                            will be detected
                                            automatically.
                                        </p>
                                    </div>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska"
                                    onChange={
                                        handleFileChange
                                    }
                                    className="hidden"
                                />

                                {!form.file_url ? (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        disabled={
                                            isUploading
                                        }
                                        className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 text-center transition hover:border-green-300 hover:bg-green-50/50 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader
                                                    variant="button"
                                                    text="Uploading..."
                                                />

                                                <p className="mt-4 text-xs text-gray-500">
                                                    Please wait
                                                    while the
                                                    file is
                                                    uploaded.
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
                                                    Choose a
                                                    media file
                                                </p>

                                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                                    JPG, JPEG,
                                                    PNG, WEBP,
                                                    GIF, SVG,
                                                    MP4, WEBM
                                                    and other
                                                    supported
                                                    video
                                                    formats
                                                </p>

                                                <span className="mt-4 inline-flex rounded-xl bg-green-700 px-4 py-2.5 text-xs font-semibold text-white">
                                                    Select File
                                                </span>
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Preview */}
                                        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
                                            {previewUrl ? (
                                                form.media_type ===
                                                "VIDEO" ? (
                                                    <video
                                                        src={
                                                            previewUrl
                                                        }
                                                        controls
                                                        className="max-h-[520px] min-h-[280px] w-full bg-black object-contain"
                                                    />
                                                ) : (
                                                    <img
                                                        src={
                                                            previewUrl
                                                        }
                                                        alt={
                                                            form.alt_text ||
                                                            form.title ||
                                                            "Gallery media"
                                                        }
                                                        className="max-h-[520px] min-h-[280px] w-full object-contain"
                                                    />
                                                )
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

                                        {/* File info */}
                                        <div className="rounded-2xl border border-green-100 bg-green-50/70 p-4">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-green-900">
                                                        {selectedFile?.name ||
                                                            form.title ||
                                                            "Uploaded media"}
                                                    </p>

                                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-green-800/80 sm:grid-cols-4">
                                                        <div>
                                                            <span className="block text-green-800/50">
                                                                Type
                                                            </span>

                                                            <strong>
                                                                {formatValue(
                                                                    form.media_type
                                                                )}
                                                            </strong>
                                                        </div>

                                                        <div>
                                                            <span className="block text-green-800/50">
                                                                Size
                                                            </span>

                                                            <strong>
                                                                {formatFileSize(
                                                                    form.file_size
                                                                )}
                                                            </strong>
                                                        </div>

                                                        <div>
                                                            <span className="block text-green-800/50">
                                                                Width
                                                            </span>

                                                            <strong>
                                                                {form.width
                                                                    ? `${form.width} px`
                                                                    : "Not detected"}
                                                            </strong>
                                                        </div>

                                                        <div>
                                                            <span className="block text-green-800/50">
                                                                Height
                                                            </span>

                                                            <strong>
                                                                {form.height
                                                                    ? `${form.height} px`
                                                                    : "Not detected"}
                                                            </strong>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={
                                                        removeSelectedFile
                                                    }
                                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-red-600 shadow-sm ring-1 ring-red-100 transition hover:bg-red-50"
                                                >
                                                    <X
                                                        size={
                                                            14
                                                        }
                                                    />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            disabled={
                                                isUploading
                                            }
                                            className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-50 disabled:opacity-50"
                                        >
                                            <Upload
                                                size={14}
                                            />
                                            Replace File
                                        </button>
                                    </div>
                                )}

                                {errors.file_url && (
                                    <p className="mt-2 text-xs font-medium text-red-600">
                                        {
                                            errors.file_url
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Thumbnail */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <ImageIcon size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Thumbnail
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Optional image
                                            used as a
                                            thumbnail,
                                            especially useful
                                            for videos.
                                        </p>
                                    </div>
                                </div>

                                <input
                                    ref={
                                        thumbnailInputRef
                                    }
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                                    onChange={
                                        handleThumbnailChange
                                    }
                                    className="hidden"
                                />

                                {!form.thumbnail_url ? (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            thumbnailInputRef.current?.click()
                                        }
                                        disabled={
                                            isUploadingThumbnail
                                        }
                                        className="flex min-h-[150px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 text-center transition hover:border-green-300 hover:bg-green-50/50"
                                    >
                                        {isUploadingThumbnail ? (
                                            <Loader
                                                variant="button"
                                                text="Uploading..."
                                            />
                                        ) : (
                                            <>
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                                    <Upload
                                                        size={
                                                            21
                                                        }
                                                    />
                                                </div>

                                                <p className="mt-3 text-sm font-semibold text-gray-800">
                                                    Upload
                                                    thumbnail
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    Optional
                                                </p>
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center">
                                        {thumbnailPreviewUrl && (
                                            <img
                                                src={
                                                    thumbnailPreviewUrl
                                                }
                                                alt="Gallery thumbnail"
                                                className="h-28 w-full rounded-2xl border border-gray-200 bg-white object-cover sm:w-40"
                                            />
                                        )}

                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-800">
                                                {selectedThumbnail?.name ||
                                                    "Uploaded thumbnail"}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Thumbnail
                                                uploaded
                                                successfully.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={
                                                    removeThumbnail
                                                }
                                                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-red-600 ring-1 ring-red-100 hover:bg-red-50"
                                            >
                                                <X
                                                    size={
                                                        14
                                                    }
                                                />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <Info size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Media Description
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Add information
                                            that helps
                                            visitors
                                            understand the
                                            media.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Image / Media
                                            Description{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <textarea
                                            value={
                                                form.alt_text
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "alt_text",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            rows={4}
                                            placeholder="Describe what is shown in this image or video."
                                            className={getTextareaClass(
                                                "alt_text"
                                            )}
                                        />

                                        <p className="mt-1.5 text-xs text-gray-500">
                                            Describe the
                                            content clearly.
                                            This is useful
                                            for accessibility.
                                        </p>

                                        {errors.alt_text && (
                                            <p className="mt-1.5 text-xs font-medium text-red-600">
                                                {
                                                    errors.alt_text
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Caption
                                        </label>

                                        <textarea
                                            value={
                                                form.caption
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "caption",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            rows={3}
                                            placeholder="Optional caption displayed with the media."
                                            className={getTextareaClass(
                                                "caption"
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Credit
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                form.credit
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "credit",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Krushisetu Media Team"
                                            className={getInputClass(
                                                "credit"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
                            {/* Publishing */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <ShieldCheck size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Publishing
                                        </h2>

                                        <p className="mt-1 text-sm leading-5 text-gray-500">
                                            Control the
                                            visibility of
                                            this media.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Publishing
                                            Status
                                        </label>

                                        <select
                                            value={
                                                form.status
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "status",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            className={getInputClass(
                                                "status"
                                            )}
                                        >
                                            {publishingStatuses.map(
                                                (
                                                    status
                                                ) => (
                                                    <option
                                                        key={
                                                            status
                                                        }
                                                        value={
                                                            status
                                                        }
                                                    >
                                                        {formatValue(
                                                            status
                                                        )}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                                        <label className="flex cursor-pointer items-start gap-3">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    form.featured
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "featured",
                                                        event
                                                            .target
                                                            .checked
                                                    )
                                                }
                                                className="mt-1 h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-500"
                                            />

                                            <span>
                                                <span className="block text-sm font-semibold text-gray-800">
                                                    Featured
                                                    Media
                                                </span>

                                                <span className="mt-1 block text-xs leading-5 text-gray-500">
                                                    Highlight
                                                    this media
                                                    on the
                                                    website.
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Consent */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <ShieldCheck size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Media Consent
                                        </h2>

                                        <p className="mt-1 text-sm leading-5 text-gray-500">
                                            Record the
                                            permission
                                            status for
                                            using this
                                            media.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Consent Status
                                    </label>

                                    <select
                                        value={
                                            form.consent_status
                                        }
                                        onChange={(event) =>
                                            updateField(
                                                "consent_status",
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        className={getInputClass(
                                            "consent_status"
                                        )}
                                    >
                                        {consentStatuses.map(
                                            (
                                                status
                                            ) => (
                                                <option
                                                    key={
                                                        status
                                                    }
                                                    value={
                                                        status
                                                    }
                                                >
                                                    {formatValue(
                                                        status
                                                    )}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            {/* Automatic File Details */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="text-base font-bold text-gray-900">
                                    File Details
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    These values are
                                    detected
                                    automatically from
                                    the uploaded file.
                                </p>

                                <div className="mt-5 space-y-4">
                                    <SummaryRow
                                        label="Type"
                                        value={formatValue(
                                            form.media_type
                                        )}
                                    />

                                    <SummaryRow
                                        label="File Size"
                                        value={formatFileSize(
                                            form.file_size
                                        )}
                                    />

                                    <SummaryRow
                                        label="Dimensions"
                                        value={
                                            form.width &&
                                            form.height
                                                ? `${form.width} × ${form.height} px`
                                                : "Not detected"
                                        }
                                    />

                                    <SummaryRow
                                        label="File"
                                        value={
                                            form.file_url
                                                ? "Uploaded"
                                                : "Not uploaded"
                                        }
                                    />
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="text-base font-bold text-gray-900">
                                    Media Summary
                                </h2>

                                <div className="mt-5 space-y-4">
                                    <SummaryRow
                                        label="Album"
                                        value={
                                            form.album ||
                                            "Not set"
                                        }
                                    />

                                    <SummaryRow
                                        label="Language"
                                        value={
                                            form.language ||
                                            "Not set"
                                        }
                                    />

                                    <SummaryRow
                                        label="Status"
                                        value={formatValue(
                                            form.status
                                        )}
                                    />

                                    <SummaryRow
                                        label="Consent"
                                        value={formatValue(
                                            form.consent_status
                                        )}
                                    />

                                    <SummaryRow
                                        label="Featured"
                                        value={
                                            form.featured
                                                ? "Yes"
                                                : "No"
                                        }
                                    />
                                </div>
                            </div>

                            {/* Checklist */}
                            <div className="rounded-3xl border border-green-100 bg-green-50/70 p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-sm font-bold text-green-900">
                                            Media Checklist
                                        </h2>

                                        <p className="mt-1 text-xs leading-5 text-green-800/70">
                                            Complete the
                                            important
                                            information
                                            before
                                            publishing.
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-green-700">
                                        {completedCount}/
                                        {
                                            completionItems.length
                                        }
                                    </span>
                                </div>

                                <div className="mt-4 space-y-3">
                                    {completionItems.map(
                                        ([
                                            label,
                                            complete,
                                        ]) => (
                                            <div
                                                key={
                                                    label
                                                }
                                                className="flex items-center gap-3"
                                            >
                                                <div
                                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                                        complete
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
                                                    className={`text-sm ${
                                                        complete
                                                            ? "font-medium text-green-900"
                                                            : "text-green-800/60"
                                                    }`}
                                                >
                                                    {
                                                        label
                                                    }
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Current Record */}
                            {isEditMode && (
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h2 className="text-base font-bold text-gray-900">
                                        Current Record
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Existing gallery
                                        record
                                        information.
                                    </p>

                                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Record ID
                                        </p>

                                        <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                                            {id}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ArrowLeft size={16} />
                            Back to Gallery
                        </button>

                        <button
                            type="submit"
                            disabled={
                                saveMutation.isPending ||
                                isUploading ||
                                isUploadingThumbnail
                            }
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
                                        : "Create Media"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

const SummaryRow = ({ label, value }) => {
    return (
        <div className="flex items-start justify-between gap-4">
            <span className="text-sm text-gray-500">
                {label}
            </span>

            <span className="max-w-[190px] break-words text-right text-sm font-semibold text-gray-800">
                {value}
            </span>
        </div>
    )
}

export default GalleryEditor