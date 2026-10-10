import { useQuery } from "@tanstack/react-query"
import {
    ArrowRight,
    CalendarDays,
    FolderKanban,
    MapPin,
} from "lucide-react"
import { Link } from "react-router-dom"

import axiosInstance from "../../api/axiosInstance"

const ProjectCategories = () => {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["public-projects"],
        queryFn: async () => {
            const response = await axiosInstance.get("/projects")

            return response.data
        },
    })

    const projects = Array.isArray(data?.projects)
        ? data.projects
        : []

    const formatDate = (date) => {
        if (!date) return null

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) {
            return date
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
    }

    return (
        <section className="px-6 py-16 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        Our Projects
                    </p>

                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
                        Projects focused on
                        <span className="text-green-800">
                            {" "}real needs.
                        </span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        Explore initiatives working across agriculture,
                        livelihoods, rural development, entrepreneurship,
                        and community support.
                    </p>
                </div>

                {isLoading && (
                    <div className="mt-12 rounded-4xl border border-gray-200 bg-white p-12 text-center shadow-lg shadow-gray-900/5">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <FolderKanban
                                size={27}
                                className="animate-pulse"
                            />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-gray-950">
                            Loading projects...
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Please wait while we load the project portfolio.
                        </p>
                    </div>
                )}

                {isError && (
                    <div className="mt-12 rounded-4xl border border-red-100 bg-red-50 p-12 text-center">
                        <h3 className="text-xl font-bold text-red-800">
                            Unable to load projects
                        </h3>

                        <p className="mt-2 text-sm text-red-700">
                            Please try again later.
                        </p>
                    </div>
                )}

                {!isLoading &&
                    !isError &&
                    projects.length === 0 && (
                        <div className="mt-12 rounded-4xl border border-gray-200 bg-white p-12 text-center shadow-lg shadow-gray-900/5">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <FolderKanban size={27} />
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-gray-950">
                                No projects available
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                Project information will appear here once
                                projects are added.
                            </p>
                        </div>
                    )}

                {!isLoading &&
                    !isError &&
                    projects.length > 0 && (
                        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {projects.map((project) => (
                                <Link
                                    key={project.id}
                                    to={`/projects/${project.slug}`}
                                    className="kr-hover-card group relative overflow-hidden rounded-4xl border border-gray-200 bg-white p-7 shadow-xl shadow-gray-900/10 sm:p-8"
                                >
                                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-green-100/40 blur-2xl" />

                                    <div className="relative flex items-start justify-between gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                            <FolderKanban
                                                size={27}
                                                strokeWidth={2}
                                            />
                                        </div>

                                        {project.status && (
                                            <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-green-700">
                                                {project.status.replace(
                                                    /_/g,
                                                    " "
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="kr-hover-title relative mt-7 text-2xl font-bold text-gray-950">
                                        {project.title}
                                    </h3>

                                    <div className="kr-hover-line mt-4 h-1 w-12 rounded-full bg-green-600" />

                                    {project.summary && (
                                        <p className="mt-5 line-clamp-3 text-base leading-7 text-gray-600">
                                            {project.summary}
                                        </p>
                                    )}

                                    <div className="mt-6 space-y-3">
                                        {project.theme && (
                                            <div className="flex items-start gap-3 text-sm text-gray-700">
                                                <FolderKanban
                                                    size={17}
                                                    className="mt-0.5 shrink-0 text-green-700"
                                                />

                                                <span>
                                                    <strong>
                                                        Theme:
                                                    </strong>{" "}
                                                    {project.theme}
                                                </span>
                                            </div>
                                        )}

                                        {project.geography && (
                                            <div className="flex items-start gap-3 text-sm text-gray-700">
                                                <MapPin
                                                    size={17}
                                                    className="mt-0.5 shrink-0 text-green-700"
                                                />

                                                <span>
                                                    {project.geography}
                                                </span>
                                            </div>
                                        )}

                                        {(project.start_date ||
                                            project.end_date) && (
                                            <div className="flex items-start gap-3 text-sm text-gray-700">
                                                <CalendarDays
                                                    size={17}
                                                    className="mt-0.5 shrink-0 text-green-700"
                                                />

                                                <span>
                                                    {formatDate(
                                                        project.start_date
                                                    )}

                                                    {project.end_date &&
                                                        ` — ${formatDate(
                                                            project.end_date
                                                        )}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {project.department_name && (
                                        <div className="mt-6 border-t border-gray-100 pt-5">
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Department
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {project.department_name}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-7 flex items-center gap-2 text-sm font-bold text-green-700">
                                        <span>
                                            View Project
                                        </span>

                                        <ArrowRight
                                            size={17}
                                            className="kr-hover-arrow"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
            </div>
        </section>
    )
}

export default ProjectCategories