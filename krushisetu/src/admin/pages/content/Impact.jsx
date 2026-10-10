import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    BarChart3,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Edit3,
    Eye,
    Filter,
    MapPin,
    Plus,
    Search,
    ShieldCheck,
    Target,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import { getAdminImpactIndicators } from "../../api/adminImpactApi.js"

const approvalStatuses = [
    "APPROVED",
    "PENDING",
    "DRAFT",
    "REJECTED",
]

const getApprovalLabel = (status) => {
    switch (status) {
        case "APPROVED":
            return "Approved"

        case "PENDING":
            return "Pending"

        case "DRAFT":
            return "Draft"

        case "REJECTED":
            return "Rejected"

        default:
            return status || "—"
    }
}

const getApprovalClasses = (status) => {
    switch (status) {
        case "APPROVED":
            return "border-green-200 bg-green-50 text-green-700"

        case "PENDING":
            return "border-amber-200 bg-amber-50 text-amber-700"

        case "DRAFT":
            return "border-gray-200 bg-gray-50 text-gray-600"

        case "REJECTED":
            return "border-red-200 bg-red-50 text-red-700"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}

const formatDate = (date) => {
    if (!date) {
        return null
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return null
    }

    return parsedDate.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
    })
}

const formatPeriod = (from, to) => {
    const start = formatDate(from)
    const end = formatDate(to)

    if (start && end) {
        return `${start} - ${end}`
    }

    if (start) {
        return start
    }

    if (end) {
        return end
    }

    return "—"
}

const Impact = () => {
    const [search, setSearch] = useState("")
    const [approvalFilter, setApprovalFilter] = useState("All")
    const [departmentFilter, setDepartmentFilter] = useState("All")
    const [page, setPage] = useState(1)

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["admin-impact"],
        queryFn: getAdminImpactIndicators,
    })

    const impactIndicators = data?.impactIndicators ?? []

    const departments = useMemo(() => {
        return [
            ...new Set(
                impactIndicators
                    .map((item) => item.department_name)
                    .filter(Boolean)
            ),
        ]
    }, [impactIndicators])

    const filteredIndicators = useMemo(() => {
        const query = search.toLowerCase().trim()

        return impactIndicators.filter((item) => {
            const matchesSearch =
                !query ||
                item.project_name
                    ?.toLowerCase()
                    .includes(query) ||
                item.department_name
                    ?.toLowerCase()
                    .includes(query) ||
                item.indicator_name
                    ?.toLowerCase()
                    .includes(query) ||
                item.location
                    ?.toLowerCase()
                    .includes(query)

            const matchesApproval =
                approvalFilter === "All" ||
                item.approval_status === approvalFilter

            const matchesDepartment =
                departmentFilter === "All" ||
                item.department_name === departmentFilter

            return (
                matchesSearch &&
                matchesApproval &&
                matchesDepartment
            )
        })
    }, [
        impactIndicators,
        search,
        approvalFilter,
        departmentFilter,
    ])

    const approvedCount = impactIndicators.filter(
        (item) => item.approval_status === "APPROVED"
    ).length

    const pendingCount = impactIndicators.filter(
        (item) => item.approval_status === "PENDING"
    ).length

    const draftCount = impactIndicators.filter(
        (item) => item.approval_status === "DRAFT"
    ).length

    const totalMeasuredValue = impactIndicators.reduce(
        (total, item) => total + Number(item.value || 0),
        0
    )

    const pageSize = 6

    const totalPages = Math.max(
        1,
        Math.ceil(filteredIndicators.length / pageSize)
    )

    const currentPage = Math.min(page, totalPages)

    const paginatedIndicators = filteredIndicators.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const clearFilters = () => {
        setSearch("")
        setApprovalFilter("All")
        setDepartmentFilter("All")
        setPage(1)
    }

    if (isLoading) {
        return <Loader text="Loading impact indicators..." />
    }

    if (isError) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1600px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <BarChart3 className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load impact indicators
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                "Something went wrong while loading impact indicators."}
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
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
                            <BarChart3 className="h-4 w-4" />

                            <span>
                                Projects & Impact
                            </span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                Impact Indicators
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Impact Indicators
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Track measurable project outcomes, supporting
                            evidence and approval status.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/impact/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Indicator
                    </Link>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        label="Total Indicators"
                        value={impactIndicators.length}
                        description="Tracked project measurements"
                        icon={
                            <BarChart3 className="h-5 w-5" />
                        }
                        iconClass="bg-green-50 text-green-700"
                    />

                    <SummaryCard
                        label="Approved"
                        value={approvedCount}
                        description="Ready for reporting"
                        icon={
                            <CheckCircle2 className="h-5 w-5" />
                        }
                        iconClass="bg-emerald-50 text-emerald-700"
                    />

                    <SummaryCard
                        label="Pending Review"
                        value={pendingCount}
                        description="Awaiting approval"
                        icon={
                            <ShieldCheck className="h-5 w-5" />
                        }
                        iconClass="bg-amber-50 text-amber-700"
                    />

                    <SummaryCard
                        label="Measured Value"
                        value={totalMeasuredValue.toLocaleString(
                            "en-IN"
                        )}
                        description="Across tracked indicators"
                        icon={
                            <Target className="h-5 w-5" />
                        }
                        iconClass="bg-purple-50 text-purple-700"
                    />
                </div>

                {/* Tracking notice */}
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                <Target className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-green-900">
                                    Evidence-based impact tracking
                                </h2>

                                <p className="mt-1 max-w-3xl text-xs leading-5 text-green-800/80">
                                    Keep each indicator connected to its
                                    project or department and record the
                                    measurement period, location, value,
                                    evidence and approval status.
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/admin/content/projects"
                            className="kr-hover-link inline-flex w-fit items-center gap-2 text-xs font-semibold text-green-700"
                        >
                            View Projects
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_220px_240px_auto]">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setPage(1)
                                }}
                                placeholder="Search projects, indicators or locations..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <select
                                value={approvalFilter}
                                onChange={(e) => {
                                    setApprovalFilter(
                                        e.target.value
                                    )
                                    setPage(1)
                                }}
                                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            >
                                <option value="All">
                                    All approval statuses
                                </option>

                                {approvalStatuses.map(
                                    (status) => (
                                        <option
                                            key={status}
                                            value={status}
                                        >
                                            {getApprovalLabel(
                                                status
                                            )}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="relative">
                            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <select
                                value={departmentFilter}
                                onChange={(e) => {
                                    setDepartmentFilter(
                                        e.target.value
                                    )
                                    setPage(1)
                                }}
                                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            >
                                <option value="All">
                                    All departments
                                </option>

                                {departments.map(
                                    (department) => (
                                        <option
                                            key={department}
                                            value={department}
                                        >
                                            {department}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {(search ||
                            approvalFilter !== "All" ||
                            departmentFilter !== "All") && (
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

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Impact Records
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredIndicators.length} indicator
                                {filteredIndicators.length !== 1
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

                    {impactIndicators.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <div className="mx-auto flex max-w-sm flex-col items-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                    <BarChart3 className="h-6 w-6" />
                                </div>

                                <h3 className="mt-4 text-sm font-bold text-gray-900">
                                    No impact indicators available
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    No impact indicator records have
                                    been added yet. Start by creating
                                    your first indicator.
                                </p>

                                <Link
                                    to="/admin/content/impact/new"
                                    className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Indicator
                                </Link>
                            </div>
                        </div>
                    ) : filteredIndicators.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <div className="mx-auto flex max-w-sm flex-col items-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                    <BarChart3 className="h-6 w-6" />
                                </div>

                                <h3 className="mt-4 text-sm font-bold text-gray-900">
                                    No impact indicators found
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    No indicators match your current
                                    search or filters.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-4 text-sm font-semibold text-green-700 transition hover:text-green-800"
                                >
                                    Clear filters
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1250px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Project / Indicator
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Department
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Value
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Period
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Location
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Evidence
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Approval
                                            </th>

                                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {paginatedIndicators.map(
                                            (item) => (
                                                <tr
                                                    key={item.id}
                                                    className="group transition hover:bg-green-50/30"
                                                >
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                                <BarChart3 className="h-4 w-4" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="max-w-[270px] truncate text-sm font-semibold text-gray-900">
                                                                    {
                                                                        item.indicator_name
                                                                    }
                                                                </p>

                                                                <p className="mt-1 max-w-[270px] truncate text-xs text-gray-500">
                                                                    {
                                                                        item.project_name
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className="max-w-[190px] text-sm text-gray-700">
                                                            {
                                                                item.department_name ||
                                                                "—"
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">
                                                                {Number(
                                                                    item.value ||
                                                                        0
                                                                ).toLocaleString(
                                                                    "en-IN"
                                                                )}
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray-400">
                                                                {
                                                                    item.unit
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className="text-sm text-gray-600  text-nowrap">
                                                            {formatPeriod(
                                                                item.period_from,
                                                                item.period_to
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex max-w-[190px] items-start gap-2">
                                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                                            <span className="text-sm text-gray-600">
                                                                {item.location ||
                                                                    "—"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className="block max-w-[180px] truncate text-sm text-gray-600">
                                                            {item.evidence_note ||
                                                                "—"}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getApprovalClasses(
                                                                item.approval_status
                                                            )}`}
                                                        >
                                                            {getApprovalLabel(
                                                                item.approval_status
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Link
                                                                to={`/admin/content/impact/${item.id}`}
                                                                title="View"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/content/impact/${item.id}/edit`}
                                                                title="Edit"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Edit3 className="h-4 w-4" />
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
                            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-700">
                                        {(currentPage - 1) *
                                            pageSize +
                                            1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold text-gray-700">
                                        {Math.min(
                                            currentPage *
                                                pageSize,
                                            filteredIndicators.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-700">
                                        {filteredIndicators.length}
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
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

const SummaryCard = ({
    label,
    value,
    description,
    icon,
    iconClass,
}) => {
    return (
        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {value}
                    </p>
                </div>

                <div
                    className={`kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}
                >
                    {icon}
                </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
                {description}
            </p>
        </div>
    )
}

export default Impact