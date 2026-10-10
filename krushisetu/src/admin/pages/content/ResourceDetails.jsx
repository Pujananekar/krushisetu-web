import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"

import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    Edit3,
    ExternalLink,
    FileText,
    Globe2,
    Link2,
    MapPin,
    UserRound,
    Video,
} from "lucide-react"


import Loader from "../../../components/common/Loader"
import { getAdminResourceById } from "../../api/adminResourcesApi.js"

const formatResourceType = (type) => {
    if (!type) return "—"

    return type
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        )
}

const formatDate = (date) => {
    if (!date) return "—"

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return "—"
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const ResourceDetails = () => {
    const { id } = useParams()

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["admin-resource", id],
        queryFn: () => getAdminResourceById(id),
        enabled: Boolean(id),
    })

    const resource = data?.resource

    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading resource..."
            />
        )
    }

    if (isError || !resource) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-1600 items-center justify-center">
                    <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-gray-900/5">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <FileText size={24} />
                        </div>

                        <h2 className="mt-5 text-lg font-bold text-gray-900">
                            Unable to load resource
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            The requested resource could not
                            be loaded from the server.
                        </p>

                        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="kr-hover-button rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                Try Again
                            </button>

                            <Link
                                to="/admin/content/resources"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                <ArrowLeft size={16} />
                                Back to Resources
                            </Link>
                        </div>
                    </div>
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
                        <Link
                            to="/admin/content/resources"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft size={17} />
                        </Link>

                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                                <BookOpen size={16} />

                                <span>
                                    Content Management
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    Resources
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    View
                                </span>
                            </div>

                            <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {resource.title}
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Resource ID #{resource.id}
                                {" • "}
                                {formatResourceType(
                                    resource.resource_type
                                )}
                            </p>
                        </div>
                    </div>

                    <Link
                        to={`/admin/content/resources/${resource.id}/edit`}
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 size={17} />
                        Edit Resource
                    </Link>
                </div>

                {/* Main Details */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Main Content */}
                    <div className="space-y-6">

                        {/* Hero */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-900/5 sm:p-8">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-green-50 text-green-700">
                                    <BookOpen size={30} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                            {formatResourceType(
                                                resource.resource_type
                                            )}
                                        </span>

                                        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                                            {resource.language ||
                                                "—"}
                                        </span>

                                        {resource.category && (
                                            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600">
                                                {
                                                    resource.category
                                                }
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                                        {resource.title}
                                    </h2>

                                    {resource.slug && (
                                        <p className="mt-2 break-all text-sm text-gray-400">
                                            /resources/
                                            {resource.slug}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <FileText size={19} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Resource Content
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Main content associated
                                        with this resource.
                                    </p>
                                </div>
                            </div>

                            {resource.body ? (
                                <div className="whitespace-pre-wrap rounded-2xl bg-gray-50 p-5 text-sm leading-7 text-gray-700">
                                    {resource.body}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center text-sm text-gray-400">
                                    No resource content has
                                    been added.
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Link2 size={19} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Resource Links
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Files, videos and
                                        external sources.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {resource.file_url && (
                                    <a
                                        href={resource.file_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="kr-hover-card flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <FileText
                                                size={18}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-gray-900">
                                                File Resource
                                            </p>

                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                {
                                                    resource.file_url
                                                }
                                            </p>
                                        </div>

                                        <ExternalLink
                                            size={17}
                                            className="shrink-0 text-gray-400"
                                        />
                                    </a>
                                )}

                                {resource.video_url && (
                                    <a
                                        href={
                                            resource.video_url
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="kr-hover-card flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <Video
                                                size={18}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-gray-900">
                                                Video Resource
                                            </p>

                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                {
                                                    resource.video_url
                                                }
                                            </p>
                                        </div>

                                        <ExternalLink
                                            size={17}
                                            className="shrink-0 text-gray-400"
                                        />
                                    </a>
                                )}

                                {resource.external_url && (
                                    <a
                                        href={
                                            resource.external_url
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="kr-hover-card flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <Globe2
                                                size={18}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-gray-900">
                                                External Source
                                            </p>

                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                {
                                                    resource.external_url
                                                }
                                            </p>
                                        </div>

                                        <ExternalLink
                                            size={17}
                                            className="shrink-0 text-gray-400"
                                        />
                                    </a>
                                )}

                                {!resource.file_url &&
                                    !resource.video_url &&
                                    !resource.external_url && (
                                        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center text-sm text-gray-400">
                                            No resource links
                                            have been added.
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <FileText size={19} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Disclaimer
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Resource-specific
                                        disclaimer information.
                                    </p>
                                </div>
                            </div>

                            {resource.disclaimer ? (
                                <div className="rounded-2xl border border-green-100 bg-green-50/60 p-5 text-sm leading-7 text-green-900">
                                    {resource.disclaimer}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center text-sm text-gray-400">
                                    No disclaimer has been
                                    added.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* Resource Information */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900">
                                Resource Information
                            </h2>

                            <div className="mt-5 divide-y divide-gray-100">
                                <div className="flex items-start justify-between gap-4 py-4 first:pt-0">
                                    <span className="text-sm text-gray-500">
                                        Resource Type
                                    </span>

                                    <span className="text-right text-sm font-semibold text-gray-800">
                                        {formatResourceType(
                                            resource.resource_type
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-start justify-between gap-4 py-4">
                                    <span className="text-sm text-gray-500">
                                        Category
                                    </span>

                                    <span className="max-w-[190px] text-right text-sm font-semibold text-gray-800">
                                        {resource.category ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex items-start justify-between gap-4 py-4">
                                    <span className="text-sm text-gray-500">
                                        Language
                                    </span>

                                    <span className="text-right text-sm font-semibold text-gray-800">
                                        {resource.language ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex items-start justify-between gap-4 py-4">
                                    <span className="text-sm text-gray-500">
                                        Crop
                                    </span>

                                    <span className="max-w-[190px] text-right text-sm font-semibold text-gray-800">
                                        {resource.crop ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex items-start justify-between gap-4 py-4 last:pb-0">
                                    <span className="text-sm text-gray-500">
                                        Season
                                    </span>

                                    <span className="max-w-[190px] text-right text-sm font-semibold text-gray-800">
                                        {resource.season ||
                                            "—"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Author & Reviewer */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <UserRound size={19} />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Author & Reviewer
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Content responsibility
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Author
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {resource.author ||
                                            "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Reviewer
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {resource.reviewer ||
                                            "—"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <CalendarDays size={19} />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Dates
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Publication information
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Publication Date
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {formatDate(
                                            resource.publication_date
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Last Updated
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {formatDate(
                                            resource.last_updated_date
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Region & Crop */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <MapPin size={19} />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Applicability
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Region and crop coverage
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Region
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {resource.region ||
                                            "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Crop Applicability
                                    </p>

                                    <p className="mt-1 text-sm font-semibold leading-6 text-gray-800">
                                        {resource.crop_applicability ||
                                            resource.crop ||
                                            "Not crop specific"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900">
                                Tags
                            </h2>

                            {resource.tags ? (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {resource.tags
                                        .split(",")
                                        .map((tag) =>
                                            tag.trim()
                                        )
                                        .filter(Boolean)
                                        .map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                </div>
                            ) : (
                                <p className="mt-3 text-sm text-gray-400">
                                    No tags added.
                                </p>
                            )}
                        </div>
                    </aside>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white px-5 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        to="/admin/content/resources"
                        className="inline-flex items-center gap-3 rounded-2xl px-4 py-2 text-md font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                    >
                        <ArrowLeft size={18} />
                        Back to Resources
                    </Link>

                    <Link
                        to={`/admin/content/resources/${resource.id}/edit`}
                        className="inline-flex items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-3 text-md font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 size={18} />
                        Edit Resource
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ResourceDetails