import { useQuery } from "@tanstack/react-query"

import {
    ArrowRight,
    Handshake,
    MapPin,
    Quote,
    Star,
} from "lucide-react"

import { Link } from "react-router-dom"

import axiosInstance from "../../api/axiosInstance.js"


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
        url.startsWith("/")
            ? ""
            : "/"
    }${url}`
}


const SuccessStoryGrid = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: [
            "public-success-stories",
        ],

        queryFn: async () => {
            const response =
                await axiosInstance.get(
                    "/success-stories"
                )

            return response.data
        },
    })


    const successStories =
        Array.isArray(
            data?.successStories
        )
            ? data.successStories
            : []


    return (
        <section
            id="success-stories"
            className="px-6 py-8 sm:px-8 lg:px-12 xl:px-16"
        >
            <div className="mx-auto max-w-350">

                {/* Header */}

                <div className="mb-8">

                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        Stories Directory
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                        Voices of
                        <span className="text-green-800">
                            {" "}Change
                        </span>
                    </h2>

                    <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
                        Discover verified stories from farmers,
                        communities, and rural initiatives as they
                        are documented and approved for publication.
                    </p>

                </div>


                {/* Loading */}

                {isLoading && (
                    <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/10">

                        <div className="text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <Handshake className="h-7 w-7 animate-pulse" />
                            </div>

                            <p className="mt-4 text-sm font-medium text-gray-500">
                                Loading success stories...
                            </p>

                        </div>

                    </div>
                )}


                {/* Error */}

                {isError && (
                    <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-red-100 bg-white px-6 shadow-lg shadow-gray-900/10">

                        <div className="max-w-md text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                <Star className="h-6 w-6" />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-gray-900">
                                Unable to load success stories
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {error?.response?.data?.message ||
                                    "Something went wrong while loading the success stories."}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    refetch()
                                }
                                className="mt-5 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                Try Again
                            </button>

                        </div>

                    </div>
                )}


                {/* Empty */}

                {!isLoading &&
                    !isError &&
                    successStories.length === 0 && (
                        <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 shadow-lg shadow-gray-900/10">

                            <div className="max-w-xl text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Handshake className="h-7 w-7" />
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-gray-900">
                                    Success Story Directory Coming Soon
                                </h3>

                                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-green-600" />

                                <p className="mt-5 text-sm leading-7 text-gray-600">
                                    Verified farmer and community success
                                    stories will be published here as they
                                    are documented, reviewed, and approved.
                                </p>

                            </div>

                        </div>
                    )}


                {/* Database Stories */}

                {!isLoading &&
                    !isError &&
                    successStories.length > 0 && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {successStories.map(
                                (story) => {
                                    const mediaUrl =
                                        resolveMediaUrl(
                                            story.media_url
                                        )

                                    return (
                                        <article
                                            key={
                                                story.id
                                            }
                                            className="kr-hover-card group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/10"
                                        >

                                            {/* Media */}

                                            {mediaUrl ? (
                                                <div className="h-56 overflow-hidden bg-gray-100">

                                                    <img
                                                        src={
                                                            mediaUrl
                                                        }
                                                        alt={
                                                            story.title
                                                        }
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                        loading="lazy"
                                                        onError={(
                                                            event
                                                        ) => {
                                                            event.currentTarget.style.display =
                                                                "none"
                                                        }}
                                                    />

                                                </div>
                                            ) : (
                                                <div className="flex h-56 items-center justify-center bg-green-50">

                                                    <Handshake className="h-14 w-14 text-green-700/30" />

                                                </div>
                                            )}


                                            {/* Content */}

                                            <div className="flex flex-1 flex-col p-6">

                                                {/* Location */}

                                                {story.location && (
                                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-green-700">

                                                        <MapPin className="h-4 w-4" />

                                                        <span>
                                                            {
                                                                story.location
                                                            }
                                                        </span>

                                                    </div>
                                                )}


                                                {/* Title */}

                                                <h3 className="mt-4 text-xl font-bold leading-7 text-gray-950">
                                                    {
                                                        story.title
                                                    }
                                                </h3>


                                                {/* Beneficiary */}

                                                {story.beneficiary_name && (
                                                    <p className="mt-2 text-sm font-medium text-gray-500">
                                                        {
                                                            story.beneficiary_name
                                                        }
                                                    </p>
                                                )}


                                                {/* Story */}

                                                {story.story && (
                                                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-600">
                                                        {
                                                            story.story
                                                        }
                                                    </p>
                                                )}


                                                {/* Quote */}

                                                {story.quote && (
                                                    <div className="mt-5 rounded-2xl bg-green-50 p-4">

                                                        <Quote className="h-4 w-4 text-green-700" />

                                                        <p className="mt-2 text-sm italic leading-6 text-gray-700">
                                                            {
                                                                story.quote
                                                            }
                                                        </p>

                                                    </div>
                                                )}


                                                {/* Details */}

                                                <div className="mt-auto pt-6">

                                                    <Link
                                                        to={`/success-stories/${story.slug}`}
                                                        className="inline-flex items-center gap-2 text-sm font-bold text-green-700 transition hover:text-green-800"
                                                    >
                                                        Read Full Story

                                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </Link>

                                                </div>

                                            </div>

                                        </article>
                                    )
                                }
                            )}

                        </div>
                    )}

            </div>
        </section>
    )
}


export default SuccessStoryGrid