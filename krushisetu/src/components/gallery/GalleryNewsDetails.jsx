import { useQuery } from "@tanstack/react-query"
import {
    ArrowLeft,
    CalendarDays,
    Newspaper,
    UserRound,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"

import axiosInstance from "../../api/axiosInstance"
import Loader from "../../components/common/Loader"


const getPublicNewsBySlug = async (slug) => {
    const response = await axiosInstance.get(
        `/news/${slug}`
    )

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

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return ""
    }

    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    )
}


const GalleryNewsDetails = () => {
    const { slug } = useParams()

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [
            "public-news-details",
            slug,
        ],

        queryFn: () =>
            getPublicNewsBySlug(slug),

        enabled: Boolean(slug),
    })


    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#F6FAF7]">

                <div className="mx-auto flex min-h-[70vh] items-center justify-center px-5">
                    <Loader />
                </div>

            </main>
        )
    }


    if (isError || !data?.news) {
        return (
            <main className="min-h-screen bg-[#F6FAF7] px-5 py-20 sm:px-8 lg:px-12">

                <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">

                    <div className="w-full rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <Newspaper
                                size={30}
                                strokeWidth={1.8}
                            />
                        </div>


                        <h1 className="mt-6 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                            News update not found
                        </h1>


                        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
                            The news update you are looking for is unavailable
                            or has not been published.
                        </p>


                        <Link
                            to="/gallery"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-green-900/10 transition hover:bg-green-800"
                        >
                            <ArrowLeft
                                size={17}
                                strokeWidth={2}
                            />

                            Back to Gallery
                        </Link>

                    </div>

                </div>

            </main>
        )
    }


    const news = data.news

    const imageUrl = resolveMediaUrl(
        news.image_url
    )


    return (
        <main className="min-h-screen overflow-hidden bg-[#F6FAF7]">

            {/* Article Header */}

            <section className="bg-white pt-28 pb-12 sm:pt-32 lg:pb-16">

                <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">

                    <Link
                        to="/gallery"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition-all duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                    >
                        <ArrowLeft
                            size={17}
                            strokeWidth={2}
                        />

                        Back to Gallery
                    </Link>


                    <div className="mx-auto mt-9 max-w-5xl">

                        {news.category && (
                            <div className="mb-5 inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-green-800">
                                {news.category}
                            </div>
                        )}


                        <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            {news.title}
                        </h1>


                        {news.summary && (
                            <p className="mt-6 max-w-4xl text-base leading-8 text-gray-500 sm:text-lg">
                                {news.summary}
                            </p>
                        )}


                        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">

                            {news.published_date && (
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">

                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
                                        <CalendarDays
                                            size={16}
                                            strokeWidth={1.8}
                                        />
                                    </span>

                                    <span>
                                        {formatDate(
                                            news.published_date
                                        )}
                                    </span>

                                </div>
                            )}


                            {news.author && (
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">

                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
                                        <UserRound
                                            size={16}
                                            strokeWidth={1.8}
                                        />
                                    </span>

                                    <span>
                                        {news.author}
                                    </span>

                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* Featured Image */}

            {imageUrl && (
                <section className="bg-white pb-12 lg:pb-16">

                    <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">

                        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-sm">

                            <img
                                src={imageUrl}
                                alt={
                                    news.title ||
                                    "Krushisetu news update"
                                }
                                className="max-h-[680px] w-full object-cover"
                                loading="eager"
                                onError={(event) => {
                                    event.currentTarget.style.display =
                                        "none"
                                }}
                            />

                        </div>

                    </div>

                </section>
            )}


            {/* Article Content */}

            <section className="bg-white pb-20 lg:pb-28">

                <div className="mx-auto max-w-4xl px-5 sm:px-8">

                    <article className="text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">

                        {news.content ? (
                            news.content
                                .split(/\n\s*\n/)
                                .map(
                                    (
                                        paragraph,
                                        index
                                    ) => (
                                        <p
                                            key={
                                                index
                                            }
                                            className="mb-6 last:mb-0"
                                        >
                                            {paragraph}
                                        </p>
                                    )
                                )
                        ) : (
                            <p className="text-gray-500">
                                No additional information is
                                available for this update.
                            </p>
                        )}

                    </article>


                    {/* Bottom Navigation */}

                    <div className="mt-12 border-t border-gray-200 pt-8">

                        <Link
                            to="/gallery"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-600 shadow-sm transition-all duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft
                                size={17}
                                strokeWidth={2}
                            />

                            Back to Gallery
                        </Link>

                    </div>

                </div>

            </section>

        </main>
    )
}


export default GalleryNewsDetails