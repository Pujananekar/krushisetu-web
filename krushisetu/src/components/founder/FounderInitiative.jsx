import {
    ArrowUpRight,
    Sprout,
    Handshake,
    Leaf,
} from "lucide-react"

const FounderInitiatives = () => {
    const initiatives = [
        {
            title: "Major Initiative",
            description:
                "Approved initiative details and link will be added here.",
            icon: Sprout,
        },
        {
            title: "Major Initiative",
            description:
                "Approved initiative details and link will be added here.",
            icon: Handshake,
        },
        {
            title: "Major Initiative",
            description:
                "Approved initiative details and link will be added here.",
            icon: Leaf,
        },
    ]

    return (
        <section className="relative w-full overflow-hidden bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
            {/* Background Decoration */}
            <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-green-100/40 " />

            <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-lime-100/40 " />

            <div className="relative z-10 mx-auto max-w-350">
                {/* Section Heading */}
                <div className="max-w-3xl">
                    <p className="text-sm font-bold tracking-widest text-green-700">
                        MAJOR INITIATIVES
                    </p>

                    <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-wide text-gray-950 sm:text-5xl lg:text-6xl">
                        Initiatives led by{" "}
                        <span className="text-green-800">
                            Krushisetu
                        </span>
                    </h2>

                    <div className="mt-6 h-0.5 w-24 rounded-full bg-green-600" />

                    <p className="mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                        Explore the major initiatives connected with
                        Krushisetu and its work in agricultural and rural
                        development.
                    </p>
                </div>

                {/* Initiative Cards */}
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {initiatives.map((initiative, index) => {
                        const Icon = initiative.icon

                        return (
                            <div
                                key={index}
                                className="kr-hover-card group relative overflow-hidden rounded-4xl border border-gray-200 bg-white/85 p-7 shadow-xl shadow-gray-900/10 sm:p-8"
                            >
                                {/* Card Glow */}
                                <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-green-100/50 opacity-0 
                 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Icon */}
                                <div className="kr-hover-icon relative flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800">
                                    <Icon
                                        size={25}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* Number */}
                                <p className="relative mt-7 text-xs font-bold tracking-widest text-green-600">
                                    0{index + 1}
                                </p>

                                {/* Title */}
                                <h3 className="kr-hover-title relative mt-3 text-xl font-bold text-gray-950 sm:text-2xl">
                                    {initiative.title}
                                </h3>

                                {/* Divider */}
                                <div className="kr-hover-line relative mt-4 h-px w-12 rounded-full bg-green-600" />

                                {/* Description */}
                                <p className="relative mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                                    {initiative.description}
                                </p>

                                {/* Link Placeholder */}
                                <div className="relative mt-7">
                                    <button
                                        type="button"
                                        disabled
                                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-400"
                                    >
                                        Initiative link

                                        <ArrowUpRight
                                            size={17}
                                            strokeWidth={1.8}
                                        />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FounderInitiatives