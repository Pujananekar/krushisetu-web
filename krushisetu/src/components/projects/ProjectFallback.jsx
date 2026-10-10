import { FolderKanban } from "lucide-react"

const ProjectFallback = ({ title = "Project Information" }) => {
    return (
        <div className="flex min-h-80 items-center justify-center rounded-4xl border border-gray-200 bg-white/85 p-8 text-center shadow-xl shadow-gray-900/10">
            <div className="max-w-xl">
                <div className="kr-hover-icon mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <FolderKanban size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-950">
                    {title}
                </h3>

                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-green-600" />

                <p className="mt-5 text-base leading-7 text-gray-600">
                    Project information is currently being prepared and
                    verified. Please check back soon for updated information
                    from Krushisetu.
                </p>

                <p className="mt-4 text-sm font-medium text-gray-500">
                    Information will be published after verification.
                </p>
            </div>
        </div>
    )
}

export default ProjectFallback