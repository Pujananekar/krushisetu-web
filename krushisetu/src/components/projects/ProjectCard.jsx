import { ArrowRight, FolderKanban } from "lucide-react"
import { Link } from "react-router-dom"

const ProjectCard = ({ project }) => {
    return (
        <Link to={`/projects/${project.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white/85 p-6 shadow-xl shadow-gray-900/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-green-200 hover:shadow-[0_25px_60px_-15px_rgba(22,101,52,0.2)]">
            <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-green-700 transition-transform duration-500 group-hover:scale-x-100" />

            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-100/50 blur-2xl transition-all duration-500 group-hover:bg-green-200/70" />

            <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition-all duration-500 group-hover:scale-110 group-hover:bg-green-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-green-900/20">
                    <FolderKanban size={27} strokeWidth={2} />
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {project.status || "Information Soon"}
                </span>
            </div>

            <div className="relative mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
                    {project.category || "Project"}
                </p>

                <h3 className="mt-2 text-xl font-bold leading-7 text-gray-950 transition-colors duration-300 group-hover:text-green-800">
                    {project.title || "Project Information"}
                </h3>

                <div className="mt-4 h-1 w-10 rounded-full bg-green-600 transition-all duration-500 group-hover:w-16" />

                <p className="mt-4 text-sm leading-6 text-gray-600">
                    {project.description || "Verified information about this project will be available soon."}
                </p>
            </div>

            <div className="relative mt-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <span className="text-xs font-medium text-gray-500">
                    Focus Area
                </span>

                <span className="text-xs font-semibold text-gray-700">
                    {project.focus || "Coming Soon"}
                </span>
            </div>

            <div className="relative mt-auto pt-7">
                <div className="flex items-center gap-2 text-sm font-bold text-green-700">
                    <span>View Project</span>
                    <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-2" />
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard