import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Image,
    MapPin,
    Quote,
    Sparkles,
    UserRound,
} from "lucide-react"

import Loader from "../../components/common/Loader"
import axiosInstance from "../../api/axiosInstance.js"


const getApiOrigin = () => {
    const baseURL =
        axiosInstance?.defaults?.baseURL || ""

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
        url.startsWith("blob:") ||
        url.startsWith("data:")
    ) {
        return url
    }

    const normalizedUrl = url.startsWith("/")
        ? url
        : `/${url}`

    return `${getApiOrigin()}${normalizedUrl}`
}


/*
|--------------------------------------------------------------------------
| Public Success Story API
|--------------------------------------------------------------------------
*/

const getPublicSuccessStoryBySlug = async (slug) => {
    const response = await axiosInstance.get(
        `/success-stories/${slug}`
    )

    return response.data
}


/*
|--------------------------------------------------------------------------
| Success Story Details
|--------------------------------------------------------------------------
*/

const SuccessStoryDetails = () => {
    const { slug } = useParams()

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: [
            "public-success-story",
            slug,
        ],

        queryFn: () =>
            getPublicSuccessStoryBySlug(slug),

        enabled: Boolean(slug),
    })


    const story =
        data?.successStory ||
        data?.success_story ||
        data?.story ||
        null


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (isLoading) {
        return (
            <Loader
                text="Loading success story..."
            />
        )
    }


    /*
    |--------------------------------------------------------------------------
    | Error / Not Found
    |--------------------------------------------------------------------------
    */

    if (isError || !story) {
        return (
            <main className="min-h-screen bg-[#F4FBF5]">

                <section className="flex min-h-[70vh] items-center justify-center px-6">

                    <div className="w-full max-w-xl text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                            <Sparkles className="h-7 w-7" />
                        </div>


                        <h1 className="mt-6 text-3xl font-bold text-gray-900 md:text-4xl">
                            Success Story Not Found
                        </h1>


                        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600">
                            {error?.response?.data?.message ||
                                "The success story you are looking for does not exist or is no longer available."}
                        </p>


                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Try Again
                            </button>


                            <Link
                                to="/success-stories"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-px hover:bg-green-800"
                            >
                                <ArrowLeft className="h-4 w-4" />

                                Back to Success Stories
                            </Link>

                        </div>

                    </div>

                </section>

            </main>
        )
    }


    const mediaUrl = resolveMediaUrl(
        story.media_url
    )


    /*
    |--------------------------------------------------------------------------
    | Main Page
    |--------------------------------------------------------------------------
    */

    return (
        <main className="min-h-screen w-full bg-white">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="relative overflow-hidden bg-[#F1FAF2]">

                <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-green-200/30  " />

                <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-green-100/40  " />


                <div className="relative z-10 mx-auto max-w-350 px-6 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">

                    {/* Back */}

                    <Link
                        to="/success-stories"
                        className="inline-flex items-center gap-2 rounded-2xl border border-green-100 bg-white/80 px-4 py-2.5 text-sm font-semibold text-green-800 shadow-sm  transition hover:-translate-y-px hover:border-green-700 hover:bg-green-700 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />

                        Back to Success Stories
                    </Link>


                    {/* Hero Card */}

                    <div className="relative mt-8 overflow-hidden rounded-4xl border border-white/80 bg-white/80 shadow-xl shadow-green-900/10 " >

                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px]">

                            {/* Content */}

                            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">

                                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-green-800">

                                    <Sparkles className="h-3.5 w-3.5" />

                                    Success Story

                                </div>


                                <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                                    {story.title}
                                </h1>


                                <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600">
                                    A story of change, learning and
                                    progress from the Krushisetu
                                    community.
                                </p>


                                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                                    {story.beneficiary_name && (
                                        <div className="inline-flex items-center gap-2 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">

                                            <UserRound className="h-4 w-4" />

                                            {story.beneficiary_name}

                                        </div>
                                    )}


                                    {story.location && (
                                        <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700">

                                            <MapPin className="h-4 w-4 text-green-700" />

                                            {story.location}

                                        </div>
                                    )}

                                </div>

                            </div>


                            {/* Hero Image */}

                            {mediaUrl ? (

                                <div className="relative min-h-80 overflow-hidden lg:min-h-full">

                                    <img
                                        src={mediaUrl}
                                        alt={story.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-green-950/50 via-transparent to-transparent" />

                                </div>

                            ) : (

                                <div className="flex min-h-80 items-center justify-center bg-linear-to-br from-green-700 to-green-900 lg:min-h-full">

                                    <div className="text-center text-white">

                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

                                            <Sparkles className="h-8 w-8" />

                                        </div>


                                        <p className="mt-4 text-sm font-semibold text-green-100">
                                            Krushisetu Success Story
                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                STORY CONTENT
            ===================================================== */}

            <section className="bg-white px-6 py-20 sm:px-8 lg:px-12 xl:px-16">

                <div className="mx-auto max-w-350">

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">

                        {/* =================================================
                            LEFT CONTENT
                        ================================================= */}

                        <div className="space-y-8">

                            {/* Story */}

                            <section className="rounded-4xl border border-gray-100 bg-white p-7 shadow-sm sm:p-9">

                                <div className="flex items-start gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">

                                        <UserRound className="h-5 w-5" />

                                    </div>


                                    <div>

                                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
                                            The Story
                                        </p>


                                        <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                            A journey towards better opportunities
                                        </h2>

                                    </div>

                                </div>


                                <div className="mt-7">

                                    {story.story ? (

                                        <p className="whitespace-pre-line text-base leading-8 text-gray-600">
                                            {story.story}
                                        </p>

                                    ) : (

                                        <p className="text-base text-gray-400">
                                            Story information is currently unavailable.
                                        </p>

                                    )}

                                </div>

                            </section>


                            {/* Outcomes */}

                            {story.outcomes && (

                                <section className="rounded-4xl border border-gray-100 bg-white p-7 shadow-sm sm:p-9">

                                    <div className="flex items-start gap-4">

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">

                                            <CheckCircle2 className="h-5 w-5" />

                                        </div>


                                        <div>

                                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
                                                Outcomes
                                            </p>


                                            <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                                What changed
                                            </h2>

                                        </div>

                                    </div>


                                    <div className="mt-7 rounded-3xl bg-[#F4FBF5] p-6 sm:p-7">

                                        <p className="whitespace-pre-line text-base leading-8 text-gray-700">
                                            {story.outcomes}
                                        </p>

                                    </div>

                                </section>

                            )}


                            {/* Quote */}

                            {story.quote && (

                                <section className="relative overflow-hidden rounded-4xl bg-green-900 p-7 text-white shadow-lg shadow-green-900/10 sm:p-9">

                                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-400/10  " />


                                    <div className="relative">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-green-200">

                                            <Quote className="h-6 w-6" />

                                        </div>


                                        <blockquote className="mt-6 text-xl font-medium leading-9 text-white sm:text-2xl">
                                            “{story.quote}”
                                        </blockquote>


                                        {story.beneficiary_name && (

                                            <div className="mt-7 flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700">

                                                    <UserRound className="h-5 w-5 text-green-100" />

                                                </div>


                                                <div>

                                                    <p className="text-sm font-semibold text-white">
                                                        {story.beneficiary_name}
                                                    </p>


                                                    {story.location && (

                                                        <p className="text-xs text-green-200">
                                                            {story.location}
                                                        </p>

                                                    )}

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                </section>

                            )}


                            {/* Media */}

                            {mediaUrl && (

                                <section className="rounded-4xl border border-gray-100 bg-white p-7 shadow-sm sm:p-9">

                                    <div className="flex items-start gap-4">

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">

                                            <Image className="h-5 w-5" />

                                        </div>


                                        <div>

                                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
                                                Gallery
                                            </p>


                                            <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                                Story Media
                                            </h2>

                                        </div>

                                    </div>


                                    <div className="mt-7 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">

                                        <img
                                            src={mediaUrl}
                                            alt={story.title}
                                            className="max-h-[650px] w-full object-cover"
                                        />

                                    </div>

                                </section>

                            )}

                        </div>


                        {/* =================================================
                            RIGHT SIDEBAR
                        ================================================= */}

                        <aside className="space-y-6">

                            {/* Story Information */}

                            <div className="rounded-4xl border border-gray-100 bg-[#F4FBF5] p-6">

                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
                                    Story Information
                                </p>


                                <h2 className="mt-2 text-xl font-bold text-gray-900">
                                    About this story
                                </h2>


                                <div className="mt-6 space-y-4">

                                    {story.beneficiary_name && (

                                        <div className="rounded-2xl bg-white p-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">

                                                    <UserRound className="h-4 w-4" />

                                                </div>


                                                <div className="min-w-0">

                                                    <p className="text-xs text-gray-400">
                                                        Beneficiary
                                                    </p>


                                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                                        {story.beneficiary_name}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    )}


                                    {story.location && (

                                        <div className="rounded-2xl bg-white p-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">

                                                    <MapPin className="h-4 w-4" />

                                                </div>


                                                <div className="min-w-0">

                                                    <p className="text-xs text-gray-400">
                                                        Location
                                                    </p>


                                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                                        {story.location}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* Explore More Stories */}

                            <div className="rounded-4xl border border-green-100 bg-white p-6 shadow-sm">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">

                                    <Sparkles className="h-5 w-5" />

                                </div>


                                <h2 className="mt-5 text-xl font-bold text-gray-900">
                                    Explore More Stories
                                </h2>


                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Discover more stories from farmers,
                                    communities and entrepreneurs connected
                                    with Krushisetu.
                                </p>


                                <Link
                                    to="/success-stories"
                                    className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-800"
                                >
                                    View All Success Stories

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FINAL CTA
            ===================================================== */}

            <section className="px-6 pb-20 sm:px-8 lg:px-12 xl:px-16">

                <div className="mx-auto max-w-350">

                    <div className="relative overflow-hidden rounded-4xl bg-green-900 px-7 py-12 sm:px-10 lg:px-14">

                        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-green-400/10  " />

                        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-green-500/10  " />


                        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                            <div className="max-w-2xl">

                                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-200">
                                    Krushisetu
                                </p>


                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Be part of the change
                                </h2>


                                <p className="mt-3 text-sm leading-7 text-green-100/80 sm:text-base">
                                    Connect with Krushisetu to explore
                                    guidance, training, resources and
                                    opportunities for farmers and
                                    agri-entrepreneurs.
                                </p>

                            </div>


                            <div className="shrink-0">

                                <Link
                                    to="/contact"
                                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-green-800 shadow-lg transition hover:-translate-y-px hover:bg-green-50"
                                >
                                    Contact Us

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    )
}


export default SuccessStoryDetails