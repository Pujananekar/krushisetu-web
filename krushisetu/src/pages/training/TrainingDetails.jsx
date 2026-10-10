import { useQuery } from "@tanstack/react-query"
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    MapPin,
    Users,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { getTrainingEventBySlug } from "../../api/trainingEventsApi.js"
import Loader from "../../components/common/Loader"
import TrainingFallback from "../../components/training/TrainingFallback"


const formatDate = (value) => {
    if (!value) {
        return null
    }

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

        if (Number.isNaN(date.getTime())) {
            return null
        }

        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date)
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return null
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date)
}

const formatTime = (value) => {
    if (!value) {
        return null
    }

    const [hours, minutes] = String(value).split(":")

    const date = new Date()

    date.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
    )

    if (Number.isNaN(date.getTime())) {
        return null
    }

    return new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
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

const formatDateRange = (
    startDate,
    endDate
) => {
    const formattedStart = formatDate(startDate)

    if (!formattedStart) {
        return null
    }

    if (!endDate) {
        return formattedStart
    }

    const start = String(startDate).slice(0, 10)
    const end = String(endDate).slice(0, 10)

    if (start === end) {
        return formattedStart
    }

    const formattedEnd = formatDate(endDate)

    if (!formattedEnd) {
        return formattedStart
    }

    return `${formattedStart} - ${formattedEnd}`
}

const formatStatus = (status) => {
    if (!status) {
        return "Unknown"
    }

    return status
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        )
}

const statusStyles = {
    UPCOMING:
        "border-blue-200 bg-blue-50 text-blue-700",
    ONGOING:
        "border-green-200 bg-green-50 text-green-700",
    COMPLETED:
        "border-purple-200 bg-purple-50 text-purple-700",
    CANCELLED:
        "border-red-200 bg-red-50 text-red-700",
}

const DetailItem = ({ label, value }) => {
    if (!value) {
        return null
    }

    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-700">
                {value}
            </p>
        </div>
    )
}

const InfoSection = ({
    icon,
    eyebrow,
    title,
    children,
}) => {
    return (
        <section className="rounded-4xl border border-gray-200 bg-white p-7 shadow-lg shadow-gray-900/5 sm:p-8">
            <div className="flex items-center gap-3">
                <div className="kr-hover-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    {icon}
                </div>

                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
                        {eyebrow}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-950">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="mt-6">
                {children}
            </div>
        </section>
    )
}

const TrainingDetails = () => {
    const { slug } = useParams()

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["training-event", slug],
        queryFn: () => getTrainingEventBySlug(slug),
        enabled: Boolean(slug),
    })

    const trainingEvent = data?.trainingEvent

    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading training details..."
            />
        )
    }

    if (isError || !trainingEvent) {
        return (
            <main className="min-h-screen bg-[#F6FAF7] px-6 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-350">
                    <Link
                        to="/training-events"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-green-800"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        Back to Training & Events
                    </Link>

                    <div className="mt-8">
                        <TrainingFallback
                            title="Training Program Not Found"
                            message="The requested training program or event could not be found."
                        />
                    </div>

                    {isError && (
                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="kr-hover-button rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </main>
        )
    }

    const statusClass =
        statusStyles[trainingEvent.status] ??
        "border-gray-200 bg-gray-100 text-gray-600"

    const dateRange = formatDateRange(
        trainingEvent.start_date,
        trainingEvent.end_date
    )

    const timeRange = formatTimeRange(
        trainingEvent.start_time,
        trainingEvent.end_time
    )

    const registrationOpen = formatDate(
        trainingEvent.registration_open
    )

    const registrationClose = formatDate(
        trainingEvent.registration_close
    )

    return (
        <main className="min-h-screen bg-[#F6FAF7] px-6 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">

                {/* Back */}
                <Link
                    to="/training-events"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-green-800"
                >
                    <ArrowLeft
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />

                    Back to Training & Events
                </Link>

                {/* Hero */}
                <section className="relative mt-8 overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/95 p-7 shadow-xl shadow-gray-900/10 sm:p-10 lg:p-12">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-100/60" />

                    <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-emerald-100/40" />

                    <div className="relative">

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="kr-hover-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/10">
                                <CalendarDays
                                    size={24}
                                    strokeWidth={2}
                                />
                            </div>

                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                                Training & Event
                            </span>

                            {trainingEvent.status && (
                                <span
                                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${statusClass}`}
                                >
                                    {formatStatus(
                                        trainingEvent.status
                                    )}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-7 max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            {trainingEvent.title}
                        </h1>

                        <div className="mt-6 h-1 w-20 rounded-full bg-green-600" />

                        <p className="mt-6 max-w-4xl whitespace-pre-line text-lg leading-8 text-gray-600">
                            {trainingEvent.description}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {trainingEvent.training_type && (
                                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                                    {
                                        trainingEvent.training_type
                                    }
                                </span>
                            )}

                            {trainingEvent.location && (
                                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                                    {trainingEvent.location}
                                </span>
                            )}

                            {trainingEvent.organiser && (
                                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                                    {trainingEvent.organiser}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">

                    {/* Left Content */}
                    <div className="space-y-6">

                        {/* Program Information */}
                        <InfoSection
                            icon={
                                <CheckCircle2
                                    size={21}
                                />
                            }
                            eyebrow="Program Information"
                            title="Training & Event Details"
                        >
                            <div className="grid gap-6 sm:grid-cols-2">

                                {dateRange && (
                                    <div className="flex items-start gap-3">
                                        <CalendarDays
                                            size={18}
                                            className="mt-0.5 shrink-0 text-green-700"
                                        />

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Date
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-gray-700">
                                                {dateRange}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {timeRange && (
                                    <div className="flex items-start gap-3">
                                        <Clock3
                                            size={18}
                                            className="mt-0.5 shrink-0 text-green-700"
                                        />

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Time
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-gray-700">
                                                {timeRange}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {(
                                    trainingEvent.location ||
                                    trainingEvent.venue
                                ) && (
                                    <div className="flex items-start gap-3">
                                        <MapPin
                                            size={18}
                                            className="mt-0.5 shrink-0 text-green-700"
                                        />

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Location
                                            </p>

                                            {trainingEvent.location && (
                                                <p className="mt-1 text-sm leading-6 text-gray-700">
                                                    {
                                                        trainingEvent.location
                                                    }
                                                </p>
                                            )}

                                            {trainingEvent.venue && (
                                                <p className="text-xs leading-5 text-gray-500">
                                                    {
                                                        trainingEvent.venue
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {trainingEvent.capacity !==
                                    null &&
                                    trainingEvent.capacity !==
                                        undefined && (
                                        <div className="flex items-start gap-3">
                                            <Users
                                                size={18}
                                                className="mt-0.5 shrink-0 text-green-700"
                                            />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Capacity
                                                </p>

                                                <p className="mt-1 text-sm leading-6 text-gray-700">
                                                    {
                                                        trainingEvent.capacity
                                                    }{" "}
                                                    participants
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                {trainingEvent.organiser && (
                                    <DetailItem
                                        label="Organiser"
                                        value={
                                            trainingEvent.organiser
                                        }
                                    />
                                )}

                                {trainingEvent.trainer && (
                                    <DetailItem
                                        label="Trainer"
                                        value={
                                            trainingEvent.trainer
                                        }
                                    />
                                )}
                            </div>
                        </InfoSection>

                        {/* Description */}
                        <InfoSection
                            icon={
                                <CalendarDays
                                    size={21}
                                />
                            }
                            eyebrow="About The Program"
                            title="About This Training & Event"
                        >
                            <p className="whitespace-pre-line text-base leading-8 text-gray-600">
                                {trainingEvent.description}
                            </p>
                        </InfoSection>

                        {/* Registration Timeline */}
                        {(registrationOpen ||
                            registrationClose) && (
                            <InfoSection
                                icon={
                                    <Clock3
                                        size={21}
                                    />
                                }
                                eyebrow="Registration Timeline"
                                title="Registration Dates"
                            >
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {registrationOpen && (
                                        <DetailItem
                                            label="Registration Opens"
                                            value={
                                                registrationOpen
                                            }
                                        />
                                    )}

                                    {registrationClose && (
                                        <DetailItem
                                            label="Registration Closes"
                                            value={
                                                registrationClose
                                            }
                                        />
                                    )}
                                </div>
                            </InfoSection>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* Event Information */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                            <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                                Event Information
                            </p>

                            <div className="mt-6 space-y-5">

                                {trainingEvent.training_type && (
                                    <DetailItem
                                        label="Program Type"
                                        value={
                                            trainingEvent.training_type
                                        }
                                    />
                                )}

                                {trainingEvent.organiser && (
                                    <DetailItem
                                        label="Organiser"
                                        value={
                                            trainingEvent.organiser
                                        }
                                    />
                                )}

                                {trainingEvent.trainer && (
                                    <DetailItem
                                        label="Trainer"
                                        value={
                                            trainingEvent.trainer
                                        }
                                    />
                                )}

                                {trainingEvent.capacity !==
                                    null &&
                                    trainingEvent.capacity !==
                                        undefined && (
                                        <DetailItem
                                            label="Capacity"
                                            value={`${trainingEvent.capacity} participants`}
                                        />
                                    )}

                                {trainingEvent.venue && (
                                    <DetailItem
                                        label="Venue"
                                        value={
                                            trainingEvent.venue
                                        }
                                    />
                                )}

                                {trainingEvent.location && (
                                    <div className="border-t border-gray-100 pt-5">
                                        <div className="flex items-start gap-3">
                                            <MapPin
                                                size={17}
                                                className="mt-0.5 shrink-0 text-green-700"
                                            />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Location
                                                </p>

                                                <p className="mt-1 text-sm leading-6 text-gray-700">
                                                    {
                                                        trainingEvent.location
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Important Dates */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <CalendarDays
                                        size={19}
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-gray-950">
                                        Important Dates
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Program timeline
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-5">
                                <DetailItem
                                    label="Event Date"
                                    value={
                                        dateRange ??
                                        "Not specified"
                                    }
                                />

                                <DetailItem
                                    label="Registration Opens"
                                    value={
                                        registrationOpen ??
                                        "Not specified"
                                    }
                                />

                                <DetailItem
                                    label="Registration Closes"
                                    value={
                                        registrationClose ??
                                        "Not specified"
                                    }
                                />
                            </div>
                        </div>

                        {/* Registration */}
                        <div className="rounded-4xl border border-green-100 bg-green-50/70 p-6">
                            <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-800">
                                Registration
                            </p>

                            {trainingEvent.registration_enabled ===
                            1 ? (
                                <>
                                    <p className="mt-3 text-sm leading-6 text-green-900/70">
                                        Registration is available
                                        for this training or
                                        event.
                                    </p>

                                    <Link
                                        to="/apply/training"
                                        className="kr-hover-button mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                                    >
                                        Apply for Training
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="mt-3 text-sm leading-6 text-green-900/70">
                                        Registration is currently
                                        unavailable for this
                                        training or event.
                                    </p>

                                    <div className="mt-5 rounded-2xl bg-white/70 px-4 py-3 text-center">
                                        <p className="text-sm font-semibold text-gray-600">
                                            Registration Closed
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default TrainingDetails