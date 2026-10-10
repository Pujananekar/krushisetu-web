const values = [
    {
        title: "Farmer First",
        description:
            "Design services around real farm and livelihood needs.",
    },
    {
        title: "Trust & Transparency",
        description:
            "Explain processes, limitations, documents, and responsibilities clearly.",
    },
    {
        title: "Inclusion",
        description:
            "Serve smallholders, women, youth, SHGs, and underserved rural communities.",
    },
    {
        title: "Practical Knowledge",
        description:
            "Prioritise actionable guidance, demonstrations, and measurable outcomes.",
    },
    {
        title: "Sustainability",
        description:
            "Promote responsible use of soil, water, biodiversity, and climate-resilient practices.",
    },
    {
        title: "Collaboration",
        description:
            "Work with public institutions, experts, colleges, companies, and community organisations.",
    },
]

const ValuesSection = () => {
    return (
        <section className="relative w-full overflow-hidden bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
            <div className="relative z-10 mx-auto max-w-350">
                {/* Heading */}
                <div className="max-w-4xl">
                    <p className="text-sm font-bold tracking-widest text-green-700">
                        WHAT GUIDES US
                    </p>

                    <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-wide text-gray-950 sm:text-5xl lg:text-6xl">
                        Our Core{" "}
                        <span className="text-green-800">
                            Values
                        </span>
                    </h2>

                    <div className="mt-5 h-0.5 w-28 rounded-2xl bg-green-600" />

                    <p className="mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                        These principles shape how Krushisetu works with
                        farmers, communities, institutions and development
                        partners.
                    </p>
                </div>

                {/* Values */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {values.map((value, index) => (
                        <div
                            key={value.title}
                            className="kr-hover-card group rounded-[28px] border border-gray-200 bg-white/85 p-7 shadow-xl shadow-gray-900/10"
                        >
                            <div className="flex items-center gap-4">
                                <div className="kr-hover-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 font-bold text-green-800">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="kr-hover-line h-px flex-1 bg-green-100" />
                            </div>

                            <h3 className="kr-hover-title mt-7 text-xl font-bold text-green-900 sm:text-2xl">
                                {value.title}
                            </h3>

                            <div className="mt-4 h-px w-12 rounded-full bg-green-600" />

                            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ValuesSection