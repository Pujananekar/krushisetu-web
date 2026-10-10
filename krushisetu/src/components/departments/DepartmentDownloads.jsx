import { ExternalLink } from "lucide-react"
import DepartmentFallback from "./DepartmentFallback"

const DepartmentDownloads = ({ department }) => {
    const downloads = department.downloads ?? []

    return (
        <section className="relative w-full px-6 py-20 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
            <div className="mx-auto max-w-350">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                    Resources
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                    Downloads
                </h2>

                {downloads.length > 0 ? (
                    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {downloads.map((download, index) => (
                            <a
                                key={download.id ?? index}
                                href={download.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="kr-hover-card group flex items-center justify-between gap-5 rounded-3xl border border-gray-200 bg-white/95 px-6 py-6 shadow-lg shadow-gray-900/5"
                            >
                                <span className="kr-hover-title font-bold text-gray-900">
                                    {download.title}
                                </span>

                                <span className="kr-hover-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <ExternalLink size={18} strokeWidth={2} />
                                </span>
                            </a>
                        ))}
                    </div>
                ) : (
                    <DepartmentFallback
                        title="Download resources unavailable"
                        message="Download resources for this department have not been added yet."
                    />
                )}
            </div>
        </section>
    )
}

export default DepartmentDownloads