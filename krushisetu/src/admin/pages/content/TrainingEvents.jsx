import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import {
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Edit3,
    Eye,
    Filter,
    GraduationCap,
    MapPin,
    Plus,
    Search,
    XCircle,
} from "lucide-react"

import { useQuery } from "@tanstack/react-query"

import { getAdminTrainingEvents } from "../../api/adminTrainingEventsApi"
import Loader from "../../../components/common/Loader"

const eventStatuses = [
    "UPCOMING",
    "ONGOING",
    "COMPLETED",
    "CANCELLED",
]

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
            return <Clock3 className="h-3.5 w-3.5" />

        case "ONGOING":
            return <CheckCircle2 className="h-3.5 w-3.5" />

        case "COMPLETED":
            return <CheckCircle2 className="h-3.5 w-3.5" />

        case "CANCELLED":
            return <XCircle className="h-3.5 w-3.5" />

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

/*
 * Safely parse MySQL DATE values.
 *
 * Example:
 * 2026-10-03
 *
 * We parse the individual year/month/day values so
 * the frontend does not incorrectly interpret the date.
 */
const parseDateOnly = (value) => {
    if (!value) return null

    if (value instanceof Date) {
        return Number.isNaN(value.getTime())
            ? null
            : value
    }

    const stringValue = String(value).trim()

    const match = stringValue.match(
        /^(\d{4})-(\d{2})-(\d{2})/
    )

    if (match) {
        const [, year, month, day] = match

        const parsedDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        )

        return Number.isNaN(parsedDate.getTime())
            ? null
            : parsedDate
    }

    const parsedDate = new Date(stringValue)

    return Number.isNaN(parsedDate.getTime())
        ? null
        : parsedDate
}

const getDateKey = (value) => {
    const parsedDate = parseDateOnly(value)

    if (!parsedDate) return ""

    return `${parsedDate.getFullYear()}-${String(
        parsedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(
        parsedDate.getDate()
    ).padStart(2, "0")}`
}

const formatDate = (date) => {
    const parsedDate = parseDateOnly(date)

    if (!parsedDate) {
        return "Date not specified"
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const formatTime = (time) => {
    if (!time) return ""

    const [hours, minutes] = String(time).split(":")

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

const formatTimeRange = (startTime, endTime) => {
    if (!startTime && !endTime) {
        return "Time not specified"
    }

    if (startTime && endTime) {
        return `${formatTime(startTime)} - ${formatTime(
            endTime
        )}`
    }

    return formatTime(startTime || endTime)
}

const formatDateRange = (startDate, endDate) => {
    if (!startDate) {
        return "Date not specified"
    }

    if (
        !endDate ||
        getDateKey(startDate) === getDateKey(endDate)
    ) {
        return formatDate(startDate)
    }

    return `${formatDate(startDate)} - ${formatDate(
        endDate
    )}`
}

const getEventTypes = (events) => {
    return [
        ...new Set(
            events
                .map((event) => event.training_type)
                .filter(Boolean)
        ),
    ].sort()
}

const TrainingEvents = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [typeFilter, setTypeFilter] = useState("All")
    const [page, setPage] = useState(1)

    const pageSize = 6

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["admin-training-events"],
        queryFn: getAdminTrainingEvents,
    })

    const trainingEvents =
        data?.trainingEvents ?? []

    const eventTypes = useMemo(
        () => getEventTypes(trainingEvents),
        [trainingEvents]
    )

    const filteredEvents = useMemo(() => {
        const searchValue = search
            .toLowerCase()
            .trim()

        return trainingEvents.filter((event) => {
            const matchesSearch =
                !searchValue ||
                event.title
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event.training_type
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event.location
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event.venue
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event.organiser
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event.trainer
                    ?.toLowerCase()
                    .includes(searchValue)

            const matchesStatus =
                statusFilter === "All" ||
                event.status === statusFilter

            const matchesType =
                typeFilter === "All" ||
                event.training_type === typeFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType
            )
        })
    }, [
        trainingEvents,
        search,
        statusFilter,
        typeFilter,
    ])

    /*
     * IMPORTANT:
     * Status comes directly from the database.
     *
     * We do NOT calculate Upcoming/Ongoing/etc. from
     * the event date.
     */
    const upcomingCount = trainingEvents.filter(
        (event) => event.status === "UPCOMING"
    ).length

    const ongoingCount = trainingEvents.filter(
        (event) => event.status === "ONGOING"
    ).length

    const completedCount = trainingEvents.filter(
        (event) => event.status === "COMPLETED"
    ).length

    const totalCapacity = trainingEvents.reduce(
        (total, event) =>
            total +
            (Number(event.capacity) || 0),
        0
    )

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredEvents.length / pageSize
        )
    )

    const currentPage = Math.min(
        page,
        totalPages
    )

    const paginatedEvents =
        filteredEvents.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        )

    const handleSearchChange = (value) => {
        setSearch(value)
        setPage(1)
    }

    const handleStatusChange = (value) => {
        setStatusFilter(value)
        setPage(1)
    }

    const handleTypeChange = (value) => {
        setTypeFilter(value)
        setPage(1)
    }

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All")
        setTypeFilter("All")
        setPage(1)
    }

    const hasFilters =
        search ||
        statusFilter !== "All" ||
        typeFilter !== "All"

    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading training & events..."
            />
        )
    }

    if (isError) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1600px] items-center justify-center">
                    <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-gray-900/5">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <XCircle className="h-7 w-7" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load training & events
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                            Something went wrong while
                            loading the training event
                            records.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="kr-hover-button mt-5 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <GraduationCap className="h-4 w-4" />

                            <span>
                                Content Management
                            </span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                Training & Events
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Training & Events
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage training programs,
                            workshops, awareness sessions and
                            other event information.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/training/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Training / Event
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* Total */}
                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Events
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {trainingEvents.length}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <CalendarDays className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            {upcomingCount} upcoming ·{" "}
                            {completedCount} completed
                        </p>
                    </div>

                    {/* Upcoming */}
                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Upcoming
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {upcomingCount}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                <Clock3 className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Events marked as upcoming
                        </p>
                    </div>

                    {/* Ongoing */}
                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Ongoing
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {ongoingCount}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Events marked as ongoing
                        </p>
                    </div>

                    {/* Capacity */}
                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Capacity
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {totalCapacity}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Combined capacity of listed events
                        </p>
                    </div>
                </div>

                {/* Event Status */}
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-sm font-bold text-green-900">
                                Event status
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-green-800/80">
                                Track the current lifecycle status
                                of every training program and
                                event.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {eventStatuses.map(
                                (status, index) => (
                                    <div
                                        key={status}
                                        className="flex items-center gap-2"
                                    >
                                        <div
                                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                                                status
                                            )}`}
                                        >
                                            {getStatusIcon(
                                                status
                                            )}

                                            {formatStatus(
                                                status
                                            )}
                                        </div>

                                        {index <
                                            eventStatuses.length -
                                                1 && (
                                            <span className="hidden text-gray-400 sm:block">
                                                →
                                            </span>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center">

                        {/* Search */}
                        <div className="relative min-w-0 flex-1">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    handleSearchChange(
                                        event.target.value
                                    )
                                }
                                placeholder="Search by title, location, trainer or event type..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            />
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">

                            {/* Status Filter */}
                            <div className="relative">
                                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        handleStatusChange(
                                            event.target.value
                                        )
                                    }
                                    className="h-11 w-full min-w-47.5 appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                >
                                    <option value="All">
                                        All statuses
                                    </option>

                                    {eventStatuses.map(
                                        (status) => (
                                            <option
                                                key={status}
                                                value={status}
                                            >
                                                {formatStatus(
                                                    status
                                                )}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div>
                                <select
                                    value={typeFilter}
                                    onChange={(event) =>
                                        handleTypeChange(
                                            event.target.value
                                        )
                                    }
                                    className="h-11 w-full min-w-47.5 appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                >
                                    <option value="All">
                                        All event types
                                    </option>

                                    {eventTypes.map(
                                        (type) => (
                                            <option
                                                key={type}
                                                value={type}
                                            >
                                                {type}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="h-11 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Records Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                    <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Training & Event Records
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredEvents.length} record
                                {filteredEvents.length !== 1
                                    ? "s"
                                    : ""}{" "}
                                found
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Live database data
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-287.5">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70">
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Training / Event
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Type
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Date & Time
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Location
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Capacity
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {paginatedEvents.length > 0 ? (
                                    paginatedEvents.map(
                                        (event) => (
                                            <tr
                                                key={event.id}
                                                className="group transition hover:bg-green-50/30"
                                            >
                                                {/* Training / Event */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                            <CalendarDays className="h-4 w-4" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="max-w-70 truncate text-sm font-semibold text-gray-900">
                                                                {
                                                                    event.title
                                                                }
                                                            </p>

                                                            <div className="mt-1 flex items-center gap-2">
                                                                <span
                                                                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getStatusClasses(
                                                                        event.status
                                                                    )}`}
                                                                >
                                                                    {formatStatus(
                                                                        event.status
                                                                    )}
                                                                </span>

                                                                {event.registration_enabled ===
                                                                    1 && (
                                                                    <span className="text-xs text-gray-400">
                                                                        Registration
                                                                        open
                                                                    </span>
                                                                )}

                                                                {event.registration_enabled ===
                                                                    0 && (
                                                                    <span className="text-xs text-gray-400">
                                                                        Registration
                                                                        closed
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Type */}
                                                <td className="px-5 py-4">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {event.training_type ||
                                                            "—"}
                                                    </span>
                                                </td>

                                                {/* Date & Time */}
                                                <td className="px-5 py-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">
                                                            {formatDateRange(
                                                                event.start_date,
                                                                event.end_date
                                                            )}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {formatTimeRange(
                                                                event.start_time,
                                                                event.end_time
                                                            )}
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Location */}
                                                <td className="px-5 py-4">
                                                    <div className="flex max-w-52.5 items-start gap-2">
                                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                                        <div>
                                                            <p className="text-sm text-gray-600">
                                                                {event.location ||
                                                                    "—"}
                                                            </p>

                                                            {event.venue && (
                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    {
                                                                        event.venue
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Capacity */}
                                                <td className="px-5 py-4">
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {event.capacity ??
                                                            "—"}
                                                    </span>

                                                    {event.capacity !==
                                                        null &&
                                                        event.capacity !==
                                                            undefined && (
                                                            <p className="mt-1 text-xs text-gray-400">
                                                                participants
                                                            </p>
                                                        )}
                                                </td>

                                                {/* Status */}
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
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
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link
                                                            to={`/admin/content/training/${event.id}`}
                                                            title="View training/event"
                                                            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            to={`/admin/content/training/${event.id}/edit`}
                                                            title="Edit training/event"
                                                            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Edit3 className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="mx-auto flex max-w-sm flex-col items-center">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                                    <CalendarDays className="h-6 w-6" />
                                                </div>

                                                <h3 className="mt-4 text-sm font-bold text-gray-900">
                                                    No training or events found
                                                </h3>

                                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                                    {trainingEvents.length ===
                                                    0
                                                        ? "No training or event records have been created yet."
                                                        : "Try changing your search or filters to find another record."}
                                                </p>

                                                {hasFilters && (
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            clearFilters
                                                        }
                                                        className="mt-4 text-sm font-semibold text-green-700 hover:text-green-800"
                                                    >
                                                        Clear filters
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-500">
                            Showing{" "}
                            <span className="font-semibold text-gray-700">
                                {filteredEvents.length ===
                                0
                                    ? 0
                                    : (currentPage - 1) *
                                          pageSize +
                                      1}
                            </span>{" "}
                            to{" "}
                            <span className="font-semibold text-gray-700">
                                {Math.min(
                                    currentPage *
                                        pageSize,
                                    filteredEvents.length
                                )}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-700">
                                {filteredEvents.length}
                            </span>
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={
                                    currentPage === 1
                                }
                                onClick={() =>
                                    setPage(
                                        (previous) =>
                                            Math.max(
                                                1,
                                                previous - 1
                                            )
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-green-700 px-3 text-xs font-semibold text-white">
                                {currentPage}
                            </div>

                            <button
                                type="button"
                                disabled={
                                    currentPage ===
                                    totalPages
                                }
                                onClick={() =>
                                    setPage(
                                        (previous) =>
                                            Math.min(
                                                totalPages,
                                                previous + 1
                                            )
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Management Note */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <GraduationCap className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-900">
                                Training & event management
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Use this section to manage
                                training programs, workshops,
                                awareness sessions and other event
                                information. Participant applications
                                and their workflow will be managed
                                separately through the Training
                                applications section.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrainingEvents