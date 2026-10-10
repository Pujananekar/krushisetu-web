import {
    Flag,
    Rocket,
    Presentation,
    Sprout,
    Users,
    Globe,
    GraduationCap,
    ChartNoAxesCombined,
} from "lucide-react"

const TrainingHome = () => {
    const phases = [
        {
            number: "01",
            title: "Phase 1",
            months: "Months 1 - 2",
            description: "Foundation Setup",
            icon: Flag,
        },
        {
            number: "02",
            title: "Phase 2",
            months: "Months 3 - 4",
            description: "Launch Services",
            icon: Rocket,
        },
        {
            number: "03",
            title: "Phase 3",
            months: "Months 5 - 8",
            description: "Training & Projects",
            icon: Presentation,
        },
        {
            number: "04",
            title: "Phase 4",
            months: "Months 9 - 12",
            description: "Expansion",
            icon: Sprout,
        },
    ]

    const impact = [
        {
            value: "1,000+",
            label: "Farmer Members",
            icon: Users,
        },
        {
            value: "10,000+",
            label: "Long-term Farmer Reach",
            icon: Globe,
        },
        {
            value: "15+",
            label: "Programs",
            icon: GraduationCap,
        },
        {
            value: "40L+ - 1.5Cr+",
            label: "Potential Annual Impact",
            icon: ChartNoAxesCombined,
        },
    ]

    return (
        <section
            id="training"
            className="relative min-h-max w-full overflow-hidden"
        >
            {/* Background */}
            <img
                className="absolute inset-0 h-full w-full object-cover object-center"
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt=""
            />

            {/* Background overlay */}
            {/* <div className="absolute inset-0 bg-white/75" /> */}

            {/* Content */}
            <div className="relative z-10 mt-10 flex w-full flex-col items-center gap-8 px-6 py-10">


                {/* Impact */}
                <div className="w-full max-w-7xl rounded-3xl border border-gray-200 bg-white/85 px-5 py-7 shadow-sm md:px-8">

                    {/* Impact heading */}
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h4 className="text-xl font-bold tracking-wide text-green-700">
                            OUR IMPACT
                        </h4>

                        <h3 className="text-3xl font-bold text-green-900 md:text-4xl">
                            Impact / Numbers
                        </h3>

                        <div className="h-1 w-10 rounded-full bg-green-600" />
                    </div>

                    {/* Impact cards */}
                    <div className="mt-8 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {impact.map((item) => {
                            const Icon = item.icon

                            return (
                                <div
                                    key={item.label}
                                    className="kr-hover-card flex min-h-37.5 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-md"
                                >
                                    <Icon
                                        size={42}
                                        strokeWidth={1.8}
                                        className="mb-3 text-green-800"
                                    />

                                    <h5 className="text-2xl font-bold tracking-wide text-green-800">
                                        {item.value}
                                    </h5>

                                    <p className="mt-2 text-sm font-medium text-gray-600 md:text-base">
                                        {item.label}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrainingHome