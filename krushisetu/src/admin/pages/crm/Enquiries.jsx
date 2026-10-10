import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Eye,
    Filter,
    Mail,
    MessageSquare,
    Phone,
    Search,
    UserRound,
    XCircle,
} from "lucide-react"

import { getEnquiries } from "../../api/adminEnquiryApi.js"

const STATUS_OPTIONS = [
    "ALL",
    "NEW",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
]

const Enquiries = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 6

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-enquiries"],
        queryFn: getEnquiries,
        retry: false,
    })

    const enquiries = Array.isArray(data?.data)
        ? data.data
        : []

    const filteredEnquiries = useMemo(() => {
        const searchValue = search
            .toLowerCase()
            .trim()

        return enquiries.filter((enquiry) => {
            const matchesSearch =
                !searchValue ||
                String(
                    enquiry.reference_number || ""
                )
                    .toLowerCase()
                    .includes(searchValue) ||
                String(enquiry.name || "")
                    .toLowerCase()
                    .includes(searchValue) ||
                String(enquiry.email || "")
                    .toLowerCase()
                    .includes(searchValue) ||
                String(enquiry.phone || "")
                    .toLowerCase()
                    .includes(searchValue) ||
                String(enquiry.message || "")
                    .toLowerCase()
                    .includes(searchValue)

            const matchesStatus =
                statusFilter === "ALL" ||
                enquiry.status === statusFilter

            return (
                matchesSearch &&
                matchesStatus
            )
        })
    }, [
        enquiries,
        search,
        statusFilter,
    ])

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredEnquiries.length /
                itemsPerPage
        )
    )

    const safePage = Math.min(
        currentPage,
        totalPages
    )

    const paginatedEnquiries =
        filteredEnquiries.slice(
            (safePage - 1) * itemsPerPage,
            safePage * itemsPerPage
        )

    const newCount = enquiries.filter(
        (item) => item.status === "NEW"
    ).length

    const inProgressCount = enquiries.filter(
        (item) => item.status === "IN_PROGRESS"
    ).length

    const resolvedCount = enquiries.filter(
        (item) => item.status === "RESOLVED"
    ).length

    const closedCount = enquiries.filter(
        (item) => item.status === "CLOSED"
    ).length

    const resetPage = () => {
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("ALL")
        setCurrentPage(1)
    }

    const formatStatus = (status) => {
        const statusLabels = {
            NEW: "New",
            IN_PROGRESS: "In Progress",
            RESOLVED: "Resolved",
            CLOSED: "Closed",
        }

        return (
            statusLabels[status] ||
            status ||
            "Unknown"
        )
    }

    const formatDate = (date) => {
        if (!date) {
            return "—"
        }

        const parsedDate = new Date(date)

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

    if (isLoading) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[500px] max-w-[1400px] items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-700" />

                        <p className="text-sm font-medium text-gray-500">
                            Loading enquiries...
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    if (isError) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[500px] max-w-[1400px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <XCircle className="h-7 w-7" />
                        </div>

                        <h2 className="mt-5 text-lg font-bold text-gray-900">
                            Unable to load enquiries
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong while loading enquiries."}
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium text-green-700">
                            <span>Applications</span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                Enquiries
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Enquiries
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage incoming enquiries and
                            track their status.
                        </p>
                    </div>
                </div>

                {/* Summary */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <SummaryCard
                        icon={MessageSquare}
                        label="New Enquiries"
                        value={newCount}
                        description="Awaiting initial response"
                    />

                    <SummaryCard
                        icon={Clock3}
                        label="In Progress"
                        value={inProgressCount}
                        description="Currently being handled"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Resolved"
                        value={resolvedCount}
                        description="Successfully resolved"
                    />

                    <SummaryCard
                        icon={XCircle}
                        label="Closed"
                        value={closedCount}
                        description="Closed enquiries"
                    />

                </div>

                {/* Info */}

                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <MessageSquare className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-green-950">
                                Enquiry management
                            </h2>

                            <p className="mt-1 max-w-4xl text-xs leading-5 text-green-900/70">
                                Review enquiries submitted through
                                the website and move them through
                                New, In Progress, Resolved and
                                Closed statuses.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}

                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center">

                        <div className="relative min-w-0 flex-1">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(
                                        e.target.value
                                    )
                                    resetPage()
                                }}
                                placeholder="Search reference number, name, email, phone or message..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            />
                        </div>

                        <div className="flex items-center gap-2 text-gray-400">
                            <Filter className="h-4 w-4" />

                            <span className="text-xs font-semibold">
                                Filter
                            </span>
                        </div>

                        <FilterSelect
                            label="Status"
                            value={statusFilter}
                            onChange={(value) => {
                                setStatusFilter(value)
                                resetPage()
                            }}
                            options={STATUS_OPTIONS}
                        />

                    </div>
                </div>

                {/* Table */}

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                    <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Enquiry Inbox
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredEnquiries.length}{" "}
                                {filteredEnquiries.length === 1
                                    ? "enquiry"
                                    : "enquiries"}{" "}
                                found
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-bold text-green-700">
                            Live data
                        </span>
                    </div>

                    {paginatedEnquiries.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1100px]">

                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">

                                            <TableHead>
                                                Enquiry
                                            </TableHead>

                                            <TableHead>
                                                Contact
                                            </TableHead>

                                            <TableHead>
                                                Message
                                            </TableHead>

                                            <TableHead>
                                                Status
                                            </TableHead>

                                            <TableHead>
                                                Created
                                            </TableHead>

                                            <TableHead align="right">
                                                Actions
                                            </TableHead>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {paginatedEnquiries.map(
                                            (enquiry) => (
                                                <tr
                                                    key={
                                                        enquiry.id
                                                    }
                                                    className="border-b border-gray-100 last:border-0 hover:bg-green-50/20"
                                                >

                                                    {/* Enquiry */}

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-start gap-3">

                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                                <UserRound className="h-5 w-5" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <p className="text-sm font-bold text-gray-900">
                                                                        {
                                                                            enquiry.name
                                                                        }
                                                                    </p>

                                                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500">
                                                                        {
                                                                            enquiry.reference_number
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <p className="mt-1 line-clamp-2 max-w-[280px] text-xs leading-5 text-gray-500">
                                                                    {
                                                                        enquiry.message
                                                                    }
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </td>

                                                    {/* Contact */}

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="space-y-2">

                                                            <span className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                                                <Mail className="h-3.5 w-3.5 text-gray-400" />

                                                                {
                                                                    enquiry.email
                                                                }
                                                            </span>

                                                            <span className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                                                <Phone className="h-3.5 w-3.5 text-gray-400" />

                                                                {
                                                                    enquiry.phone
                                                                }
                                                            </span>

                                                        </div>
                                                    </td>

                                                    {/* Message */}

                                                    <td className="max-w-[320px] px-5 py-4 sm:px-6">
                                                        <p className="line-clamp-3 text-xs leading-5 text-gray-600">
                                                            {
                                                                enquiry.message
                                                            }
                                                        </p>
                                                    </td>

                                                    {/* Status */}

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <StatusBadge
                                                            status={formatStatus(
                                                                enquiry.status
                                                            )}
                                                        />
                                                    </td>

                                                    {/* Created */}

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <span className="text-xs font-medium text-gray-500">
                                                            {formatDate(
                                                                enquiry.created_at
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* Actions */}

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center justify-end gap-2">

                                                            <Link
                                                                to={`/admin/crm/enquiries/${enquiry.id}`}
                                                                title="View enquiry"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>

                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        )}
                                    </tbody>

                                </table>
                            </div>

                            {/* Pagination */}

                            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                                <p className="text-xs text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-700">
                                        {(safePage - 1) *
                                            itemsPerPage +
                                            1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold text-gray-700">
                                        {Math.min(
                                            safePage *
                                                itemsPerPage,
                                            filteredEnquiries.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-700">
                                        {
                                            filteredEnquiries.length
                                        }
                                    </span>
                                </p>

                                <div className="flex items-center gap-2">

                                    <button
                                        type="button"
                                        disabled={
                                            safePage === 1
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                (page) =>
                                                    Math.max(
                                                        1,
                                                        page - 1
                                                    )
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-green-700 px-3 text-xs font-bold text-white">
                                        {safePage}
                                    </div>

                                    <button
                                        type="button"
                                        disabled={
                                            safePage ===
                                            totalPages
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                (page) =>
                                                    Math.min(
                                                        totalPages,
                                                        page + 1
                                                    )
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>

                                </div>
                            </div>
                        </>
                    ) : (
                        <EmptyState
                            onReset={clearFilters}
                        />
                    )}

                </div>

            </div>
        </section>
    )
}

const SummaryCard = ({
    icon: Icon,
    label,
    value,
    description,
}) => {
    return (
        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">

                <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Icon className="h-5 w-5" />
                </div>

                <span className="text-2xl font-bold text-gray-900">
                    {value}
                </span>

            </div>

            <p className="kr-hover-title mt-4 text-sm font-bold text-gray-900">
                {label}
            </p>

            <p className="mt-1 text-xs text-gray-500">
                {description}
            </p>
        </div>
    )
}

const FilterSelect = ({
    value,
    onChange,
    options,
    label,
}) => {
    return (
        <div className="relative min-w-[170px]">
            <label className="sr-only">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option === "ALL"
                            ? `All ${label}`
                            : formatOptionLabel(
                                  option
                              )}
                    </option>
                ))}
            </select>
        </div>
    )
}

const formatOptionLabel = (option) => {
    const labels = {
        NEW: "New",
        IN_PROGRESS: "In Progress",
        RESOLVED: "Resolved",
        CLOSED: "Closed",
    }

    return labels[option] || option
}

const TableHead = ({
    children,
    align = "left",
}) => {
    return (
        <th
            className={`px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 sm:px-6 ${
                align === "right"
                    ? "text-right"
                    : "text-left"
            }`}
        >
            {children}
        </th>
    )
}

const StatusBadge = ({ status }) => {
    const styles = {
        New: "bg-blue-50 text-blue-700",
        "In Progress":
            "bg-amber-50 text-amber-700",
        Resolved:
            "bg-green-50 text-green-700",
        Closed:
            "bg-gray-100 text-gray-600",
    }

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                styles[status] ||
                "bg-gray-100 text-gray-600"
            }`}
        >
            {status}
        </span>
    )
}

const EmptyState = ({ onReset }) => {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-700">
                <MessageSquare className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">
                No enquiries found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Try changing your search or status
                filter to find another enquiry.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="mt-5 rounded-2xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
            >
                Clear Filters
            </button>

        </div>
    )
}

export default Enquiries