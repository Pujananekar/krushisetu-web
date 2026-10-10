import { useQuery } from "@tanstack/react-query"
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    MapPin,
    Users,
    Building2,
    Handshake,
    Target,
    ClipboardList,
    TrendingUp,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"

import axiosInstance from "../../api/axiosInstance"

const ProjectDetails = () => {
    const { slug } = useParams()

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["public-project", slug],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/projects/${slug}`
            )

            return response.data
        },
        enabled: !!slug,
    })

    const project = data?.project

    const formatDate = (date) => {
        if (!date) return null

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    const formatStatus = (status) => {
        if (!status) return ""

        return status
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#F6FAF7] px-6 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-350">
                    <Link
                        to="/projects"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-green-800"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />
                        Back to Projects
                    </Link>

                    <div className="mt-8 animate-pulse space-y-6">
                        <div className="h-12 w-2/3 rounded-2xl bg-gray-200" />
                        <div className="h-6 w-1/3 rounded-xl bg-gray-200" />

                        <div className="flex flex-col gap-px bg-gray-100 sm:flex-row">
                            <div className="h-32 flex-1 rounded-none bg-gray-200" />
                            <div className="h-32 flex-1 rounded-none bg-gray-200" />
                            <div className="h-32 flex-1 rounded-none bg-gray-200" />
                        </div>

                        <div className="h-80 rounded-3xl bg-gray-200" />
                    </div>
                </div>
            </main>
        )
    }

    if (isError || !project) {
        return (
            <main className="min-h-screen bg-[#F6FAF7] px-6 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-350">
                    <Link
                        to="/projects"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-green-800"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />
                        Back to Projects
                    </Link>

                    <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
                            <ClipboardList
                                size={28}
                                className="text-green-700"
                            />
                        </div>

                        <h1 className="mt-6 text-2xl font-bold text-gray-900">
                            Project Not Found
                        </h1>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
                            The project you are looking for could not be
                            found or is currently unavailable.
                        </p>

                        <Link
                            to="/projects"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <ArrowLeft size={16} />
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#F6FAF7] px-6 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">

                {/* Back to Projects */}
                <Link
                    to="/projects"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-green-800"
                >
                    <ArrowLeft
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    Back to Projects
                </Link>

                {/* Hero */}
                <section className="mt-8 overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-sm">
                    <div className="relative overflow-hidden bg-green-900 px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-700/30 blur-3xl" />
                        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-green-500/20 blur-3xl" />

                        <div className="relative max-w-5xl">
                            <div className="mb-5 flex flex-wrap items-center gap-3">
                                {project.status && (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                                        <CheckCircle2 size={15} />
                                        {formatStatus(project.status)}
                                    </span>
                                )}

                                {project.theme && (
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-green-100">
                                        {project.theme}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                {project.title}
                            </h1>

                            {project.summary && (
                                <p className="mt-5 max-w-3xl text-sm leading-7 text-green-50 sm:text-base">
                                    {project.summary}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Project Information Cards */}
                    <div className="flex flex-col gap-px bg-gray-100 sm:flex-row">
                        {project.geography && (
                            <div className="min-w-0 flex-1 basis-0 bg-white p-6">
                                <MapPin
                                    size={20}
                                    className="text-green-700"
                                />

                                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Geography
                                </p>

                                <p className="mt-1 text-sm font-semibold leading-5 text-gray-800">
                                    {project.geography}
                                </p>
                            </div>
                        )}

                        {project.department_name && (
                            <div className="min-w-0 flex-1 basis-0 bg-white p-6">
                                <Building2
                                    size={20}
                                    className="text-green-700"
                                />

                                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Department
                                </p>

                                <p className="mt-1 text-sm font-semibold leading-5 text-gray-800">
                                    {project.department_name}
                                </p>
                            </div>
                        )}

                        {project.target_group && (
                            <div className="min-w-0 flex-1 basis-0 bg-white p-6">
                                <Users
                                    size={20}
                                    className="text-green-700"
                                />

                                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Target Group
                                </p>

                                <p className="mt-1 text-sm font-semibold leading-5 text-gray-800">
                                    {project.target_group}
                                </p>
                            </div>
                        )}

                        {project.partners && (
                            <div className="min-w-0 flex-1 basis-0 bg-white p-6">
                                <Handshake
                                    size={20}
                                    className="text-green-700"
                                />

                                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Partners
                                </p>

                                <p className="mt-1 text-sm font-semibold leading-5 text-gray-800">
                                    {project.partners}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Project Duration */}
                {(project.start_date || project.end_date) && (
                    <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50">
                                <CalendarDays
                                    size={21}
                                    className="text-green-700"
                                />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Project Duration
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                    {formatDate(project.start_date) ||
                                        "Start date unavailable"}

                                    {" — "}

                                    {formatDate(project.end_date) ||
                                        "Ongoing"}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Main Content */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.7fr_1fr]">

                    {/* Left Content */}
                    <div className="space-y-6">

                        {project.problem_statement && (
                            <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50">
                                        <Target
                                            size={21}
                                            className="text-green-700"
                                        />
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900">
                                        The Challenge
                                    </h2>
                                </div>

                                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {project.problem_statement}
                                </p>
                            </section>
                        )}

                        {project.activities && (
                            <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50">
                                        <ClipboardList
                                            size={21}
                                            className="text-green-700"
                                        />
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900">
                                        Key Activities
                                    </h2>
                                </div>

                                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {project.activities}
                                </p>
                            </section>
                        )}

                        {project.outcomes && (
                            <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50">
                                        <TrendingUp
                                            size={21}
                                            className="text-green-700"
                                        />
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900">
                                        Expected Outcomes
                                    </h2>
                                </div>

                                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {project.outcomes}
                                </p>
                            </section>
                        )}

                    </div>

                    {/* Right Sidebar */}
                    <aside className="space-y-6">

                        {project.media_url && (
                            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                                <img
                                    src={project.media_url}
                                    alt={project.title}
                                    className="h-64 w-full object-cover"
                                />
                            </div>
                        )}

                        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900">
                                Project Information
                            </h2>

                            <div className="mt-5 space-y-5">

                                {project.theme && (
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Theme
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-700">
                                            {project.theme}
                                        </p>
                                    </div>
                                )}

                                {project.geography && (
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Location
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-700">
                                            {project.geography}
                                        </p>
                                    </div>
                                )}

                                {project.target_group && (
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Beneficiaries
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-700">
                                            {project.target_group}
                                        </p>
                                    </div>
                                )}

                                {project.partners && (
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Partners
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-700">
                                            {project.partners}
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>

                    </aside>
                </div>

                {/* Back CTA */}
                <div className="mt-10 text-center">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-800 hover:shadow-lg"
                    >
                        <ArrowLeft size={17} />
                        Explore All Projects
                    </Link>
                </div>

            </div>
        </main>
    )
}

export default ProjectDetails