import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    ArrowLeft,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    ExternalLink,
    FileText,
    MapPin,
    Pencil,
    Users,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import { getAdminProjectById } from "../../api/adminProjectsApi.js"

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

const getStatusLabel = (status) => {
    switch (status) {
        case "PLANNING":
            return "Planning"

        case "ACTIVE":
            return "Active"

        case "COMPLETED":
            return "Completed"

        case "ON_HOLD":
            return "On Hold"

        default:
            return status || "—"
    }
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

const ProjectDetails = () => {
    const { id } = useParams()

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["admin-project", id],
        queryFn: () => getAdminProjectById(id),
        enabled: Boolean(id),
    })

    const project =
        data?.project ||
        data?.data ||
        null

    if (isLoading) {
        return <Loader text="Loading project..." />
    }

    if (isError || !project) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1400px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <BriefcaseBusiness className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load project
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                "The requested project could not be found."}
                        </p>

                        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Try Again
                            </button>

                            <Link
                                to="/admin/content/projects"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Projects
                            </Link>
                        </div>
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
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/projects"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                <span>Content</span>

                                <span>/</span>

                                <span>Projects</span>

                                <span>/</span>

                                <span className="font-medium text-green-700">
                                    Details
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {project.title}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                View project information and implementation
                                details.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                            to={`/admin/content/projects/${project.id}/edit`}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <Pencil className="h-4 w-4" />
                            Edit Project
                        </Link>
                    </div>
                </div>

                {/* Hero */}
                <div className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10">
                    <div className="relative bg-linear-to-br from-green-950 via-green-900 to-green-800 px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
                        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-green-400/10 blur-3xl" />

                        <div className="relative max-w-4xl">
                            <div className="mb-5 flex flex-wrap items-center gap-3">
                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                                        project.status
                                    )}`}
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    {getStatusLabel(project.status)}
                                </span>

                                {project.theme && (
                                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
                                        {project.theme}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                {project.title}
                            </h2>

                            <p className="mt-4 text-sm text-green-100/80">
                                /{project.slug}
                            </p>

                            {project.summary && (
                                <p className="mt-6 max-w-3xl text-base leading-8 text-green-50 sm:text-lg">
                                    {project.summary}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Quick Information */}
                    <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                        <div className="flex items-center gap-3 px-6 py-5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                <CalendarDays className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">
                                    Start Date
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                    {formatDate(project.start_date)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-6 py-5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                <CalendarDays className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">
                                    End Date
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                    {formatDate(project.end_date)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-6 py-5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                <MapPin className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-gray-400">
                                    Geography
                                </p>

                                <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                                    {project.geography || "—"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-6 py-5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                <Users className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-gray-400">
                                    Target Group
                                </p>

                                <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                                    {project.target_group || "—"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Left */}
                    <div className="space-y-6">

                        {/* Problem Statement */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <FileText className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Problem Statement
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        The problem addressed by this project.
                                    </p>
                                </div>
                            </div>

                            {project.problem_statement ? (
                                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {project.problem_statement}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400">
                                    No problem statement has been added.
                                </p>
                            )}
                        </section>

                        {/* Activities */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <BriefcaseBusiness className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Activities
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Main activities included in the project.
                                    </p>
                                </div>
                            </div>

                            {project.activities ? (
                                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {project.activities}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400">
                                    No activities have been added.
                                </p>
                            )}
                        </section>

                        {/* Outcomes */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Outcomes
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Expected or achieved project outcomes.
                                    </p>
                                </div>
                            </div>

                            {project.outcomes ? (
                                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {project.outcomes}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400">
                                    No outcomes have been added.
                                </p>
                            )}
                        </section>

                        {/* Partners */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <Users className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Partners
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Organisations associated with the project.
                                    </p>
                                </div>
                            </div>

                            {project.partners ? (
                                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {project.partners}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400">
                                    No partners have been added.
                                </p>
                            )}
                        </section>

                        {/* Media & Documents */}
                        {(project.media_url ||
                            project.documents) && (
                            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                        <FileText className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-gray-900">
                                            Media & Documents
                                        </h2>

                                        <p className="text-xs text-gray-500">
                                            Resources associated with this project.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {project.media_url && (
                                        <a
                                            href={project.media_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                        >
                                            <span className="min-w-0 truncate font-medium">
                                                Project Media
                                            </span>

                                            <ExternalLink className="h-4 w-4 shrink-0" />
                                        </a>
                                    )}

                                    {project.documents && (
                                        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Documents
                                            </p>

                                            <p className="whitespace-pre-line break-words text-sm leading-6 text-gray-600">
                                                {project.documents}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <aside className="space-y-6">

                        {/* Project Information */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="font-bold text-gray-900">
                                Project Information
                            </h2>

                            <div className="mt-5 space-y-4">

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Status
                                    </p>

                                    <span
                                        className={`mt-1 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                            project.status
                                        )}`}
                                    >
                                        {getStatusLabel(
                                            project.status
                                        )}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Theme
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        {project.theme || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Department
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        {project.department_name ||
                                            "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Geography
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        {project.geography || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Target Group
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-gray-700">
                                        {project.target_group ||
                                            "—"}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Timeline */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="font-bold text-gray-900">
                                Timeline
                            </h2>

                            <div className="mt-5 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                        <CalendarDays className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Start Date
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-800">
                                            {formatDate(
                                                project.start_date
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                        <CalendarDays className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            End Date
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-800">
                                            {formatDate(
                                                project.end_date
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Slug */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="font-bold text-gray-900">
                                URL Slug
                            </h2>

                            <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3">
                                <p className="break-all text-sm text-gray-600">
                                    {project.slug || "—"}
                                </p>
                            </div>
                        </section>

                        {/* Edit */}
                        <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                            <p className="text-sm font-semibold text-green-900">
                                Need to update this project?
                            </p>

                            <p className="mt-1 text-xs leading-5 text-green-800/80">
                                Edit the project information whenever
                                implementation details change.
                            </p>

                            <Link
                                to={`/admin/content/projects/${project.id}/edit`}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit Project
                            </Link>
                        </div>
                    </aside>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-3 rounded-3xl border  border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between ">
                    <Link
                        to="/admin/content/projects"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Link>

                    <Link
                        to={`/admin/content/projects/${project.id}/edit`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit Project
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ProjectDetails