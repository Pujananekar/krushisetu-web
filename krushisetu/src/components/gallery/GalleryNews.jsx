import { useQuery } from "@tanstack/react-query"

import {
    ArrowRight,
    CalendarDays,
    Megaphone,
    Newspaper,
} from "lucide-react"

import { Link } from "react-router-dom"

import axiosInstance from "../../api/axiosInstance"

import Loader from "../common/Loader"


const getPublicNews = async () => {
    const response =
        await axiosInstance.get("/news")

    return response.data
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


const formatDate = (date) => {
    if (!date) {
        return ""
    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    )
}


const GalleryNews = () => {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["public-news"],
        queryFn: getPublicNews,
    })


    const news = Array.isArray(data?.news)
        ? data.news
        : Array.isArray(data?.data)
            ? data.data
            : []


    return (
        <section
            id="gallery-news"
            className="bg-white py-16 lg:py-20"
        >
            <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">

                {/* Section Header */}

                <div className="mb-9">

                    <div className="mb-4 flex items-center gap-3">

                        <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                            <Newspaper
                                size={21}
                                strokeWidth={2}
                            />
                        </div>

                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-800">
                            News & Updates
                        </span>

                    </div>


                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                        <div>

                            <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                                Latest from{" "}
                                <span className="text-green-700">
                                    Krushisetu.
                                </span>
                            </h2>


                            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-500 sm:text-lg">
                                Stay updated with Krushisetu&apos;s latest
                                announcements, activities, events and field
                                updates.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Loading */}

                {isLoading && (
                    <div className="flex min-h-60 items-center justify-center rounded-3xl border border-gray-200 bg-[#F6FAF7]">
                        <Loader />
                    </div>
                )}


                {/* Error */}

                {!isLoading && isError && (
                    <div className="flex min-h-60 flex-col items-center justify-center rounded-3xl border border-red-100 bg-red-50 px-6 text-center">

                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                            <Newspaper
                                size={26}
                                strokeWidth={1.8}
                            />
                        </div>


                        <h3 className="text-lg font-bold text-gray-900">
                            Unable to load news
                        </h3>


                        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                            News and updates could not be loaded right now.
                            Please try again later.
                        </p>

                    </div>
                )}


                {/* Empty */}

                {!isLoading &&
                    !isError &&
                    news.length === 0 && (

                        <div className="flex min-h-60 flex-col items-center justify-center rounded-3xl border border-gray-200 bg-[#F6FAF7] px-6 text-center">

                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <Megaphone
                                    size={26}
                                    strokeWidth={1.8}
                                />
                            </div>


                            <h3 className="text-lg font-bold text-gray-900">
                                No news updates yet
                            </h3>


                            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                                New announcements and updates will appear
                                here when they are published.
                            </p>

                        </div>
                    )}


                {/* News Cards */}

                {!isLoading &&
                    !isError &&
                    news.length > 0 && (

                        <>

                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                                {news
                                    .map((item) => {

                                        const imageUrl =
                                            resolveMediaUrl(
                                                item.image_url
                                            )


                                        return (
                                            <article
                                                key={item.id}
                                                className="kr-hover-card group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm"
                                            >

                                                {/* Image */}

                                                <div className="relative aspect-[16/9] overflow-hidden bg-green-50">

                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={
                                                                item.title ||
                                                                "Krushisetu news"
                                                            }
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            loading="lazy"
                                                            onError={(
                                                                event
                                                            ) => {
                                                                event.currentTarget.style.display =
                                                                    "none"

                                                                const fallback =
                                                                    event
                                                                        .currentTarget
                                                                        .nextElementSibling

                                                                if (
                                                                    fallback
                                                                ) {
                                                                    fallback.classList.remove(
                                                                        "hidden"
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    ) : null}


                                                    <div
                                                        className={`${
                                                            imageUrl
                                                                ? "hidden"
                                                                : ""
                                                        } flex h-full w-full items-center justify-center bg-green-50 text-green-700`}
                                                    >
                                                        <Newspaper
                                                            size={42}
                                                            strokeWidth={1.5}
                                                        />
                                                    </div>


                                                    {/* Category */}

                                                    {item.category && (
                                                        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-green-800 shadow-sm">
                                                            {item.category}
                                                        </div>
                                                    )}

                                                </div>


                                                {/* Content */}

                                                <div className="flex flex-1 flex-col p-6">

                                                    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-400">

                                                        <CalendarDays
                                                            size={15}
                                                            strokeWidth={1.8}
                                                        />

                                                        <span>
                                                            {formatDate(
                                                                item.published_date
                                                            )}
                                                        </span>

                                                    </div>


                                                    <h3 className="line-clamp-2 text-lg font-extrabold leading-7 text-gray-900 transition-colors duration-200 group-hover:text-green-700">
                                                        {item.title}
                                                    </h3>


                                                    {item.summary && (
                                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                                                            {item.summary}
                                                        </p>
                                                    )}


                                                    <div className="mt-auto pt-5">

                                                        <Link
                                                            to={`/gallery/news/${item.slug}`}
                                                            className="inline-flex items-center gap-2 text-sm font-bold text-green-700 transition-all duration-200 hover:gap-3 hover:text-green-800"
                                                        >
                                                            Read update

                                                            <ArrowRight
                                                                size={17}
                                                                strokeWidth={2}
                                                            />
                                                        </Link>

                                                    </div>

                                                </div>

                                            </article>
                                        )
                                    })}

                            </div>

                        </>
                    )}

            </div>
        </section>
    )
}


export default GalleryNews