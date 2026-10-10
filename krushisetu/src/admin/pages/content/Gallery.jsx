import { useMemo, useState } from "react"
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"
import { Link } from "react-router-dom"

import {
    CalendarDays,
    Edit3,
    Eye,
    FileImage,
    Filter,
    FolderOpen,
    Image as ImageIcon,
    Images,
    Plus,
    RefreshCw,
    Search,
    Trash2,
    Video,
} from "lucide-react"

import axiosInstance from "../../../api/axiosInstance.js"
import Loader from "../../../components/common/Loader"

const statusOptions = [
    "PUBLISHED",
    "DRAFT",
    "IN_REVIEW",
    "ARCHIVED",
]

const typeOptions = [
    "IMAGE",
    "VIDEO",
]

const getMediaFromResponse = (response) => {
    if (Array.isArray(response)) {
        return response
    }

    if (Array.isArray(response?.media)) {
        return response.media
    }

    if (Array.isArray(response?.data?.media)) {
        return response.data.media
    }

    if (Array.isArray(response?.data)) {
        return response.data
    }

    return []
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

    return type === "IMAGE"
        ? "Image"
        : type === "VIDEO"
        ? "Video"
        : type
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
            month: "short",
            year: "numeric",
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

const Gallery = () => {
    const queryClient = useQueryClient()

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] =
        useState("All")
    const [typeFilter, setTypeFilter] =
        useState("All")
    const [albumFilter, setAlbumFilter] =
        useState("All")
    const [page, setPage] = useState(1)

    const pageSize = 8

    /*
     * =========================================================
     * FETCH GALLERY
     * =========================================================
     */

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["admin-gallery"],

        queryFn: async () => {
            const response =
                await axiosInstance.get(
                    "/admin/gallery"
                )

            return response.data
        },
    })

    const mediaItems = useMemo(() => {
        return getMediaFromResponse(data)
    }, [data])

    /*
     * =========================================================
     * DELETE
     * =========================================================
     */

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const response =
                await axiosInstance.delete(
                    `/admin/gallery/${id}`
                )

            return response.data
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["admin-gallery"],
            })
        },
    })

    const handleDelete = (item) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${item.title}"?`
        )

        if (!confirmed) {
            return
        }

        deleteMutation.mutate(item.id)
    }

    /*
     * =========================================================
     * ALBUM OPTIONS
     * =========================================================
     */

    const albumOptions = useMemo(() => {
        const albums = mediaItems
            .map((item) => item.album)
            .filter(Boolean)

        return [...new Set(albums)].sort(
            (a, b) =>
                a.localeCompare(b)
        )
    }, [mediaItems])

    /*
     * =========================================================
     * FILTERING
     * =========================================================
     */

    const filteredMedia = useMemo(() => {
        const query =
            search.toLowerCase().trim()

        return mediaItems.filter((item) => {
            const title =
                item.title?.toLowerCase() ||
                ""

            const slug =
                item.slug?.toLowerCase() ||
                ""

            const album =
                item.album?.toLowerCase() ||
                ""

            const caption =
                item.caption?.toLowerCase() ||
                ""

            const altText =
                item.alt_text?.toLowerCase() ||
                ""

            const matchesSearch =
                !query ||
                title.includes(query) ||
                slug.includes(query) ||
                album.includes(query) ||
                caption.includes(query) ||
                altText.includes(query)

            const matchesStatus =
                statusFilter === "All" ||
                item.status === statusFilter

            const matchesType =
                typeFilter === "All" ||
                item.media_type === typeFilter

            const matchesAlbum =
                albumFilter === "All" ||
                item.album === albumFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesAlbum
            )
        })
    }, [
        mediaItems,
        search,
        statusFilter,
        typeFilter,
        albumFilter,
    ])

    /*
     * =========================================================
     * SORT
     * =========================================================
     */

    const sortedMedia = useMemo(() => {
        return [...filteredMedia].sort(
            (a, b) => {
                const orderA =
                    Number(
                        a.display_order
                    ) || 0

                const orderB =
                    Number(
                        b.display_order
                    ) || 0

                if (orderA !== orderB) {
                    return orderA - orderB
                }

                const dateA =
                    new Date(
                        a.created_at || 0
                    ).getTime()

                const dateB =
                    new Date(
                        b.created_at || 0
                    ).getTime()

                return dateB - dateA
            }
        )
    }, [filteredMedia])

    /*
     * =========================================================
     * PAGINATION
     * =========================================================
     */

    const totalPages = Math.max(
        1,
        Math.ceil(
            sortedMedia.length / pageSize
        )
    )

    const currentPage = Math.min(
        page,
        totalPages
    )

    const paginatedMedia =
        sortedMedia.slice(
            (currentPage - 1) *
                pageSize,
            currentPage * pageSize
        )

    /*
     * =========================================================
     * STATS
     * =========================================================
     */

    const imageCount = mediaItems.filter(
        (item) =>
            item.media_type === "IMAGE"
    ).length

    const videoCount = mediaItems.filter(
        (item) =>
            item.media_type === "VIDEO"
    ).length

    const publishedCount =
        mediaItems.filter(
            (item) =>
                item.status === "PUBLISHED"
        ).length

    const featuredCount =
        mediaItems.filter(
            (item) =>
                item.featured === true ||
                item.featured === 1 ||
                item.featured === "1"
        ).length

    const albumCount =
        new Set(
            mediaItems
                .map((item) => item.album)
                .filter(Boolean)
        ).size

    /*
     * =========================================================
     * FILTER HELPERS
     * =========================================================
     */

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All")
        setTypeFilter("All")
        setAlbumFilter("All")
        setPage(1)
    }

    const hasFilters =
        Boolean(search) ||
        statusFilter !== "All" ||
        typeFilter !== "All" ||
        albumFilter !== "All"

    /*
     * =========================================================
     * LOADING
     * =========================================================
     */

    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading gallery..."
            />
        )
    }

    /*
     * =========================================================
     * ERROR
     * =========================================================
     */

    if (isError) {
        return (
            <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#F6FAF7] px-6">
                <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl shadow-gray-900/10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <Images size={26} />
                    </div>

                    <h1 className="mt-5 text-xl font-bold text-gray-900">
                        Unable to load gallery
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {error?.response?.data
                            ?.message ||
                            error?.message ||
                            "Something went wrong while loading gallery media."}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            refetch()
                        }
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        <RefreshCw
                            size={16}
                        />
                        Try Again
                    </button>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <Images size={16} />

                            <span>
                                Content Management
                            </span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                Gallery / Media
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Gallery / Media
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage website images,
                            videos, albums and
                            featured media.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/gallery/new"
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Plus size={17} />
                        Add Media
                    </Link>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    <SummaryCard
                        label="Total Media"
                        value={
                            mediaItems.length
                        }
                        description="All media records"
                        icon={
                            <Images size={20} />
                        }
                        iconClass="bg-green-50 text-green-700"
                    />

                    <SummaryCard
                        label="Images"
                        value={imageCount}
                        description="Image assets"
                        icon={
                            <ImageIcon
                                size={20}
                            />
                        }
                        iconClass="bg-blue-50 text-blue-700"
                    />

                    <SummaryCard
                        label="Videos"
                        value={videoCount}
                        description="Video assets"
                        icon={
                            <Video size={20} />
                        }
                        iconClass="bg-purple-50 text-purple-700"
                    />

                    <SummaryCard
                        label="Published"
                        value={
                            publishedCount
                        }
                        description="Published media"
                        icon={
                            <FileImage
                                size={20}
                            />
                        }
                        iconClass="bg-emerald-50 text-emerald-700"
                    />

                    <SummaryCard
                        label="Featured"
                        value={
                            featuredCount
                        }
                        description="Featured media"
                        icon={
                            <ImageIcon
                                size={20}
                            />
                        }
                        iconClass="bg-amber-50 text-amber-700"
                    />
                </div>

                {/* Notice */}
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                <FolderOpen
                                    size={20}
                                />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-green-950">
                                    Media Library
                                </h2>

                                <p className="mt-1 max-w-3xl text-xs leading-5 text-green-900/70">
                                    Manage reusable
                                    images and
                                    videos for the
                                    Krushisetu
                                    website.
                                </p>
                            </div>
                        </div>

                        <div className="text-xs font-semibold text-green-800">
                            {albumCount}{" "}
                            {albumCount === 1
                                ? "album"
                                : "albums"}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_190px_190px_240px_auto]">
                        {/* Search */}
                        <div className="relative">
                            <Search
                                size={17}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(
                                    event
                                ) => {
                                    setSearch(
                                        event
                                            .target
                                            .value
                                    )
                                    setPage(1)
                                }}
                                placeholder="Search media, albums, titles..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            />
                        </div>

                        <FilterSelect
                            value={
                                statusFilter
                            }
                            onChange={(value) => {
                                setStatusFilter(
                                    value
                                )
                                setPage(1)
                            }}
                            options={
                                statusOptions
                            }
                            placeholder="All statuses"
                            formatOption={
                                formatStatus
                            }
                        />

                        <FilterSelect
                            value={
                                typeFilter
                            }
                            onChange={(value) => {
                                setTypeFilter(
                                    value
                                )
                                setPage(1)
                            }}
                            options={
                                typeOptions
                            }
                            placeholder="All media types"
                            formatOption={
                                formatMediaType
                            }
                        />

                        <FilterSelect
                            value={
                                albumFilter
                            }
                            onChange={(value) => {
                                setAlbumFilter(
                                    value
                                )
                                setPage(1)
                            }}
                            options={
                                albumOptions
                            }
                            placeholder="All albums"
                        />

                        {hasFilters ? (
                            <button
                                type="button"
                                onClick={
                                    clearFilters
                                }
                                className="h-11 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Clear
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() =>
                                    refetch()
                                }
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                <RefreshCw
                                    size={15}
                                    className={
                                        isFetching
                                            ? "animate-spin"
                                            : ""
                                    }
                                />
                                Refresh
                            </button>
                        )}
                    </div>
                </div>

                {/* Media Library */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Media Library
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {
                                    sortedMedia.length
                                }{" "}
                                asset
                                {sortedMedia.length !==
                                1
                                    ? "s"
                                    : ""}{" "}
                                found
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="h-2 w-2 rounded-full bg-green-500" />

                            Live backend data
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1200px]">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70">
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Media
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Type
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Album
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Uploaded
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Size
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {paginatedMedia.length >
                                0 ? (
                                    paginatedMedia.map(
                                        (
                                            item
                                        ) => {
                                            const mediaUrl =
                                                resolveMediaUrl(
                                                    item.file_url
                                                )

                                            const isVideo =
                                                item.media_type ===
                                                "VIDEO"

                                            const isFeatured =
                                                item.featured ===
                                                    true ||
                                                item.featured ===
                                                    1 ||
                                                item.featured ===
                                                    "1"

                                            return (
                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                    className="group transition hover:bg-green-50/30"
                                                >
                                                    {/* Media */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                                                                {mediaUrl ? (
                                                                    isVideo ? (
                                                                        <>
                                                                            <video
                                                                                src={
                                                                                    mediaUrl
                                                                                }
                                                                                muted
                                                                                preload="metadata"
                                                                                className="h-full w-full object-cover"
                                                                            />

                                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-purple-700">
                                                                                    <Video
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <img
                                                                            src={
                                                                                mediaUrl
                                                                            }
                                                                            alt={
                                                                                item.alt_text ||
                                                                                item.title ||
                                                                                "Gallery media"
                                                                            }
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    )
                                                                ) : (
                                                                    <FileImage
                                                                        size={
                                                                            22
                                                                        }
                                                                        className="text-gray-300"
                                                                    />
                                                                )}
                                                            </div>

                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <p className="max-w-[300px] truncate text-sm font-semibold text-gray-900">
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </p>

                                                                    {isFeatured && (
                                                                        <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                                                            Featured
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <p className="mt-1 max-w-[320px] truncate text-xs text-gray-400">
                                                                    {
                                                                        item.slug
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Type */}
                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${
                                                                isVideo
                                                                    ? "bg-purple-50 text-purple-700"
                                                                    : "bg-blue-50 text-blue-700"
                                                            }`}
                                                        >
                                                            {isVideo ? (
                                                                <Video
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                            ) : (
                                                                <ImageIcon
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                            )}

                                                            {formatMediaType(
                                                                item.media_type
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* Album */}
                                                    <td className="px-5 py-4">
                                                        <div>
                                                            <p className="max-w-[220px] truncate text-sm font-medium text-gray-700">
                                                                {item.album ||
                                                                    "—"}
                                                            </p>

                                                            {item.width &&
                                                                item.height && (
                                                                    <p className="mt-1 text-xs text-gray-400">
                                                                        {
                                                                            item.width
                                                                        }{" "}
                                                                        ×{" "}
                                                                        {
                                                                            item.height
                                                                        }{" "}
                                                                        px
                                                                    </p>
                                                                )}
                                                        </div>
                                                    </td>

                                                    {/* Date */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <CalendarDays
                                                                size={
                                                                    15
                                                                }
                                                                className="text-gray-400"
                                                            />

                                                            <span className="text-sm text-gray-600">
                                                                {formatDate(
                                                                    item.created_at
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Size */}
                                                    <td className="px-5 py-4">
                                                        <span className="text-sm text-gray-600">
                                                            {formatFileSize(
                                                                item.file_size
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                                                item.status
                                                            )}`}
                                                        >
                                                            {formatStatus(
                                                                item.status
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Link
                                                                to={`/admin/content/gallery/${item.id}`}
                                                                title="View"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye
                                                                    size={
                                                                        16
                                                                    }
                                                                />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/content/gallery/${item.id}/edit`}
                                                                title="Edit"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Edit3
                                                                    size={
                                                                        16
                                                                    }
                                                                />
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                title="Delete"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item
                                                                    )
                                                                }
                                                                disabled={
                                                                    deleteMutation.isPending
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        16
                                                                    }
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="mx-auto flex max-w-sm flex-col items-center">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                                    <Images
                                                        size={
                                                            25
                                                        }
                                                    />
                                                </div>

                                                <h3 className="mt-4 text-sm font-bold text-gray-900">
                                                    No media
                                                    found
                                                </h3>

                                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                                    {hasFilters
                                                        ? "Try changing your search or filters."
                                                        : "Your gallery is currently empty. Add your first media item."}
                                                </p>

                                                {hasFilters ? (
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            clearFilters
                                                        }
                                                        className="mt-4 text-sm font-semibold text-green-700 transition hover:text-green-800"
                                                    >
                                                        Clear
                                                        filters
                                                    </button>
                                                ) : (
                                                    <Link
                                                        to="/admin/content/gallery/new"
                                                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800"
                                                    >
                                                        <Plus
                                                            size={
                                                                14
                                                            }
                                                        />
                                                        Add
                                                        Media
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {sortedMedia.length >
                        0 && (
                        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-gray-500">
                                Showing{" "}
                                <span className="font-semibold text-gray-700">
                                    {(
                                        currentPage -
                                        1
                                    ) *
                                        pageSize +
                                        1}
                                </span>{" "}
                                to{" "}
                                <span className="font-semibold text-gray-700">
                                    {Math.min(
                                        currentPage *
                                            pageSize,
                                        sortedMedia.length
                                    )}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-gray-700">
                                    {
                                        sortedMedia.length
                                    }
                                </span>
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={
                                        currentPage ===
                                        1
                                    }
                                    onClick={() =>
                                        setPage(
                                            (
                                                previous
                                            ) =>
                                                Math.max(
                                                    1,
                                                    previous -
                                                        1
                                                )
                                        )
                                    }
                                    className="flex h-9 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-green-700 px-3 text-xs font-semibold text-white">
                                    {currentPage}
                                </div>

                                <button
                                    type="button"
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                    onClick={() =>
                                        setPage(
                                            (
                                                previous
                                            ) =>
                                                Math.min(
                                                    totalPages,
                                                    previous +
                                                        1
                                                )
                                        )
                                    }
                                    className="flex h-9 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom information */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoCard
                        icon={
                            <FolderOpen
                                size={20}
                            />
                        }
                        title="Media Albums"
                        description={`Your gallery currently contains ${albumCount} ${
                            albumCount ===
                            1
                                ? "album"
                                : "albums"
                        }. Use albums to organize related images and videos.`}
                    />

                    <InfoCard
                        icon={
                            <FileImage
                                size={20}
                            />
                        }
                        title="Featured Media"
                        description={`${featuredCount} ${
                            featuredCount ===
                            1
                                ? "media item is"
                                : "media items are"
                        } currently marked as featured content.`}
                    />
                </div>
            </div>
        </section>
    )
}

const SummaryCard = ({
    label,
    value,
    description,
    icon,
    iconClass,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}
                >
                    {icon}
                </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
                {description}
            </p>
        </div>
    )
}

const FilterSelect = ({
    value,
    onChange,
    options,
    placeholder,
    formatOption,
}) => {
    return (
        <div className="relative">
            <Filter
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
            >
                <option value="All">
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {formatOption
                            ? formatOption(
                                  option
                              )
                            : option}
                    </option>
                ))}
            </select>
        </div>
    )
}

const InfoCard = ({
    icon,
    title,
    description,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    {icon}
                </div>

                <div>
                    <h3 className="text-sm font-bold text-gray-900">
                        {title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Gallery