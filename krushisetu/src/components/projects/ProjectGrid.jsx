import ProjectFallback from "./ProjectFallback"

const ProjectGrid = () => {
    return (
        <section
            id="projects"
            className="px-6 py-8 sm:px-8 lg:px-12 xl:px-16"
        >
            <div className="mx-auto max-w-350">
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        Our Initiatives
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                        Project
                        <span className="text-green-800"> Directory</span>
                    </h2>

                    <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
                        Verified information about Krushisetu projects and
                        initiatives will be added here as it is prepared and
                        reviewed.
                    </p>
                </div>

                <ProjectFallback title="Project Directory Coming Soon" />
            </div>
        </section>
    )
}

export default ProjectGrid