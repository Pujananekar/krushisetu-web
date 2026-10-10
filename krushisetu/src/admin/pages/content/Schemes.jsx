import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    Landmark,
    Plus,
    Search,
    SlidersHorizontal,
    Eye,
    Pencil,
    CheckCircle2,
    FileEdit,
    Clock3,
    AlertTriangle,
    CalendarDays,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    X,
    RefreshCw,
} from "lucide-react"

import { getAdminSchemes } from "../../api/adminSchemesApi.js"

const statusStyles = {
    ACTIVE: "border-green-200 bg-green-50 text-green-700",
    UPCOMING: "border-blue-200 bg-blue-50 text-blue-700",
    CLOSED: "border-red-200 bg-red-50 text-red-700",
    INACTIVE: "border-gray-200 bg-gray-100 text-gray-600",
}

const statusLabels = {
    ACTIVE: "Active",
    UPCOMING: "Upcoming",
    CLOSED: "Closed",
    INACTIVE: "Inactive",
}

const levelStyles = {
    CENTRAL: "bg-blue-50 text-blue-700",
    STATE: "bg-violet-50 text-violet-700",
}

const levelLabels = {
    CENTRAL: "Central",
    STATE: "State",
}

const formatDate = (value) => {
    if (!value) {
        return "—"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "—"
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date)
}

const Schemes = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [levelFilter, setLevelFilter] = useState("All")
    const [categoryFilter, setCategoryFilter] = useState("All")
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 7

    const {
        data,
        isLoading,
        isError,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["admin-schemes"],
        queryFn: getAdminSchemes,
    })

    const schemesData = data?.schemes ?? []

    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(
                schemesData
                    .map((scheme) => scheme.category)
                    .filter(Boolean)
            ),
        ]
    }, [schemesData])

    const filteredSchemes = useMemo(() => {
        const searchValue = search.toLowerCase().trim()

        return schemesData.filter((scheme) => {
            const matchesSearch =
                !searchValue ||
                scheme.name?.toLowerCase().includes(searchValue) ||
                scheme.authority?.toLowerCase().includes(searchValue) ||
                scheme.category?.toLowerCase().includes(searchValue) ||
                scheme.beneficiary?.toLowerCase().includes(searchValue)

            const matchesStatus =
                statusFilter === "All" ||
                scheme.status === statusFilter

            const matchesLevel =
                levelFilter === "All" ||
                scheme.level === levelFilter

            const matchesCategory =
                categoryFilter === "All" ||
                scheme.category === categoryFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesLevel &&
                matchesCategory
            )
        })
    }, [
        schemesData,
        search,
        statusFilter,
        levelFilter,
        categoryFilter,
    ])

    const totalPages = Math.max(
        1,
        Math.ceil(filteredSchemes.length / itemsPerPage)
    )

    const safeCurrentPage = Math.min(currentPage, totalPages)

    const paginatedSchemes = filteredSchemes.slice(
        (safeCurrentPage - 1) * itemsPerPage,
        safeCurrentPage * itemsPerPage
    )

    const activeCount = schemesData.filter(
        (scheme) => scheme.status === "ACTIVE"
    ).length

    const upcomingCount = schemesData.filter(
        (scheme) => scheme.status === "UPCOMING"
    ).length

    const closedCount = schemesData.filter(
        (scheme) => scheme.status === "CLOSED"
    ).length

    const inactiveCount = schemesData.filter(
        (scheme) => scheme.status === "INACTIVE"
    ).length

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All")
        setLevelFilter("All")
        setCategoryFilter("All")
        setCurrentPage(1)
    }

    const hasFilters =
        search ||
        statusFilter !== "All" ||
        levelFilter !== "All" ||
        categoryFilter !== "All"

    return (
        <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <span>Content</span>
                            <span>/</span>
                            <span className="font-medium text-green-700">
                                Schemes
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Government Schemes
                        </h1>

                        <p className="mt-1 max-w-3xl text-sm text-gray-500">
                            Manage government scheme information, eligibility,
                            benefits, deadlines, verification and status.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/schemes/new"
                        className="kr-hover-button inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800 sm:w-auto"
                    >
                        <Plus size={18} />
                        Add Scheme
                    </Link>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="flex min-h-64 items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                            <RefreshCw
                                size={18}
                                className="animate-spin text-green-700"
                            />
                            Loading schemes...
                        </div>
                    </div>
                )}

                {/* Error */}
                {isError && !isLoading && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="font-semibold text-red-900">
                                    Unable to load schemes
                                </h3>

                                <p className="mt-1 text-sm text-red-700">
                                    Something went wrong while fetching scheme
                                    information.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        {/* Summary */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                            <SummaryCard
                                label="Total Schemes"
                                value={schemesData.length}
                                description="Scheme records"
                                icon={<Landmark size={20} />}
                            />

                            <SummaryCard
                                label="Active"
                                value={activeCount}
                                description="Currently active"
                                icon={<CheckCircle2 size={20} />}
                            />

                            <SummaryCard
                                label="Upcoming"
                                value={upcomingCount}
                                description="Upcoming schemes"
                                icon={<Clock3 size={20} />}
                            />

                            <SummaryCard
                                label="Closed"
                                value={closedCount}
                                description="Closed schemes"
                                icon={<AlertTriangle size={20} />}
                            />

                            <SummaryCard
                                label="Inactive"
                                value={inactiveCount}
                                description="Inactive records"
                                icon={<FileEdit size={20} />}
                            />
                        </div>

                        {/* Search & Filters */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                                <div className="relative min-w-0 flex-1">
                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) => {
                                            setSearch(event.target.value)
                                            setCurrentPage(1)
                                        }}
                                        placeholder="Search schemes, authority, category or beneficiary..."
                                        className="h-12 w-full rounded-2xl border border-gray-200 bg-[#F6FAF7] pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <select
                                        value={statusFilter}
                                        onChange={(event) => {
                                            setStatusFilter(event.target.value)
                                            setCurrentPage(1)
                                        }}
                                        className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                                    >
                                        <option value="All">
                                            All Statuses
                                        </option>

                                        <option value="ACTIVE">
                                            Active
                                        </option>

                                        <option value="UPCOMING">
                                            Upcoming
                                        </option>

                                        <option value="CLOSED">
                                            Closed
                                        </option>

                                        <option value="INACTIVE">
                                            Inactive
                                        </option>
                                    </select>

                                    <select
                                        value={levelFilter}
                                        onChange={(event) => {
                                            setLevelFilter(event.target.value)
                                            setCurrentPage(1)
                                        }}
                                        className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                                    >
                                        <option value="All">
                                            Central & State
                                        </option>

                                        <option value="CENTRAL">
                                            Central
                                        </option>

                                        <option value="STATE">
                                            State
                                        </option>
                                    </select>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowFilters(
                                                (current) => !current
                                            )
                                        }
                                        className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition ${
                                            showFilters
                                                ? "border-green-200 bg-green-50 text-green-700"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                        }`}
                                    >
                                        <SlidersHorizontal size={17} />
                                        More Filters
                                    </button>
                                </div>
                            </div>

                            {showFilters && (
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div>
                                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Scheme Category
                                            </label>

                                            <select
                                                value={categoryFilter}
                                                onChange={(event) => {
                                                    setCategoryFilter(
                                                        event.target.value
                                                    )
                                                    setCurrentPage(1)
                                                }}
                                                className="h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100"
                                            >
                                                {categories.map(
                                                    (category) => (
                                                        <option
                                                            key={category}
                                                            value={category}
                                                        >
                                                            {category === "All"
                                                                ? "All Categories"
                                                                : category}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <div className="flex items-end">
                                            {hasFilters && (
                                                <button
                                                    type="button"
                                                    onClick={clearFilters}
                                                    className="inline-flex h-11 items-center gap-2 rounded-2xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <X size={16} />
                                                    Clear Filters
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Verification Reminder */}
                        <div className="flex flex-col gap-4 rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                                    <ShieldCheck size={18} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-amber-900">
                                        Scheme verification
                                    </h3>

                                    <p className="mt-1 max-w-3xl text-xs leading-5 text-amber-800/80">
                                        Scheme information should be periodically
                                        verified so beneficiaries can see when
                                        the information was last checked.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                            <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        Scheme Directory
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {filteredSchemes.length} scheme
                                        {filteredSchemes.length !== 1
                                            ? "s"
                                            : ""}{" "}
                                        found
                                    </p>
                                </div>

                                <span className="text-xs text-gray-400">
                                    {isFetching && !isLoading
                                        ? "Refreshing..."
                                        : `Showing ${
                                              filteredSchemes.length === 0
                                                  ? 0
                                                  : (safeCurrentPage - 1) *
                                                        itemsPerPage +
                                                    1
                                          } - ${Math.min(
                                              safeCurrentPage * itemsPerPage,
                                              filteredSchemes.length
                                          )} of ${filteredSchemes.length}`}
                                </span>
                            </div>

                            {paginatedSchemes.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-312.5">
                                            <thead>
                                                <tr className="border-b border-gray-100 bg-[#FAFCFB] text-left">
                                                    <TableHeading>
                                                        Scheme
                                                    </TableHeading>

                                                    <TableHeading>
                                                        Authority
                                                    </TableHeading>

                                                    <TableHeading>
                                                        Category
                                                    </TableHeading>

                                                    <TableHeading>
                                                        Deadline
                                                    </TableHeading>

                                                    <TableHeading>
                                                        Last Verified
                                                    </TableHeading>

                                                    <TableHeading>
                                                        Status
                                                    </TableHeading>

                                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-100">
                                                {paginatedSchemes.map(
                                                    (scheme) => (
                                                        <tr
                                                            key={scheme.id}
                                                            className="transition hover:bg-[#FAFCFB]"
                                                        >
                                                            <td className="px-6 py-5">
                                                                <div className="flex min-w-75 items-start gap-3">
                                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                                        <Landmark
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <p className="font-semibold text-gray-900">
                                                                            {
                                                                                scheme.name
                                                                            }
                                                                        </p>

                                                                        <p className="mt-1 text-xs text-gray-400">
                                                                            /schemes/
                                                                            {
                                                                                scheme.slug
                                                                            }
                                                                        </p>

                                                                        <p className="mt-1 text-xs text-gray-500">
                                                                            For{" "}
                                                                            {
                                                                                scheme.beneficiary
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <p className="max-w-52.5 text-sm font-medium text-gray-700">
                                                                    {
                                                                        scheme.authority
                                                                    }
                                                                </p>

                                                                <span
                                                                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                                                        levelStyles[
                                                                            scheme
                                                                                .level
                                                                        ] ??
                                                                        "bg-gray-100 text-gray-600"
                                                                    }`}
                                                                >
                                                                    {levelLabels[
                                                                        scheme
                                                                            .level
                                                                    ] ??
                                                                        scheme.level}
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <span className="inline-flex rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                                                    {
                                                                        scheme.category
                                                                    }
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                                    <CalendarDays
                                                                        size={
                                                                            15
                                                                        }
                                                                        className="text-gray-400"
                                                                    />

                                                                    {formatDate(
                                                                        scheme.deadline
                                                                    )}
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <div className="flex items-start gap-2">
                                                                    <ShieldCheck
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="mt-0.5 shrink-0 text-green-600"
                                                                    />

                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-700">
                                                                            {formatDate(
                                                                                scheme.last_verified
                                                                            )}
                                                                        </p>

                                                                        <p className="mt-1 text-[11px] text-gray-400">
                                                                            Verification
                                                                            date
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <span
                                                                    className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                                                        statusStyles[
                                                                            scheme
                                                                                .status
                                                                        ] ??
                                                                        "border-gray-200 bg-gray-100 text-gray-600"
                                                                    }`}
                                                                >
                                                                    {statusLabels[
                                                                        scheme
                                                                            .status
                                                                    ] ??
                                                                        scheme.status}
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <div className="flex items-center justify-end gap-1">
                                                                    <Link
                                                                        to={`/admin/content/schemes/${scheme.id}`}
                                                                        title="View scheme"
                                                                        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                                    >
                                                                        <Eye
                                                                            size={
                                                                                17
                                                                            }
                                                                        />
                                                                    </Link>

                                                                    <Link
                                                                        to={`/admin/content/schemes/${scheme.id}/edit`}
                                                                        title="Edit scheme"
                                                                        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                                    >
                                                                        <Pencil
                                                                            size={
                                                                                17
                                                                            }
                                                                        />
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
                                            Page {safeCurrentPage} of{" "}
                                            {totalPages}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                disabled={
                                                    safeCurrentPage === 1
                                                }
                                                onClick={() =>
                                                    setCurrentPage(
                                                        (current) =>
                                                            Math.max(
                                                                1,
                                                                current - 1
                                                            )
                                                    )
                                                }
                                                className="flex h-9 items-center gap-1 rounded-xl border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <ChevronLeft size={16} />
                                                Previous
                                            </button>

                                            <div className="hidden items-center gap-1 sm:flex">
                                                {Array.from(
                                                    {
                                                        length: totalPages,
                                                    },
                                                    (_, index) => index + 1
                                                ).map((page) => (
                                                    <button
                                                        key={page}
                                                        type="button"
                                                        onClick={() =>
                                                            setCurrentPage(
                                                                page
                                                            )
                                                        }
                                                        className={`h-9 min-w-9 rounded-xl px-3 text-sm font-semibold transition ${
                                                            page ===
                                                            safeCurrentPage
                                                                ? "bg-green-700 text-white"
                                                                : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                type="button"
                                                disabled={
                                                    safeCurrentPage ===
                                                    totalPages
                                                }
                                                onClick={() =>
                                                    setCurrentPage(
                                                        (current) =>
                                                            Math.min(
                                                                totalPages,
                                                                current + 1
                                                            )
                                                    )
                                                }
                                                className="flex h-9 items-center gap-1 rounded-xl border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Next
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="px-6 py-16 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                        <Landmark size={24} />
                                    </div>

                                    <h3 className="mt-4 text-base font-semibold text-gray-900">
                                        No schemes found
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                                        No scheme matches the current search
                                        and filters.
                                    </p>

                                    {hasFilters && (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                                        >
                                            <X size={16} />
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

const SummaryCard = ({
    label,
    value,
    description,
    icon,
}) => {
    return (
        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        {description}
                    </p>
                </div>

                <div className="kr-hover-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    {icon}
                </div>
            </div>
        </div>
    )
}

const TableHeading = ({ children }) => {
    return (
        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {children}
        </th>
    )
}

export default Schemes