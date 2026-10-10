import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Edit3,
    FileText,
    GraduationCap,
    MapPin,
    Users,
    UserRound,
    XCircle,
} from "lucide-react"
import { useQuery } from "@tanstack/react-query"


import Loader from "../../../components/common/Loader"
import { getAdminTrainingEventById } from "../../api/adminTrainingEventsApi"

const getStatusClasses = (status) => {
    switch (status) {
        case "UPCOMING":
            return "bg-blue-50 text-blue-700 border-blue-200"

        case "ONGOING":
            return "bg-green-50 text-green-700 border-green-200"

        case "COMPLETED":
            return "bg-purple-50 text-purple-700 border-purple-200"

        case "CANCELLED":
            return "bg-red-50 text-red-700 border-red-200"

        default:
            return "bg-gray-50 text-gray-700 border-gray-200"
    }
}

const getStatusIcon = (status) => {
    switch (status) {
        case "UPCOMING":
            return <Clock3 className="h-4 w-4" />

        case "ONGOING":
            return <CheckCircle2 className="h-4 w-4" />

        case "COMPLETED":
            return <CheckCircle2 className="h-4 w-4" />

        case "CANCELLED":
            return <XCircle className="h-4 w-4" />

        default:
            return null
    }
}

const formatStatus = (status) => {
    if (!status) return "Unknown"

    return status
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        )
}

const formatDate = (date) => {
    if (!date) return "—"

    return new Date(`${String(date).slice(0, 10)}T00:00:00`).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    )
}

const formatTime = (time) => {
    if (!time) return "—"

    const [hours, minutes] = String(time)
        .slice(0, 5)
        .split(":")

    const date = new Date()

    date.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
    )

    return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    })
}

const formatDateRange = (startDate, endDate) => {
    if (!startDate) return "—"

    if (
        !endDate ||
        String(startDate).slice(0, 10) ===
            String(endDate).slice(0, 10)
    ) {
        return formatDate(startDate)
    }

    return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

const formatTimeRange = (startTime, endTime) => {
    if (!startTime && !endTime) return "—"

    if (startTime && endTime) {
        return `${formatTime(startTime)} - ${formatTime(endTime)}`
    }

    return formatTime(startTime || endTime)
}

const formatDateTime = (value) => {
    if (!value) return "—"

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "—"
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

const TrainingEventDetails = () => {
    const { id } = useParams()

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["admin-training-event", id],
        queryFn: () => getAdminTrainingEventById(id),
        enabled: Boolean(id),
    })

    const event = data?.trainingEvent

    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading training event..."
            />
        )
    }

    if (isError || !event) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-375 items-center justify-center">
                    <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-gray-900/5">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <XCircle className="h-7 w-7" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load training event
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                            The requested training event could not
                            be found or could not be loaded.
                        </p>

                        <div className="mt-5 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Try Again
                            </button>

                            <Link
                                to="/admin/content/training"
                                className="inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Training & Events
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-375 space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/training"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            title="Back to Training & Events"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                                <GraduationCap className="h-4 w-4" />

                                <span>
                                    Training & Events
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    Details
                                </span>
                            </div>

                            <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {event.title}
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700">
                                    <GraduationCap className="h-3.5 w-3.5" />
                                    {event.training_type || "Training"}
                                </span>

                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                                        event.status
                                    )}`}
                                >
                                    {getStatusIcon(
                                        event.status
                                    )}

                                    {formatStatus(
                                        event.status
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Link
                        to={`/admin/content/training/${event.id}/edit`}
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 className="h-4 w-4" />
                        Edit
                    </Link>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Main Content */}
                    <div className="space-y-6">

                        {/* Description */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <FileText className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Description
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Training or event information.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5">
                                <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                                    {event.description ||
                                        "No description available."}
                                </p>
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <CalendarDays className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Schedule
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Date and timing information.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        <CalendarDays className="h-4 w-4" />
                                        Date
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {formatDateRange(
                                            event.start_date,
                                            event.end_date
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        <Clock3 className="h-4 w-4" />
                                        Time
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {formatTimeRange(
                                            event.start_time,
                                            event.end_time
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <MapPin className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Location
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Venue and location information.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Venue
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {event.venue || "—"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Location
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {event.location || "—"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Organiser & Trainer */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <UserRound className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Organiser & Trainer
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Event organiser and trainer information.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Organiser
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {event.organiser || "—"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Trainer
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {event.trainer || "—"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Registration */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6 flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Users className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-gray-900">
                                        Registration
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Registration and capacity information.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Capacity
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {event.capacity ??
                                            "—"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Registration
                                    </p>

                                    <p
                                        className={`mt-2 text-sm font-semibold ${
                                            event.registration_enabled
                                                ? "text-green-700"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {event.registration_enabled
                                            ? "Enabled"
                                            : "Disabled"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Registration Period
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {event.registration_open ||
                                        event.registration_close
                                            ? `${formatDate(
                                                  event.registration_open
                                              )} - ${formatDate(
                                                  event.registration_close
                                              )}`
                                            : "—"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* Status */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Event Status
                            </p>

                            <div
                                className={`mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold ${getStatusClasses(
                                    event.status
                                )}`}
                            >
                                {getStatusIcon(event.status)}

                                {formatStatus(event.status)}
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-5">
                                <h2 className="text-base font-bold text-gray-900">
                                    Event Details
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Basic information stored for this event.
                                </p>
                            </div>

                            <div className="space-y-4">

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Training Type
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {event.training_type || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Slug
                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium text-gray-700">
                                        {event.slug || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Event ID
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        #{event.id}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900">
                                Record Information
                            </h2>

                            <div className="mt-5 space-y-4">

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Created
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {formatDateTime(
                                            event.created_at
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Last Updated
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {formatDateTime(
                                            event.updated_at
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Edit */}
                        <div className="rounded-3xl border border-green-100 bg-green-50/70 p-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <Edit3 className="h-5 w-5" />
                            </div>

                            <h2 className="mt-4 text-sm font-bold text-green-900">
                                Need to make changes?
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-green-800/70">
                                Edit the event information and save
                                the changes directly.
                            </p>

                            <Link
                                to={`/admin/content/training/${event.id}/edit`}
                                className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit Event
                            </Link>
                        </div>
                    </aside>
                </div>

                {/* Bottom Navigation */}
                <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        to="/admin/content/training"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Training & Events
                    </Link>

                    <Link
                        to={`/admin/content/training/${event.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 className="h-4 w-4" />
                        Edit Event
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TrainingEventDetails