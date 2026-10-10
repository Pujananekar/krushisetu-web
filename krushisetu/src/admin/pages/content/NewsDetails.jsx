import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Edit3,
    FileText,
    Image as ImageIcon,
    Info,
    Tag,
    User,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import axiosInstance from "../../../api/axiosInstance.js"
import { getAdminNewsById } from "../../api/adminNewsApi.js"


const formatDate = (date) => {
    if (!date) {
        return "—"
    }

    const value = String(date).match(
        /^\d{4}-\d{2}-\d{2}/
    )

    if (!value) {
        return "—"
    }

    const parsedDate = new Date(
        `${value[0]}T00:00:00`
    )

    if (Number.isNaN(parsedDate.getTime())) {
        return "—"
    }

    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    )
}


const formatDateTime = (date) => {
    if (!date) {
        return "—"
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return formatDate(date)
    }

    return parsedDate.toLocaleString(
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


const formatTime = (date) => {
    if (!date) {
        return "—"
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return "—"
    }

    return parsedDate.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    )
}


/*
 * ---------------------------------------------------------
 * Resolve media URLs
 * ---------------------------------------------------------
 *
 * Database may contain:
 *
 * /uploads/news/image.jpg
 *
 * or:
 *
 * https://example.com/image.jpg
 *
 * Internal upload paths are resolved against the backend.
 * External URLs are left untouched.
 */

const getApiOrigin = () => {
    const baseURL =
        axiosInstance.defaults.baseURL || ""

    return baseURL.replace(
        /\/api\/?$/,
        ""
    )
}


const resolveMediaUrl = (url) => {
    if (!url) {
        return ""
    }

    const value = String(url).trim()

    if (!value) {
        return ""
    }

    if (
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        value.startsWith("data:")
    ) {
        return value
    }

    if (value.startsWith("/uploads/")) {
        return `${getApiOrigin()}${value}`
    }

    if (value.startsWith("uploads/")) {
        return `${getApiOrigin()}/${value}`
    }

    if (value.startsWith("/")) {
        return `${getApiOrigin()}${value}`
    }

    return value
}


const getStatusLabel = (status) => {
    switch (status) {
        case "PUBLISHED":
            return "Published"

        case "DRAFT":
            return "Draft"

        default:
            return status || "—"
    }
}


const getStatusClasses = (status) => {
    switch (status) {
        case "PUBLISHED":
            return "border-green-200 bg-green-50 text-green-700"

        case "DRAFT":
            return "border-gray-200 bg-gray-50 text-gray-600"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}


const NewsDetails = () => {
    const { id } = useParams()

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["admin-news", id],
        queryFn: () => getAdminNewsById(id),
        enabled: Boolean(id),
    })

    const news =
        data?.news ||
        data?.data ||
        null


    /*
     * ---------------------------------------------------------
     * Loading
     * ---------------------------------------------------------
     */

    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading news..."
            />
        )
    }


    /*
     * ---------------------------------------------------------
     * Error
     * ---------------------------------------------------------
     */

    if (isError || !news) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">

                <div className="mx-auto flex min-h-[60vh] max-w-[1400px] items-center justify-center">

                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">

                            <FileText className="h-6 w-6" />

                        </div>


                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load news
                        </h2>


                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                "The requested news article could not be found."}
                        </p>


                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">

                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Try Again
                            </button>


                            <Link
                                to="/admin/content/news"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <ArrowLeft className="h-4 w-4" />

                                Back to News
                            </Link>

                        </div>

                    </div>

                </div>

            </section>
        )
    }


    const imageUrl = resolveMediaUrl(
        news.image_url
    )


    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* HEADER */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-start gap-3">

                        <Link
                            to="/admin/content/news"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>


                        <div>

                            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">

                                <span>
                                    Content Management
                                </span>

                                <span>/</span>

                                <span>
                                    News
                                </span>

                                <span>/</span>

                                <span className="font-medium text-green-700">
                                    Details
                                </span>

                            </div>


                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {news.title}
                            </h1>


                            <p className="mt-1 text-sm text-gray-500">
                                View the complete news article and publishing
                                information.
                            </p>

                        </div>

                    </div>


                    <Link
                        to={`/admin/content/news/${news.id}/edit`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 className="h-4 w-4" />

                        Edit News
                    </Link>

                </div>


                {/* HERO */}

                <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-gray-900/10">

                    <div className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 px-6 py-10 sm:px-8 lg:px-10 lg:py-12">

                        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-green-400/10 blur-3xl" />

                        <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-green-400/5 blur-3xl" />


                        <div className="relative">

                            {/* STATUS + CATEGORY */}

                            <div className="flex flex-wrap items-center gap-3">

                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                                        news.status
                                    )}`}
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5" />

                                    {getStatusLabel(
                                        news.status
                                    )}
                                </span>


                                {news.category && (
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white">

                                        <Tag className="h-3.5 w-3.5" />

                                        {news.category}

                                    </span>
                                )}

                            </div>


                            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">

                                {/* HERO CONTENT */}

                                <div>

                                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-green-200">
                                        News Article
                                    </p>


                                    <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                        {news.title}
                                    </h2>


                                    {news.summary && (
                                        <p className="mt-5 max-w-3xl text-sm leading-7 text-green-100/80 sm:text-base">
                                            {news.summary}
                                        </p>
                                    )}


                                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-green-100/80">

                                        {news.author && (
                                            <div className="flex items-center gap-2">

                                                <User className="h-4 w-4 text-green-200" />

                                                <span>
                                                    By{" "}

                                                    <span className="font-semibold text-white">
                                                        {news.author}
                                                    </span>
                                                </span>

                                            </div>
                                        )}


                                        {news.published_date && (
                                            <div className="flex items-center gap-2">

                                                <CalendarDays className="h-4 w-4 text-green-200" />

                                                <span>
                                                    {formatDate(
                                                        news.published_date
                                                    )}
                                                </span>

                                            </div>
                                        )}

                                    </div>

                                </div>


                                {/* FEATURED IMAGE */}

                                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-2">

                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={
                                                news.title ||
                                                "News image"
                                            }
                                            className="h-56 w-full rounded-2xl object-cover lg:h-64"
                                            onError={(
                                                event
                                            ) => {
                                                event.currentTarget.style.display =
                                                    "none"
                                            }}
                                        />
                                    ) : (
                                        <div className="flex h-56 w-full items-center justify-center rounded-2xl bg-white/10 lg:h-64">

                                            <div className="text-center">

                                                <ImageIcon className="mx-auto h-10 w-10 text-green-200" />

                                                <p className="mt-3 text-sm font-medium text-green-100">
                                                    No featured image
                                                </p>

                                            </div>

                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* QUICK INFORMATION */}

                    <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

                        <QuickInfo
                            icon={
                                <Tag className="h-5 w-5" />
                            }
                            label="Category"
                            value={
                                news.category ||
                                "—"
                            }
                        />


                        <QuickInfo
                            icon={
                                <User className="h-5 w-5" />
                            }
                            label="Author"
                            value={
                                news.author ||
                                "—"
                            }
                        />


                        <QuickInfo
                            icon={
                                <CalendarDays className="h-5 w-5" />
                            }
                            label="Published"
                            value={formatDate(
                                news.published_date
                            )}
                        />


                        <QuickInfo
                            icon={
                                <CheckCircle2 className="h-5 w-5" />
                            }
                            label="Status"
                            value={getStatusLabel(
                                news.status
                            )}
                        />

                    </div>

                </div>


                {/* MAIN CONTENT */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

                    {/* LEFT */}

                    <div className="space-y-6">

                        {/* ARTICLE SUMMARY */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <SectionHeader
                                icon={
                                    <FileText className="h-5 w-5" />
                                }
                                title="Article Summary"
                                description="The short summary associated with this news article."
                            />


                            <div className="mt-6 rounded-2xl bg-gray-50 p-5">

                                {news.summary ? (
                                    <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                        {news.summary}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No summary has been added.
                                    </p>
                                )}

                            </div>

                        </section>


                        {/* ARTICLE CONTENT */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <SectionHeader
                                icon={
                                    <FileText className="h-5 w-5" />
                                }
                                title="Article Content"
                                description="Complete content of the news article."
                            />


                            <div className="mt-6 rounded-2xl bg-gray-50 p-5">

                                {news.content ? (
                                    <p className="whitespace-pre-line text-sm leading-8 text-gray-600">
                                        {news.content}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No article content has been added.
                                    </p>
                                )}

                            </div>

                        </section>


                        {/* FEATURED IMAGE */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <SectionHeader
                                icon={
                                    <ImageIcon className="h-5 w-5" />
                                }
                                title="Featured Image"
                                description="Image associated with this news article."
                            />


                            <div className="mt-6 overflow-hidden rounded-2xl bg-gray-50">

                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={
                                            news.title ||
                                            "News image"
                                        }
                                        className="max-h-[520px] w-full object-cover"
                                        onError={(
                                            event
                                        ) => {
                                            event.currentTarget.style.display =
                                                "none"
                                        }}
                                    />
                                ) : (
                                    <div className="flex min-h-64 items-center justify-center">

                                        <div className="text-center">

                                            <ImageIcon className="mx-auto h-10 w-10 text-gray-300" />

                                            <p className="mt-3 text-sm text-gray-400">
                                                No featured image has been added.
                                            </p>

                                        </div>

                                    </div>
                                )}

                            </div>

                        </section>

                    </div>


                    {/* SIDEBAR */}

                    <aside className="space-y-6">

                        {/* ARTICLE INFORMATION */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <h2 className="font-bold text-gray-900">
                                Article Information
                            </h2>


                            <div className="mt-5 space-y-4">

                                <SidebarInfo
                                    icon={
                                        <Tag className="h-4 w-4" />
                                    }
                                    label="Category"
                                    value={
                                        news.category ||
                                        "—"
                                    }
                                />


                                <SidebarInfo
                                    icon={
                                        <User className="h-4 w-4" />
                                    }
                                    label="Author"
                                    value={
                                        news.author ||
                                        "—"
                                    }
                                />


                                <SidebarInfo
                                    icon={
                                        <CalendarDays className="h-4 w-4" />
                                    }
                                    label="Published Date"
                                    value={formatDate(
                                        news.published_date
                                    )}
                                />


                                <SidebarInfo
                                    icon={
                                        <CheckCircle2 className="h-4 w-4" />
                                    }
                                    label="Status"
                                    value={getStatusLabel(
                                        news.status
                                    )}
                                />

                            </div>

                        </section>


                        {/* PUBLISHING INFORMATION */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <h2 className="font-bold text-gray-900">
                                Publishing Information
                            </h2>


                            <div className="mt-5 space-y-4">

                                <SidebarInfo
                                    icon={
                                        <CalendarDays className="h-4 w-4" />
                                    }
                                    label="Publication Date"
                                    value={formatDate(
                                        news.published_date
                                    )}
                                />


                                <SidebarInfo
                                    icon={
                                        <CalendarDays className="h-4 w-4" />
                                    }
                                    label="Publication Time"
                                    value={formatTime(
                                        news.published_date
                                    )}
                                />


                                <SidebarInfo
                                    icon={
                                        <Info className="h-4 w-4" />
                                    }
                                    label="Created"
                                    value={formatDateTime(
                                        news.created_at
                                    )}
                                />


                                <SidebarInfo
                                    icon={
                                        <Info className="h-4 w-4" />
                                    }
                                    label="Last Updated"
                                    value={formatDateTime(
                                        news.updated_at
                                    )}
                                />

                            </div>

                        </section>


                        {/* PUBLICATION STATUS */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex items-start gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">

                                    <CheckCircle2 className="h-5 w-5" />

                                </div>


                                <div>

                                    <h2 className="font-bold text-gray-900">
                                        Publication Status
                                    </h2>


                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Current publishing state of this news
                                        article.
                                    </p>

                                </div>

                            </div>


                            <div className="mt-5">

                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                                        news.status
                                    )}`}
                                >

                                    <CheckCircle2 className="h-3.5 w-3.5" />

                                    {getStatusLabel(
                                        news.status
                                    )}

                                </span>

                            </div>

                        </section>


                        {/* EDIT */}

                        <div className="hidden rounded-3xl border border-green-100 bg-green-50/60 p-5 sm:block">

                            <p className="text-sm font-semibold text-green-900">
                                Need to update this article?
                            </p>


                            <p className="mt-1 text-xs leading-5 text-green-800/80">
                                Update the title, content, publishing details
                                or featured image when required.
                            </p>


                            <Link
                                to={`/admin/content/news/${news.id}/edit`}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <Edit3 className="h-4 w-4" />

                                Edit News
                            </Link>

                        </div>

                    </aside>

                </div>


                {/* BOTTOM ACTIONS */}

                <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                    <Link
                        to="/admin/content/news"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />

                        Back to News
                    </Link>


                    <Link
                        to={`/admin/content/news/${news.id}/edit`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 className="h-4 w-4" />

                        Edit News
                    </Link>

                </div>

            </div>

        </section>
    )
}


const QuickInfo = ({
    icon,
    label,
    value,
}) => {
    return (
        <div className="flex items-center gap-3 px-6 py-5">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                {icon}
            </div>


            <div className="min-w-0">

                <p className="text-xs text-gray-400">
                    {label}
                </p>


                <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                    {value}
                </p>

            </div>

        </div>
    )
}


const SectionHeader = ({
    icon,
    title,
    description,
}) => {
    return (
        <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                {icon}
            </div>


            <div>

                <h2 className="font-bold text-gray-900">
                    {title}
                </h2>


                <p className="mt-1 text-xs leading-5 text-gray-500">
                    {description}
                </p>

            </div>

        </div>
    )
}


const SidebarInfo = ({
    icon,
    label,
    value,
}) => {
    return (
        <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                {icon}
            </div>


            <div className="min-w-0">

                <p className="text-xs text-gray-400">
                    {label}
                </p>


                <p className="mt-1 wrap-break-words text-sm font-semibold leading-6 text-gray-800">
                    {value || "—"}
                </p>

            </div>

        </div>
    )
}


export default NewsDetails