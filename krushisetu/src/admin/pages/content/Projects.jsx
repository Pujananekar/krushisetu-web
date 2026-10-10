import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import {
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Edit3,
    Eye,
    Filter,
    MapPin,
    Plus,
    Search,
    Users,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import { getAdminProjects } from "../../api/adminProjectsApi.js"

const statuses = [
    {
        value: "PLANNING",
        label: "Planning",
    },
    {
        value: "ACTIVE",
        label: "Active",
    },
    {
        value: "COMPLETED",
        label: "Completed",
    },
    {
        value: "ON_HOLD",
        label: "On Hold",
    },
]

const getStatusLabel = (status) => {
    const foundStatus = statuses.find(
        (item) => item.value === status
    )

    return foundStatus?.label || status || "—"
}

const getStatusClasses = (status) => {
    switch (status) {
        case "ACTIVE":
            return "border-green-200 bg-green-50 text-green-700"

        case "PLANNING":
            return "border-amber-200 bg-amber-50 text-amber-700"

        case "COMPLETED":
            return "border-blue-200 bg-blue-50 text-blue-700"

        case "ON_HOLD":
            return "border-orange-200 bg-orange-50 text-orange-700"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}

const formatDate = (date) => {
    if (!date) {
        return "—"
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return "—"
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const Projects = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [page, setPage] = useState(1)

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["admin-projects"],
        queryFn: getAdminProjects,
    })

    const projects = data?.projects ?? []

    const filteredProjects = useMemo(() => {
        const query = search.toLowerCase().trim()

        return projects.filter((project) => {
            const matchesSearch =
                !query ||
                project.title?.toLowerCase().includes(query) ||
                project.slug?.toLowerCase().includes(query) ||
                project.theme?.toLowerCase().includes(query) ||
                project.department_name
                    ?.toLowerCase()
                    .includes(query) ||
                project.geography
                    ?.toLowerCase()
                    .includes(query) ||
                project.target_group
                    ?.toLowerCase()
                    .includes(query)

            const matchesStatus =
                statusFilter === "All" ||
                project.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [projects, search, statusFilter])

    const activeCount = projects.filter(
        (project) => project.status === "ACTIVE"
    ).length

    const planningCount = projects.filter(
        (project) => project.status === "PLANNING"
    ).length

    const completedCount = projects.filter(
        (project) => project.status === "COMPLETED"
    ).length

    const onHoldCount = projects.filter(
        (project) => project.status === "ON_HOLD"
    ).length

    const pageSize = 6

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProjects.length / pageSize)
    )

    const currentPage = Math.min(page, totalPages)

    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All")
        setPage(1)
    }

    if (isLoading) {
        return <Loader text="Loading projects..." />
    }

    if (isError) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1600px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <BriefcaseBusiness className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load projects
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Something went wrong while fetching project
                            records from the server.
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
                            <BriefcaseBusiness className="h-4 w-4" />

                            <span>Content Management</span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                Projects
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Projects
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage Krushisetu projects, implementation
                            timelines, locations and project information.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/projects/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Project
                    </Link>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Projects
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {projects.length}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <BriefcaseBusiness className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            All project records
                        </p>
                    </div>

                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Active
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {activeCount}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Currently active
                        </p>
                    </div>

                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Planning
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {planningCount}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                                <CalendarDays className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Projects being prepared
                        </p>
                    </div>

                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Completed
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {completedCount}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Successfully completed
                        </p>
                    </div>
                </div>

                {/* On Hold */}
                {onHoldCount > 0 && (
                    <div className="rounded-3xl border border-orange-100 bg-orange-50/60 p-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-sm">
                                <Clock3 className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-orange-900">
                                    Projects on hold
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-orange-800/80">
                                    {onHoldCount} project
                                    {onHoldCount !== 1
                                        ? "s are"
                                        : " is"}{" "}
                                    currently marked as on hold.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                        <div className="relative min-w-0 flex-1">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setPage(1)
                                }}
                                placeholder="Search projects, themes, departments or locations..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value)
                                    setPage(1)
                                }}
                                className="h-11 w-full min-w-[180px] appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            >
                                <option value="All">
                                    All statuses
                                </option>

                                {statuses.map((status) => (
                                    <option
                                        key={status.value}
                                        value={status.value}
                                    >
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {(search || statusFilter !== "All") && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="h-11 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                    <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Project Records
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredProjects.length} project
                                {filteredProjects.length !== 1
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
                        <table className="w-full min-w-[1200px]">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70">

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Project
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Theme
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Department
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Location
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Timeline
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Target Group
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

                                {paginatedProjects.length > 0 ? (
                                    paginatedProjects.map((project) => (
                                        <tr
                                            key={project.id}
                                            className="group transition hover:bg-green-50/30"
                                        >

                                            {/* Project */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                        <BriefcaseBusiness className="h-4 w-4" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="max-w-[250px] truncate text-sm font-semibold text-gray-900">
                                                            {project.title}
                                                        </p>

                                                        <p className="mt-1 max-w-[250px] truncate text-xs text-gray-400">
                                                            {project.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Theme */}
                                            <td className="px-5 py-4">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {project.theme || "—"}
                                                </span>
                                            </td>

                                            {/* Department */}
                                            <td className="px-5 py-4">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {project.department_name ||
                                                        "—"}
                                                </span>
                                            </td>

                                            {/* Location */}
                                            <td className="px-5 py-4">
                                                <div className="flex max-w-[190px] items-start gap-2">
                                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                                    <span className="text-sm text-gray-600">
                                                        {project.geography ||
                                                            "—"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Timeline */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-start gap-2">
                                                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                                    <div className="flex flex-col text-nowrap">
                                                        <p className="text-sm font-medium text-gray-700">
                                                            {formatDate(
                                                                project.start_date
                                                            )}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            to{" "}
                                                            {formatDate(
                                                                project.end_date
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Target Group */}
                                            <td className="px-5 py-4">
                                                <div className="flex max-w-[220px] items-start gap-2">
                                                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                                    <span className="text-sm text-gray-600">
                                                        {project.target_group ||
                                                            "—"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                                        project.status
                                                    )}`}
                                                >
                                                    {getStatusLabel(
                                                        project.status
                                                    )}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        to={`/admin/content/projects/${project.id}`}
                                                        title="View project"
                                                        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>

                                                    <Link
                                                        to={`/admin/content/projects/${project.id}/edit`}
                                                        title="Edit project"
                                                        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-20 text-center"
                                        >
                                            <div className="mx-auto flex max-w-md flex-col items-center">

                                                {/* Empty State Icon */}
                                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                    <BriefcaseBusiness className="h-7 w-7" />
                                                </div>

                                                {/* Empty State Title */}
                                                <h3 className="mt-5 text-base font-bold text-gray-900">
                                                    {projects.length === 0
                                                        ? "No projects available"
                                                        : "No projects found"}
                                                </h3>

                                                {/* Empty State Message */}
                                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                                    {projects.length === 0
                                                        ? "No project records have been added yet. Start by creating your first project."
                                                        : "No projects match your current search or status filter."}
                                                </p>

                                                {/* Empty State Actions */}
                                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                                                    {(search ||
                                                        statusFilter !==
                                                            "All") && (
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                clearFilters
                                                            }
                                                            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            Clear Filters
                                                        </button>
                                                    )}

                                                    {projects.length === 0 &&
                                                        !search &&
                                                        statusFilter ===
                                                            "All" && (
                                                            <Link
                                                                to="/admin/content/projects/new"
                                                                className="kr-hover-button inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                                Add Project
                                                            </Link>
                                                        )}
                                                </div>
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
                                {filteredProjects.length === 0
                                    ? 0
                                    : (currentPage - 1) * pageSize + 1}
                            </span>{" "}
                            to{" "}
                            <span className="font-semibold text-gray-700">
                                {Math.min(
                                    currentPage * pageSize,
                                    filteredProjects.length
                                )}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-700">
                                {filteredProjects.length}
                            </span>
                        </p>

                        <div className="flex items-center gap-2">

                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setPage((previous) =>
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
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setPage((previous) =>
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
            </div>
        </section>
    )
}

export default Projects