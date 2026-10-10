import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Download,
    Eye,
    FileBarChart,
    FileText,
    Filter,
    RefreshCw,
    Search,
    Trash2,
    UserRound,
} from "lucide-react"

const reportData = [
    {
        id: "RPT-001",
        name: "Monthly Application Report",
        type: "Applications",
        format: "PDF",
        generatedBy: "Admin",
        date: "30 Sep 2026",
        time: "04:20 PM",
        status: "Ready",
        size: "1.8 MB",
        period: "Sep 2026",
        description:
            "Summary of applications received, processed and resolved during September 2026.",
    },
    {
        id: "RPT-002",
        name: "Training Registration Summary",
        type: "Training",
        format: "Excel",
        generatedBy: "Training Manager",
        date: "29 Sep 2026",
        time: "02:15 PM",
        status: "Ready",
        size: "842 KB",
        period: "Sep 2026",
        description:
            "Training registrations, attendance and programme-level participation summary.",
    },
    {
        id: "RPT-003",
        name: "CRM Enquiry Report",
        type: "CRM",
        format: "PDF",
        generatedBy: "CRM Executive",
        date: "28 Sep 2026",
        time: "11:40 AM",
        status: "Ready",
        size: "1.2 MB",
        period: "Sep 2026",
        description:
            "Enquiries, follow-ups, resolution status and CRM activity summary.",
    },
    {
        id: "RPT-004",
        name: "Programme Performance Report",
        type: "Impact",
        format: "Excel",
        generatedBy: "Programme Manager",
        date: "25 Sep 2026",
        time: "05:05 PM",
        status: "Ready",
        size: "2.4 MB",
        period: "Q3 2026",
        description:
            "Programme activity and operational performance indicators.",
    },
    {
        id: "RPT-005",
        name: "Farmer Application Summary",
        type: "Applications",
        format: "PDF",
        generatedBy: "Scheme Manager",
        date: "20 Sep 2026",
        time: "01:25 PM",
        status: "Ready",
        size: "968 KB",
        period: "Sep 2026",
        description:
            "Farmer application submissions and workflow status summary.",
    },
    {
        id: "RPT-006",
        name: "Website Content Report",
        type: "Content",
        format: "Excel",
        generatedBy: "Website Content Admin",
        date: "18 Sep 2026",
        time: "10:10 AM",
        status: "Ready",
        size: "615 KB",
        period: "Sep 2026",
        description:
            "Content publishing activity, drafts and recently updated records.",
    },
    {
        id: "RPT-007",
        name: "Volunteer Registration Report",
        type: "Applications",
        format: "PDF",
        generatedBy: "CRM Executive",
        date: "15 Sep 2026",
        time: "03:30 PM",
        status: "Ready",
        size: "734 KB",
        period: "Aug–Sep 2026",
        description:
            "Volunteer registrations and current application workflow status.",
    },
    {
        id: "RPT-008",
        name: "Monthly Operations Report",
        type: "Operations",
        format: "PDF",
        generatedBy: "Admin",
        date: "01 Sep 2026",
        time: "09:15 AM",
        status: "Ready",
        size: "2.1 MB",
        period: "Aug 2026",
        description:
            "High-level operational activity across applications, CRM and programmes.",
    },
]

const ReportHistory = () => {
    const [search, setSearch] = useState("")
    const [type, setType] = useState("All Types")
    const [format, setFormat] = useState("All Formats")
    const [status, setStatus] = useState("All Status")
    const [refreshing, setRefreshing] = useState(false)
    const [selectedReports, setSelectedReports] = useState([])

    const filteredReports = useMemo(() => {
        const query = search.trim().toLowerCase()

        return reportData.filter((report) => {
            const matchesSearch =
                !query ||
                report.name
                    .toLowerCase()
                    .includes(query) ||
                report.id
                    .toLowerCase()
                    .includes(query) ||
                report.generatedBy
                    .toLowerCase()
                    .includes(query) ||
                report.period
                    .toLowerCase()
                    .includes(query)

            const matchesType =
                type === "All Types" ||
                report.type === type

            const matchesFormat =
                format === "All Formats" ||
                report.format === format

            const matchesStatus =
                status === "All Status" ||
                report.status === status

            return (
                matchesSearch &&
                matchesType &&
                matchesFormat &&
                matchesStatus
            )
        })
    }, [search, type, format, status])

    const allVisibleSelected =
        filteredReports.length > 0 &&
        filteredReports.every((report) =>
            selectedReports.includes(report.id)
        )

    const toggleReport = (id) => {
        setSelectedReports((previous) =>
            previous.includes(id)
                ? previous.filter(
                    (reportId) =>
                        reportId !== id
                )
                : [...previous, id]
        )
    }

    const toggleAll = () => {
        if (allVisibleSelected) {
            setSelectedReports((previous) =>
                previous.filter(
                    (id) =>
                        !filteredReports.some(
                            (report) =>
                                report.id === id
                        )
                )
            )

            return
        }

        setSelectedReports((previous) => [
            ...new Set([
                ...previous,
                ...filteredReports.map(
                    (report) => report.id
                ),
            ]),
        ])
    }

    const handleRefresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 600)
    }

    const clearFilters = () => {
        setSearch("")
        setType("All Types")
        setFormat("All Formats")
        setStatus("All Status")
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1500px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/reports"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium">
                                <span className="text-green-700">
                                    Reports
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    History
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Report History
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                View previously generated reports and
                                download them when required.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                            type="button"
                            onClick={handleRefresh}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${refreshing
                                        ? "animate-spin"
                                        : ""
                                    }`}
                            />
                            Refresh
                        </button>

                        <Link
                            to="/admin/reports"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
                        >
                            <FileBarChart className="h-4 w-4" />
                            Reports Overview
                        </Link>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={FileText}
                        label="Total Reports"
                        value="8"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Ready"
                        value="8"
                    />

                    <SummaryCard
                        icon={CalendarDays}
                        label="This Month"
                        value="7"
                    />

                    <SummaryCard
                        icon={Download}
                        label="Available Downloads"
                        value="8"
                    />
                </div>

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Filter className="h-4 w-4" />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-gray-800">
                                        Filter Reports
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Search and filter previously
                                        generated reports.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="self-start text-xs font-semibold text-gray-400 transition hover:text-green-700"
                            >
                                Clear filters
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <div className="relative md:col-span-2 xl:col-span-1">
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Search reports..."
                                    className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>

                            <FilterSelect
                                value={type}
                                onChange={setType}
                                options={[
                                    "All Types",
                                    "Applications",
                                    "Training",
                                    "CRM",
                                    "Impact",
                                    "Content",
                                    "Operations",
                                ]}
                            />

                            <FilterSelect
                                value={format}
                                onChange={setFormat}
                                options={[
                                    "All Formats",
                                    "PDF",
                                    "Excel",
                                ]}
                            />

                            <FilterSelect
                                value={status}
                                onChange={setStatus}
                                options={[
                                    "All Status",
                                    "Ready",
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedReports.length > 0 && (
                    <div className="flex flex-col gap-3 rounded-3xl border border-green-100 bg-green-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-green-900">
                                    {selectedReports.length} report
                                    {selectedReports.length > 1
                                        ? "s"
                                        : ""}{" "}
                                    selected
                                </p>

                                <p className="text-xs text-green-900/60">
                                    Choose an action for the selected
                                    reports.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                            >
                                <Download className="h-3.5 w-3.5" />
                                Download Selected
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedReports([])
                                }
                                className="rounded-xl px-4 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}

                {/* Report Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Generated Reports
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredReports.length} report
                                {filteredReports.length !== 1
                                    ? "s"
                                    : ""}{" "}
                                found.
                            </p>
                        </div>

                        <div className="text-xs text-gray-400">
                            UI preview data
                        </div>
                    </div>

                    {filteredReports.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1050px] text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/70">
                                        <th className="w-12 px-5 py-3">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    allVisibleSelected
                                                }
                                                onChange={
                                                    toggleAll
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-green-700 accent-green-700"
                                            />
                                        </th>

                                        <TableHead>
                                            Report
                                        </TableHead>

                                        <TableHead>
                                            Type
                                        </TableHead>

                                        <TableHead>
                                            Format
                                        </TableHead>

                                        <TableHead>
                                            Generated By
                                        </TableHead>

                                        <TableHead>
                                            Generated
                                        </TableHead>

                                        <TableHead>
                                            Status
                                        </TableHead>

                                        <TableHead>
                                            Actions
                                        </TableHead>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {filteredReports.map(
                                        (report) => (
                                            <tr
                                                key={report.id}
                                                className="transition hover:bg-green-50/30"
                                            >
                                                <td className="px-5 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedReports.includes(
                                                            report.id
                                                        )}
                                                        onChange={() =>
                                                            toggleReport(
                                                                report.id
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-green-700 accent-green-700"
                                                    />
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                            <FileText className="h-4 w-4" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-semibold text-gray-800">
                                                                {
                                                                    report.name
                                                                }
                                                            </p>

                                                            <p className="mt-0.5 text-[11px] text-gray-400">
                                                                {
                                                                    report.id
                                                                }{" "}
                                                                ·{" "}
                                                                {
                                                                    report.period
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600">
                                                        {
                                                            report.type
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${report.format ===
                                                                "PDF"
                                                                ? "border-red-100 bg-red-50 text-red-700"
                                                                : "border-green-100 bg-green-50 text-green-700"
                                                            }`}
                                                    >
                                                        {
                                                            report.format
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                                                            <UserRound className="h-3.5 w-3.5" />
                                                        </div>

                                                        <span className="text-sm text-gray-600">
                                                            {
                                                                report.generatedBy
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {
                                                            report.date
                                                        }
                                                    </p>

                                                    <p className="mt-0.5 text-[11px] text-gray-400">
                                                        {
                                                            report.time
                                                        }
                                                    </p>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <StatusBadge
                                                        status={
                                                            report.status
                                                        }
                                                    />
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            title="Preview"
                                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            title="Download"
                                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            title="Delete"
                                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState
                            search={search}
                            onClear={clearFilters}
                        />
                    )}
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-700">
                            {filteredReports.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-700">
                            {reportData.length}
                        </span>{" "}
                        reports
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled
                            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-300"
                        >
                            Previous
                        </button>

                        <span className="flex h-8 min-w-8 items-center justify-center rounded-xl bg-green-700 px-2 text-xs font-semibold text-white">
                            1
                        </span>

                        <button
                            type="button"
                            disabled
                            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* UI Notice */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                        <div>
                            <h3 className="text-sm font-bold text-gray-800">
                                UI preview mode
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Report history, downloads, previews and
                                deletion currently use temporary UI data.
                                Backend report generation and file storage
                                will be connected later.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const SummaryCard = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-100 hover:shadow-lg hover:shadow-green-900/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Icon className="h-4 w-4" />
            </div>

            <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                {value}
            </p>

            <p className="mt-1 text-xs font-semibold text-gray-500">
                {label}
            </p>
        </div>
    )
}

const FilterSelect = ({
    value,
    onChange,
    options,
}) => {
    return (
        <select
            value={value}
            onChange={(event) =>
                onChange(event.target.value)
            }
            className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
        >
            {options.map((option) => (
                <option
                    key={option}
                    value={option}
                >
                    {option}
                </option>
            ))}
        </select>
    )
}

const TableHead = ({
    children,
}) => {
    return (
        <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {children}
        </th>
    )
}

const StatusBadge = ({
    status,
}) => {
    const styles = {
        Ready: "border-green-100 bg-green-50 text-green-700",
    }

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status] ||
                "border-gray-200 bg-gray-50 text-gray-600"
                }`}
        >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {status}
        </span>
    )
}

const EmptyState = ({
    search,
    onClear,
}) => {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                <FileText className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-gray-700">
                No reports found
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
                {search
                    ? "No reports match your search. Try a different search term or clear the filters."
                    : "No reports match the selected filters."}
            </p>

            <button
                type="button"
                onClick={onClear}
                className="mt-4 rounded-xl bg-green-50 px-4 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-100"
            >
                Clear Filters
            </button>
        </div>
    )
}

export default ReportHistory