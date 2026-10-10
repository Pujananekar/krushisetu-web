const objectives = [
    {
        number: "01",
        title: "Agriculture Knowledge",
        description:
            "Improve farmers’ access to reliable agriculture knowledge, advisory services, and expert support.",
    },
    {
        number: "02",
        title: "Government Scheme Awareness",
        description:
            "Increase awareness of eligible government schemes and provide transparent facilitation assistance.",
    },
    {
        number: "03",
        title: "Practical Skills",
        description:
            "Build practical skills in farming, livestock, food processing, agribusiness, branding, packaging, and marketing.",
    },
    {
        number: "04",
        title: "Support Rural Communities",
        description:
            "Support FPOs, producer companies, SHGs, rural youth, women farmers, and agriculture entrepreneurs.",
    },
    {
        number: "05",
        title: "Sustainable Agriculture",
        description:
            "Promote organic, natural, climate-smart, water-efficient, and technology-enabled agriculture.",
    },
    {
        number: "06",
        title: "Institutional Linkages",
        description:
            "Develop linkages with government departments, agriculture institutions, colleges, banks, CSR partners, markets, and research organisations.",
    },
    {
        number: "07",
        title: "Measurable Social Impact",
        description:
            "Document and publish measurable social impact without disclosing confidential financial or beneficiary information.",
    },
]

const ObjectivesSection = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#F6FAF7] px-6 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
            <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-green-100/50 " />
            <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-green-100/40 " />

            <div className="relative z-10 mx-auto max-w-350">
                {/* Heading */}
                <div className="max-w-4xl">
                    <p className="text-sm font-bold tracking-widest text-green-700">
                        WHAT WE AIM TO ACHIEVE
                    </p>

                    <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-wide text-gray-950 sm:text-5xl lg:text-6xl">
                        Our{" "}
                        <span className="text-green-800">
                            Objectives
                        </span>
                    </h2>

                    <div className="mt-5 h-0.5 w-28 rounded-2xl bg-green-600" />

                    <p className="mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                        Krushisetu focuses on practical support that helps
                        farmers, rural communities and agricultural
                        entrepreneurs access knowledge, opportunities and
                        sustainable development pathways.
                    </p>
                </div>

                {/* Objectives */}
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {objectives.map((objective) => (
                        <div
                            key={objective.number}
                            className="kr-hover-card group rounded-[28px] border border-gray-200 bg-white/85 p-7 shadow-xl shadow-gray-900/10"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="kr-hover-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 font-bold text-green-800">
                                    {objective.number}
                                </div>

                                <div className="kr-hover-line mt-6 h-px flex-1 bg-green-100" />
                            </div>

                            <h3 className="kr-hover-title mt-7 text-xl font-bold text-green-900 sm:text-2xl">
                                {objective.title}
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                                {objective.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ObjectivesSection