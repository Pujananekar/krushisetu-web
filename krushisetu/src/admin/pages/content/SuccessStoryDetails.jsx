import { Link, useParams } from "react-router-dom"

import { useQuery } from "@tanstack/react-query"

import {
    ArrowLeft,
    CheckCircle2,
    Edit3,
    FileText,
    Image,
    MapPin,
    Quote,
    ShieldCheck,
    Star,
    UserRound,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import axiosInstance from "../../../api/axiosInstance.js"
import { getAdminSuccessStoryById } from "../../api/adminSuccessStoriesApi.js"


const formatStatus = (status) => {
    if (!status) return "—"

    return (
        status.charAt(0) +
        status.slice(1).toLowerCase()
    )
}


const formatConsentStatus = (status) => {
    if (!status) return "—"

    if (status === "NOT_REQUIRED") {
        return "Not Required"
    }

    return (
        status.charAt(0) +
        status.slice(1).toLowerCase()
    )
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


const getConsentClasses = (status) => {
    switch (status) {
        case "RECEIVED":
            return "border-green-200 bg-green-50 text-green-700"

        case "PENDING":
            return "border-amber-200 bg-amber-50 text-amber-700"

        case "NOT_REQUIRED":
            return "border-gray-200 bg-gray-50 text-gray-600"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}


/*
|--------------------------------------------------------------------------
| Media URL Helper
|--------------------------------------------------------------------------
|
| Database stores paths such as:
|
| /uploads/gallery/example.jpg
|
| The browser must request these files from the backend server,
| not from the React/Vite frontend server.
|
*/

const getApiOrigin = () => {
    const baseURL =
        axiosInstance?.defaults?.baseURL ||
        ""

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

    /*
    | Full external URL
    */
    if (
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("blob:") ||
        url.startsWith("data:")
    ) {
        return url
    }

    /*
    | Relative upload path
    |
    | /uploads/gallery/example.jpg
    |        ↓
    | http://localhost:3000/uploads/gallery/example.jpg
    */
    const normalizedUrl = url.startsWith("/")
        ? url
        : `/${url}`

    return `${getApiOrigin()}${normalizedUrl}`
}


const SuccessStoryDetails = () => {
    const { id } = useParams()

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: [
            "admin-success-story",
            id,
        ],

        queryFn: () =>
            getAdminSuccessStoryById(id),

        enabled: Boolean(id),
    })


    const story =
        data?.successStory ||
        data?.success_story ||
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
    | Error
    |--------------------------------------------------------------------------
    */

    if (isError || !story) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1400px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <Star className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load success story
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                "The requested success story could not be found."}
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">

                            <button
                                type="button"
                                onClick={() =>
                                    refetch()
                                }
                                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Try Again
                            </button>

                            <Link
                                to="/admin/content/success-stories"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <ArrowLeft className="h-4 w-4" />

                                Back to Success Stories
                            </Link>

                        </div>

                    </div>
                </div>
            </section>
        )
    }


    /*
    |--------------------------------------------------------------------------
    | Resolved Media URL
    |--------------------------------------------------------------------------
    */

    const mediaUrl = resolveMediaUrl(
        story.media_url
    )


    /*
    |--------------------------------------------------------------------------
    | Main
    |--------------------------------------------------------------------------
    */

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-start gap-3">

                        <Link
                            to="/admin/content/success-stories"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
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
                                    Success Stories
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    Details
                                </span>

                            </div>


                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {story.title}
                            </h1>


                            <p className="mt-1 text-sm text-gray-500">
                                View the complete success story,
                                outcomes and publishing information.
                            </p>

                        </div>

                    </div>


                    <Link
                        to={`/admin/content/success-stories/${story.id}/edit`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 className="h-4 w-4" />

                        Edit Story
                    </Link>

                </div>


                {/* Hero */}

                <div className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10">

                    <div className="relative overflow-hidden bg-linear-to-br from-green-950 via-green-900 to-green-800 px-6 py-10 sm:px-8 lg:px-10 lg:py-12">

                        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-400/10 blur-3xl" />


                        <div className="relative">

                            <div className="flex flex-wrap items-center gap-3">

                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                                        story.status
                                    )}`}
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5" />

                                    {formatStatus(
                                        story.status
                                    )}
                                </span>


                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getConsentClasses(
                                        story.consent_status
                                    )}`}
                                >
                                    <ShieldCheck className="h-3.5 w-3.5" />

                                    Consent:{" "}

                                    {formatConsentStatus(
                                        story.consent_status
                                    )}
                                </span>

                            </div>


                            <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">

                                <div>

                                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-200">
                                        Success Story
                                    </p>


                                    <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                        {story.title}
                                    </h2>


                                    <div className="mt-5 flex flex-col gap-2 text-sm text-green-100/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">

                                        {story.beneficiary_name && (
                                            <span className="inline-flex items-center gap-2">
                                                <UserRound className="h-4 w-4" />

                                                {
                                                    story.beneficiary_name
                                                }
                                            </span>
                                        )}


                                        {story.location && (
                                            <span className="inline-flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />

                                                {story.location}
                                            </span>
                                        )}

                                    </div>

                                </div>


                                {mediaUrl && (
                                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-2">

                                        <img
                                            src={mediaUrl}
                                            alt={story.title}
                                            className="h-56 w-full rounded-2xl object-cover"
                                        />

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>


                    {/* Quick info */}

                    <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                        <QuickInfo
                            icon={
                                <UserRound className="h-5 w-5" />
                            }
                            label="Beneficiary"
                            value={
                                story.beneficiary_name ||
                                "—"
                            }
                        />


                        <QuickInfo
                            icon={
                                <MapPin className="h-5 w-5" />
                            }
                            label="Location"
                            value={
                                story.location ||
                                "—"
                            }
                        />


                        <QuickInfo
                            icon={
                                <ShieldCheck className="h-5 w-5" />
                            }
                            label="Publishing Permission"
                            value={
                                Number(
                                    story.publish_permission
                                ) === 1
                                    ? "Granted"
                                    : "Not Granted"
                            }
                        />

                    </div>

                </div>


                {/* Main content */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Left */}

                    <div className="space-y-6">

                        {/* Story */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <SectionHeader
                                icon={
                                    <FileText className="h-5 w-5" />
                                }
                                title="Story"
                                description="Complete beneficiary story."
                            />


                            <div className="mt-6 rounded-2xl bg-gray-50 p-5">

                                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {story.story}
                                </p>

                            </div>

                        </section>


                        {/* Outcomes */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <SectionHeader
                                icon={
                                    <CheckCircle2 className="h-5 w-5" />
                                }
                                title="Outcomes"
                                description="Documented results and outcomes from the story."
                            />


                            <div className="mt-6 rounded-2xl bg-gray-50 p-5">

                                {story.outcomes ? (
                                    <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                        {story.outcomes}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No outcomes have been added.
                                    </p>
                                )}

                            </div>

                        </section>


                        {/* Quote */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <SectionHeader
                                icon={
                                    <Quote className="h-5 w-5" />
                                }
                                title="Beneficiary Quote"
                                description="Approved quote associated with the success story."
                            />


                            <div className="mt-6 rounded-2xl bg-green-50 p-6">

                                {story.quote ? (
                                    <blockquote className="text-base font-medium leading-7 text-green-900">
                                        “{story.quote}”
                                    </blockquote>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No beneficiary quote has
                                        been added.
                                    </p>
                                )}

                            </div>

                        </section>


                        {/* Media */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <SectionHeader
                                icon={
                                    <Image className="h-5 w-5" />
                                }
                                title="Media"
                                description="Media associated with this success story."
                            />


                            <div className="mt-6">

                                {mediaUrl ? (
                                    <div className="space-y-4">

                                        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">

                                            <img
                                                src={mediaUrl}
                                                alt={story.title}
                                                className="max-h-[500px] w-full object-cover"
                                            />

                                        </div>


                                        <a
                                            href={mediaUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800"
                                        >
                                            <Image className="h-4 w-4" />

                                            Open Media
                                        </a>

                                    </div>
                                ) : (
                                    <div className="flex min-h-40 items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50">

                                        <div className="text-center">

                                            <Image className="mx-auto h-6 w-6 text-gray-300" />

                                            <p className="mt-2 text-sm text-gray-400">
                                                No media has been added.
                                            </p>

                                        </div>

                                    </div>
                                )}

                            </div>

                        </section>

                    </div>


                    {/* Sidebar */}

                    <aside className="space-y-6">

                        {/* Story information */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <h2 className="font-bold text-gray-900">
                                Story Information
                            </h2>


                            <div className="mt-5 space-y-4">

                                <SidebarInfo
                                    icon={
                                        <Star className="h-4 w-4" />
                                    }
                                    label="Title"
                                    value={story.title}
                                />


                                <SidebarInfo
                                    label="Slug"
                                    value={
                                        story.slug
                                            ? `/${story.slug}`
                                            : "—"
                                    }
                                />


                                <SidebarInfo
                                    icon={
                                        <UserRound className="h-4 w-4" />
                                    }
                                    label="Beneficiary"
                                    value={
                                        story.beneficiary_name ||
                                        "—"
                                    }
                                />


                                <SidebarInfo
                                    icon={
                                        <MapPin className="h-4 w-4" />
                                    }
                                    label="Location"
                                    value={
                                        story.location ||
                                        "—"
                                    }
                                />

                            </div>

                        </section>


                        {/* Consent */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex items-start gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>


                                <div>

                                    <h2 className="font-bold text-gray-900">
                                        Consent & Permission
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Publishing authorization for
                                        this story.
                                    </p>

                                </div>

                            </div>


                            <div className="mt-5 space-y-4">

                                <div>

                                    <p className="text-xs text-gray-400">
                                        Consent Status
                                    </p>


                                    <span
                                        className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getConsentClasses(
                                            story.consent_status
                                        )}`}
                                    >
                                        <ShieldCheck className="h-3.5 w-3.5" />

                                        {formatConsentStatus(
                                            story.consent_status
                                        )}
                                    </span>

                                </div>


                                <div>

                                    <p className="text-xs text-gray-400">
                                        Publishing Permission
                                    </p>


                                    <div className="mt-2">

                                        {Number(
                                            story.publish_permission
                                        ) === 1 ? (
                                            <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">

                                                <CheckCircle2 className="h-3.5 w-3.5" />

                                                Granted

                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                                                Not Granted
                                            </span>
                                        )}

                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* Status */}

                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <h2 className="font-bold text-gray-900">
                                Publication Status
                            </h2>


                            <div className="mt-5">

                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                                        story.status
                                    )}`}
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5" />

                                    {formatStatus(
                                        story.status
                                    )}
                                </span>

                            </div>

                        </section>


                        {/* Edit */}

                        <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">

                            <p className="text-sm font-semibold text-green-900">
                                Need to update this story?
                            </p>


                            <p className="mt-1 text-xs leading-5 text-green-800/80">
                                Update the story, outcomes, media or
                                publishing permissions.
                            </p>


                            <Link
                                to={`/admin/content/success-stories/${story.id}/edit`}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <Edit3 className="h-4 w-4" />

                                Edit Story
                            </Link>

                        </div>

                    </aside>

                </div>


                {/* Bottom Actions */}

                <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">

                    <Link
                        to="/admin/content/success-stories"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />

                        Back to Success Stories
                    </Link>


                    <Link
                        to={`/admin/content/success-stories/${story.id}/edit`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 className="h-4 w-4" />

                        Edit Story
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

                {icon || (
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                )}

            </div>


            <div className="min-w-0">

                <p className="text-xs text-gray-400">
                    {label}
                </p>


                <p className="mt-1 break-words text-sm font-semibold leading-6 text-gray-800">
                    {value || "—"}
                </p>

            </div>

        </div>
    )
}


export default SuccessStoryDetails