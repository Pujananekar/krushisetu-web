const AboutSection = () => {
    const supportedGroups = [
        "Farmers",
        "Rural Women",
        "Youth",
        "FPOs",
        "Agri-Entrepreneurs",
        "Farming Communities",
    ]

    const connectedAreas = [
        "Agriculture Knowledge",
        "Modern Technology",
        "Government Schemes",
        "Institutional Support",
        "Market Opportunities",
        "Sustainable Livelihoods",
    ]

    return (
        <section className="relative w-full overflow-hidden bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
            {/* Background Decoration */}
            <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-green-100/50 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-green-50/70 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-350">
                {/* Main About */}
                <div className="mt-7 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
                    {/* Left Content */}
                    <div className="flex flex-col">
                        <p className="text-sm font-bold tracking-widest text-green-700">
                            ABOUT US
                        </p>

                        <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-wide text-gray-950 sm:text-6xl lg:text-6xl xl:text-7xl">
                            ABOUT{" "}
                            <span className="text-green-800">
                                Krushisetu
                            </span>
                        </h1>

                        <div className="mt-5 h-0.5 w-[35%] rounded-2xl bg-green-600" />

                        <p className="mt-7 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
                            Krushisetu is an agriculture development initiative
                            of Be The Change Foundation established to
                            strengthen farmers, rural women, youth, Farmer
                            Producer Organisations, agri-entrepreneurs, and
                            farming communities.
                        </p>

                        <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
                            It works as a bridge between agriculture knowledge,
                            modern technology, government schemes,
                            institutional support, market opportunities, and
                            sustainable rural livelihoods.
                        </p>

                        {/* Focus Areas */}
                        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <div className="kr-hover-card flex flex-col items-center rounded-3xl border border-gray-200 bg-white/85 px-7 py-5 text-center shadow-xl shadow-gray-900/10 sm:items-start sm:text-left">
                                <h3 className="kr-hover-title text-lg font-bold text-green-900">
                                    Farmer First
                                </h3>

                                <div className="kr-hover-line mt-3 h-px w-12 rounded-2xl bg-green-600" />

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Services designed around real farm and
                                    livelihood needs.
                                </p>
                            </div>

                            <div className="kr-hover-card flex flex-col items-center rounded-3xl border border-gray-200 bg-white/85 px-7 py-5 text-center shadow-xl shadow-gray-900/10 sm:items-start sm:text-left">
                                <h3 className="kr-hover-title text-lg font-bold text-green-900">
                                    Practical Support
                                </h3>

                                <div className="kr-hover-line mt-3 h-px w-12 rounded-2xl bg-green-600" />

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Knowledge, training, guidance and
                                    facilitation at the grassroots level.
                                </p>
                            </div>

                            <div className="kr-hover-card flex flex-col items-center rounded-3xl border border-gray-200 bg-white/85 px-7 py-5 text-center shadow-xl shadow-gray-900/10 sm:items-start sm:text-left">
                                <h3 className="kr-hover-title text-lg font-bold text-green-900">
                                    Collaboration
                                </h3>

                                <div className="kr-hover-line mt-3 h-px w-12 rounded-2xl bg-green-600" />

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Connecting communities with institutions,
                                    experts and opportunities.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Information Card */}
                    <div className="relative">
                        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-green-100/60 blur-3xl" />

                        <div className="kr-hover-card relative flex flex-col gap-5 rounded-[28px] border border-gray-200 bg-white/85 p-6 shadow-xl shadow-gray-900/10 sm:p-7">
                            {/* Identity */}
                            <div>
                                <div className="kr-hover-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-xl font-bold text-white shadow-lg shadow-green-900/20">
                                    K
                                </div>

                                <h2 className="mt-4 text-2xl font-bold text-green-800">
                                    An Agriculture Development Initiative
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    An initiative of Be The Change Foundation
                                    focused on farmer empowerment and
                                    sustainable rural development.
                                </p>
                            </div>

                            <div className="h-px w-full rounded-full bg-gray-300" />

                            {/* Who We Support */}
                            <div>
                                <h3 className="text-lg font-bold text-green-900">
                                    Who We Support
                                </h3>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {supportedGroups.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800 transition-colors duration-300 hover:border-green-700 hover:bg-green-700 hover:text-white"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px w-full rounded-full bg-gray-300" />

                            {/* What We Connect */}
                            <div>
                                <h3 className="text-lg font-bold text-green-900">
                                    What We Connect
                                </h3>

                                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {connectedAreas.map((item) => (
                                        <div
                                            key={item}
                                            className="group/item flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors duration-300 hover:bg-green-50"
                                        >
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-green-100 text-xs font-bold text-green-700 transition-colors duration-300 group-hover/item:bg-green-700 group-hover/item:text-white">
                                                ✓
                                            </span>

                                            <span className="text-xs font-medium text-gray-700 transition-colors duration-300 group-hover/item:text-green-900">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection