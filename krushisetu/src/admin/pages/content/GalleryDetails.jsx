import { useMemo } from "react"

import { Link, useNavigate, useParams } from "react-router-dom"

import { useQuery } from "@tanstack/react-query"

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Edit3,
    FileImage,
    Image as ImageIcon,
    Images,
    Info,
    ShieldCheck,
    Video,
} from "lucide-react"

import axiosInstance from "../../../api/axiosInstance.js"

import Loader from "../../../components/common/Loader"


const getMediaFromResponse = (response) => {
    if (!response) {
        return null
    }

    if (response.media) {
        return response.media
    }

    if (response.data?.media) {
        return response.data.media
    }

    if (response.data) {
        return response.data
    }

    return response
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

    return `${getApiOrigin()}${
        url.startsWith("/") ? "" : "/"
    }${url}`
}


const formatStatus = (status) => {
    if (!status) {
        return "Not set"
    }

    return status
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        )
}


const formatMediaType = (type) => {
    if (!type) {
        return "Not set"
    }

    if (type === "IMAGE") {
        return "Image"
    }

    if (type === "VIDEO") {
        return "Video"
    }

    return type
}


const formatConsentStatus = (status) => {
    if (!status) {
        return "Not set"
    }

    return status
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        )
}


const formatFileSize = (value) => {
    const bytes = Number(value)

    if (
        !Number.isFinite(bytes) ||
        bytes <= 0
    ) {
        return "—"
    }

    if (bytes < 1024) {
        return `${bytes} B`
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`
    }

    if (bytes < 1024 * 1024 * 1024) {
        return `${(
            bytes /
            (1024 * 1024)
        ).toFixed(1)} MB`
    }

    return `${(
        bytes /
        (1024 * 1024 * 1024)
    ).toFixed(1)} GB`
}


const formatDate = (value) => {
    if (!value) {
        return "—"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "—"
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    )
}


const formatDateTime = (value) => {
    if (!value) {
        return "—"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "—"
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
    )
}


const getStatusClasses = (status) => {
    switch (status) {
        case "PUBLISHED":
            return "border-green-200 bg-green-50 text-green-700"

        case "IN_REVIEW":
            return "border-amber-200 bg-amber-50 text-amber-700"

        case "DRAFT":
            return "border-gray-200 bg-gray-50 text-gray-600"

        case "ARCHIVED":
            return "border-red-200 bg-red-50 text-red-600"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}


const getConsentClasses = (status) => {
    switch (status) {
        case "APPROVED":
            return "border-green-200 bg-green-50 text-green-700"

        case "PENDING":
            return "border-amber-200 bg-amber-50 text-amber-700"

        case "NOT_REQUIRED":
            return "border-gray-200 bg-gray-50 text-gray-600"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}


const GalleryDetails = () => {
    const { id } = useParams()

    const navigate = useNavigate()


    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: [
            "admin-gallery-item",
            id,
        ],

        queryFn: async () => {
            const response =
                await axiosInstance.get(
                    `/admin/gallery/${id}`
                )

            return response.data
        },

        enabled: Boolean(id),
    })


    const media = useMemo(() => {
        return getMediaFromResponse(data)
    }, [data])


    const mediaUrl = resolveMediaUrl(
        media?.file_url
    )


    const thumbnailUrl = resolveMediaUrl(
        media?.thumbnail_url
    )


    const isVideo =
        media?.media_type === "VIDEO"


    const isImage =
        media?.media_type === "IMAGE"


    const isFeatured =
        media?.featured === true ||
        media?.featured === 1 ||
        media?.featured === "1"


    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading media details..."
            />
        )
    }


    if (isError || !media) {
        return (
            <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#F6FAF7] px-6">
                <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl shadow-gray-900/10">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <Images size={26} />
                    </div>


                    <h1 className="mt-5 text-xl font-bold text-gray-900">
                        Media not found
                    </h1>


                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {error?.response?.data
                            ?.message ||
                            error?.message ||
                            "The requested gallery media could not be found."}
                    </p>


                    <div className="mt-6 flex items-center justify-center gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                refetch()
                            }
                            className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            Try Again
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/content/gallery"
                                )
                            }
                            className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            Back to Gallery
                        </button>

                    </div>

                </div>
            </section>
        )
    }


    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-[1400px] space-y-6">


                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                    <div className="flex items-start gap-3">

                        <Link
                            to="/admin/content/gallery"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft size={17} />
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
                                    Gallery / Media
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    Details
                                </span>

                            </div>


                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {media.title}
                            </h1>


                            <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-500">
                                View the complete details
                                and media information for
                                this gallery asset.
                            </p>

                        </div>

                    </div>


                    <Link
                        to={`/admin/content/gallery/${media.id}/edit`}
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 size={16} />
                        Edit Media
                    </Link>

                </div>


                {/* =====================================================
                    STATUS BAR
                ====================================================== */}

                <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex flex-wrap items-center gap-2">

                        <span
                            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                                media.status
                            )}`}
                        >
                            {formatStatus(
                                media.status
                            )}
                        </span>


                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                                isVideo
                                    ? "bg-purple-50 text-purple-700"
                                    : "bg-blue-50 text-blue-700"
                            }`}
                        >

                            {isVideo ? (
                                <Video size={13} />
                            ) : (
                                <ImageIcon
                                    size={13}
                                />
                            )}

                            {formatMediaType(
                                media.media_type
                            )}

                        </span>


                        {isFeatured && (
                            <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                                Featured
                            </span>
                        )}

                    </div>


                    <div className="flex items-center gap-2 text-xs text-gray-500">

                        <CalendarDays
                            size={14}
                        />

                        Created{" "}

                        {formatDate(
                            media.created_at
                        )}

                    </div>

                </div>


                {/* =====================================================
                    MEDIA PREVIEW + BASIC INFO
                ====================================================== */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(350px,0.75fr)]">


                    {/* Media Preview */}

                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                        <div className="border-b border-gray-100 px-5 py-4">

                            <div className="flex items-center gap-2">

                                <FileImage
                                    size={18}
                                    className="text-green-700"
                                />

                                <h2 className="font-bold text-gray-900">
                                    Media Preview
                                </h2>

                            </div>


                            <p className="mt-1 text-xs text-gray-500">
                                Preview of the uploaded
                                gallery asset.
                            </p>

                        </div>


                        <div className="flex min-h-[420px] items-center justify-center bg-gray-50 p-5 sm:min-h-[520px]">

                            {isImage &&
                            mediaUrl ? (
                                <img
                                    src={mediaUrl}
                                    alt={
                                        media.alt_text ||
                                        media.title ||
                                        "Gallery media"
                                    }
                                    className="max-h-[650px] max-w-full rounded-2xl object-contain shadow-lg"
                                />
                            ) : isVideo &&
                              mediaUrl ? (
                                <video
                                    src={mediaUrl}
                                    poster={
                                        thumbnailUrl ||
                                        undefined
                                    }
                                    controls
                                    className="max-h-[650px] max-w-full rounded-2xl shadow-lg"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center">

                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
                                        <FileImage
                                            size={28}
                                        />
                                    </div>


                                    <p className="mt-4 text-sm font-semibold text-gray-700">
                                        Preview unavailable
                                    </p>


                                    <p className="mt-1 text-xs text-gray-500">
                                        The media file URL
                                        is not available.
                                    </p>

                                </div>
                            )}

                        </div>


                        {media.file_url && (
                            <div className="border-t border-gray-100 px-5 py-4">

                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Media URL
                                </p>


                                <p className="mt-1 break-all text-xs text-gray-600">
                                    {media.file_url}
                                </p>

                            </div>
                        )}

                    </div>


                    {/* Basic Information */}

                    <div className="space-y-6">


                        <DetailCard
                            title="Basic Information"
                            icon={
                                <Info size={18} />
                            }
                        >

                            <DetailRow
                                label="Title"
                                value={
                                    media.title
                                }
                            />


                            <DetailRow
                                label="Slug"
                                value={
                                    media.slug
                                }
                            />


                            <DetailRow
                                label="Media Type"
                                value={formatMediaType(
                                    media.media_type
                                )}
                            />


                            <DetailRow
                                label="Album"
                                value={
                                    media.album ||
                                    "—"
                                }
                            />


                            <DetailRow
                                label="Language"
                                value={
                                    media.language ||
                                    "—"
                                }
                            />

                        </DetailCard>


                        <DetailCard
                            title="Media Information"
                            icon={
                                <Images size={18} />
                            }
                        >

                            <DetailRow
                                label="File Size"
                                value={formatFileSize(
                                    media.file_size
                                )}
                            />


                            <DetailRow
                                label="Dimensions"
                                value={
                                    media.width &&
                                    media.height
                                        ? `${media.width} × ${media.height} px`
                                        : "—"
                                }
                            />


                            <DetailRow
                                label="File"
                                value={
                                    media.file_url
                                        ? "Uploaded"
                                        : "Not available"
                                }
                            />


                            <DetailRow
                                label="Thumbnail"
                                value={
                                    media.thumbnail_url
                                        ? "Available"
                                        : "Not available"
                                }
                            />

                        </DetailCard>


                        <DetailCard
                            title="Consent & Publishing"
                            icon={
                                <ShieldCheck
                                    size={18}
                                />
                            }
                        >

                            <DetailRow
                                label="Consent"
                                value={
                                    <span
                                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getConsentClasses(
                                            media.consent_status
                                        )}`}
                                    >
                                        {formatConsentStatus(
                                            media.consent_status
                                        )}
                                    </span>
                                }
                            />


                            <DetailRow
                                label="Status"
                                value={
                                    <span
                                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                            media.status
                                        )}`}
                                    >
                                        {formatStatus(
                                            media.status
                                        )}
                                    </span>
                                }
                            />


                            <DetailRow
                                label="Featured"
                                value={
                                    isFeatured
                                        ? "Yes"
                                        : "No"
                                }
                            />

                        </DetailCard>


                    </div>

                </div>


                {/* =====================================================
                    CONTENT DETAILS
                ====================================================== */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">


                    <DetailCard
                        title="Accessibility"
                        icon={
                            <ImageIcon
                                size={18}
                            />
                        }
                    >

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Alt Text
                            </p>


                            <div className="mt-2 rounded-2xl bg-gray-50 p-4">

                                <p className="text-sm leading-6 text-gray-700">
                                    {media.alt_text ||
                                        "No alt text provided."}
                                </p>

                            </div>

                        </div>

                    </DetailCard>


                    <DetailCard
                        title="Credit"
                        icon={
                            <CheckCircle2
                                size={18}
                            />
                        }
                    >

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Media Credit
                            </p>


                            <div className="mt-2 rounded-2xl bg-gray-50 p-4">

                                <p className="text-sm leading-6 text-gray-700">
                                    {media.credit ||
                                        "No credit information provided."}
                                </p>

                            </div>

                        </div>

                    </DetailCard>


                </div>


                {/* =====================================================
                    CAPTION
                ====================================================== */}

                <DetailCard
                    title="Caption"
                    icon={
                        <FileImage size={18} />
                    }
                >

                    <div className="rounded-2xl bg-gray-50 p-4">

                        <p className="text-sm leading-7 text-gray-700">
                            {media.caption ||
                                "No caption provided."}
                        </p>

                    </div>

                </DetailCard>


                {/* =====================================================
                    RECORD INFORMATION
                ====================================================== */}

                <DetailCard
                    title="Record Information"
                    icon={
                        <CalendarDays
                            size={18}
                        />
                    }
                >

                    <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">

                        <RecordInfoItem
                            label="Media ID"
                            value={media.id}
                        />


                        <RecordInfoItem
                            label="Created"
                            value={formatDateTime(
                                media.created_at
                            )}
                        />


                        <RecordInfoItem
                            label="Last Updated"
                            value={formatDateTime(
                                media.updated_at
                            )}
                        />

                    </div>

                </DetailCard>


                {/* =====================================================
                    BOTTOM ACTIONS
                ====================================================== */}

                <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                    <Link
                        to="/admin/content/gallery"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                    >
                        <ArrowLeft size={16} />
                        Back to Gallery
                    </Link>


                    <Link
                        to={`/admin/content/gallery/${media.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 size={16} />
                        Edit Media
                    </Link>

                </div>


            </div>

        </section>
    )
}


const DetailCard = ({
    title,
    icon,
    children,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    {icon}
                </div>


                <h2 className="font-bold text-gray-900">
                    {title}
                </h2>

            </div>


            <div>
                {children}
            </div>

        </div>
    )
}


const DetailRow = ({
    label,
    value,
}) => {
    return (
        <div className="flex flex-col gap-1 border-b border-gray-100 py-3.5 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">

            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </span>


            <span className="text-sm font-medium text-gray-700 sm:max-w-[65%] sm:text-right">
                {value || "—"}
            </span>

        </div>
    )
}


const RecordInfoItem = ({
    label,
    value,
}) => {
    return (
        <div className="border-b border-gray-100 px-0 py-4 sm:px-0">

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </p>


            <p className="mt-2 break-words text-sm font-semibold text-gray-700">
                {value || "—"}
            </p>

        </div>
    )
}


export default GalleryDetails