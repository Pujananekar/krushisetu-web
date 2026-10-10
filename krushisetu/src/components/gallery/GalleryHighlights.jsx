import { useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"

import {
    Camera,
    Images,
    Play,
} from "lucide-react"

import axiosInstance from "../../api/axiosInstance.js"

import GalleryFilters from "./GalleryFilters"


const filterParams = {
    All: {},
    Photos: {
        media_type: "IMAGE",
    },
    Videos: {
        media_type: "VIDEO",
    },
    Featured: {
        featured: "true",
    },
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
        url.startsWith("data:") ||
        url.startsWith("blob:")
    ) {
        return url
    }

    const normalizedUrl = url.startsWith("/")
        ? url
        : `/${url}`

    return `${getApiOrigin()}${normalizedUrl}`
}


const GalleryHighlights = () => {

    const [activeFilter, setActiveFilter] =
        useState("All")

    const [search, setSearch] =
        useState("")


    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [
            "public-gallery",
            activeFilter,
            search,
        ],

        queryFn: async () => {

            const params = {
                ...filterParams[activeFilter],
            }

            if (search.trim()) {
                params.search = search.trim()
            }

            const response =
                await axiosInstance.get(
                    "/gallery",
                    {
                        params,
                    }
                )

            return response.data
        },

        placeholderData: (previousData) =>
            previousData,
    })


    const media = useMemo(() => {

        if (
            Array.isArray(
                data?.media
            )
        ) {
            return data.media
        }

        if (
            Array.isArray(
                data?.gallery
            )
        ) {
            return data.gallery
        }

        if (
            Array.isArray(
                data?.data
            )
        ) {
            return data.data
        }

        return []

    }, [data])


    const publishedMedia = useMemo(() => {

        return media.filter((item) => {

            if (!item) {
                return false
            }

            if (
                item.status &&
                item.status !== "PUBLISHED"
            ) {
                return false
            }

            return Boolean(
                item.file_url ||
                item.thumbnail_url
            )

        })

    }, [media])


    const hasActiveFilter =
        activeFilter !== "All" ||
        search.trim() !== ""


    return (
        <section
            id="gallery-highlights"
            className="bg-white py-16 lg:py-20"
        >

            <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">

                <div className="mb-8">

                    <div className="mb-4 flex items-center gap-3">

                        <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">

                            <Images
                                size={22}
                                strokeWidth={2}
                            />

                        </div>

                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-800">
                            Gallery Highlights
                        </span>

                    </div>


                    <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">

                        Explore moments from the{" "}

                        <span className="text-green-700">
                            field.
                        </span>

                    </h2>


                    <p className="mt-3 max-w-3xl text-base leading-7 text-gray-500 sm:text-lg">

                        Photos and videos from Krushisetu activities will be
                        organised by department, project, date, and location.

                    </p>

                </div>


                <div className="mb-6 flex flex-wrap items-center gap-3">

                    <div className="flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-semibold text-green-800">

                        <Camera size={15} />

                        Photos

                    </div>


                    <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-600">

                        <Play size={15} />

                        Videos

                    </div>

                </div>


                <GalleryFilters
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    search={search}
                    setSearch={setSearch}
                />


                {isLoading && (
                    <div className="rounded-3xl border border-gray-100 bg-[#F8FCF9] px-6 py-16 text-center shadow-sm">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-700" />

                        <p className="mt-5 text-sm font-medium text-gray-500">
                            Loading gallery...
                        </p>

                    </div>
                )}


                {isError && (
                    <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm">

                            <Images size={26} />

                        </div>


                        <h3 className="mt-5 text-xl font-bold text-gray-900">
                            Unable to load gallery
                        </h3>


                        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">

                            Gallery media could not be loaded from the server.
                            Please try again later.

                        </p>

                    </div>
                )}


                {!isLoading &&
                    !isError &&
                    publishedMedia.length === 0 && (

                        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-linear-to-br from-[#F8FCF9] via-white to-[#F1F9F3] px-6 py-16 shadow-sm sm:px-10 lg:px-16 lg:py-20">

                            <div className="pointer-events-none absolute left-8 top-8 grid grid-cols-5 gap-3 opacity-30">

                                {Array.from({
                                    length: 20,
                                }).map(
                                    (_, index) => (
                                        <span
                                            key={index}
                                            className="h-1.5 w-1.5 rounded-full bg-green-300"
                                        />
                                    )
                                )}

                            </div>


                            <div className="pointer-events-none absolute -bottom-5 -left-5 h-40 w-40 rounded-full bg-green-100/40" />

                            <div className="pointer-events-none absolute -right-7.5 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-green-100/50" />


                            <div className="relative mx-auto max-w-3xl text-center">

                                <div className="kr-hover-icon mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">

                                    <Images
                                        size={38}
                                        strokeWidth={1.8}
                                    />

                                </div>


                                <h3 className="mt-7 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">

                                    {hasActiveFilter
                                        ? "No gallery media found"
                                        : "Gallery Coming Soon"}

                                </h3>


                                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-green-700" />


                                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">

                                    {hasActiveFilter
                                        ? "No photos or videos match your selected filter or search. Try another filter or search term."
                                        : "Photos and videos from Krushisetu's activities, projects, training programs and events will be added here after verification."}

                                </p>


                                {hasActiveFilter && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveFilter("All")
                                            setSearch("")
                                        }}
                                        className="mt-7 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/10 transition hover:bg-green-800"
                                    >
                                        Clear filters
                                    </button>
                                )}


                                {!hasActiveFilter && (
                                    <p className="mt-8 text-xs font-medium text-gray-400 sm:text-sm">

                                        All media will be published with appropriate
                                        permissions and verification.

                                    </p>
                                )}

                            </div>

                        </div>
                    )}


                {!isLoading &&
                    !isError &&
                    publishedMedia.length > 0 && (

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {publishedMedia.map((item) => {

                                const mediaUrl =
                                    resolveMediaUrl(
                                        item.file_url
                                    )

                                const thumbnailUrl =
                                    resolveMediaUrl(
                                        item.thumbnail_url
                                    )

                                const displayUrl =
                                    thumbnailUrl ||
                                    mediaUrl

                                const isVideo =
                                    item.media_type ===
                                    "VIDEO"


                                return (
                                    <article
                                        key={
                                            item.id ||
                                            item.slug
                                        }
                                        className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >

                                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">

                                            {isVideo ? (
                                                <video
                                                    src={mediaUrl}
                                                    poster={
                                                        thumbnailUrl ||
                                                        undefined
                                                    }
                                                    controls
                                                    preload="metadata"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={displayUrl}
                                                    alt={
                                                        item.alt_text ||
                                                        item.title ||
                                                        "Krushisetu gallery image"
                                                    }
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    onError={(
                                                        event
                                                    ) => {
                                                        event.currentTarget.src =
                                                            "/images/placeholder-image.png"
                                                    }}
                                                />
                                            )}

                                        </div>


                                        <div className="p-5">

                                            <div className="flex items-center justify-between gap-3">

                                                <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-green-700">

                                                    {isVideo
                                                        ? "Video"
                                                        : "Photo"}

                                                </span>


                                                {item.featured === 1 && (
                                                    <span className="truncate text-xs font-semibold text-green-700">
                                                        Featured
                                                    </span>
                                                )}

                                            </div>


                                            <h3 className="mt-3 line-clamp-2 text-lg font-bold text-gray-900">

                                                {item.title ||
                                                    "Krushisetu Gallery"}

                                            </h3>


                                            {item.caption && (
                                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">

                                                    {item.caption}

                                                </p>
                                            )}

                                        </div>

                                    </article>
                                )
                            })}

                        </div>
                    )}

            </div>

        </section>
    )
}


export default GalleryHighlights