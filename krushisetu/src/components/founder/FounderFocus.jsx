import {
    Sprout,
    BriefcaseBusiness,
    Users,
    Leaf,
} from "lucide-react"

const focusAreas = [
    {
        icon: Sprout,
        title: "Farmer Empowerment",
        description:
            "Supporting initiatives focused on strengthening farmers through knowledge, guidance and development opportunities.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Agricultural Entrepreneurship",
        description:
            "Encouraging agricultural entrepreneurship and opportunities connected to rural livelihoods.",
    },
    {
        icon: Users,
        title: "Rural Livelihoods",
        description:
            "Contributing to programs that support rural communities, women, youth and agricultural stakeholders.",
    },
    {
        icon: Leaf,
        title: "Sustainable Development",
        description:
            "Guiding work that promotes sustainable agricultural and rural development.",
    },
]

const FounderFocus = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#F6FAF7] px-6 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
            {/* Background Decoration */}
            <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-green-100/50 " />

            <div className="absolute -right-40 -bottom-40 h-125 w-125 rounded-full bg-lime-100/40 " />

            <div className="relative z-10 mx-auto max-w-350">
                {/* Section Heading */}
                <div className="max-w-4xl">
                    <p className="text-sm font-bold tracking-widest text-green-700">
                        AREAS OF FOCUS
                    </p>

                    <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-wide text-gray-950 sm:text-5xl lg:text-6xl">
                        Connecting her{" "}
                        <span className="text-green-800">
                            background
                        </span>{" "}
                        with impact
                    </h2>

                    <div className="mt-5 h-0.5 w-28 rounded-2xl bg-green-600" />

                    <p className="mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                        Her academic background and social-development focus
                        provide the foundation for Krushisetu's work in
                        agriculture and rural development.
                    </p>
                </div>

                {/* Focus Areas */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {focusAreas.map((area) => {
                        const Icon = area.icon

                        return (
                            <div
                                key={area.title}
                                className="kr-hover-card group rounded-4xl border border-gray-200 bg-white/85 p-7 shadow-xl shadow-gray-900/10"
                            >
                                {/* Icon */}
                                <div className="kr-hover-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800">
                                    <Icon
                                        size={27}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="kr-hover-title mt-7 text-xl font-bold text-green-900">
                                    {area.title}
                                </h3>

                                {/* Divider */}
                                <div className="kr-hover-line mt-4 h-px w-12 rounded-full bg-green-600" />

                                {/* Description */}
                                <p className="mt-4 text-sm leading-7 text-gray-600">
                                    {area.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FounderFocus