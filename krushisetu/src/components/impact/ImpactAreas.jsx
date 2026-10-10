import {
    ArrowRight,
    Droplets,
    Leaf,
    Store,
    Users,
    Wheat,
} from "lucide-react"

const impactAreas = [
    {
        icon: Wheat,
        title: "Farmer Empowerment",
        description:
            "Improving access to agricultural knowledge, advisory support, skills, and practical resources.",
    },
    {
        icon: Users,
        title: "Inclusive Livelihoods",
        description:
            "Supporting rural youth, women, SHGs, FPOs, entrepreneurs, and other rural stakeholders.",
    },
    {
        icon: Leaf,
        title: "Sustainable Agriculture",
        description:
            "Promoting organic, natural, climate-smart, water-efficient, and technology-enabled agriculture.",
    },
    {
        icon: Store,
        title: "Market & Enterprise",
        description:
            "Supporting agribusiness, value addition, branding, packaging, marketing, and institutional linkages.",
    },
    {
        icon: Droplets,
        title: "Rural Resilience",
        description:
            "Contributing to sustainable rural development and responsible natural-resource management.",
    },
]

const ImpactAreas = () => {
    return (
        <section
            id="impact"
            className="px-6 py-16 sm:px-8 lg:px-12 xl:px-16"
        >
            <div className="mx-auto max-w-350">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        Areas of Impact
                    </p>

                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
                        Creating value across
                        <span className="text-green-800">
                            {" "}
                            communities.
                        </span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        Our impact framework focuses on practical outcomes
                        for farmers, rural communities, entrepreneurs,
                        institutions, and the wider agricultural ecosystem.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {impactAreas.map((area) => {
                        const Icon = area.icon

                        return (
                            <div
                                key={area.title}
                                className="kr-hover-card group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/85 p-6 shadow-lg shadow-gray-900/10"
                            >
                                <div className="relative kr-hover-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition-all duration-300 group-hover:bg-green-700 group-hover:text-white">
                                    <Icon
                                        size={27}
                                        strokeWidth={2}
                                    />
                                </div>

                                <h3 className="kr-hover-title relative mt-6 text-xl font-bold text-gray-950">
                                    {area.title}
                                </h3>

                                <div className="kr-hover-line mt-4 h-1 w-10 rounded-full bg-green-600" />

                                <p className="mt-5 text-sm leading-7 text-gray-600">
                                    {area.description}
                                </p>

                                <div className="mt-6 text-sm font-bold text-green-700">
                                    Our Focus Area
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ImpactAreas