import { Link } from "react-router-dom"

import {
    CalendarDays,
    Clock3,
    MapPin,
    Users,
} from "lucide-react"

import TrainingFallback from "./TrainingFallback"

const formatDate = (value) => {
    if (!value) return "Date not specified"

    const stringValue = String(value)

    const match = stringValue.match(
        /^(\d{4})-(\d{2})-(\d{2})/
    )

    if (match) {
        const [, year, month, day] = match

        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        )

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "Date not specified"
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const formatTime = (value) => {
    if (!value) return null

    const [hours, minutes] = String(value).split(":")

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

const formatTimeRange = (
    startTime,
    endTime
) => {
    if (!startTime && !endTime) {
        return null
    }

    if (startTime && endTime) {
        return `${formatTime(startTime)} - ${formatTime(
            endTime
        )}`
    }

    return formatTime(startTime || endTime)
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

const TrainingGrid = ({
    trainingEvents = [],
}) => {
    return (
        <section className="px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">


                {/* Empty State */}
                {trainingEvents.length === 0 ? (
                    <TrainingFallback
                        title="No Training & Events Found"
                        message="There are currently no training programs or events matching your search and filters."
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {trainingEvents.map(
                            (event) => (
                                <article
                                    key={event.id}
                                    className="kr-hover-card group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5"
                                >
                                    {/* Top */}
                                    <div className="p-6">

                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                <CalendarDays className="h-6 w-6" />
                                            </div>

                                            <span
                                                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                                    event.status
                                                )}`}
                                            >
                                                {formatStatus(
                                                    event.status
                                                )}
                                            </span>
                                        </div>

                                        {/* Type */}
                                        {event.training_type && (
                                            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                                                {
                                                    event.training_type
                                                }
                                            </p>
                                        )}

                                        {/* Title */}
                                        <h3 className="kr-hover-title mt-2 line-clamp-2 text-xl font-bold leading-7 text-gray-900">
                                            {
                                                event.title
                                            }
                                        </h3>

                                        {/* Description */}
                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                            {
                                                event.description
                                            }
                                        </p>

                                        {/* Details */}
                                        <div className="mt-6 space-y-3">

                                            {/* Date */}
                                            <div className="flex items-start gap-3">
                                                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />

                                                <div>
                                                    <p className="text-xs font-medium text-gray-400">
                                                        Date
                                                    </p>

                                                    <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                                        {formatDate(
                                                            event.start_date
                                                        )}

                                                        {event.end_date &&
                                                            String(
                                                                event.end_date
                                                            ).slice(
                                                                0,
                                                                10
                                                            ) !==
                                                                String(
                                                                    event.start_date
                                                                ).slice(
                                                                    0,
                                                                    10
                                                                ) && (
                                                                <>
                                                                    {" "}
                                                                    -{" "}
                                                                    {formatDate(
                                                                        event.end_date
                                                                    )}
                                                                </>
                                                            )}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Time */}
                                            {(
                                                event.start_time ||
                                                event.end_time
                                            ) && (
                                                <div className="flex items-start gap-3">
                                                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />

                                                    <div>
                                                        <p className="text-xs font-medium text-gray-400">
                                                            Time
                                                        </p>

                                                        <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                                            {formatTimeRange(
                                                                event.start_time,
                                                                event.end_time
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Location */}
                                            {(
                                                event.location ||
                                                event.venue
                                            ) && (
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />

                                                    <div>
                                                        <p className="text-xs font-medium text-gray-400">
                                                            Location
                                                        </p>

                                                        <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                                            {event.location ||
                                                                event.venue}
                                                        </p>

                                                        {event.location &&
                                                            event.venue && (
                                                                <p className="mt-0.5 text-xs text-gray-500">
                                                                    {
                                                                        event.venue
                                                                    }
                                                                </p>
                                                            )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Capacity */}
                                            {event.capacity !==
                                                null &&
                                                event.capacity !==
                                                    undefined && (
                                                    <div className="flex items-start gap-3">
                                                        <Users className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />

                                                        <div>
                                                            <p className="text-xs font-medium text-gray-400">
                                                                Capacity
                                                            </p>

                                                            <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                                                {
                                                                    event.capacity
                                                                }{" "}
                                                                participants
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>

                                    {/* Bottom */}
                                    <div className="mt-auto border-t border-gray-100 bg-gray-50/70 px-6 py-4">
                                        <div className="flex items-center justify-between gap-4">

                                            <div className="min-w-0">
                                                {event.registration_enabled ===
                                                    1 ? (
                                                    <p className="text-xs font-semibold text-green-700">
                                                        Registration
                                                        available
                                                    </p>
                                                ) : (
                                                    <p className="text-xs font-medium text-gray-500">
                                                        Registration
                                                        unavailable
                                                    </p>
                                                )}
                                            </div>

                                            <Link
                                                to={`/training-events/${event.slug}`}
                                                className="kr-hover-link shrink-0 text-sm font-bold text-green-700"
                                            >
                                                View Details
                                                <span className="ml-1">
                                                    →
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default TrainingGrid