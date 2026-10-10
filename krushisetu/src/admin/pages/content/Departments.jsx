import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import {
    Search,
    SlidersHorizontal,
    Eye,
    Pencil,
    Building2,
    ChevronLeft,
    ChevronRight,
    X,
    RefreshCw,
    AlertCircle,
} from "lucide-react"
import { getAdminDepartments } from "../../api/adminDepartmentsApi.js"


const Departments = () => {
    const [search, setSearch] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 8

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["admin", "departments"],
        queryFn: getAdminDepartments,
    })

    const departments = useMemo(() => {
        if (!data?.data) {
            return []
        }

        return Array.isArray(data.data) ? data.data : []
    }, [data])

    const filteredDepartments = useMemo(() => {
        const searchValue = search.toLowerCase().trim()

        if (!searchValue) {
            return departments
        }

        return departments.filter((department) => {
            const title = department.title?.toLowerCase() || ""
            const slug = department.slug?.toLowerCase() || ""
            const description =
                department.description?.toLowerCase() || ""

            return (
                title.includes(searchValue) ||
                slug.includes(searchValue) ||
                description.includes(searchValue)
            )
        })
    }, [departments, search])

    const totalPages = Math.max(
        1,
        Math.ceil(filteredDepartments.length / itemsPerPage),
    )

    const safeCurrentPage = Math.min(
        currentPage,
        totalPages,
    )

    const paginatedDepartments = filteredDepartments.slice(
        (safeCurrentPage - 1) * itemsPerPage,
        safeCurrentPage * itemsPerPage,
    )

    const handleSearch = (value) => {
        setSearch(value)
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSearch("")
        setCurrentPage(1)
    }

    const hasFilters = Boolean(search)

    const totalDepartments = departments.length

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
                                Departments
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Departments
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage Krushisetu departments, descriptions,
                            services and public-facing department information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="kr-hover-button inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        <RefreshCw
                            size={17}
                            className={isFetching ? "animate-spin" : ""}
                        />

                        Refresh
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Departments
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {isLoading ? "—" : totalDepartments}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Registered departments
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <Building2 size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Search Results
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {isLoading
                                        ? "—"
                                        : filteredDepartments.length}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Matching departments
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <Search size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search + Filters */}
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
                                onChange={(event) =>
                                    handleSearch(event.target.value)
                                }
                                placeholder="Search departments..."
                                className="h-12 w-full rounded-2xl border border-gray-200 bg-[#F6FAF7] pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setShowFilters((value) => !value)
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

                    {showFilters && (
                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Available filters
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Departments currently support search
                                        by title, slug and description.
                                    </p>
                                </div>

                                {hasFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-2xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <X size={16} />
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {hasFilters && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium text-gray-500">
                                Active filters:
                            </span>

                            {search && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                                    Search: {search}
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-gray-500 transition hover:text-red-600"
                            >
                                <X size={13} />
                                Clear
                            </button>
                        </div>
                    )}
                </div>

                {/* Error */}
                {isError && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm">
                                <AlertCircle size={19} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-semibold text-red-900">
                                    Unable to load departments
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-red-800/80">
                                    {error?.response?.data?.message ||
                                        error?.message ||
                                        "Something went wrong while fetching departments."}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => refetch()}
                                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                                >
                                    <RefreshCw size={15} />
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Department Directory
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {isLoading
                                    ? "Loading departments..."
                                    : `${filteredDepartments.length} department${
                                          filteredDepartments.length !== 1
                                              ? "s"
                                              : ""
                                      } found`}
                            </p>
                        </div>

                        {!isLoading && !isError && (
                            <span className="text-xs text-gray-400">
                                Showing{" "}
                                {filteredDepartments.length === 0
                                    ? 0
                                    : (safeCurrentPage - 1) *
                                          itemsPerPage +
                                      1}{" "}
                                -{" "}
                                {Math.min(
                                    safeCurrentPage * itemsPerPage,
                                    filteredDepartments.length,
                                )}{" "}
                                of {filteredDepartments.length}
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="px-6 py-16">
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <RefreshCw
                                        size={24}
                                        className="animate-spin"
                                    />
                                </div>

                                <h3 className="mt-4 text-base font-semibold text-gray-900">
                                    Loading departments
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Fetching department data from the server...
                                </p>
                            </div>
                        </div>
                    ) : isError ? (
                        <div className="px-6 py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                <AlertCircle size={24} />
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-gray-900">
                                Departments could not be loaded
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                                Check that the backend server is running and
                                the admin departments API is available.
                            </p>

                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <RefreshCw size={16} />
                                Retry
                            </button>
                        </div>
                    ) : paginatedDepartments.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-300 w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-[#FAFCFB] text-left">
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Department
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Slug
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Description
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                CTA
                                            </th>

                                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {paginatedDepartments.map(
                                            (department) => (
                                                <tr
                                                    key={department.id}
                                                    className="transition hover:bg-[#FAFCFB]"
                                                >
                                                    {/* Department */}
                                                    <td className="px-6 py-5">
                                                        <div className="flex min-w-[260px] items-start gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                                <Building2
                                                                    size={18}
                                                                />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-gray-900">
                                                                    {
                                                                        department.title
                                                                    }
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    ID:{" "}
                                                                    {
                                                                        department.id
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Slug */}
                                                    <td className="px-6 py-5">
                                                        <code className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600">
                                                            {department.slug}
                                                        </code>
                                                    </td>

                                                    {/* Description */}
                                                    <td className="px-6 py-5">
                                                        <p className="max-w-[420px] text-sm leading-6 line-clamp-4 text-gray-600">
                                                            {
                                                                department.description
                                                            }
                                                        </p>
                                                    </td>

                                                    {/* CTA */}
                                                    <td className="px-6 py-5 whitespace-nowrap">
                                                        <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                                                            {department.cta ||
                                                                "—"}
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Link
                                                                to={`/admin/content/departments/${department.id}`}
                                                                title="View department"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye
                                                                    size={17}
                                                                />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/content/departments/${department.id}/edit`}
                                                                title="Edit department"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Pencil
                                                                    size={17}
                                                                />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                <p className="text-xs text-gray-500">
                                    Page {safeCurrentPage} of {totalPages}
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={safeCurrentPage === 1}
                                        onClick={() =>
                                            setCurrentPage((page) =>
                                                Math.max(1, page - 1),
                                            )
                                        }
                                        className="flex h-9 items-center gap-1 rounded-xl border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronLeft size={16} />
                                        Previous
                                    </button>

                                    <div className="hidden items-center gap-1 sm:flex">
                                        {Array.from(
                                            { length: totalPages },
                                            (_, index) => index + 1,
                                        ).map((page) => (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                                className={`h-9 min-w-9 rounded-xl px-3 text-sm font-semibold transition ${
                                                    safeCurrentPage === page
                                                        ? "bg-green-700 text-white shadow-sm"
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
                                            safeCurrentPage === totalPages
                                        }
                                        onClick={() =>
                                            setCurrentPage((page) =>
                                                Math.min(
                                                    totalPages,
                                                    page + 1,
                                                ),
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
                                <Building2 size={24} />
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-gray-900">
                                No departments found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                                {hasFilters
                                    ? "Try changing your search to find the department you are looking for."
                                    : "No departments are currently available."}
                            </p>

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                                >
                                    <X size={16} />
                                    Clear Search
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Information Notice */}
                <div className="rounded-3xl border border-green-100 bg-green-50/70 p-5">
                    <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <Building2 size={18} />
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-green-900">
                                Department content management
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-green-800/80">
                                Departments are managed from the existing
                                department records. Title and slug are fixed,
                                while the remaining department content can be
                                maintained through the department editor.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Departments