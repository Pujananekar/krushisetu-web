import { useQuery } from "@tanstack/react-query"

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Download,
    ExternalLink,
    FileText,
    Info,
    MapPin,
    PlayCircle,
    Sprout,
} from "lucide-react"

import { Link, useParams } from "react-router-dom"

import axiosInstance from "../../api/axiosInstance"


const ResourceDetails = () => {
    const { slug } = useParams()

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["public-resource", slug],

        queryFn: async () => {
            const response = await axiosInstance.get(
                `/resources/${slug}`
            )

            return response.data
        },

        enabled: Boolean(slug),
    })


    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#F6FAF7]">
                <div className="mx-auto flex min-h-[70vh] max-w-350 items-center justify-center px-6 py-20 sm:px-8 lg:px-12">
                    <div className="w-full max-w-3xl rounded-4xl border border-gray-200 bg-white p-10 text-center shadow-xl shadow-gray-900/5">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <FileText
                                size={30}
                                strokeWidth={2}
                            />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-950">
                            Loading resource...
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Please wait while we load the resource details.
                        </p>
                    </div>
                </div>
            </main>
        )
    }


    if (isError || !data?.resource) {
        return (
            <main className="min-h-screen bg-[#F6FAF7]">
                <div className="mx-auto flex min-h-[70vh] max-w-350 items-center justify-center px-6 py-20 sm:px-8 lg:px-12">
                    <div className="w-full max-w-2xl rounded-4xl border border-gray-200 bg-white p-10 text-center shadow-xl shadow-gray-900/5">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <Info
                                size={30}
                                strokeWidth={2}
                            />
                        </div>

                        <h1 className="mt-6 text-3xl font-extrabold text-gray-950">
                            Resource Not Found
                        </h1>

                        <p className="mt-3 text-gray-600">
                            The resource you are looking for could not be
                            found or is no longer available.
                        </p>

                        <Link
                            to="/resources"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-800"
                        >
                            <ArrowLeft size={17} />
                            Back to Resources
                        </Link>
                    </div>
                </div>
            </main>
        )
    }


    const resource = data.resource


    const formatDate = (date) => {
        if (!date) return null

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) {
            return date
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }


    const tags = resource.tags
        ? resource.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : []


    return (
        <main className="min-h-screen bg-[#F6FAF7]">

            {/* Resource Hero Card */}
            <section className="px-6 pt-8 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-350 mt-25">

                    {/* Back Button */}
                    <Link
                        to="/resources"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-700 mb-5"
                    >
                        <ArrowLeft size={17} />
                        Back to Resources
                    </Link>


                    <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl shadow-gray-900/10">

                        {/* Decorative Background */}
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-100/70" />

                            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-100/50" />

                            <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-green-50/80 to-transparent" />
                        </div>


                        <div className="relative p-7 sm:p-10 lg:p-12">


                            {/* Top Row */}
                            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

                                <div className="flex flex-wrap items-center gap-3">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/10">
                                        <FileText
                                            size={24}
                                            strokeWidth={2}
                                        />
                                    </div>

                                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                                        Resource
                                    </span>

                                </div>


                                {/* Resource Type */}
                                {resource.resource_type && (
                                    <span className="rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-bold text-green-800">
                                        {resource.resource_type}
                                    </span>
                                )}

                            </div>


                            {/* Resource Title */}
                            <div className="mt-8 max-w-5xl">

                                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                                    {resource.title}
                                </h1>

                                <div className="mt-6 h-1 w-20 rounded-full bg-green-600" />


                                {/* Summary */}
                                {resource.summary && (
                                    <p className="mt-6 max-w-4xl text-base leading-8 text-gray-600 sm:text-lg">
                                        {resource.summary}
                                    </p>
                                )}

                            </div>


                            {/* Resource Meta */}
                            <div className="mt-8 flex flex-wrap gap-3">

                                {resource.category && (
                                    <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
                                        {resource.category}
                                    </span>
                                )}


                                {resource.language && (
                                    <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
                                        {resource.language}
                                    </span>
                                )}


                                {resource.region && (
                                    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
                                        <MapPin
                                            size={15}
                                            className="text-green-700"
                                        />

                                        {resource.region}
                                    </span>
                                )}

                            </div>


                            {/* Publication / Updated Date */}
                            {(resource.publication_date ||
                                resource.last_updated_date) && (
                                    <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-gray-100 pt-6">

                                        {resource.publication_date && (
                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                    <CalendarDays
                                                        size={18}
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                        Published
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                                        {formatDate(
                                                            resource.publication_date
                                                        )}
                                                    </p>
                                                </div>

                                            </div>
                                        )}


                                        {resource.last_updated_date && (
                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
                                                    <CalendarDays
                                                        size={18}
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                        Last Updated
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                                        {formatDate(
                                                            resource.last_updated_date
                                                        )}
                                                    </p>
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                )}

                        </div>
                    </div>
                </div>
            </section>


            {/* Main Content */}
            <section className="px-6 py-14 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
                <div className="mx-auto max-w-350">

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

                        {/* Article */}
                        <article className="rounded-4xl border border-gray-200 bg-white p-7 shadow-xl shadow-gray-900/5 sm:p-10 lg:p-12">

                            <div className="flex items-center gap-3 text-green-700">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                                    <FileText
                                        size={22}
                                        strokeWidth={2}
                                    />
                                </div>

                                <span className="text-sm font-bold uppercase tracking-[0.15em]">
                                    Resource Information
                                </span>

                            </div>


                            {/* Resource Body */}
                            {resource.body ? (
                                <div className="mt-8 whitespace-pre-line text-base leading-8 text-gray-700">
                                    {resource.body}
                                </div>
                            ) : (
                                <p className="mt-8 text-gray-600">
                                    Detailed information for this resource
                                    is not currently available.
                                </p>
                            )}


                            {/* Crop / Season Information */}
                            {(resource.crop ||
                                resource.season ||
                                resource.crop_applicability) && (
                                    <div className="mt-12 border-t border-gray-100 pt-10">

                                        <h2 className="text-2xl font-bold text-gray-950">
                                            Applicability
                                        </h2>


                                        <div className="mt-6 grid gap-4 sm:grid-cols-2">

                                            {resource.crop && (
                                                <div className="rounded-2xl bg-[#F6FAF7] p-5">

                                                    <div className="flex items-center gap-3">

                                                        <Sprout
                                                            size={20}
                                                            className="text-green-700"
                                                        />

                                                        <span className="text-sm font-semibold text-gray-500">
                                                            Crop
                                                        </span>

                                                    </div>

                                                    <p className="mt-2 font-bold text-gray-950">
                                                        {resource.crop}
                                                    </p>

                                                </div>
                                            )}


                                            {resource.season && (
                                                <div className="rounded-2xl bg-[#F6FAF7] p-5">

                                                    <div className="flex items-center gap-3">

                                                        <CalendarDays
                                                            size={20}
                                                            className="text-green-700"
                                                        />

                                                        <span className="text-sm font-semibold text-gray-500">
                                                            Season
                                                        </span>

                                                    </div>

                                                    <p className="mt-2 font-bold text-gray-950">
                                                        {resource.season}
                                                    </p>

                                                </div>
                                            )}


                                            {resource.crop_applicability && (
                                                <div className="rounded-2xl bg-[#F6FAF7] p-5 sm:col-span-2">

                                                    <p className="text-sm font-semibold text-gray-500">
                                                        Crop Applicability
                                                    </p>

                                                    <p className="mt-2 font-bold text-gray-950">
                                                        {resource.crop_applicability}
                                                    </p>

                                                </div>
                                            )}

                                        </div>
                                    </div>
                                )}


                            {/* Tags */}
                            {tags.length > 0 && (
                                <div className="mt-12 border-t border-gray-100 pt-10">

                                    <h2 className="text-2xl font-bold text-gray-950">
                                        Topics
                                    </h2>

                                    <div className="mt-5 flex flex-wrap gap-2">

                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-800"
                                            >
                                                {tag}
                                            </span>
                                        ))}

                                    </div>

                                </div>
                            )}

                        </article>


                        {/* Sidebar */}
                        <aside className="space-y-6">

                            {/* Resource Details */}
                            <div className="rounded-4xl border border-gray-200 bg-white p-7 shadow-xl shadow-gray-900/5">

                                <h2 className="text-xl font-bold text-gray-950">
                                    Resource Details
                                </h2>


                                <div className="mt-6 space-y-5">

                                    {resource.author && (
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Author
                                            </p>

                                            <p className="mt-1 font-semibold text-gray-800">
                                                {resource.author}
                                            </p>
                                        </div>
                                    )}


                                    {resource.reviewer && (
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Reviewer
                                            </p>

                                            <p className="mt-1 font-semibold text-gray-800">
                                                {resource.reviewer}
                                            </p>
                                        </div>
                                    )}


                                    {resource.region && (
                                        <div>

                                            <div className="flex items-center gap-2">

                                                <MapPin
                                                    size={16}
                                                    className="text-green-700"
                                                />

                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                    Region
                                                </p>

                                            </div>

                                            <p className="mt-1 font-semibold text-gray-800">
                                                {resource.region}
                                            </p>

                                        </div>
                                    )}


                                    {resource.last_updated_date && (
                                        <div>

                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Last Updated
                                            </p>

                                            <p className="mt-1 font-semibold text-gray-800">
                                                {formatDate(
                                                    resource.last_updated_date
                                                )}
                                            </p>

                                        </div>
                                    )}

                                </div>
                            </div>


                            {/* Actions */}
                            {(resource.file_url ||
                                resource.video_url ||
                                resource.external_url) && (
                                    <div className="rounded-4xl border border-gray-200 bg-white p-7 shadow-xl shadow-gray-900/5">

                                        <h2 className="text-xl font-bold text-gray-950">
                                            Access Resource
                                        </h2>


                                        <div className="mt-6 space-y-3">

                                            {resource.file_url && (
                                                <a
                                                    href={resource.file_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center justify-between gap-3 rounded-2xl bg-green-700 px-5 py-4 text-sm font-bold text-white transition hover:bg-green-800"
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <Download
                                                            size={18}
                                                        />

                                                        Download File
                                                    </span>

                                                    <ExternalLink
                                                        size={16}
                                                    />
                                                </a>
                                            )}


                                            {resource.video_url && (
                                                <a
                                                    href={resource.video_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center justify-between gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-bold text-green-800 transition hover:bg-green-100"
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <PlayCircle
                                                            size={18}
                                                        />

                                                        Watch Video
                                                    </span>

                                                    <ExternalLink
                                                        size={16}
                                                    />
                                                </a>
                                            )}


                                            {resource.external_url && (
                                                <a
                                                    href={resource.external_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-bold text-gray-800 transition hover:bg-gray-100"
                                                >
                                                    <span className="flex items-center gap-3">

                                                        <CheckCircle2
                                                            size={18}
                                                            className="text-green-700"
                                                        />

                                                        Official Source

                                                    </span>

                                                    <ExternalLink
                                                        size={16}
                                                    />
                                                </a>
                                            )}

                                        </div>
                                    </div>
                                )}


                            {/* Disclaimer */}
                            {resource.disclaimer && (
                                <div className="rounded-3xl border border-amber-100 bg-amber-50 p-6">

                                    <div className="flex items-start gap-3">

                                        <Info
                                            size={20}
                                            className="mt-0.5 shrink-0 text-amber-700"
                                        />

                                        <div>

                                            <h3 className="font-bold text-amber-900">
                                                Disclaimer
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-amber-800">
                                                {resource.disclaimer}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            )}

                        </aside>

                    </div>

                </div>
            </section>

        </main>
    )
}


export default ResourceDetails